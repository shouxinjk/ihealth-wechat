package com.shouxin.weixin.thred;


import com.shouxin.weixin.pojo.AccessToken;
import com.shouxin.weixin.util.PropertiesUtil;
import com.shouxin.weixin.util.WeiXinUtil;

public class TokenThred implements Runnable {
	// �������û�Ψһƾ֤
	public static String appid = PropertiesUtil.getAppid("appid");
	
	// �������û�Ψһƾ֤��Կ
	public static String appsecret = PropertiesUtil.getAppid("appsecret");
	
	public static AccessToken accessToken = null;
	@Override
	public void run() {
		while (true) {
			try {
				accessToken = WeiXinUtil.getAccessToken(appid, appsecret);
				if (null != accessToken) {
					// ����7000��
					System.out.println(accessToken.getAccess_token()+"==============");
					Thread.sleep((accessToken.getExpiresIn() - 400) * 1000);
					//Thread.sleep(15000);
				} else {
					// ���access_tokenΪnull��60����ٻ�ȡ
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
