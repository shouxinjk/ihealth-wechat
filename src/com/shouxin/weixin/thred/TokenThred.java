package com.shouxin.weixin.thred;


import com.shouxin.weixin.pojo.AccessToken;
import com.shouxin.weixin.util.WeiXinUtil;

public class TokenThred implements Runnable {
	// �������û�Ψһƾ֤
	public static String appid = "wx9160e991d49b4a97";
	
	// �������û�Ψһƾ֤��Կ
	public static String appsecret = "6a0fa0d2a21b2a1a22bd51d7daa695da";
	
	public static AccessToken accessToken = null;
	@Override
	public void run() {
		while (true) {
			try {
				accessToken = WeiXinUtil.getAccessToken(appid, appsecret);
				if (null != accessToken) {
					// ����7000��
					System.out.println(accessToken.getAccess_token()+"==============");
					//Thread.sleep((accessToken.getExpiresIn() - 200) * 1000);
					Thread.sleep(10000);
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
