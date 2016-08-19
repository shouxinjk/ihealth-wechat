package com.shouxin.weixin.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.util.SortedMap;
import java.util.TreeMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.shouxin.weixin.util.MD5;
import com.shouxin.weixin.util.OrderNo;
import com.shouxin.weixin.util.PropertiesUtil;
import com.shouxin.weixin.util.RandomStr;
import com.shouxin.weixin.util.SpbillCreateIPUtil;
import com.shouxin.weixin.util.WXPayUtils;
import com.shouxin.weixin.util.WeiXinUtil;

public class UnifiedorderServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		super.doGet(req, resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		SortedMap<String, Object> params = new TreeMap<String,Object>();
		//添加appid
		params.put("appid", PropertiesUtil.getAppid("appid"));
		//添加mch_id商户号id
		params.put("mch_id", PropertiesUtil.getAppid("mch_id"));
		//添加小于35位随机字符串
		params.put("nonce_str", WXPayUtils.getRandomString(32));
		//添加商品描述
		params.put("body", "手心健康-体检项目购买");
		//添加商户订单号
		params.put("out_trade_no", OrderNo.getDateStr());
		//添加订单金额
		params.put("total_fee", "0.01");
		//添加请求ip地址
		params.put("spbill_create_ip", WXPayUtils.getIpAddr(req));
		//添加回掉地址
		params.put("notify_url", "http://test.shouxinjk.net/ihealth-wechat/ordersuccess");
		//添加交易类型
		params.put("trade_type", "JSAPI");
		//设置签名
		try {
			params.put("sign", WXPayUtils.createSign("UTF-8", params, "cf109ccb4773a83ab2a9327a9bde32a4"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		/**2 发送HTTPS请求获取带签名预支付信息 */
		String requestParamterStr = WXPayUtils.map2xmlBody(params, "xml");
		StringBuffer buffer = new StringBuffer();
		try {
			buffer = WeiXinUtil.httpsRequest("https://api.mch.weixin.qq.com/pay/unifiedorder", requestParamterStr, null);
		} catch (KeyManagementException | NoSuchAlgorithmException | NoSuchProviderException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(buffer.toString());
//		String str = WeXinUtil.getOrder(appid, mch_id, nonce_str, body, out_trade_no, total_fee, spbill_create_ip, notify_url, trade_type,sign);
//		System.out.println(str);
		resp.setCharacterEncoding("utf-8");
		resp.setContentType("text/html;charset=utf-8");
		PrintWriter pw = resp.getWriter();
		pw.print(buffer.toString());
		pw.close();
	}
}		