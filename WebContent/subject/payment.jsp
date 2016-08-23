<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>微信支付</title>

</head>
<body>
<button onclick="show();">shouxinjk</button>
</body>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.1.0.js"></script>
<script type="text/javascript" src="../js/jquery-1.7.2.min.js"></script>
<script type="text/javascript">
$.ajax({
	url:"/ihealth-wechat/wxPayServlet",
	type:"post",
	success:function(data){
		var da = eval(data);
		wx.config({
		    debug: false,
		    appId: da.appid,
		    timestamp: da.timestamp,
		    nonceStr: da.nonceStr,
		    signature: da.signature,
		    jsApiList: [
		      'chooseImage'
		    ]
		});
	}
});

wx.ready(function(){
	//alert(1);
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});

wx.error(function(res){
	var re = eval(res)
	//alert(re);
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});

function onBridgeReady(data1){
	var data = eval(data1);
	WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId":data.appid+'', /* 微信支付，坑一 冒号是中文字符 */
                "timeStamp":data.timestamp+'', 
                "nonceStr":data.nonceStr+'',
                "package":data.package,
                "signType":"MD5",
                "paySign":data.paySign+''
            },
            function(res){     
                if(res.err_msg == "get_brand_wcpay_request：ok" ) {
                    alert("充值成功");
                }else{
               	 	alert(1);
                    alert(res.err_msg);
                    alert(res.err_code);
                    alert(res.err_desc);
                }
            }
        ); 
}

function show(){
	$.ajax({
		url:"http://www.shouxinjk.net/ihealth-wechat/payment",
		type:"post",
		success:function(data){
                 if (typeof WeixinJSBridge == "undefined"){
                     if( document.addEventListener ){
                         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                     }else if (document.attachEvent){
                         document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                     }
                  }else{
                	  alert(1)
                     onBridgeReady(data);
                  } 
		}
	});
}
</script>
</html>