package number.msisdn.backend.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*") // ✅ use YOUR React IP
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}

// package number.msisdn.backend.controller;

// import java.util.Arrays;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.filter.CorsFilter;
// // import org.springframework.web.servlet.config.annotation.*;

// @Configuration
// public class CorsConfig implements WebMvcConfigurer {
//     @Override
//     public void addCorsMappings(CorsRegistry registry) {
//         registry.addMapping("/**")
//                 .allowedOrigins("*") // ✅ use YOUR React IP
//                 .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                 .allowedHeaders("*");
//     }
// }

// // @Configuration
// // public class CorsConfig {

// //     @Bean
// //     public CorsFilter corsFilter() {
// //         CorsConfiguration config = new CorsConfiguration();
// //         config.setAllowedOriginPatterns(Arrays.asList("http://localhost:*")); // 👈 allows any port on localhost
// //         config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
// //         config.setAllowedHeaders(Arrays.asList("*"));
// //         config.setAllowCredentials(true); // Only set to true if using cookies or auth headers

// //         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
// //         source.registerCorsConfiguration("/**", config);
// //         return new CorsFilter(source);
// //     }
// // }