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
}else{
	openId = openIdObj.toString();
}
%>

<body>
</body>
<script type="text/javascript" src="../js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="../js/URL.js"></script>
<script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="../js/content.js"></script>
<script type="text/javascript" src="../js/register.js"></script>
<!--cookie-->
<script type="text/javascript">
var openId = "<%=openId%>";

$(function(){
	
	var code = "<%=code%>";
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
			var data = eval(ur.data);
			if(ur.result == "no"){
				alert(openId)
				register1(openId);
				$.ajax({
					url : "/ihealth-wechat/userInfoServlet",
					type : "post",
					async : false,
					cache : false,
					success : function(data) {
						var d = eval(data);
						alert(d)
						 $.ajax({
						       type: "post",
						       url: url+"/rest/register",
						       contentType:"application/json;charset=utf8",
						       data: JSON.stringify({"openId":openId,"avatar":d.url,"name":d.name}),
						       dataType: "json",
						       async : false,
								cache : false,
						       success: function (r) {
						    	   alert(r.result);
						    	   alert(r.data.USER_ID);
						           if (r.result == "success") {
						        	  var userId = r.data.USER_ID;
						        	  SetCookie("userId",userId,7);
						        	  window.location.href=wechatUrl+"/subject/"+state+".html";
						           }else if(r.result == "existence"){
						        	   var userId = r.data.USER_ID;
						        	   SetCookie("userId",userId,7);
						        	   window.location.href=wechatUrl+"/subject/"+state+".html";
						           }
						       },
						       error: function () {
						           //alert("注册失败!");
						       }
						   });
					}
			   });
			}else if(ur.result == "success"){
	        	SetCookie("userId",data.USER_ID,7);
				window.location.href=wechatUrl+"/subject/"+state+".html";
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