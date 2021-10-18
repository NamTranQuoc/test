package com.utils;

import com.englishcenter.auth.application.IAuthApplication;
import com.englishcenter.auth.command.CommandJwt;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public abstract class ResponseUtils {
    @Autowired
    private IAuthApplication authApplication;

    protected String outJson(Integer code, String message, Object object) {
        Map<String, Object> result = new HashMap<>();
        if (code != null) {
            result.put("code", code);
        }
        if (StringUtils.isNotBlank(message)) {
            result.put("message", message);
        }
        if (object != null) {
            result.put("payload", object);
        }
        return JsonUtils.objectToJson(result);
    }

    protected String getMemberType(String token) {
        Optional<CommandJwt> commandJwt = authApplication.decodeJwt(token.substring(7));
        return commandJwt.map(CommandJwt::getRole).orElse(null);
    }
}
