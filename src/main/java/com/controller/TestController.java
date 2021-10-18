package com.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/hello")
    public String get() {
        return "đây là Nam";
    }

    @GetMapping("/abc")
    public String get1() {
        return "ABC";
    }
}
