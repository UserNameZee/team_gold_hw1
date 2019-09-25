package org.gold.stratego.security;
import org.springframework.stereotype.Component;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;


import java.util.ArrayList;

@Component
public class UserDBAuthenticator implements AuthenticationProvider{

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException{

        String name = authentication.getName();
        String password = authentication.getCredentials().toString();

        //testing
        System.out.println("Got to custom auth service.");
        System.out.println(name);
        System.out.println(password);

        return new UsernamePasswordAuthenticationToken(name, password, new ArrayList<>());

    }

    //TODO: delete this

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

}