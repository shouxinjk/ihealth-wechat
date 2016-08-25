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
			$('.nub i').text(r.orderData.ORDERNO);
			$('.je i').text(r.orderData.ORDERTOTALAMOUNT);
		}

	});

}








































