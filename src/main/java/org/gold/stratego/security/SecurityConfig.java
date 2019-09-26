package org.gold.stratego.security;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.beans.factory.annotation.Autowired;

import org.gold.stratego.security.UserDBAuthenticator;
import org.gold.stratego.security.LoginSuccessHandler;

@Configuration
@EnableWebSecurity
@ComponentScan({"org.gold.stratego.security"})
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    UserDBAuthenticator userDBA;

    @Autowired
    LoginSuccessHandler successHandler;

    @Override
    protected void configure(AuthenticationManagerBuilder amb) throws Exception{
        amb.authenticationProvider(userDBA);

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable();
        http
                .authorizeRequests()
                    .anyRequest().permitAll()
                    .and().httpBasic();
                //    .and()
                //.formLogin()
                //    .successHandler(successHandler)
                //    .loginPage("/login")
                //    .defaultSuccessUrl("/game",true)
                //    .permitAll();
    }

}

