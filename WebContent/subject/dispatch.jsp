<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@ page import="org.apache.http.HttpEntity" %>
<%@ page import="org.apache.http.HttpResponse" %>
<%@ page import="org.apache.http.HttpStatus" %>
<%@ page import="org.apache.http.client.HttpClient" %>
<%@ page import="org.apache.http.client.methods.HttpGet" %>
<%@ page import="org.apache.http.impl.client.DefaultHttpClient" %>
<%@ page import="org.apache.http.util.EntityUtils" %>
<%@ page import="com.google.gson.JsonObject" %>
<%@ page import="com.google.gson.JsonParser" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title></title>
<link rel="stylesheet" href="../css/dist/style/weui.min.css" />
<link rel="stylesheet" href="../css/bootstrap.min.css" />
<link rel="stylesheet" href="../css/Information.css" />
<link rel="stylesheet" type="text/css" href="../css/tcal.css" />
</head>
<% 
Object openIdObj = request.getSession().getAttribute("openId");
Date startDate = (Date)request.getSession().getAttribute("startDate");
Date endDate = new Date();
Long endSeconds = 0L;
String openId="";
Long startSeconds = 0L;
Long numSeconds = 0L;
if(startDate!=null){
	startSeconds = startDate.getTime();
	endSeconds = endDate.getTime();
	numSeconds = endSeconds - startSeconds;
}
	
String state = request.getParameter("state");
System.out.println("=====openIdObj===="+openIdObj);
System.out.println(Long.parseLong(((2*60*60*1000)-20000)+"")+"====endDate哈哈=======");

if(openIdObj==null||numSeconds>Long.parseLong(((2*60*60*1000)-20000)+"")){
	System.out.println(111111);
	//System.out.println("haha=====");
	String code = "";
	try{
		code = request.getParameter("code");
	}catch(Exception e){
		e.printStackTrace();
	}
	String url = "https://api.weixin.qq.com/sns/oauth2/access_token";// 获取access
	// urlhttps://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
	String appid = "wx9160e991d49b4a97";
	String secrt = "6a0fa0d2a21b2a1a22bd51d7daa695da";


	// 获取token
	String turl = String.format(
	"%s?appid=%s&secret=%s&code=%s&grant_type=authorization_code", url,
	appid, secrt,code);
	HttpClient client1 = new DefaultHttpClient();
	HttpGet get = new HttpGet(turl);
	JsonParser jsonparer = new JsonParser();// 初始化解析json格式的对象
	String result = null;
	try
	{
	HttpResponse res = client1.execute(get);
	String responseContent = null; // 响应内容
	HttpEntity entity = res.getEntity();
	responseContent = EntityUtils.toString(entity, "UTF-8");
	JsonObject json = jsonparer.parse(responseContent)
	.getAsJsonObject();
	// 将json字符串转换为json对象
	if (res.getStatusLine().getStatusCode() == HttpStatus.SC_OK)
	{
	if (json.get("errcode") != null)
	{// 错误时微信会返回错误码等信息，{"errcode":40013,"errmsg":"invalid appid"}
	System.out.println(json.get("errcode")+"**************");
	}
	else
	{// 正常情况下{"access_token":"ACCESS_TOKEN","expires_in":7200}
	System.out.println("\n\r==access_token==="+json.get("access_token"));
	System.out.println("\n\r==openId==="+json.get("openid"));
	System.out.println(json+"====JSON=======");
	
	result = json.get("access_token").getAsString();
	openId = json.get("openid").getAsString();
	startDate = new Date();
	request.getSession().setAttribute("startDate", startDate);
	request.getSession().setAttribute("openId", openId);
	//response.sendRedirect("http://www.shouxinjk.net/ihealth-wechat/subject/"+state+".html");
	}
	}
	}
	catch (Exception e)
	{
	e.printStackTrace();
	}
	finally
	{
	// 关闭连接 ,释放资源
	client1.getConnectionManager().shutdown();
	}
}else{
	System.out.println(222);
	endDate = new Date();
	openId = openIdObj.toString();
	System.out.println("+++++++++state++++++++"+state);
	//response.sendRedirect("http://www.shouxinjk.net/ihealth-wechat/subject/"+state+".html");
}
%>

<body>
</body>
<script type="text/javascript" src="../js/jquery-1.7.2.min.js"></script>

<script type="text/javascript" src="../js/City.js"></script>
<script type="text/javascript" src="../js/URL.js"></script>
<script type="text/javascript" src="../js/message.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="../js/content.js"></script>
<!--cookie-->
<script type="text/javascript" src="../js/public.js"></script>
<script type="text/javascript">

var openId = "<%=openId%>";
//if(openId!=""){
	$.ajax({
		url:url+"/rest/findUserByOpenId",
  		type:"post",
  		contentType:'application/json;charset=utf8',
  		data:JSON
  			.stringify({
  				"openId" : "<%=openId%>"
  			}),
  		dataType : "json",
  		async : false,
		cache : false,
		success:function(ur){
			alert(ur.result);
			var data = eval(ur.data);
			if(ur.result == "no"){
				window.location.href="http://www.shouxinjk.net/wechat/login.jsp";
			}else{
	        	SetCookie("userId",data.USER_ID,7);
				window.location.href="http://www.shouxinjk.net/wechat/subject/Message.html";
			}
		}
	});
	
	function SetCookie(cookieName,cookieValue,nDays) {
        /*当前日期*/
        var today = new Date();
        /*Cookie过期时间*/
        var expire = new Date();
        /*如果未设置nDays参数或者nDays为0，取默认值1*/
        if(nDays == null || nDays == 0) nDays = 1;
        /*计算Cookie过期时间*/
        expire.setTime(today.getTime() + 3600000 * 24 * nDays);
        /*设置Cookie值*/
        document.cookie = cookieName + "=" + encodeURIComponent(cookieValue)
                + ";expires=" + expire.toGMTString();
    }
//}
</script>
</html>