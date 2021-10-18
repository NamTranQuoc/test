package com.englishcenter.auth.application;

import com.englishcenter.auth.Auth;
import com.englishcenter.auth.command.CommandJwt;
import com.englishcenter.auth.command.CommandLogin;
import com.englishcenter.member.Member;

import java.util.Optional;

public interface IAuthApplication {
    Optional<Auth> add(Member member, String password) throws Exception;

    Optional<Auth> checkJwt(String jwt) throws Exception;

    Optional<String> login(CommandLogin command) throws Exception;

    Optional<CommandJwt> decodeJwt(String jwt);
}
