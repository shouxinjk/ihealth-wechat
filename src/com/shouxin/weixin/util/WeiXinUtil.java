package com.shouxin.weixin.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;

import javax.net.ssl.HttpsURLConnection;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.shouxin.weixin.pojo.AccessToken;
import com.shouxin.weixin.pojo.Ticket;
import com.shouxin.weixin.pojo.WeiXinUserInfo;
import com.shouxin.weixin.thred.TokenThred;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;

public class WeiXinUtil {

	// ��ȡaccess_token�Ľӿڵ�ַ��GET�� ��200����/�죩
	public final static String access_token_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET";

	/**
	 * ��ȡaccess_token
	 * 
	 * @param appid
	 *            ƾ֤
	 * @param appsecret
	 *            ��Կ
	 * @return
	 */
	@SuppressWarnings("null")
	public static AccessToken getAccessToken(String appid, String appsecret) {
		AccessToken accessToken = new AccessToken();
		String requestUrl = access_token_url.replace("APPID", appid).replace("APPSECRET", appsecret);
		System.out.println(requestUrl);
		HttpClient client1 = new DefaultHttpClient();
		HttpGet get = new HttpGet(requestUrl);
		JsonParser jsonparer = new JsonParser();// ��ʼ������json��ʽ�Ķ���
		String result = null;
		try {
			HttpResponse res = client1.execute(get);
			String responseContent = null; // ��Ӧ����
			HttpEntity entity = res.getEntity();
			responseContent = EntityUtils.toString(entity, "UTF-8");
			JsonObject json = jsonparer.parse(responseContent).getAsJsonObject();
			// ��json�ַ���ת��Ϊjson����
			if (res.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				if (json.get("errcode") != null) {// ����ʱ΢�Ż᷵�ش��������Ϣ��{"errcode":40013,"errmsg":"invalid
													// appid"}
					System.out.println(json.get("errcode") + "**************");
				} else { // ���������{"access_token":"ACCESS_TOKEN","expires_in":7200}
					System.out.println("\n\r==access_token===" + json.get("access_token"));
					accessToken.setAccess_token(json.get("access_token").getAsString());
					accessToken.setExpiresIn(Integer.parseInt(json.get("expires_in").getAsString()));
					// result = json.get("access_token").getAsString();
					// openId = json.get("openid").getAsString();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// �ر����� ,�ͷ���Դ
			client1.getConnectionManager().shutdown();
		}
		return accessToken;
	}
	
	/**
	 * 根据oauth2授权获取用户基本信息
	 * @param code
	 * @return
	 */
	public String getOauthOpenID(String code) {
		String user_info_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code";
		String openId = "";
		String requestUrl = user_info_url.replace("APPID", PropertiesUtil.getAppid("appid")).replace("SECRET", PropertiesUtil.getAppid("appsecret")).replace("CODE", code);
		HttpClient client1 = new DefaultHttpClient();
		HttpGet get = new HttpGet(requestUrl);
		JsonParser jsonparer = new JsonParser();// ��ʼ������json��ʽ�Ķ���
		String result = null;
		try {
			HttpResponse res = client1.execute(get);
			String responseContent = null; // ��Ӧ����
			HttpEntity entity = res.getEntity();
			responseContent = EntityUtils.toString(entity, "UTF-8");
			JsonObject json = jsonparer.parse(responseContent).getAsJsonObject();
			// ��json�ַ���ת��Ϊjson����
			if (res.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				if (json.get("errcode") != null) {// ����ʱ΢�Ż᷵�ش��������Ϣ��{"errcode":40013,"errmsg":"invalid
													// appid"}
					System.out.println(json.get("errcode") + "**************");
				} else { // ���������{"access_token":"ACCESS_TOKEN","expires_in":7200}
					System.out.println("\n\r==json===" + json);
					openId = json.get("openid").getAsString();
//					userInfo.setOpenID(json.get("openid").getAsString());
//					userInfo.setImageUrl(json.get("headimgurl").getAsString());
					// result = json.get("access_token").getAsString();
					// openId = json.get("openid").getAsString();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// �ر����� ,�ͷ���Դ
			client1.getConnectionManager().shutdown();
		}
		return openId;
	}

	/**
	 * 根据access_token获取用户信息s
	 * 
	 * @param accessToken
	 * @return
	 */
	public WeiXinUserInfo getUserInfo(String accessToken,String openId) {
		String user_info_url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN";
		WeiXinUserInfo userInfo = new WeiXinUserInfo();
		String requestUrl = user_info_url.replace("ACCESS_TOKEN", accessToken).replace("OPENID", openId);
		HttpClient client1 = new DefaultHttpClient();
		HttpGet get = new HttpGet(requestUrl);
		JsonParser jsonparer = new JsonParser();// ��ʼ������json��ʽ�Ķ���
		String result = null;
		try {
			HttpResponse res = client1.execute(get);
			String responseContent = null; // ��Ӧ����
			HttpEntity entity = res.getEntity();
			responseContent = EntityUtils.toString(entity, "UTF-8");
			JsonObject json = jsonparer.parse(responseContent).getAsJsonObject();
			// ��json�ַ���ת��Ϊjson����
			System.out.println(res.getStatusLine().getStatusCode()+"*********");
			if (res.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				if (json.get("errcode") != null) {// ����ʱ΢�Ż᷵�ش��������Ϣ��{"errcode":40013,"errmsg":"invalid
													// appid"}
					System.out.println(json.get("errcode") + "**************");
				} else { // ���������{"access_token":"ACCESS_TOKEN","expires_in":7200}
					System.out.println("\n\r==json===" + json);
					userInfo.setName(json.get("nickname").getAsString());
					userInfo.setOpenID(json.get("openid").getAsString());
					userInfo.setImageUrl(json.get("headimgurl").getAsString());
					// result = json.get("access_token").getAsString();
					// openId = json.get("openid").getAsString();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// �ر����� ,�ͷ���Դ
			client1.getConnectionManager().shutdown();
		}
		return userInfo;
	}
	
	public Ticket getJsApiTicket(){
		String url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi";
		String ticketUrl = url.replace("ACCESS_TOKEN", TokenThred.getAccessToken().getAccess_token());
		Ticket ticket = new Ticket();
		HttpClient client = new DefaultHttpClient();
		HttpGet get = new HttpGet(ticketUrl);
		JsonParser jsonparer = new JsonParser();// ��ʼ������json��ʽ�Ķ���
		String result = null;
		try {
			HttpResponse res = client.execute(get);
			String responseContent = null; // ��Ӧ����
			HttpEntity entity = res.getEntity();
			responseContent = EntityUtils.toString(entity, "UTF-8");
			JsonObject json = jsonparer.parse(responseContent).getAsJsonObject();
			// ��json�ַ���ת��Ϊjson����
			if (res.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				
					System.out.println("\n\r==json===" + json);
					ticket.setJsApiTicket(json.get("ticket").getAsString());
					ticket.setExpiresIn(json.get("expires_in").getAsString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// �ر����� ,�ͷ���Դ
			client.getConnectionManager().shutdown();
		}
		return ticket;
	}
	

	public static String getOrder(String appid,String mch_id,String nonce_str,String body,
			String out_trade_no,String total_fee,String spbill_create_ip,
			String notify_url,String trade_type,String sign){
		String url = "https://api.mch.weixin.qq.com/pay/unifiedorder?appid=APPID&mch_id=MCHID&nonce_str=NONCESTR&sign=SIGN&body=BODY"
				+ "out_trade_no=USERTRADENO&total_fee=TOTALFEE&spbill_create_ip=IP&notify_url=URL&trade_type=TRADE_TYPE";
		String ticketUrl = url.replace("APPID", appid).replace("MCHID", mch_id).replace("NONCESTR", nonce_str)
				.replace("SIGN", sign).replace("BODY", body).replace("USERTRADENO", out_trade_no).replace("TOTALFEE", total_fee)
				.replace("IP", spbill_create_ip).replace("URL", notify_url).replace("TRADE_TYPE", trade_type);
		HttpClient client = new DefaultHttpClient();
		HttpGet get = new HttpGet(ticketUrl);
		JsonParser jsonparer = new JsonParser();// ��ʼ������json��ʽ�Ķ���
		String result = null;
		String responseContent = null; // ��Ӧ����
		try {
			HttpResponse res = client.execute(get);
			HttpEntity entity = res.getEntity();
			responseContent = EntityUtils.toString(entity, "UTF-8");
			System.out.println("responseContent++====="+responseContent);
			// ��json�ַ���ת��Ϊjson����
//			if (res.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
//				JsonObject json = jsonparer.parse(responseContent).getAsJsonObject();
//				if( json.get("return_msg")!= null){
//					System.out.println(json.get("return_msg").getAsString());
//				}else{
//					System.out.println("\n\r==json===" + json);
//					System.out.println(json.get("return_code").getAsString()+"========");
//					System.out.println(json.get("result_code").getAsString()+"++++++++");
////					ticket.setExpiresIn(json.get("expires_in").getAsString());
//				}
//			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// �ر����� ,�ͷ���Դ
			client.getConnectionManager().shutdown();
		}
		return responseContent;
	}
	
	
	public static StringBuffer httpsRequest(String requestUrl, String requestMethod, String output)
			  throws Exception {
				System.out.println(requestUrl);
			  URL url = new URL(requestUrl);
			  HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
			  System.out.println(connection+"=========connection");
			  connection.setDoOutput(true);
			  connection.setDoInput(true);
			  connection.setUseCaches(false);
			  connection.setRequestMethod(requestMethod);
			  if (null != output) {
				  System.out.println("aaaaaa====");
			  OutputStream outputStream = connection.getOutputStream();
			  outputStream.write(output.getBytes("UTF-"));
			  outputStream.close();
			  }
			  System.out.println(output);
			  // 从输入流读取返回内容
			  InputStream inputStream = connection.getInputStream();
			  InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "utf-");
			  BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
			  String str = null;
			  StringBuffer buffer = new StringBuffer();
			  while ((str = bufferedReader.readLine()) != null) {
			  buffer.append(str);
			  }
			  bufferedReader.close();
			  inputStreamReader.close();
			  inputStream.close();
			  inputStream = null;
			  connection.disconnect();
			  return buffer;
	} 
	
}
