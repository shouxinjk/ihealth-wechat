package com.shouxin.weixin.pojo;

public class Ticket {

	private String jsApiTicket;//
	private String expiresIn;// jsApiTicketÓÐÐ§ÆÚ

	public String getJsApiTicket() {
		return jsApiTicket;
	}

	public void setJsApiTicket(String jsApiTicket) {
		this.jsApiTicket = jsApiTicket;
	}

	public String getExpiresIn() {
		return expiresIn;
	}

	public void setExpiresIn(String expiresIn) {
		this.expiresIn = expiresIn;
	}

	@Override
	public String toString() {
		return "Ticket [jsApiTicket=" + jsApiTicket + ", expiresIn=" + expiresIn + "]";
	}

}
