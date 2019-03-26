package com.forceclouds.ctms.admin;

import org.beetl.core.Function;
import org.beetl.core.resource.ClasspathResourceLoader;
import org.beetl.ext.spring.BeetlGroupUtilConfiguration;
import org.beetl.ext.spring.BeetlSpringViewResolver;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.HashMap;
import java.util.Map;

/**
 * @Description:
 * @Author: jww
 * @CreateDate: 2019/3/19 10:43
 */
@SpringBootApplication
public class FcCtmsSysAdminApplication {
    public static void main(String[] args){
        SpringApplication.run(FcCtmsSysAdminApplication.class,args);
    }

    //beetl load
    @Bean(initMethod = "init", name = "beetlConfig")
    public BeetlGroupUtilConfiguration getBeetlGroupUtilConfiguration() {
        BeetlGroupUtilConfiguration beetlGroupUtilConfiguration = new BeetlGroupUtilConfiguration();
        ClasspathResourceLoader classpathResourceLoader = new ClasspathResourceLoader();
        beetlGroupUtilConfiguration.setResourceLoader(classpathResourceLoader);
        //读取配置文件信息
//        beetlGroupUtilConfiguration.setConfigFileResource(patternResolver.getResource("classpath:beetl.properties"));
        //注册自定义方法
        Map<String, Function> functions = new HashMap<>();
   /*     functions.put("i18n", new com.forceclouds.ctmsbase.utils.I18n());*/
        beetlGroupUtilConfiguration.setFunctions(functions);
        return beetlGroupUtilConfiguration;
    }

    @Bean(name = "beetlViewResolver")
    public BeetlSpringViewResolver getBeetlSpringViewResolver(@Qualifier("beetlConfig") BeetlGroupUtilConfiguration beetlGroupUtilConfiguration) {
        BeetlSpringViewResolver beetlSpringViewResolver = new BeetlSpringViewResolver();
        beetlSpringViewResolver.setPrefix("/templates/");
        beetlSpringViewResolver.setSuffix(".html");
        beetlSpringViewResolver.setContentType("text/html;charset=UTF-8");
        beetlSpringViewResolver.setOrder(0);
        beetlSpringViewResolver.setConfig(beetlGroupUtilConfiguration);
        return beetlSpringViewResolver;
    }

    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api*").allowedMethods("*").allowedOrigins("*");
        registry.addMapping("/page*");
        registry.addMapping("/css*");
        registry.addMapping("/js*");
        registry.addMapping("/fonts*");
        registry.addMapping("/img*");
    }
}
