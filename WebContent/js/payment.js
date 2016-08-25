var userId = ReadCookie("userId");

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
	alert(1);
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});

wx.error(function(res){
	var re = eval(res)
	alert(re);
	//alert(re);
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});

$(function () {
	//从URL里获取orderid
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    })(jQuery);
    var orderid = $.getUrlParam('orderid');	
    console.log(orderid);
    Usern(userId);
});

function Usern(userId){
		//用户名
		$.ajax({
			type : "post",
			url : url+"/restOrder/findOrderAndUser",
			contentType : "application/json;charset=utf8",
			data : JSON.stringify({
				"user_id" : userId,"order_id":orderid
			}),
			dataType : "json",
			success : function(r) {
				$('.head_span1 i').text(r.orderData.ORDERTOTALAMOUNT);
				$('.head_img').attr('src',r.userData.AVATAR);
				$("#orderno").val(r.orderData.ORDERNO);
			}

		});
	
}

//微信支付请求接口
function onBridgeReady(data1){
	var data = eval(data1);
	WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId":data.appId, 
                "timeStamp":data.timeStamp, 
                "nonceStr":data.nonceStr,
                "package":data.package,
                "signType":"MD5",
                "paySign":data.paySign
            },
            function(res){     
                if(res.err_msg == "get_brand_wcpay_request：ok" ) {
                    alert("充值成功");
                }else{
                    alert(res.err_msg);
                    alert(res.err_code);
                    alert(res.err_desc);
                }
            }
        );  
}

function fun1(){
	alert(1);
}

//微信支付统一下单接口
function WXPay(){
	alert(111);
	var orderNO = $("#orderno").val();
	var price = $('.head_span1 i').text();
	alert(price);
	$.ajax({
		url:"http://www.shouxinjk.net/ihealth-wechat/payment",
		type:"post",
		data:{"orderNo":orderNO,"price":1},
		success:function(data){
			alert(data);
                 if (typeof WeixinJSBridge == "undefined"){
                     if( document.addEventListener ){
                         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                     }else if (document.attachEvent){
                         document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                     }
                  }else{
                     onBridgeReady(data);
                  } 
		}
	});
}
