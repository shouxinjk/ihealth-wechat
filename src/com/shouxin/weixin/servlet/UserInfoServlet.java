package com.shouxin.weixin.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.shouxin.weixin.pojo.AccessToken;
import com.shouxin.weixin.pojo.WeiXinUserInfo;
import com.shouxin.weixin.thred.TokenThred;
import com.shouxin.weixin.util.WeiXinUtil;

import net.sf.json.JSONObject;

public class UserInfoServlet extends HttpServlet {
	
	@Override
	public void init() throws ServletException {
		//System.out.println(TokenThred.getAccessToken()+"*****");
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		AccessToken accessToken = TokenThred.getAccessToken();
		String openId = (String) req.getSession().getAttribute("openId");
		System.out.println(openId+"====userInfoOpenId");
		WeiXinUtil we = new WeiXinUtil();
		WeiXinUserInfo userInfo = we.getUserInfo(accessToken.getAccess_token(),openId);
		resp.setCharacterEncoding("utf-8");
		resp.setContentType("application/json;charset=utf-8");
		PrintWriter pw = resp.getWriter();
		JSONObject json = new JSONObject();
		json.put("name", userInfo.getName());
		json.put("url", userInfo.getImageUrl());
		json.put("openID", userInfo.getOpenID());
		pw.print(json);
		pw.close();
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doGet(req, resp);
	}

}
