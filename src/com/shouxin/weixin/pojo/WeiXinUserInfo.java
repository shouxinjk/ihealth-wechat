package com.shouxin.weixin.pojo;

public class WeiXinUserInfo {

	private String name;
	private String openID;
	private String imageUrl;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOpenID() {
		return openID;
	}

	public void setOpenID(String openID) {
		this.openID = openID;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	@Override
	public String toString() {
		return "WeiXinUserInfo [name=" + name + ", openID=" + openID + ", imageUrl=" + imageUrl + "]";
	}

}
