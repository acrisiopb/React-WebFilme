package com.bbgcine.overview.config;

import java.util.TimeZone;

import org.springframework.context.annotation.Configuration;
import jakarta.annotation.PostConstruct;

@Configuration
public class SpringTimeZoneConfig {

    @PostConstruct
    public void timezoneConfig() {
        TimeZone.setDefault(TimeZone.getTimeZone("America/Sao_paulo"));
    }
}
