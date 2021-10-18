package com.mail;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Mail {
    private Set<String> mail_to;
    private String mail_cc;
    private String mail_bcc;
    private String mail_subject;
    private String mail_content;
    private List<Object> attachments;
}
