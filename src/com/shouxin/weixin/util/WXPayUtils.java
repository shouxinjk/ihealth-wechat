package com.shouxin.weixin.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.security.KeyStore;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;

import javax.net.ssl.SSLContext;
import javax.servlet.http.HttpServletRequest;
import org.springframework.util.StringUtils;
import java.util.*;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLContexts;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

/**
 * 程序名		:WXPayUtils.java<br>
 * 程序功能 	:微信支付工具类<br>
 * 作成者		:许强<br>
 * 作成日期	:2016-04-27<br>
 * 修改履历 <br>
 * 项目名		状态		作成者		作成日期<br>
 * -----------------------------------<br>
 * pets		新规		许强		2016-04-27<br>
 */
public class WXPayUtils {

	/** 微信支付预支付单失败 */
	public static final String MSG_WXPAY_ORDER_FAILED = "微信支付连接失败，请检查网络。";
	/** 微信支付失败 */
	public static final String MSG_WXPAY_PAY_FAILED = "微信支付付款失败。";
	/** 微信支付关闭失败 */
	public static final String MSG_WXPAY_CLOSE_FAILED = "支付订单关闭失败。";

	public static final String SunX509 = "SunX509";
	public static final String JKS = "JKS";
	public static final String PKCS12 = "PKCS12";
	public static final String TLS = "TLS";

	/**
	 * 采番表对象枚举
	 */
	public enum TableType {
		T_WXPAY_ORDER_RECORD("WX_PAY_ORDER_RECORD_ID"), // 微信预支付订单记录表
		T_WXPAY_RECORD("WX_PAY_RECORD_ID"), // 微信支付记录表
		T_WXPAY_CLOSE_RECORD("WX_PAY_CLOSE_RECORD_ID"), // 微信支付订单关闭记录表
		T_WXPAY_REFUND_RECORD("WX_PAY_REFUND_RECORD_ID"); // 微信退款订单记录表

		private String type;

		private TableType(String type) {
			this.type = type;
		}

		public String getType() {
			return this.type;
		}
	}

	/**
	 * 错误码枚举
	 **/
	public enum ResultCode {
		SUCCESS(0), // 成功
		FAILED(1), // 失败
		SUCCESS_UPLOADIMG(2);// 评论成功，上传图片失败

		private int type;

		private ResultCode(Integer type) {
			this.type = type;
		}

		public Integer getType() {
			return this.type;
		}
	}

	/**
	 * 获取系统时间<br>
	 * 
	 * @return 系统时间(格式为：yyyyMMddHHmmss)<br>
	 */
	public static String getSysTime() {
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		Date curDate = new Date();// 获取当前时间
		String str = df.format(curDate);
		return str;
	}

	/**
	 * 获取ip地址<br>
	 * 
	 * @param request
	 *            请求包<br>
	 * @return 本次请求的ip地址<br>
	 */
	public static String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_CLIENT_IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}

	/**
	 * 对象转XML字符串<br>
	 * 扩展xstream使其支持CDATA<br>
	 * 
	 * @param pi
	 *            微信发起支付订单参数<br>
	 * @return xml字符串
	 * 
	 */
	/*
	 * public static String payInfoToXML(WXPayParam pi) { xstream.alias("xml",
	 * pi.getClass()); return xstream.toXML(pi); }
	 * 
	 * private static XStream xstream = new XStream(new XppDriver() { public
	 * HierarchicalStreamWriter createWriter(Writer out) { return new
	 * PrettyPrintWriter(out) { // 增加CDATA标记 boolean cdata = true;
	 * 
	 * @SuppressWarnings("rawtypes") public void startNode(String name, Class
	 * clazz) { super.startNode(name, clazz); }
	 * 
	 * protected void writeText(QuickWriter writer, String text) { if (cdata) {
	 * writer.write("<![CDATA["); writer.write(text); writer.write("]]>"); }
	 * else { writer.write(text); } } }; } });
	 */

	/**
	 * MAP转XML<br>
	 * 
	 * @param vo
	 *            参数map<br>
	 * @param rootElement
	 *            根节点<br>
	 * @return xml字符串
	 */
	public static String map2xmlBody(Map<String, Object> vo, String rootElement) {
		org.dom4j.Document doc = DocumentHelper.createDocument();
		Element body = DocumentHelper.createElement(rootElement);
		doc.add(body);
		__buildMap2xmlBody(body, vo);
		return doc.asXML();
	}

	@SuppressWarnings("unchecked")
	private static void __buildMap2xmlBody(Element body, Map<String, Object> vo) {
		if (vo != null) {
			Iterator<String> it = vo.keySet().iterator();
			while (it.hasNext()) {
				String key = (String) it.next();
				if (!StringUtils.isEmpty(key)) {
					Object obj = vo.get(key);
					Element element = DocumentHelper.createElement(key);
					if (obj != null) {
						if (obj instanceof java.lang.String) {
							element.setText((String) obj);
						} else {
							if (obj instanceof java.lang.Character || obj instanceof java.lang.Boolean
									|| obj instanceof java.lang.Number || obj instanceof java.math.BigInteger
									|| obj instanceof java.math.BigDecimal) {
								org.dom4j.Attribute attr = DocumentHelper.createAttribute(element, "type",
										obj.getClass().getCanonicalName());
								element.add(attr);
								element.setText(String.valueOf(obj));
							} else if (obj instanceof java.util.Map) {
								org.dom4j.Attribute attr = DocumentHelper.createAttribute(element, "type",
										java.util.Map.class.getCanonicalName());
								element.add(attr);
								__buildMap2xmlBody(element, (Map<String, Object>) obj);
							} else {
							}
						}
					}
					body.add(element);
				}
			}
		}
	}

	/**
	 * XML转MAP<br>
	 * 
	 * @param xml
	 *            xml字符串<br>
	 * @return map
	 */
	@SuppressWarnings("unchecked")
	public static SortedMap<String, String> parseXml(String xml) throws Exception {
		SortedMap<String, String> map = new TreeMap<String, String>();
		if (!StringUtils.isEmpty(xml)) {
			Document document = DocumentHelper.parseText(xml);
			Element root = document.getRootElement();
			List<Element> elementList = root.elements();
			for (Element e : elementList) {
				map.put(e.getName(), e.getText());
			}
		}
		return map;
	}

	/**
	 * 生成签名<br>
	 * 
	 * @param charaterEncodeing
	 *            编码格式<br>
	 * @param parameters
	 *            请求参数(按ascii排序后)<br>
	 * @param apiKey
	 *            商户支付秘钥<br>
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static String createSign(String charaterEncodeing, SortedMap<String, Object> parameters, String apiKey)
			throws Exception {
		StringBuffer sb = new StringBuffer();
		Set es = parameters.entrySet();
		Iterator it = es.iterator();
		while (it.hasNext()) {
			Map.Entry entry = (Map.Entry) it.next();
			String k = (String) entry.getKey();
			Object v = entry.getValue();
			if (!StringUtils.isEmpty(v) && !"sing".equals(k) && !"key".equals(k)) {
				sb.append(k + "=" + v + "&");
			}

		}
		sb.append("key=" + apiKey);
		String sign = MD5Encode(sb.toString(), charaterEncodeing).toUpperCase();
		return sign;
	}

	/** ----------------MD5相关方法--------------------- */
	private static final String hexDigits[] = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d",
			"e", "f" };

	private static String byteToHexString(byte b) {
		int n = b;
		if (n < 0) {
			n += 256;
		}
		int d1 = n / 16;
		int d2 = n % 16;
		return hexDigits[d1] + hexDigits[d2];
	}

	private static String byteArrayToHexString(byte b[]) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < b.length; i++) {
			sb.append(byteToHexString(b[i]));
		}

		return sb.toString();
	}

	/**
	 * MD5加密<br>
	 * 
	 * @param origin
	 *            加密串<br>
	 * @param charsetname
	 *            编码格式(UTF-8)<br>
	 * @return 加密后字符串<br>
	 * @throws Exception<br>
	 */
	public static String MD5Encode(String origin, String charsetname) throws Exception {
		String resultString = null;
		resultString = new String(origin);

		MessageDigest md = MessageDigest.getInstance("MD5");

		if (StringUtils.isEmpty(charsetname)) {
			resultString = byteArrayToHexString(md.digest(resultString.getBytes()));
		} else {
			resultString = byteArrayToHexString(md.digest(resultString.getBytes(charsetname)));
		}

		return resultString;

	}

	/** ----------------MD5相关方法--------------------- */

	/**
	 * 生成指定长度的随机字符串（英数字）<br>
	 * 
	 * @param length
	 *            生成字符串的长度 <br>
	 * @return 随机字符串<br>
	 */
	public static String getRandomString(int length) {
		String base = "abcdefghijklmnopqrstuvwxyz0123456789";
		Random random = new Random();
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < length; i++) {
			int number = random.nextInt(base.length());
			sb.append(base.charAt(number));
		}
		return sb.toString();
	}

	/**
	 * 带证书的HTTPS请求<br>
	 * 
	 * @param requestURL
	 *            请求地址<br>
	 * @param outputStr
	 *            请求参数<br>
	 * @param certPath
	 *            证书本地路径<br>
	 * @param keyPasswd
	 *            私密密码<br>
	 * @return 请求结果<br>
	 * @throws Exception
	 *             <br>
	 */
	public static String httpsRequestWithCert(String requestURL, String outputStr, String certPath, String keyPasswd)
			throws Exception {

		StringBuffer buffer = new StringBuffer();

		// P12私密
		FileInputStream keyFileInputStream = new FileInputStream(new File(certPath));
		final char[] kp = keyPasswd.toCharArray();
		KeyStore ks = KeyStore.getInstance(PKCS12);
		ks.load(keyFileInputStream, kp);
		keyFileInputStream.close();

		// 相信自己的CA和所有自签名的证书
		SSLContext sslcontext = SSLContexts.custom().loadKeyMaterial(ks, kp).build();

		// 只允许使用TLSv1协议
		SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslcontext, new String[] { "TLSv1" }, null,
				SSLConnectionSocketFactory.BROWSER_COMPATIBLE_HOSTNAME_VERIFIER);

		CloseableHttpClient httpclient = HttpClients.custom().setSSLSocketFactory(sslsf).build();
		// 创建http请求(post方式)
		HttpPost httpPost = new HttpPost(requestURL);

		StringEntity reqEntity = new StringEntity(outputStr);
		// 设置类型
		reqEntity.setContentType("application/x-www-form-urlencoded");
		httpPost.setEntity(reqEntity);
		// 进行访问并获取返回
		CloseableHttpResponse response = httpclient.execute(httpPost);

		// 获取返回内容
		HttpEntity entity = response.getEntity();
		if (entity != null) {

			BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(entity.getContent(), "UTF-8"));
			String str = null;

			while ((str = bufferedReader.readLine()) != null) {
				buffer.append(str);
			}
			bufferedReader.close();
		}
		// 关闭应该关闭的资源
		EntityUtils.consume(entity);
		response.close();
		httpclient.close();

		return buffer.toString();
	}
}
