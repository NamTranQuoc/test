package com.utils;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Paging<T> implements Serializable {
    private Boolean has_next;
    private Boolean has_previous;
    private List<T> items;
    private Integer next_page;
    private Integer previous_page;
    private Integer current_page;
    private Integer page_size;
    private Integer total_pages;
    private Integer total_items;
}
