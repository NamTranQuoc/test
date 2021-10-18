package com.security;

import com.englishcenter.auth.Auth;
import com.englishcenter.auth.application.AuthApplication;
import com.englishcenter.auth.application.IAuthApplication;
import com.englishcenter.auth.command.CommandJwt;
import com.utils.JsonUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetails implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String sAuth) throws UsernameNotFoundException {
        Auth auth = JsonUtils.jsonToObject(sAuth, Auth.class);
        if (auth == null) {
            throw new UsernameNotFoundException("token not fount");
        }
        IAuthApplication authApplication = new AuthApplication();
        CommandJwt commandJwt = authApplication.decodeJwt(auth.getJwt()).get();

        return org.springframework.security.core.userdetails.User
                .withUsername(auth.getUsername())
                .password(auth.getPassword())
                .authorities(commandJwt.getRole())
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}
