var userId = ReadCookie("userId");

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
				$('.head_span1 i').text((r.orderData.ORDERTOTALAMOUNT/100));
				$('.head_img').attr('src',r.userData.AVATAR);
				$("#orderno").val(r.orderData.ORDERNO);
			}

		});
	
}

//微信支付请求接口
function onBridgeReady(){
	WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId":appId, 
                "timeStamp":timeStamp, 
                "nonceStr":nonceStr,
                "package":package,
                "signType":"MD5",
                "paySign":paySign
            },
            function(res){     
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                	window.location.replace=("../subject/paymentresult.html");
                }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                	window.location.replace =("../subject/buypeitem.html");
                }else(res.err_msg=="get_brand_wcpay_request:fail"){
                	alert(res.err_code);
                    alert(res.err_desc);
                }
            }
        );  
}

//微信支付统一下单接口
function WXPay(){
	//alert(111);
	//alert(orderNO)
	var price = $('.head_span1 i').text();
	price = price*100;
	//alert(price);
	$.ajax({
		url:"http://www.shouxinjk.net/ihealth-wechat/payment",
		type:"post",
		success:function(){
			//alert(data);
                 if (typeof WeixinJSBridge == "undefined"){
                     if( document.addEventListener ){
                         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                     }else if (document.attachEvent){
                         document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                     }
                  }else{
                     onBridgeReady();
                  } 
		}
	});
}
