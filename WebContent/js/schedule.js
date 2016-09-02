$(document).ready(function () { 
	 var userId =ReadCookie("userId");
	 console.log(userId);
	 schedule(userId);
	 datealllist(userId);
});

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

function schedule(userId){    //获取关联用户名
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
						str+="<li style='margin-right:.2rem;' data-id='"+data[i].USER_ID+"' class='swiper-slide'  id='li"+(i+1)+"' onclick='date(\"li"+(i+1)+"\")'><input type='hidden' value='"+data[i].USER_ID+"'>"+data[i].NAME+"</li>";
					}
				}
				 $('#my').attr("onclick","date1('"+userId+"')").attr("data-id",userId);
				 $('#my').after(str);
			}
	});
}

function datealllist(userId){//所有日程
	 $('.pe_status').html('');
	$.ajax({
		url:url+"/restOrder/allSchedule",
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
						var time =getMyDate(pds[i].MEDICALORDERBOOKINGTIME);
						str+="<div class='pe_status_d col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
								"<p class='name col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+pds[i].UNAME+"</p>"+
								"<ul class='pe_status_ul col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
									"<li class='pe_status_l2 col-lg-12 col-xs-12 col-md-12 col-sm-12'><i>"+pds[i].CNAME+"</i></li>"+
									"<li class='pe_status_l6 col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>地址:</span><i>"+pds[i].LOCATION+"</i></li>"+
									"<li class='pe_status_l3 col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>时间:</span><i>"+time+"</i></li>"+
									"<li class='pe_status_l4 col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>订单:</span><i><a href='orderdetail_tijian.html?ORDER_ID="+pds[i].MEDICALORDER_ID+"'>"+pds[i].MEDICALORDERNO+"</a></i></li>"+
									"<li class='pe_status_l5 col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>金额:</span><i>"+(pds[i].ORDERTOTALAMOUNT/100)+"</i></li>"+
								"</ul>"+
								/*"<div class='hint col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
									"<p class='col-lg-12 col-xs-12 col-md-12 col-sm-12'>提示:</p>"+
									"<ul class='col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
										"<li class='col-lg-12 col-xs-12 col-md-12 col-sm-12'><i>1</i>,<em>需要空腹</em></li>"+
										"<li class='col-lg-12 col-xs-12 col-md-12 col-sm-12'><i>2</i>,<em>停车位紧张，最好搭乘公共交通</em></li>"+
									"</ul>"+
								"</div>"+*/
							"</div>";
						}
					$('.pe_status').html(str);
				}
			}
		}
	});
}




function date1(id){//自己的日程
	
	var userId = $("#my").attr('data-id');
    $("#my").addClass('relevanceMY').siblings().removeClass('relevanceMY');
    $('.pe_status').html('');
    datelist(userId);
    console.log(userId);
}
function date(id){
	
	var userId =  $("#"+id).find("input").val();
	 $("#"+id).addClass('relevanceMY').siblings().removeClass('relevanceMY');
	 $('.pe_status').html('');
	 datelist(userId);
	 console.log(userId);
}



function datelist(userId){
	 $('.pe_status').html('');
	$.ajax({
		url:url+"/restOrder/mySchedule",
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
						var time =getMyDate(pds[i].MEDICALORDERBOOKINGTIME);
						str+="<div class='pe_status_d col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
								"<p class='name col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+pds[i].UNAME+"</p>"+
								"<ul class='pe_status_ul col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
									"<li class='pe_status_l2 col-lg-12 col-xs-12 col-md-12 col-sm-12'><i>"+pds[i].CNAME+"</i></li>"+
									"<li class='pe_status_l6 col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>地址:</span><i>"+pds[i].LOCATION+"</i></li>"+
									"<li class='pe_status_l3 col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>时间:</span><i>"+time+"</i></li>"+
									"<li class='pe_status_l4 col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>订单:</span><i><a href='orderdetail_tijian.html?ORDER_ID="+pds[i].MEDICALORDER_ID+"'>"+pds[i].MEDICALORDERNO+"</a></i></li>"+
									"<li class='pe_status_l5 col-lg-12 col-xs-12 col-md-12 col-sm-12'><span>金额:</span><i>"+(pds[i].ORDERTOTALAMOUNT/100)+"</i></li>"+
								"</ul>"+
								/*"<div class='hint col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
									"<p class='col-lg-12 col-xs-12 col-md-12 col-sm-12'>提示:</p>"+
									"<ul class='col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
										"<li class='col-lg-12 col-xs-12 col-md-12 col-sm-12'><i>1</i>,<em>需要空腹</em></li>"+
										"<li class='col-lg-12 col-xs-12 col-md-12 col-sm-12'><i>2</i>,<em>停车位紧张，最好搭乘公共交通</em></li>"+
									"</ul>"+
								"</div>"+*/
							"</div>";
						}
					$('.pe_status').html(str);
				}
			}else{
				  var namelist = $('.relevanceMY').text();
					$('.pe_status').html('还没有'+namelist+'生成订单哦！');
				
				}
		}
	});
}











