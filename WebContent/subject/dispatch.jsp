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
String openId="";
String state = request.getParameter("state");
String code = "";
try{
	code = request.getParameter("code");
}catch(Exception e){
	e.printStackTrace();
}
if(openIdObj==null){
	System.out.println(111111);
}else{
	System.out.println(222);
	openId = openIdObj.toString();
	//System.out.println("+++++++++state++++++++"+state);
	//response.sendRedirect("http://www.shouxinjk.net/ihealth-wechat/subject/"+state+".html");
}
%>

<body>
</body>
<script type="text/javascript" src="../js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="../js/URL.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="../js/content.js"></script>
<!--cookie-->
<script type="text/javascript">
var openId = "<%=openId%>";

$(function(){
	var code = "<%=code%>";
		alert(openId);
		var state = "<%=state%>";
	if(openId == ""){
		$.ajax({
			url:"/ihealth-wechat/openIdServlet",
			type:"post",
			async : false,
			cache : false,
			data:{"code":code},
			success:function(data){
				openId = data;
			}
		});
	}
	
	$.ajax({
		url:url+"/rest/findUserByOpenId",
  		type:"post",
  		contentType:'application/json;charset=utf8',
  		data:JSON
  			.stringify({
  				"openId" : openId
  			}),
  		dataType : "json",
  		async : false,
		cache : false,
		success:function(ur){
			//alert(ur.result);
			alert(ur.result+"==");
			var data = eval(ur.data);
			if(ur.result == "no"){
				window.location.href="http://www.shouxinjk.net/ihealth-wechat/login.jsp";
			}else if(ur.result == "success"){
				alert(data.USER_ID+"====successuserid");
				alert(state);
	        	SetCookie("userId",data.USER_ID,7);
				window.location.href="http://www.shouxinjk.net/ihealth-wechat/subject/"+state+".html";
			}
		}
	});
	
})
	
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
</script>
</html>