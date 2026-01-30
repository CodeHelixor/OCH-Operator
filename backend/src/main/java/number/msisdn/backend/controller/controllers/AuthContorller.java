package number.msisdn.backend.controller.controllers;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import number.msisdn.backend.general.AuthStore;
import number.msisdn.backend.general.FileUtility;
import number.msisdn.backend.general.OCHAuthValidator;

@RestController
public class AuthContorller {
    @Autowired
    private OCHAuthValidator validator;

    // @CrossOrigin(origins = "http://localhost:3000") 
    @PostMapping("/login")
    public ResponseEntity<Boolean>  handleLoginRequest(@RequestBody AuthRequest request){
        try {
            String operator = FileUtility.readOperator();
            // System.out.println(request.getUsername());
            // System.out.println(operator);
            // System.out.println(Objects.equals(request.getUsername(), operator));
            if(!Objects.equals(request.getUsername(), operator)){
                return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        boolean valid = validator.validate(request.getUsername(), request.getPassword());
         if (valid) {
            AuthStore.setCredentials(request.getUsername(), request.getPassword());
        }
        return new ResponseEntity<>(valid, valid ? HttpStatus.OK : HttpStatus.UNAUTHORIZED);
    }

    public static class AuthRequest {
        private String username;
        private String password;

        public String getUsername(){
            return username;
        }

        public void setUsername(String username){
            this.username = username;
        }

        public String getPassword(){
            return password;
        }

        public void setPassword(String password){
            this.password = password;
        }
    }
}
