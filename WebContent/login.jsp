<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
 <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=no,minimal-ui" />
    <!--<link rel="stylesheet" href="css/dist/style/weui.min.css"/>-->
    <link rel="stylesheet" href="css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/login.css"/>
    <title>手心健康注册</title>
    <%
    	Object openIdObj =request.getSession().getAttribute("openId");
    	String openId = null;
    	if(openIdObj!=null){
    		openId = openIdObj.toString();
    	}
    System.out.println(openId+"======openID22======");
    %>
</head>
<body>
<div class="container good-container">
    <div class="row phoneN">
        <div class="col-lg-12 col-xs-12 col-md-12 col-sm-12 content">
            <div class="login_input">
                <label class="number">中国 +86</label>
                <input type="tel" placeholder="请输入11位手机号码" class="vali mobile" name="vali" maxlength="11">
            </div>
        </div>
    </div>
    <div class="Validate col-lg-12 col-xs-12 col-md-12 col-sm-12">
        <div class="Validate_member">验证手机号后，您将成为（手心健康）的认证会员</div>
    </div>
    <div class="gain col-lg-12 col-xs-12 col-md-12 col-sm-12">
        <div class="verification_code" onclick="register()">注册<input type="hidden" value="<%=openId%>" id="openId"></div>
    </div>
</div>
</body>
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="js/login.js"></script>
<script type="text/javascript" src="js/URL.js"></script>
<script type="text/javascript" src="js/content.js"></script>
</html>