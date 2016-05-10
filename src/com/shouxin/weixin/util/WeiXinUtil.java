package com.shouxin.weixin.util;

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

import net.sf.json.JSONException;
import net.sf.json.JSONObject;

public class WeiXinUtil {

	// 获取access_token的接口地址（GET） 限200（次/天）
	public final static String access_token_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET";

	/**
	 * 获取access_token
	 * 
	 * @param appid
	 *            凭证
	 * @param appsecret
	 *            密钥
	 * @return
	 */
	@SuppressWarnings("null")
	public static AccessToken getAccessToken(String appid, String appsecret) {
		AccessToken accessToken = null;
		String requestUrl = access_token_url.replace("APPID", appid).replace("APPSECRET", appsecret);
		HttpClient client1 = new DefaultHttpClient();
		HttpGet get = new HttpGet(access_token_url);
		JsonParser jsonparer = new JsonParser();// 初始化解析json格式的对象
		String result = null;
		try {
			HttpResponse res = client1.execute(get);
			String responseContent = null; // 响应内容
			HttpEntity entity = res.getEntity();
			responseContent = EntityUtils.toString(entity, "UTF-8");
			JsonObject json = jsonparer.parse(responseContent).getAsJsonObject();
			// 将json字符串转换为json对象
			if (res.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				if (json.get("errcode") != null) {// 错误时微信会返回错误码等信息，{"errcode":40013,"errmsg":"invalid
													// appid"}
					System.out.println(json.get("errcode") + "**************");
				} else { // 正常情况下{"access_token":"ACCESS_TOKEN","expires_in":7200}
					System.out.println("\n\r==access_token===" + json.get("access_token"));
					System.out.println("\n\r==openId===" + json.get("openid"));
					System.out.println(json + "====JSON=======");
					accessToken.setAccess_token(json.get("access_token").getAsString());
					accessToken.setExpiresIn(Integer.parseInt(json.get("expires_in").getAsString()));
					//result = json.get("access_token").getAsString();
					// openId = json.get("openid").getAsString();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// 关闭连接 ,释放资源
			client1.getConnectionManager().shutdown();
		}
		return accessToken;
	}

}
