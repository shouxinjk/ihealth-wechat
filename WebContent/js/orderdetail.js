 $(document).ready(function () {
	 $('.xin1').raty({
     	hints: ['1', '2', '3', '4', '5'],
     	path:"../images/",
     	 click: function (score, evt) {
     		 alert(score);
     	},
     score: function() {
         return $(this).attr('data-score');
       }
     });
	   $('.xin2').raty({
     	hints: ['1', '2', '3', '4', '5'],
     	path:"../images/",
     	click: function (score, evt) {
    		 alert(score);
    	   },
    	score: function() {
    	    return $(this).attr('data-score');
    	  }
     });
	    $('.xin3').raty({
		  	hints: ['1', '2', '3', '4', '5'],
		  	path:"../images/",
		  	click: function (score, evt) {
    		 alert(score);
    	   },
    	score: function() {
    	    return $(this).attr('data-score');
    	  }
	    }); 
	    (function ($) {
	        $.getUrlParam = function (name) {
	            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	            var r = window.location.search.substr(1).match(reg);
	            if (r != null) return unescape(r[2]); return null;
	        }
	    })(jQuery);
	    var orderid = $.getUrlParam('ORDER_ID');
	    orderdetail(orderid);
 });	    
 
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
 
 function orderdetail(orderid){
		$.ajax({
			url:url+"/restOrder/orderSummary",
	  		type:"post",
	  		contentType:'application/json;charset=utf8',
	  		data:JSON
	  			.stringify({
	  				"order_id" : orderid
	  			}),
	  		dataType : "json",
	  		async : false,
			cache : false,
			success:function(r){
				  if (r.result == "SUCCESS") {
							var time =getMyDate(r.orderData.ORDERGENERATIONTIME);
							var time1 =getMyDate(r.orderData.ORDERBOOKINGTIME);
							$('.nub').text(r.orderData.ORDERNO);
							$('.ordertime').text(time);
							$('.omoney').text(r.orderData.ORDERTOTALAMOUNT/100);
							$('.ostatus').text(r.orderData.STATUS);
							if(r.orderData.ORDERBOOKINGTIME == undefined){
								$('.tjtime').text('未体检');
							}else{
								$('.tjtime').text(time1);
							}
							$('.oname').text(r.orderData.NAME);
							
							var str = "";
							var data = eval(r.itemData);
								if(data.length>0){
									for(var i=0;i<data.length;i++){
										str+="<tr>"+
												"<td>"+data[i].MNAME+"("+data[i].CNAME+")</td>"+
												"<td>"+(data[i].SELLINGPRICE/100)+"</td>"+
											 "</tr>";
									}
									$('.orderdetail .trtb').after(str);
									
								}
								$('.total').text(r.orderData.ORDERTOTALAMOUNT/100);
							}
						}
			});
 }
 
 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
 