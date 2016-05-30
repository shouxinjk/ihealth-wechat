package com.shouxin.weixin.thred;


import com.shouxin.weixin.pojo.AccessToken;
import com.shouxin.weixin.util.WeiXinUtil;

public class TokenThred implements Runnable {
	// 第三方用户唯一凭证
	public static String appid = "wx6dfe82ae4fab747f";
	
	// 第三方用户唯一凭证密钥
	public static String appsecret = "d41ebffdf7ef39d976cea479473b693e";
	
	public static AccessToken accessToken = null;
	@Override
	public void run() {
		while (true) {
			try {
				accessToken = WeiXinUtil.getAccessToken(appid, appsecret);
				if (null != accessToken) {
					// 休眠7000秒
					System.out.println(accessToken.getAccess_token()+"==============");
					Thread.sleep((accessToken.getExpiresIn() - 400) * 1000);
					//Thread.sleep(15000);
				} else {
					// 如果access_token为null，60秒后再获取
					Thread.sleep(60 * 1000);
				}
			} catch (InterruptedException e) {
				try {
					Thread.sleep(60 * 1000);
				} catch (InterruptedException e1) {
					e1.printStackTrace();
				}
			}
		}
	}
	
	public synchronized static AccessToken getAccessToken(){
		return accessToken;
	}
	
	public synchronized static void setAccessToken(AccessToken accesstoken){
		accessToken = accesstoken;
	}
}
