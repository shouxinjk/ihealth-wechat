$(function(){
	 $.ajax({
	        type: "post",
	        url: url+"/restOrder/aboutOrderPageData",
	        contentType:"application/json;charset=utf8",
	        data: JSON.stringify({"order_id":'10378d15101a4a95bb40444d2fd53f89'}),
	        dataType: "json",
	        success: function (r) {
	            if (r.msg == "success") {
	            	var data = eval(r.orderData);
	            	var str = "";
	            	if(data.length>0){
	            		for(var i=0;i<data.length;i++){
	            			str +="<div class='order_di col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
			            		    "<div class='orderadd col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
			            				"<p>"+data[i].CNAME+"</p>"+
			            			"</div>"+
			            			"<div class='subscribe_div col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
			            				"<ul class='subscribe_ul col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
			            					"<li class='subscribe_l1 col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>体检人:</span><i>"+data[i].UNAME+"</i></li>"+
			            					"<li class='subscribe_l2 col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>订单编号:</span><i>"+data[i].ORDERNO+"</i>(子订单:<em>"+data[i].MEDICALORDERNO.substring(12,data[i].MEDICALORDERNO.length)+"</em>)<a href='booking_date.html?mdc="+data[i].MEDICALORDERNO+"'>预约日程</a></li>"+
			            				"</ul>"+
			            			"</div>"+
			            			"<div class='add_date'>"+
			            				
			            			"</div>"+
			            		"</div>";
	            		}
	            		$('.check').before(str);
	            	}
	            }
	        }
	       
	    });
	
});