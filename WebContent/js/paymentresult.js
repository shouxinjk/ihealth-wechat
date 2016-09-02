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
    gain(userId);
});

function gain(userId){
	//用户名
	$.ajax({
		type : "post",
		url : url+"/restOrder/findOrderByOrderNo",
		contentType : "application/json;charset=utf8",
		data : JSON.stringify({
			"orderNo":orderid
		}),
		dataType : "json",
		success : function(r) {
			/*alert(r.orderData +"===="+r.msg);*/
			$('.nub i').text(r.orderData.ORDERNO);
			$('.je i').text((r.orderData.ORDERTOTALAMOUNT/100));
			$("#order_id").val(r.orderData.ORDER_ID);
			 SetCookie("order_id",r.orderData.ORDER_ID,7);
		}

	});

}
$('.order_number').delegate(".subscribe","click",function(){
	var o= $("#order_id").val();
	window.location ="../subject/booking.html?ORDER_ID="+o;
});







































