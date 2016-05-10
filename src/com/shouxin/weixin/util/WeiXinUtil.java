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
		AccessToken accessToken = null;
		String requestUrl = access_token_url.replace("APPID", appid).replace("APPSECRET", appsecret);
		HttpClient client1 = new DefaultHttpClient();
		HttpGet get = new HttpGet(access_token_url);
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
			// �ر����� ,�ͷ���Դ
			client1.getConnectionManager().shutdown();
		}
		return accessToken;
	}

}
