package com.englishcenter.member.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommandUpdateMember {
    private String id;
    private String role;
    private String name;
    private String avatar;
}
