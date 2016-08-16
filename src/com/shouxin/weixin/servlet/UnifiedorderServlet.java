package com.shouxin.weixin.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.shouxin.weixin.util.MD5;
import com.shouxin.weixin.util.OrderNo;
import com.shouxin.weixin.util.PropertiesUtil;
import com.shouxin.weixin.util.RandomStr;
import com.shouxin.weixin.util.SpbillCreateIPUtil;
import com.shouxin.weixin.util.WeiXinUtil;

public class UnifiedorderServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		super.doGet(req, resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		super.doPost(req, resp);
		String appid = PropertiesUtil.getAppid("appid");
		String mch_id = PropertiesUtil.getAppid("mch_id");
		String nonce_str = RandomStr.getNum(30);
		String body = "手心健康-体检项目购买";
		String out_trade_no = OrderNo.getDateStr();
		String total_fee = "0.01";
		String spbill_create_ip = SpbillCreateIPUtil.getIp(req);
		String notify_url = "http://test.shouxinjk.net/ihealth-wechat/ordersuccess";
		String trade_type = "JSAPI";
		String signstr = "appid="+appid+"mch_id="+mch_id+"&device_info=WEB&body="+body+"&nonce_str="+nonce_str;
		String timestamp ="cf109ccb4773a83ab2a9327a9bde32a4";
		String stringSignTemp = signstr+"&key="+timestamp;
		String sign = MD5.md5(stringSignTemp);
		WeiXinUtil.getOrder(appid, mch_id, nonce_str, body, out_trade_no, total_fee, spbill_create_ip, notify_url, trade_type,sign);
		
	}
}		