package com.englishcenter.member.application;

import com.englishcenter.auth.application.IAuthApplication;
import com.englishcenter.member.Member;
import com.englishcenter.member.command.CommandAddMember;
import com.englishcenter.member.command.CommandSearchMember;
import com.englishcenter.member.command.CommandUpdateMember;
import com.utils.MongoDBConnection;
import com.utils.Paging;
import com.utils.enums.ExceptionEnum;
import com.utils.enums.MongodbEnum;
import org.apache.commons.lang3.StringUtils;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

@Component
public class MemberApplication implements IMemberApplication {
    public final MongoDBConnection<Member> mongoDBConnection;
    @Autowired
    private IAuthApplication authApplication;

    @Autowired
    public MemberApplication() {
        mongoDBConnection = new MongoDBConnection<>(MongodbEnum.collection_member, Member.class);
    }

    @Override
    public Optional<List<Member>> find(Map<String, Object> query) {
        query.put("is_deleted", false);
        return mongoDBConnection.find(query);
    }

    @Override
    public Optional<Paging<Member>> getList(CommandSearchMember command) throws Exception {
        if (!Member.MemberType.ADMIN.equals(command.getMember_type())) {
            throw new Exception(ExceptionEnum.member_type_deny);
        }
        Map<String, Object> query = new HashMap<>();
        query.put("is_deleted", false);
        if (!CollectionUtils.isEmpty(command.getTypes())) {
            query.put("type", new Document("$in", command.getTypes()));
        }
        if (StringUtils.isNotBlank(command.getKeyword())) {
            Map<String, Object> $regex = new HashMap<>();
            $regex.put("$regex", Pattern.compile(command.getKeyword(), Pattern.CASE_INSENSITIVE));
            query.put("name", $regex);
        }
        if (command.getFrom_date() != null && command.getTo_date() != null) {
            query.put("create_date", new Document("$gte", command.getFrom_date()).append("$lte", command.getTo_date()));
        }
        return mongoDBConnection.find(query, command.getSort(), command.getPage(), command.getSize());
    }

    @Override
    public Optional<Member> add(CommandAddMember command) throws Exception {
        if (StringUtils.isAnyBlank(command.getName(), command.getEmail(), command.getPassword(), command.getGender(), command.getPhone_number()) || command.getDob() == null) {
            throw new Exception(ExceptionEnum.param_not_null);
        }
        Map<String, Object> query = new HashMap<>();
        query.put("is_deleted", false);
        query.put("email", command.getEmail());
        long count = mongoDBConnection.count(query).orElse(0L);
        if (count > 0) {
            throw new Exception(ExceptionEnum.member_exist);
        }
        Member member = Member.builder()
                .create_date(System.currentTimeMillis())
                .name(command.getName())
                .email(command.getEmail())
                .type(command.getType() != null ? command.getType() : Member.MemberType.STUDENT)
                .dob(command.getDob())
                .gender(command.getGender())
                .address(command.getAddress())
                .phone_number(command.getPhone_number())
                .build();
        Optional<Member> optional = mongoDBConnection.insert(member);
        if (optional.isPresent()) {
            optional.get().setAvatar("avatar-" + optional.get().get_id().toHexString() + ".png");
            mongoDBConnection.update(optional.get().get_id().toHexString(), optional.get());
            authApplication.add(optional.get(), command.getPassword());
            return optional;
        }
        return Optional.empty();
    }

    private Optional<Member> getByEmail(String email) {
        Map<String, Object> query = new HashMap<>();
        query.put("is_deleted", false);
        query.put("email", email);
        return mongoDBConnection.findOne(query);
    }

    @Override
    public Optional<Member> getById(String id) {
        Map<String, Object> query = new HashMap<>();
        query.put("is_deleted", false);
        query.put("_id", new ObjectId(id));
        return mongoDBConnection.findOne(query);
    }

    @Override
    public Optional<Member> update(CommandUpdateMember command) throws Exception {
        if (StringUtils.isAnyBlank(command.getRole(), command.getId())) {
            throw new Exception(ExceptionEnum.param_not_null);
        }
        if (!Member.MemberType.ADMIN.equals(command.getRole())) {
            throw new Exception(ExceptionEnum.member_type_deny);
        }
        Optional<Member> optional = this.getById(command.getId());
        if (!optional.isPresent()) {
            throw new Exception(ExceptionEnum.member_not_exist);
        }
        Member member = optional.get();
        if (StringUtils.isNotBlank(command.getName())) {
            member.setName(command.getName());
        }
        if (StringUtils.isNotBlank(command.getAvatar())) {
            member.setAvatar(command.getAvatar());
        }
        return mongoDBConnection.update(member.get_id().toHexString(), member);
    }
}
