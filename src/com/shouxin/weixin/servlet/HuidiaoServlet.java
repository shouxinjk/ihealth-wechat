package com.shouxin.weixin.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Map;
import java.util.SortedMap;
import java.util.TreeMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.shouxin.weixin.util.WXPayUtils;

public class HuidiaoServlet extends HttpServlet {
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doGet(req, resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println(req.getParameter("return_code")+"==================return_code");
		
		System.out.println("----接收微信发来的消息---");
		 
		// 获取收到的报文
		        BufferedReader reader = req.getReader();
		         String line = "";
		        StringBuffer inputString = new StringBuffer();
		        try{
		        	while ((line = reader.readLine()) != null) {
		    	        inputString.append(line);
		    	        }
		    	        req.getReader().close();
		    	        System.out.println("----接收到的报文---"+inputString.toString());
		    	        Map<String, String> map = WXPayUtils.parseXml(inputString.toString());
		    	    for(Object keyValue : map.keySet()){
		    	        System.out.println(keyValue+"="+map.get(keyValue));
		    	    }
		    	    if (map.get("result_code").toString().equalsIgnoreCase("SUCCESS")) {
		    	        //TODO 对数据库的操作
		    	    	SortedMap<String, Object> map1 = new TreeMap<String, Object>();
		    	    	map1.put("return_code", "SUCCESS");
		    	    	map1.put("return_msg", "OK");
		    	        resp.getWriter().write(WXPayUtils.map2xmlBody(map1, "xml"));   //告诉微信服务器，我收到信息了，不要在调用回调action了
		    	    }
		        }catch(Exception e){
		        	e.printStackTrace();
		        }
	}
	
}
