<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>

</head>
<body>
<button onclick="show();">shouxinjk</button>
</body>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
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
function show(){
	$.ajax({
		url:"http://www.shouxinjk.net/ihealth-wechat/payment",
		type:"post",
		success:function(data){
			alert(data.appid);
			wx.chooseWXPay({
			    timestamp: ''+data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
			    nonceStr: ''+data.nonceStr, // 支付签名随机串，不长于 32 位
			    package: 'prepay_id='+data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
			    signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
			    paySign: ''+data.paySign, // 支付签名
			    success: function (res) {
			        // 支付成功后的回调函数
			        alert(res);
			    }
			}); 
		}
	});
	
	/* wx.chooseImage({
	    count: 1, // 默认9
	    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
	    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	    success: function (res) {
	        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
	    }
	}); */
}
/*  */
</script>
</html>