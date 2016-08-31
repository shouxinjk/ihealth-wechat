$(function(){
	/* (function ($) {
	        $.getUrlParam = function (name) {
	            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	            var r = window.location.search.substr(1).match(reg);
	            if (r != null) return unescape(r[2]); return null;
	        }
	    })(jQuery);
	    var orderid = $.getUrlParam('orderid');*/

	function ReadCookie(cookieName) {
	    var theCookie = "" + document.cookie;
	    var ind = theCookie.indexOf(cookieName);
	    if(ind==-1 || cookieName=="") return "";
	    var ind1 = theCookie.indexOf(';',ind);
	    if(ind1==-1) ind1 = theCookie.length;
	    /*读取Cookie值*/
	    return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
	}
	var orderid =ReadCookie("order_id");
	  //获得年月日      得到日期oTime  
        function getMyDate(str){  
            var oDate = new Date(str),  
            oYear = oDate.getFullYear(),  
            oMonth = oDate.getMonth()+1,  
            oDay = oDate.getDate(),  
            oHour = oDate.getHours(),  
            oMin = oDate.getMinutes(),  
            oSen = oDate.getSeconds(),  
            oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay);//最后拼接时间  
            return oTime;  
        };  
        //补0操作  
        function getzf(num){  
            if(parseInt(num) < 10){  
                num = '0'+num;  
            }  
            return num;  
        }  
	    
	    
	 $.ajax({
	        type: "post",
	        url: url+"/restOrder/aboutOrderPageData",
	        contentType:"application/json;charset=utf8",
	        data: JSON.stringify({"order_id":"10378d15101a4a95bb40444d2fd53f89"}),
	        dataType: "json",
	        success: function (r) {
	            if (r.msg == "success") {
	            	var data = eval(r.orderData);
	            	var str = "";
	            	if(data.length>0){
	            		for(var i=0;i<data.length;i++){
	            			if(data[i].MSTATUS == '已预约'){
	            				var time =getMyDate(data[i].MEDICALORDERBOOKINGTIME);
		            			str +="<div class='order_di col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
				            		    "<div class='orderadd col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
				            				"<p>"+data[i].CNAME+"</p>"+
				            			"</div>"+
				            			"<div class='subscribe_div col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
				            				"<ul class='subscribe_ul col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
				            					"<li class='subscribe_l1 col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>体检人:</span><i>"+data[i].UNAME+"</i></li>"+
				            					"<li class='subscribe_l2 col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>订单编号:</span><i>"+data[i].ORDERNO+"</i>(子订单:<em>"+data[i].MEDICALORDERNO.substring(12,data[i].MEDICALORDERNO.length)+"</em>)</li>"+
				            					"<li class='subscribe_l3 col-lg-12 col-xs-12 col-md-12 col-sm-12'><a href='booking_date.html?mdcid="+data[i].MEDICALORDER_ID+"'>"+time+"更改日程</a><span class='closeyu' data-id='"+data[i].MEDICALORDER_ID+"'>取消预约</span></li>"+
				            				"</ul>"+
				            			"</div>"+
				            			"<div class='add_date'>"+
				            				
				            			"</div>"+
				            		"</div>";
	            			}else{
	            				str +="<div class='order_di col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
		            		    "<div class='orderadd col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
		            				"<p>"+data[i].CNAME+"</p>"+
		            			"</div>"+
		            			"<div class='subscribe_div col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
		            				"<ul class='subscribe_ul col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
		            					"<li class='subscribe_l1 col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>体检人:</span><i>"+data[i].UNAME+"</i></li>"+
		            					"<li class='subscribe_l2 col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>订单编号:</span><i>"+data[i].ORDERNO+"</i>(子订单:<em>"+data[i].MEDICALORDERNO.substring(12,data[i].MEDICALORDERNO.length)+"</em>)</li>"+
		            					"<li class='subscribe_l3 col-lg-12 col-xs-12 col-md-12 col-sm-12'><a href='booking_date.html?mdcid="+data[i].MEDICALORDER_ID+"'>预约日程</a></li>"+
		            				"</ul>"+
		            			"</div>"+
		            			"<div class='add_date'>"+
		            				
		            			"</div>"+
		            		"</div>";
	            			}
	            		}
	            		$('.subscribe').append(str);
	            	}
	            }
	        }
	       
	    });
});
$('.subscribe').delegate(".closeyu","click",function(){
	var med = $(this).attr('data-id');
	 $.ajax({
	        type: "post",
	        url: url+"/restOrder/editAboutTimeQuxiao",
	        contentType:"application/json;charset=utf8",
	        data: JSON.stringify({"order_id":med}),
	        dataType: "json",
	        success: function (r) {
	            if (r.msg == "success") {
	            	$('.subscribe').html('');
	            			//window.location.reload();
	            	window.location="../subject/booking.html";
	            		}
	        		}
	            })
});











