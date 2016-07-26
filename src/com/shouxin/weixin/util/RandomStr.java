package com.shouxin.weixin.util;

import java.security.NoSuchAlgorithmException;

import me.chanjar.weixin.common.util.crypto.SHA1;

public class RandomStr {
	
	private static String[] rand = {
			"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
			"a","b,","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
			"0","1","2","3","4","5","6","7","8","9"
	};
	
	public static String getNum(int num){
		String randomStr = "";
		for (int i = 0; i < num; i++) {
			int random = (int) (Math.random()*(rand.length-1));
			randomStr += rand[random];
		}
		return randomStr;
	}
	
	public static void main(String[] args) {
		String str="";
			str = getNum(15);
		System.out.println(str);
	}
	
}
