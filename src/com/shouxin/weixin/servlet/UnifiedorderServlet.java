package com.shouxin.weixin.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.Charset;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.util.Date;
import java.util.Map;
import java.util.SortedMap;
import java.util.TreeMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;

import com.shouxin.weixin.util.MD5;
import com.shouxin.weixin.util.OrderNo;
import com.shouxin.weixin.util.PropertiesUtil;
import com.shouxin.weixin.util.RandomStr;
import com.shouxin.weixin.util.SpbillCreateIPUtil;
import com.shouxin.weixin.util.WXPayUtils;
import com.shouxin.weixin.util.WeiXinUtil;

import net.sf.json.JSONObject;

public class UnifiedorderServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		super.doGet(req, resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		SortedMap<String, Object> params = new TreeMap<String,Object>();
		String orderNo = req.getParameter("orderNO");
		//System.out.println(orderNo);
		int price = Integer.parseInt(req.getParameter("price"));
		//添加用户openID
		String openId = (String) req.getSession().getAttribute("openId");
		//判断从测试公众号进入还是正式公众号进入
		String openIdCeshi = PropertiesUtil.getAppid(openId);
		if(openIdCeshi!=null && !openIdCeshi.equals("")){
			//从测试公众号进入,然后修改openid为正式号openid
			openId = openIdCeshi;
			params.put("appid", "wx9160e991d49b4a97");
			//添加回掉地址
			params.put("notify_url", "http://test.shouxinjk.net/ihealth-wechat/ordersuccess");
		}else{
			//添加appid
			params.put("appid", PropertiesUtil.getAppid("appid"));
			//添加回掉地址
			params.put("notify_url", "http://www.shouxinjk.net/ihealth-wechat/ordersuccess");
		}
		params.put("openid", openId);
		//添加mch_id商户号id
		params.put("mch_id", PropertiesUtil.getAppid("mch_id"));
		//添加小于35位随机字符串
		params.put("nonce_str", WXPayUtils.getRandomString(32));
		//添加商品描述
		params.put("body", "手心健康-体检项目购买");
		//添加商户订单号
		params.put("out_trade_no", orderNo);
		//添加订单金额
		params.put("total_fee", price);
		//添加请求ip地址
		params.put("spbill_create_ip", SpbillCreateIPUtil.getIp(req));
		//添加交易类型
		params.put("trade_type", "JSAPI");
		//设置签名
		try {
			params.put("sign", WXPayUtils.createSign("UTF-8", params, PropertiesUtil.getAppid("key")));
		} catch (Exception e) {
			e.printStackTrace();
		}
		/**2 发送HTTPS请求获取带签名预支付信息 */
		String requestParamterStr = WXPayUtils.map2xmlBody(params, "xml");
		System.out.println(requestParamterStr);
		StringBuffer buffer = new StringBuffer();
		try {
			//统一下单请求
			buffer = WeiXinUtil.httpsRequest("https://api.mch.weixin.qq.com/pay/unifiedorder", "POST", requestParamterStr);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(buffer.toString());
		SortedMap<String, String> map  = null;
		try {
			map = WXPayUtils.parseXml(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		resp.setCharacterEncoding("utf-8");
		resp.setContentType("applocation/json;charset=utf-8");
		PrintWriter pw = resp.getWriter();
		String return_code = map.get("return_code");
		//判断统一下单时否成功！
		if(StringUtils.isNotEmpty(return_code) && "SUCCESS".equals(return_code)){
			String return_msg = map.get("return_msg");
			if(StringUtils.isNotEmpty(return_msg) && !"OK".equals(return_msg)){
				System.out.println("[微信支付][预支付]统一下单错误，错误码是：" + map.get("err_code") 
				+ ",错误信息为：" + map.get("err_code_des"));
				System.out.println(11111);
			}
			
		}else{
			System.out.println("[微信支付][预支付]统一下单错误，错误信息为：" + map.get("return_msg"));
			System.out.println(22222);
		}
	
		String result_code = map.get("result_code");
		if("SUCCESS".equals(result_code)){
			long time = Long.parseLong(String.valueOf(System.currentTimeMillis()).toString().substring(0,10));
			//统一下单成功，返回数据
			SortedMap<String, Object> map2 = new TreeMap<String,Object>();
			map2.put("appId", "wx9160e991d49b4a97");
			map2.put("timeStamp", String.valueOf(time));
			map2.put("nonceStr",  WXPayUtils.getRandomString(32));
			map2.put("package", "prepay_id="+map.get("prepay_id"));
			map2.put("signType", "MD5");
			try {
				map2.put("paySign", WXPayUtils.createSign("UTF-8", map2, "cf109ccb4773a83ab2a9327a9bde32a4"));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			map2.put("orderNo",orderNo);
			JSONObject json = JSONObject.fromObject(map2);
			System.out.println(json+"========json");
			pw.print(json);
		}else{
			System.out.println(333333);
			System.out.println("[微信支付][预支付]统一下单错误，错误信息为：" + map.get("return_msg"));
		}
		pw.close();
		
	}
}		