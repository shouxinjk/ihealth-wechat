$(document).ready(function () { 
	 var userId =ReadCookie("userId");
	 console.log(userId);
	 myAllOrders(userId);
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


function myAllOrders(userId){
	$.ajax({
		url:url+"/restOrder/myAllOrders",
  		type:"post",
  		contentType:'application/json;charset=utf8',
  		data:JSON
  			.stringify({
  				"user_id" : userId
  			}),
  		dataType : "json",
  		async : false,
		cache : false,
		success:function(r){
				var pds = eval(r.pds);
				var str = "";
				if(pds.length>0){
					for(var i=0;i<pds.length;i++){
						var time =getMyDate(pds[i].ORDERBOOKINGTIME);
						str+="<div class='more_oder col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
						"<div class='oder_left col-lg-4 col-xs-4 col-md-4 col-sm-4'>"+
			    			"<img class='col-lg-12 col-xs-12 col-md-12 col-sm-12' src='"+pds[i].AVATAR+"'/>"+
				    		"<span class='col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+pds[i].NAME+"</span>"+
				    	"</div>	"+
						"<div class='oder_right col-lg-8 col-xs-8 col-md-8 col-sm-8'>"+
							"<ul class='col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
								"<li class='col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
									"<span class='po'>"+pds[i].NAME+"</span>(<i> <a href='orderdetail.html?ORDER_ID="+pds[i].ORDER_ID+"'>订单编号:"+pds[i].ORDERNO+"</a></i>)"+
								"</li>";
								/*"<li class='address col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+pds[i].CNAME+"</li>";*/
									if(time== undefined){
										str +="<li class='time col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>体检时间:</span><i>未预约</i></li>";
									}else{
										str +="<li class='time col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>体检时间:</span><i>"+time+"</i></li>";
									}
									
									str +="<li class='money col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>金额:</span><i>"+(pds[i].ORDERTOTALAMOUNT/100)+"</i></li>";
									if(pds[i].STATUS == '已付款'){
										str +="<li class='status col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>订单状态:</span><i>"+pds[i].STATUS+"<a href='booking.html?ORDER_ID="+pds[i].ORDER_ID+"'>预约体检</a></i></li>";
									}
									else if(pds[i].STATUS == '已预约'){
										str +="<li class='status col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>订单状态:</span><i>"+pds[i].STATUS+"<a href='booking.html?ORDER_ID="+pds[i].ORDER_ID+"'>更改日期</a></i></li>";
									}else{
										str +="<li class='status col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>订单状态:</span><i>"+pds[i].STATUS+"</i></li>";
									}
								str +="</ul>"+
						"</div>"+
					"</div>";
			}
					$('.my_main').html(str);
				}
				
				}
		});
}


// 滑动
function glide(){ 
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        slidesPerView: 3,
        spaceBetween: 50,
        breakpoints: {
            1024: {
                slidesPerView: 10,
                spaceBetween: 40
            },
            768: {
                slidesPerView: 5,
                spaceBetween: 30
            },
            640: {
                slidesPerView: 4,
                spaceBetween: 20
            },
            320: {
                slidesPerView: 3.8,
                spaceBetween: 0
            }
        }
    });
}
function relevance(userId){    //获取关联用户名
	$.ajax({
		url:url+"/rest/findUsersById",
  		type:"post",
  		contentType:'application/json;charset=utf8',
  		data:JSON
  			.stringify({
  				"userId" : userId
  			}),
  		dataType : "json",
  		async : false,
		cache : false,
		success:function(r){
				var data = eval(r.data);
				var str = "";
				if(data == undefined){
					
				}else{
					for(var i=0;i<data.length;i++){
						str+="<li style='margin-right:.2rem;' data-id='"+data[i].USER_ID+"' class='swiper-slide'  id='li"+(i+1)+"' onclick='tijian(\"li"+(i+1)+"\")'><input type='hidden' value='"+data[i].USER_ID+"'>"+data[i].NAME+"</li>";
					}
				}
				 $('#my').attr("onclick","tijian1('"+userId+"')").attr("data-id",userId);
				 $('#my').after(str);
			}
	});
}
function tijian1(id){//自己的体检订单
	
	var userId = $("#my").attr('data-id');
    $("#my").addClass('relevanceMY').siblings().removeClass('relevanceMY');
    $('.my_main').html('');
    orderlist(userId);
    console.log(userId);
}
function tijian(id){
	
	var userId =  $("#"+id).find("input").val();
	 $("#"+id).addClass('relevanceMY').siblings().removeClass('relevanceMY');
	 $('.my_main').html('');
	 orderlist(userId);
	 console.log(userId);
}


function orderlist(userId){
	 $('.my_main').html('');
	$.ajax({
		url:url+"/restOrder/myOrder",
  		type:"post",
  		contentType:'application/json;charset=utf8',
  		data:JSON
  			.stringify({
  				"user_id" : userId
  			}),
  		dataType : "json",
  		async : false,
		cache : false,
		success:function(r){
			  if (r.result == "SUCCESS") {
				var pds = eval(r.pds);
				var str = "";
				if(pds.length>0){
					for(var i=0;i<pds.length;i++){
						var time =getMyDate(pds[i].ORDERBOOKINGTIME);
						str+="<div class='more_oder col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
									"<div class='oder_left col-lg-4 col-xs-4 col-md-4 col-sm-4'>"+
						    			"<img class='col-lg-12 col-xs-12 col-md-12 col-sm-12' src='"+pds[i].AVATAR+"'/>"+
							    		"<span class='col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+pds[i].NAME+"</span>"+
							    	"</div>	"+
									"<div class='oder_right col-lg-8 col-xs-8 col-md-8 col-sm-8'>"+
										"<ul class='col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
											"<li class='col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
												"<span class='po'>"+pds[i].NAME+"</span>(<i><a href='orderdetail.html?ORDER_ID="+pds[i].ORDER_ID+"'>订单编号:"+pds[i].ORDERNO+"</a></i>)"+
											"</li>";
										/*	"<li class='address col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+pds[i].CNAME+"</li>";*/
												if(time == undefined){
													str +="<li class='time col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>体检时间:</span><i>未预约</i></li>";
												}else{
													str +="<li class='time col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>体检时间:</span><i>"+time+"</i></li>";
												}
												
												str +="<li class='money col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>金额:</span><i>"+(pds[i].ORDERTOTALAMOUNT/100)+"</i></li>";
												if(pds[i].STATUS == '已付款'){
													str +="<li class='status col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>订单状态:</span><i>"+pds[i].STATUS+"<a href='booking.html?ORDER_ID="+pds[i].ORDER_ID+"'>预约体检</a></i></li>";
												}
												else if(pds[i].STATUS == '已预约'){
													str +="<li class='status col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>订单状态:</span><i>"+pds[i].STATUS+"<a href='booking.html?ORDER_ID="+pds[i].ORDER_ID+"'>更改日期</a></i></li>";
												}else{
													str +="<li class='status col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>订单状态:</span><i>"+pds[i].STATUS+"</i></li>";
												}
											str +="</ul>"+
									"</div>"+
								"</div>";
						}
					$('.my_main').html(str);
				}
			  }else{
				  var namelist = $('.relevanceMY').text();
					$('.my_main').html('还没有为'+namelist+'生成订单哦！');
					}
				
				}
		});
}












