package com.englishcenter.member.command;

import eu.dozd.mongo.annotation.Embedded;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommandSearchMember {
    private String member_type;
    private Integer size;
    private Integer page;
    private String keyword;
    private List<String> types;
    private Long from_date;
    private Long to_date;
    private Sort sort;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Embedded
    @Builder
    public static class Sort {
        private String field;
        private Boolean is_asc;
    }
}
