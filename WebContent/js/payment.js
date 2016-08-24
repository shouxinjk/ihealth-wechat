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
			}

		});
		
	}












