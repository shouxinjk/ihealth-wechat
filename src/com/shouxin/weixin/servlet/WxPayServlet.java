package com.shouxin.weixin.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.shouxin.weixin.pojo.Ticket;
import com.shouxin.weixin.util.PropertiesUtil;
import com.shouxin.weixin.util.RandomStr;
import com.shouxin.weixin.util.WeiXinUtil;

import me.chanjar.weixin.common.util.crypto.SHA1;
import net.sf.json.JSONObject;

public class WxPayServlet extends HttpServlet {
	
	@Override
	public void init() throws ServletException {
		// TODO Auto-generated method stub
		super.init();
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doGet(req, resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		WeiXinUtil wx = new WeiXinUtil();
		Ticket ticket = wx.getJsApiTicket();
		String jsapiticket = ticket.getJsApiTicket();
		long time = System.currentTimeMillis();
		String timestamp = String.valueOf(time);
		String nonceStr = RandomStr.getNum(15);
		String signature = "jsapi_ticket="+jsapiticket+"&noncestr="+nonceStr+"&timestamp="+timestamp+"&url="+
							"http://test.shouxinjk.net/ihealth-wechat/subject/buypeitem.html";
		String sha1Str = "";
		try {
			sha1Str = SHA1.gen(signature);
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		JSONObject json = new JSONObject();
		json.put("timestamp", timestamp);
		json.put("nonceStr", nonceStr);
		json.put("signature", sha1Str);
		json.put("appid", PropertiesUtil.getAppid("appid"));
		resp.setCharacterEncoding("utf-8");
		resp.setContentType("application/json;charset=utf-8");
		PrintWriter pw = resp.getWriter();
		pw.println(json);
		pw.close();
	}
	
	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		super.destroy();
	}

}
