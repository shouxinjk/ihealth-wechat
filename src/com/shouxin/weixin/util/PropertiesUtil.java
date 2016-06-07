package com.shouxin.weixin.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertiesUtil {
	
	public static String getAppid(String name){
		InputStream in = null;
		Properties pro = new Properties();
		String value = "";
		try {
			in = Thread.currentThread().getContextClassLoader().getResourceAsStream("/dbconfig.properties");;
			pro.load(in);
			value=pro.getProperty(name);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return value;
	}

	
	public static void main(String[] args) {
		System.out.println(PropertiesUtil.getAppid("appid"));
	}
}
