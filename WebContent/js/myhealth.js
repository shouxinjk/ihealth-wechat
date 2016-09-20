
var t;
var uid;
function Usern(userId){
		//用户名
		$.ajax({
			type : "post",
			url : url+"/rest/findUserById",
			contentType : "application/json;charset=utf8",
			data : JSON.stringify({
				"userId" : userId
			}),
			dataType : "json",
			success : function(r) {
				if (r.result == "success") {
					var data = eval(r.data);
					$('.Username').text(data.NAME);//获取姓名
				}
			}
		});
	}
function relevance(userId){    //获取关联用户名
	uid= userId;
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
						str+="<li style='margin-right:.2rem;' data-val='"+data[i].USER_ID+"' class='swiper-slide'  id='li"+(i+1)+"' onclick='guanlian(\"li"+(i+1)+"\",\""+data[i].ismodify+"\",\""+data[i].isprivacy+"\",\""+data[i].NAME+"\")'><input type='hidden' value='"+data[i].USER_ID+"'>"+data[i].NAME+"</li>";
					}
				}
				 $('#my').attr("onclick","guanlian1('"+userId+"')").attr("data-val",userId);
				 $('#my').after(str);
				 $('.relevance li').last().after("<li style='margin-right:.2rem;'  class='swiper-slide'  onclick='tj_carep1()'><a href=\"../subject/privacy.html#sure\">+</a></li>");
			}
	
	
	
	});
}
var p =0;
function spend(userId){
	$.ajax({
        type: "post",
        url: url+"/rest/findCheckPackage",
        contentType:"application/json;charset=utf8",
        data: JSON.stringify({"userId":userId}),
        dataType: "json",
        async : false,
		cache : false,
        success: function (r) {
        	if(r.result == "success"){
	        	var data = eval(r.data);
		   			intn(userId);
		   			$('.pending_img').remove();
		   			return;
        	}else if(r.result == "no"){
        		 $('.xmtable').html('');
	        		var pendd = "<div style='height:3rem;margin-left: 41.5%;margin-top: 1rem;' class=\"pending_img col-lg-12 col-xs-12 col-md-12 col-sm-12\">"+
	        						"<img src=\"../images/pending.gif\" alt=\"\"/></div>";
	        		$(".pendding").html(pendd); 
	        		$('.hint').html("未能生成任何体检项目信息，请补充或更新用户信息，以便我们生成准确的体检套餐");
	        		p++;
	        		alert('aaaaa');
	        		t =setTimeout(function() {
	        			 spend(userId);
	        			// console.log(p);
	        			 alert(p);
	                 }, 1500);
	        		if(p >18){
	        			$(".pendding").html(''); 
	        			clearTimeout(t);
	        			
	        		}
	        		
        	}
       }
    });
}

function intn(userId){
	$('.xmtable').html('');
	var judge = true;
	var group;
	var dataList;
	var checkid;
	var tname ='';
	var CHECKUPITEMid;
	$.ajax({
        type: "post",
        url: url+"/rest/findIsModifyByUserId",
        contentType:"application/json;charset=utf8",
        data: JSON.stringify({"userID":userId}),
        dataType: "json",
        async : false,
		cache : false,
        success: function (r) {
        	if(r.data.ISMODIFY == 0){
        		//$('.hint').hide();
        		var userID  = ReadCookie("userId");
        		/*if(userId == userID){
        			$('.hint').html("<article class='template'>以下是体检方案模板信息。您可以进入<a href='../subject/Information.html#message' data-id="+userId+">(基本信息)</a>进行修改!</article>");
        		}else{
        			$('.hint').html("<article class='template'>以下是体检方案模板信息。您可以进入<a href=\"../subject/privacy.html#fumu?userId="+userId+"\">(基本信息)</a>进行修改!</article>");
        		}*/
        		
        	}/*else{
        		$('.hint').html("以下是为你量身定制的体检方案。提供更多信息以推荐更精准的项目清单。");
        	}*/
        }
       });
	
	$.ajax({
        type: "post",
        url: url+"/rest/findCheckItems",
        contentType:"application/json;charset=utf8",
        data: JSON.stringify({"userId":userId}),
        dataType: "json",
        async : false,
		cache : false,
        success: function (r) {
        	if(r.result == "success"){
        		group = eval(r.group);
        		dataList = eval(r.data);
        	}else if(r.result == "no"){
        		judge = false;
        	}
        }
       });
	if(judge){
		$.ajax({
	        type: "post",
	        url: url+"/rest/getCheckItemsByGroup",
	        contentType:"application/json;charset=utf8",
	        data: JSON.stringify({"userId":userId}),
	        dataType: "json",
	        async : false,
			cache : false,
	        success: function (r) {
	        	var data = eval(r.data);
	        	for(var j=0;j<group.length;j++){
	        		var str ="<div class='touch item col-lg-12 col-xs-12 col-md-12 col-sm-12' id='touch"+j+"' userAddressId='1'><div class='jc_project col-lg-12 col-xs-12 col-md-12 col-sm-12'>";
	        		var k =0;
	        		var p =0;
	        		for(var i=0;i<data.length;i++){
	        			if(group[j].SUBGROUP == data[i].SUBGROUP){
	        				var name;
	        				if(data[i].STATUS == "已选中"){
	        					CHECKUPITEMid = data[i].CHECKUPITEM_ID;
	        					name = data[i].NAME;
	        					str +="<span class='active_ subgroup1 ' >"+data[i].NAME+"("+data[i].FREQUENCY+")<input type='hidden' value='"+data[i].CHECKUPITEM_ID+"'><i class='iss'>/</i>&nbsp;</span>";	
	        					k++;
	        				} else if(data[i].STATUS == "已删除"){
	        					if(k==0){
	        						CHECKUPITEMid = data[i].CHECKUPITEM_ID;
	        					}
	        					str +="<span class='subgroup1'>"+data[i].NAME+"("+data[i].FREQUENCY+")<input type='hidden' value='"+data[i].CHECKUPITEM_ID+"'><i class='iss'>/</i>&nbsp;</span>";
	        				}
	        				else if(data[i].STATUS == "ready"){
	        					if(p == 0){
	        					
	        						CHECKUPITEMid = data[i].CHECKUPITEM_ID;
		        					str +="<span class='active_ subgroup1 trigger' >"+data[i].NAME+"("+data[i].FREQUENCY+")<input type='hidden' value='"+data[i].CHECKUPITEM_ID+"'><i class='iss'>/</i>&nbsp;</span>";	
		        					p++;
	        					}else{
	        						if(k==0){
		        						CHECKUPITEMid = data[i].CHECKUPITEM_ID;
		        					}
		        					str +="<span class='subgroup1'>"+data[i].NAME+"("+data[i].FREQUENCY+")<input type='hidden' value='"+data[i].CHECKUPITEM_ID+"'><i class='iss'>/</i>&nbsp;</span>";
	        					}
        					}
	        				
	        			}
	        		
	        			
	        			$(".subgroup1").last().find(".iss").remove();
	        			if(i==data.length-1){
	        				str = str.substring(0,str.length-1);
	        			}
	        		}
	        		
	        		str+="</div>";
	        		 $('.xmtable').append(str);
	        		// cli();
	        		 $('.trigger').trigger("click");
	        		 for(var k=0;k<dataList.length;k++){
	        			 if(dataList[k].CHECKUPITEM_ID == CHECKUPITEMid){
	        				 var d = dataList[k];
	                    	var sub1 = d.SUBGROUP;
	    		        	var sub = MD5(sub1);
	                    	//通过状态判断项目是否显示
	    		        	 if(!(d.STATUS == "已删除")){
	         		        	 var str ="<div data-flag='1' id='laiyuan"+sub+"' class='zhiN source_adr col-lg-12 col-xs-12 col-md-12 col-sm-12' style='color:#000'>" +
	         		        	 					 "<div data-flag='1' class='zhisource col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
														 "<div  class='zhiconceal_ '><lable class='headline'>筛查疾病</lable>"+d.disease_name+"(点击查看风险描述)</div>" +
													 "</div>" +
												 "</div>" +
				         		        	'<div class="'+sub+' subdiv col-lg-12 col-xs-12 col-md-12 col-sm-12">'+
					         		        	'<div class="deletli" style="float: right;" id="'+sub+'">'+
						         		        	'<div id="'+d.CHECKUPITEM_ID+'" class="remove  recover" style="float:right;-webkit-border-bottom-left-radius: .5rem;-webkit-border-top-left-radius: .5rem;color: #000;"  onclick="del(\''+d.CHECKUPITEM_ID+'\',\''+d.STATUS+'\',\''+sub1+'\',\''+userId+'\')"><img style="width: 1rem;height:1rem" src=\"../images/right.png\" title=\"恢复\" alt=\"恢复\"/></div>'+	
					         		        	'</div>'+
				         		        	'</div>';
	         		        }else {
	         		        	var str ="<div data-flag='1' id='laiyuan"+sub+"' class='zhiN del source_adr col-lg-12 col-xs-12 col-md-12 col-sm-12' >" +
				         		        	 "<div data-flag='1' class='zhisource col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
												 "<div  class='zhiconceal_ '><lable class='headline'>筛查疾病</lable>"+d.disease_name+"(点击查看风险描述)</div>" +
											 "</div>" +
										 "</div>" +
					         		        	'<div class="'+sub+' subdiv  col-lg-12 col-xs-12 col-md-12 col-sm-12">'+
					         		        		'<div  class="deletli" style="float: right;" id="'+sub+'">'+
						         		        		'<div id="'+d.CHECKUPITEM_ID+'" class="remove delet" style="float:right;-webkit-border-bottom-right-radius: .5rem;-webkit-border-top-right-radius: .5rem;color: #C0BEBE;"  onclick="del(\''+d.CHECKUPITEM_ID+'\',\''+d.STATUS+'\',\''+sub1+'\',\''+userId+'\')"><img style="width: 1rem;height:1rem" src=\"../images/gray.png\" title=\"删除\" alt=\"删除\"/></div>'+
					         		        		'</div>'+
					         		        	'</div>';


	         		        	
	         		        }
	    		        	 $(".subgroup1").last().find(".iss").remove();
	        		        $("#touch"+j).append(str);
	        		       
	        		      //添加体检项目的特性
		       				 if (d.FEATURES != null && d.FEATURES !=''){
		           					var birthArr= new Array();
		           					//按逗号拆分
		           					birthArr = d.FEATURES.split(",");
		           					if(birthArr.length > 0){
		           						var len = '';
		           						for(var p=0;p<birthArr.length;p++){
		           						 if(!(d.STATUS == "已删除")){
		           							len += '<div class="tex trait">'+birthArr[p]+'</div>';
		           						  }
		           						 else{
		           							len += '<div id="idname" class="tex trait">'+birthArr[p]+'</div>';
		           						 }
		           						}
		           					}
		           		    	}
		       				 
		       				$('.'+sub).append(len);
		       			/* var source = '';
		       			 source += '<div class="trait_ show_ col-lg-12 col-xs-12 col-md-12 col-sm-12" style="display:none">'+
		       				'<div class="trait_div "><lable class="trait_lai headline">指南来源</lable>'
		       						source += ''+d.ORIGINATE+'';
		       				 source +='</div></div>';
   						$("#laiyuan"+sub).append(source);*/
   						
	                    }
	        		 }
	        	}
	        	
	        	
	        	
	        	//通过状态判断购买显示隐藏
        		for(var q=0;q<data.length;q++){
        				if(data[q].STATUS == "已选中"){
        					var str=data[q].CHECKUPITEM_ID;
        						tname +=str +',';
        					}
        				 checkid = tname.substring(0,tname.length-1);
        				
        		}
        		check=checkid.replace(/,/g, "");
        		
        		if(check.length ==0){
        			$('.xmtable').append('<div style="display:none;" class="buy_div col-lg-12 col-xs-12 col-md-12 col-sm-12"><div data-userid="'+uid+'" class="buy col-lg-3 col-xs-3 col-md-3 col-sm-3">购买</div></div>');
        		}else{
        			//$('.buy_div').show();
        			//$('.xmtable').append('<div class="buy_div col-lg-12 col-xs-12 col-md-12 col-sm-12"></div>');
           		 	//$('.buy_div').html('<div data-userid="'+userId+'" class="buy col-lg-3 col-xs-3 col-md-3 col-sm-3">购买</div>');
	        	$('.xmtable').append('<div class="buy_div col-lg-12 col-xs-12 col-md-12 col-sm-12"><div data-userid="'+uid+'" class="buy col-lg-3 col-xs-3 col-md-3 col-sm-3">购买</div></div>');
	        	}
	        }
	    });
	}
	$(".subgroup1").last().find(".iss").remove();
}
/*function cli(){ 
	$('.trigger').trigger("click");
};*/
//购买体检套餐
$('.xmtable').delegate(".buy",'click',function(){ 
	
	//window.location ="../subject/buypeitem.html";
	var tname ='';
	var userId1=$('.buy').attr('data-userid');
	var check_id;
	var check;
	$.ajax({
        type: "post",
        url: url+"/rest/getCheckItemsByGroup",
        contentType:"application/json;charset=utf8",
        data: JSON.stringify({"userId":userId1}),
        dataType: "json",
        async : false,
		cache : false,
        success: function (r) {
        	var data = eval(r.data);
        		for(var i=0;i<data.length;i++){
        				if(data[i].STATUS == "已选中"){
        					var str=data[i].CHECKUPITEM_ID;
        					tname +=str +',';
        		}
        				 check_id = tname.substring(0,tname.length-1);
        				
        	}
        		check=check_id.replace(/,/g, "");
        		
        }
	});
	if(check.length ==0){
		alert('请选择购买的项目！');
		return;
	}
	$.ajax({
        type: "post",
        url: url+"/restOrder/addOrder",
        contentType:"application/json;charset=utf8",
        data: JSON.stringify({"userId":userId1}),
        dataType: "json",
        async : false,
		cache : false,
        success: function (r) {
        	var orderid = r.orderid;
        	//alert(r.msg)
        	window.location =urll +"/subject/buypeitem.html?orderid="+orderid+"&userid="+userId1;
        }
	});
});



$('.xmtable').delegate(".subgroup1",'click',function(){
	$(this).parent().siblings('.zhiN').remove();
	var DESCRIPTION;
	var status;
	var itemID ;
	var userId = $(".relevanceMY").attr("data-val");
	var ORIGINATE;
	var FEATURES;
	var sub1;
	var sub;
	var disease_name;
	var concernedfactors;
	var riskDefine;
	$(this).attr('id','idactive');
	$(this).addClass("active_").siblings().removeClass("active_");
	var CHECKUPITEMid = $(this).find("input").val();
	$.ajax({
        type: "post",
        url: url+"/rest/getCheckItem",
        contentType:"application/json;charset=utf8",
        data: JSON.stringify({"id":CHECKUPITEMid}),
        dataType: "json",
        async : false,
		cache : false,
        success: function (r1) {
        	var d = eval(r1.data);
        	DESCRIPTION = d.DESCRIPTION;
        	disease_name =d.disease_name;
        	riskDefine = d.riskDefine;
        	concernedfactors =d.concernedfactors;
        	status = '已选中';
        	itemID = d.CHECKUPITEM_ID;
        	ORIGINATE = d.ORIGINATE;
        	FEATURES = d.FEATURES;
        	sub1 =d.SUBGROUP;
        	sub = MD5(sub1);
        }
	});
		//添加体检项目的特性
	if (FEATURES != null && FEATURES !=''){
		var birthArr= new Array();
		//按逗号拆分
		birthArr = FEATURES.split(",");
		if(birthArr.length > 0){
			var len = '';
			for(var p=0;p<birthArr.length;p++){
				len += '<div class="trait" style="color:#000">'+birthArr[p]+'</div>';
			}
		}
	}
	if(status == '已选中'){
		 var str ="<div  data-flag='1'   id='laiyuan"+sub+"' class='zhiN source_adr col-lg-12 col-xs-12 col-md-12 col-sm-12' style='color:#000'>" +
					 "<div data-flag='1' class='zhisource col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
						 "<div  class='zhiconceal_ '><lable class='headline'>筛查疾病</lable>"+disease_name+"(点击查看风险描述)</div>" +
			 		"</div>" +
		 		"</div>";
	 var por= '<div class="deletli" style="float: right;" id="'+sub+'">'+
					 	'<div id="'+itemID+'" class="remove  recover" style="float:right;-webkit-border-bottom-left-radius: .5rem;-webkit-border-top-left-radius: .5rem;color: #000;"   onclick="del('+itemID+',\''+status+'\',\''+sub1+'\',\''+userId+'\')"><img style="width: 1rem;height:1rem" src=\"../images/right.png\" title=\"恢复\" alt=\"恢复\"/></div>'+	
					'</div>';
		}
	var par = $(this).parent().parent().attr('id');
	$(this).parent().siblings('.zhiN').remove();
	$('.'+sub).find("div").remove();
	$('#'+par).children('.jc_project').after(str);
	$('.'+sub).append(por);
	$('.'+sub).append(len);
	$.ajax({
        type: "post",
        url: url+"/rest/editCheckItem",
        contentType:"application/json;charset=utf8",
        data: JSON.stringify({"checkupItemId":itemID,"stauts":'已删除',"subGroup":sub1}),
        dataType: "json",
        success: function (r) {
        	if (r.result == "success") {
        		$(this).parent().siblings('.zhiN').remove();
        		$('.buy_div').show();
        		}
        	}
   });
});

//体检项目
$('.container').delegate(".zhiN","click",function(){
	var userId=$('.buy').attr('data-userid');
	var flag = $(this).attr("data-flag");
	var p = $(this).find("div").first();
	var childdiv =$(this).children();
	if(flag==1){
		//如果.zhiN的子节点为1 才发请求， 反之只显示折叠！
		if(childdiv.length == 1){
			var CHECKUPITEMID =$(this).prev().find("input").val();
			$.ajax({
		        type: "post",
		        url: url+"/rest/getCheckItem",
		        contentType:"application/json;charset=utf8",
		        data: JSON.stringify({"id":CHECKUPITEMID}),
		        dataType: "json",
		        async : false,
				cache : false,
		        success: function (r) {
		        	var r = eval(r.data);
		        	var str="<div class='zhisource show_ col-lg-12 col-xs-12 col-md-12 col-sm-12' style='display:none'>" +
								 "<div  class='zhiconceal_  '><lable class='headline'>关注因素</lable>"+r.concernedfactors+"</div>" +
							 "</div>" +
							 "<div class='zhisource show_ col-lg-12 col-xs-12 col-md-12 col-sm-12' style='display:none'>" +
								 "<div class='zhiconceal_  '><lable class='headline'>风险描述</lable>"+r.riskDefine+"</div>" +
							 "</div>" +
							"<div class='trait_ show_ col-lg-12 col-xs-12 col-md-12 col-sm-12' style='display:none'>"+
								"<div class='trait_div '><lable class='trait_lai headline'>指南来源</lable>"+r.ORIGINATE+"</div>"+
							"</div>";
		        	p.after(str);
		        }
			});
			$(this).parent().siblings().children().find('.show_').css({display:'none'});
			$(this).find('.zhiconceal').css({maxHeight:"100%",display:"block"});
			$(this).find('.show_').css({display:"block"});
			$(this).attr("data-flag","0");
		}else{
			$(this).find('.zhiconceal').css({maxHeight:"100%",display:"block"});
			$(this).find('.show_').css({display:"block"});
			$(this).attr("data-flag","0");
		}
		$(this).parent().siblings().children().find('.show_').css({display:'none'});
	}else{
		$(this).find('.zhiconceal').css({maxHeight:"40px",overflow:"hidden",wordWrap:"break-word",textOverflow:"ellipsis",WebkitLineClamp:'2',textOverflow: "ellipsis",WebkitBoxOrient: "vertical"});
		$(this).find('.zhiconceal').css({display:"-webkit-box"});
		$(this).find('.show_').css({display:"none"});
		$(this).attr("data-flag","1");
		//p.nextAll().remove();
		
	}
})
    


//删除体检项目
    	function del(ID,status,group,userId){
    		 $.ajax({
			        type: "post",
			        url: url+"/rest/editCheckItem",
			        contentType:"application/json;charset=utf8",
			        data: JSON.stringify({"checkupItemId":ID,"stauts":status,"subGroup":group}),
			        dataType: "json",
			        success: function (r) {
			        	if (r.result == "success") {
			        		}
			        	$('.xmtable').html('');
			        	intn(userId);
			        	}
			   });
    	}


//关联关心的人
function guanlian(id,ismodify,isprivacy,NAME){
	p=0;
	clearTimeout(t); 
      		var user_id = $("#"+id).find("input").val();
      		uid= user_id;
      		if(isprivacy == '1' || isprivacy== 'undefined'){
      			$('.hint').html(" ");
      			$('.hint').html("以下是为"+NAME+"量身定制的体检方案。提供更多信息以推荐更精准的项目清单。");
      			$('.pendding').show();
      			spend(user_id);
      		}else{
      			$('.hint').html("对方不允许你查看其体检方案,赶快联系他吧!");
      			$('.pendding').hide();
      			$('.xmtable').html('');
      		}
      		
        	$('.relevance li').removeClass('relevanceMY');
            $("#"+id).addClass('relevanceMY');
           
    }
function guanlian1(id){
			p=0;
			clearTimeout(t); 
			$('.hint').html("以下是为你量身定制的体检方案。提供更多信息以推荐更精准的项目清单。");
			$('.pendding').show();
			spend(id);
			$('.relevance li').removeClass('relevanceMY');
			$("#my").addClass('relevanceMY');
	            
}
    
//体检项目 增加添加关心的人
function tj_carep(){ 
	//window.location = wechatUrl +"/subject/addcare.html";
	window.location="../subject/privacy.html";
}




//关心的人 滑动
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

	
			



