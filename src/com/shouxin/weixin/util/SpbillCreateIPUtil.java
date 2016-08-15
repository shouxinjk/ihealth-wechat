package com.shouxin.weixin.util;

import javax.servlet.http.HttpServletRequest;

public class SpbillCreateIPUtil {

	public static String getIp(HttpServletRequest req) {
		String ip = req.getHeader("X-Forwarded-For");
		if (ip != null && ip.length()>0 && !"unKnown".equalsIgnoreCase(ip)) {
			// 多次反向代理后会有多个ip值，第一个ip才是真实ip
			int index = ip.indexOf(",");
			if (index != -1) {
				return ip.substring(0, index);
			} else {
				return ip;
			}
		}
		ip = req.getHeader("X-Real-IP");
		if (ip != null && ip.length()>0 && !"unKnown".equalsIgnoreCase(ip)) {
			return ip;
		}
		return req.getRemoteAddr();
	}

}
