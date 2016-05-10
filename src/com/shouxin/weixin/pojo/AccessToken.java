package com.shouxin.weixin.pojo;

public class AccessToken {

	private String access_token;// token
	private int expiresIn;// token有效时间

	public String getAccess_token() {
		return access_token;
	}

	public void setAccess_token(String access_token) {
		this.access_token = access_token;
	}

	public int getExpiresIn() {
		return expiresIn;
	}

	public void setExpiresIn(int expiresIn) {
		this.expiresIn = expiresIn;
	}

	@Override
	public String toString() {
		return "AccessToken [access_token=" + access_token + ", expiresIn=" + expiresIn + "]";
	}
	
	public static void main(String[] args) {
		AccessToken a = new AccessToken();
		a.setAccess_token("aaaa");
		System.out.println(a.getAccess_token());
	}
	
}
