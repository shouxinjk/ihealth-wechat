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
				$('.head_span1 i').text(r.orderData.ORDERTOTALAMOUNT);
				$('.head_img').attr('src',r.userData.AVATAR);
				$("#orderno").val(r.orderData.ORDERNO);
			}

		});
	
}

//微信支付请求接口
function onBridgeReady(data1,orderNo){
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
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                	window.location ="../subject/paymentresult.html?orderid="+orderNo;
                }else{
                    alert(res.err_msg);
                    alert(res.err_code);
                    alert(res.err_desc);
                }
            }
        );  
}

//微信支付统一下单接口
function WXPay(){
	//alert(111);
	var orderNO = $("#orderno").val();
	//alert(orderNO)
	var price = $('.head_span1 i').text();
	//alert(price);
	$.ajax({
		url:"http://www.shouxinjk.net/ihealth-wechat/payment",
		type:"post",
		data:{"orderNO":orderNO,"price":1},
		success:function(data){
			//alert(data);
			
			var orderNo = data.orderNo;
			alert(orderNo);
                 if (typeof WeixinJSBridge == "undefined"){
                     if( document.addEventListener ){
                         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                     }else if (document.attachEvent){
                         document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                     }
                  }else{
                     onBridgeReady(data,orderNo);
                  } 
		}
	});
}
