package com.englishcenter.auth.application;

import com.englishcenter.auth.Auth;
import com.englishcenter.auth.command.CommandJwt;
import com.englishcenter.auth.command.CommandLogin;
import com.englishcenter.member.Member;
import com.englishcenter.member.application.IMemberApplication;
import com.google.gson.Gson;
import com.utils.HashUtils;
import com.utils.MongoDBConnection;
import com.utils.enums.ExceptionEnum;
import com.utils.enums.MongodbEnum;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
public class AuthApplication implements IAuthApplication {
    public final MongoDBConnection<Auth> mongoDBConnection;
    @Autowired
    private IMemberApplication memberApplication;

    private final String JWT_SECRET = "UUhuhdadyh9*&^777687";
    private final long JWT_EXPIRATION = 24 * 60 * 60 * 1000;

    @Autowired
    public AuthApplication() {
        mongoDBConnection = new MongoDBConnection<>(MongodbEnum.collection_auth, Auth.class);
    }

    @Override
    public Optional<Auth> add(Member member, String password) throws Exception {
        Auth auth = Auth.builder()
                .member_id(member.get_id().toHexString())
                .password(HashUtils.getPasswordMD5(password))
                .username(member.getEmail())
                .build();
        return mongoDBConnection.insert(auth);
    }

    @Override
    public Optional<Auth> checkJwt(String jwt) throws Exception {
        Map<String, Object> query = new HashMap<>();
        query.put("jwt", jwt);
        Optional<Auth> auth = mongoDBConnection.findOne(query);
        if (auth.isPresent()) {
            Optional<CommandJwt> commandJwt = this.decodeJwt(auth.get().getJwt());
            if (commandJwt.isPresent()) {
                long now = System.currentTimeMillis();
                if (now < commandJwt.get().getExpiration_date()) {
                    return auth;
                }
            }
        }
        return Optional.empty();
    }

    private Optional<Auth> generateToken(Auth auth) throws Exception{
        Optional<Member> optional = memberApplication.getById(auth.getMember_id());
        if (!optional.isPresent()) {
            throw new Exception(ExceptionEnum.member_not_exist);
        }
        Member member = optional.get();
        long now = System.currentTimeMillis();
        Map<String, Object> header = new HashMap<>();
        header.put("alg", "HS256");
        header.put("typ", "JWT");

        CommandJwt commandJwt = CommandJwt.builder()
                .create_date(now)
                .expiration_date(now + JWT_EXPIRATION)
                .user_id(member.get_id().toString())
                .role(member.getType())
                .build();
        String jwt = Jwts.builder()
                .setHeader(header)
                .setPayload(new Gson().toJson(commandJwt))
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
        auth.setJwt(jwt);
        mongoDBConnection.update(auth.get_id().toHexString(), auth);
        return Optional.of(auth);
    }

    @Override
    public Optional<String> login(CommandLogin command) throws Exception {
        if (StringUtils.isAnyBlank(command.getUsername(), command.getPassword())) {
            throw new Exception(ExceptionEnum.param_not_null);
        }
        Map<String, Object> query = new HashMap<>();
        query.put("username", command.getUsername());
        Optional<Auth> auth = mongoDBConnection.findOne(query);
        if (!auth.isPresent()) {
            throw new Exception(ExceptionEnum.member_not_exist);
        }
        String hashPass = HashUtils.getPasswordMD5(command.getPassword());
        if (!hashPass.equals(auth.get().getPassword())) {
            throw new Exception(ExceptionEnum.password_incorrect);
        }
        Optional<Auth> optional = this.generateToken(auth.get());
        if (!optional.isPresent()) {
            throw new Exception(ExceptionEnum.password_incorrect);
        }
        return Optional.of(optional.get().getJwt());
    }

    @Override
    public Optional<CommandJwt> decodeJwt(String jwt) {
        try {
            CommandJwt commandJwt = new Gson().fromJson(Jwts.parser().setSigningKey(JWT_SECRET).parse(jwt).getBody().toString(), CommandJwt.class);
            return Optional.of(commandJwt);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    private void clearToken(String userId) {
        Map<String, Object> query = new HashMap<>();
        query.put("user_id", userId);
        mongoDBConnection.drop(query);
    }
}
