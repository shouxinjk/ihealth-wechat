package com.shouxin.weixin.util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertiesUtil {
	
	public static String getAppid(String key){

		String currentPath = PropertiesUtil.class.getResource("").toString();  
		String TomcatPath = currentPath.replace("file:", "");//linux 必须要/开头
		TomcatPath = TomcatPath.replace("/WEB-INF/classes/com/shouxin/weixin/util","/WEB-INF/classes/config");
		String path = TomcatPath+"/appidconfig.properties";

		Properties props = new Properties();
		InputStream ips = null;
		try {
		    ips = new BufferedInputStream(new FileInputStream(path));
			props.load(ips);
			String value = props.getProperty(key);
			return value;
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}finally{
			if(ips!=null){
				try {
					ips.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	
	public static void main(String[] args) {
		System.out.println(PropertiesUtil.getAppid("appid"));
	}
}
