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
						str+="<li style='margin-right:.2rem;' data-val='"+data[i].USER_ID+"' class='swiper-slide'  id='li"+(i+1)+"' onclick='guanlian(\"li"+(i+1)+"\")'><input type='hidden' value='"+data[i].USER_ID+"'>"+data[i].NAME+"</li>";
					}
				}
				 $('#my').attr("onclick","guanlian1('"+userId+"')").attr("data-val",userId);
				 $('#my').after(str);
				 $('.relevance li').last().after("<li style='margin-right:.2rem;'  class='swiper-slide'  onclick='tj_carep()'>+</li>");
			}
	
	
	
	});
}
var t;
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
		        	clearTimeout(t); 
		   			intn(userId);
		   			$('.pending_img').remove();
		   			return;
	        		 //clearTimeout(t); 
        	}else if(r.result == "no"){
        		 $('.xmtable').html('');
	        		var pendd = "<div style='height:3rem;margin-left: 41.5%;margin-top: 1rem;' class=\"pending_img col-lg-12 col-xs-12 col-md-12 col-sm-12\">"+
	        						"<img src=\"../images/pending.gif\" alt=\"\"/></div>";
	        		$(".pendding").html(pendd); 
	        		t =setTimeout(function() {
	        			 spend(userId);
	                 }, 1500);
        	}
       }
    });
}



function intn(userId){
	$('.xmtable').html('');
	var judge = true;
	var group;
	var dataList;
	var CHECKUPITEMid;
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
	        		for(var i=0;i<data.length;i++){
	        			if(group[j].SUBGROUP == data[i].SUBGROUP){
	        				var name;
	        				if(data[i].STATUS == "已选中"){
	        					CHECKUPITEMid = data[i].CHECKUPITEM_ID;
	        					name = data[i].NAME;
	        					str +="<span class='active_ subgroup1 ' >"+data[i].NAME+"("+data[i].FREQUENCY+")<input type='hidden' value='"+data[i].CHECKUPITEM_ID+"'><i class='iss'>/</i>&nbsp;</span>";
	        						
	        					k++;
	        				}else{
	        					if(k==0){
	        						CHECKUPITEMid = data[i].CHECKUPITEM_ID;
	        					}
	        					str +="<span class='subgroup1'>"+data[i].NAME+"("+data[i].FREQUENCY+")<input type='hidden' value='"+data[i].CHECKUPITEM_ID+"'><i class='iss'>/</i>&nbsp;</span>";
	        					
	        				}
	        			}
	        			$(".subgroup1").last().find(".iss").remove();
	        			if(i==data.length-1){
	        				str = str.substring(0,str.length-1);
	        			}
	        		}
	        		str+="</div>";
	        		 $('.xmtable').append(str);
//	        		$.ajax({
//	                    type: "post",
//	                    url: url+"/rest/getCheckItem",
//	                    contentType:"application/json;charset=utf8",
//	                    data: JSON.stringify({"id":CHECKUPITEMid}),
//	                    dataType: "json",
//	                    async : false,
//	            		cache : false,
//	                    success: function (r1) {
	        		 for(var k=0;k<dataList.length;k++){
	        			 if(dataList[k].CHECKUPITEM_ID == CHECKUPITEMid){
	        				 var d = dataList[k];
	                    	var sub1 = d.SUBGROUP;
	    		        	var sub = MD5(sub1);
	                    	//通过状态判断项目是否显示
	    		        	 if(!(d.STATUS == "已删除")){
	         		        	 var str ="<div data-flag='1' id='laiyuan"+sub+"' class='zhiN source_adr col-lg-12 col-xs-12 col-md-12 col-sm-12' style='color:#000'>" +
						         		        	/* "<div class='zhilaiyuan col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
														 "<div class='col-lg-2 col-xs-2 col-md-2 col-sm-2'>项目详情:</div>" +
														 "<div   data-flag='1' class='zhiconceal col-lg-10 col-xs-10 col-md-10 col-sm-10'>"+d.DESCRIPTION+"</div>" +
													 "</div>" +*/
	         		        	 					 "<div data-flag='1' class='zhisource col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
														
														 "<div  class='zhiconceal_ '><lable class='headline'>筛查疾病</lable>"+d.disease_name+"</div>" +
													 "</div>" +
													 //"<div  class='zhisource show_ col-lg-12 col-xs-12 col-md-12 col-sm-12' style='display:none'> " +
														
														// "<div class='zhiconceal_ '><lable class='headline'>关注因素</lable>"+d.concernedfactors+"</div>" +
													 //"</div>" +
													 //"<div  class='zhisource show_ col-lg-12 col-xs-12 col-md-12 col-sm-12' style='display:none'>" +
														 
														// "<div class=' zhiconceal_ '><lable class='headline'>风险描述</lable>"+d.riskDefine+"</div>" +
													 //"</div>" +
												 
												 "</div>" +
				         		        	'<div class="'+sub+' subdiv col-lg-12 col-xs-12 col-md-12 col-sm-12">'+
					         		        	'<div class="deletli" style="float: right;" id="'+sub+'">'+
	//					         		        		'<a href=\"javascript:del('+d.CHECKUPITEM_ID+',\''+d.STATUS+'\',\''+sub1+'\',\''+userId+'\')\" id="'+d.CHECKUPITEM_ID+'" class="remove weui_btn weui_btn_mini rms" style="float:right;"><img style="width: 1rem;height:1rem" src=\"../images/delete.png\" title=\"删除\" alt=\"删除\"/></a>'+
						         		        	//'<div id="'+d.CHECKUPITEM_ID+'" class="remove delet" style="float:right;-webkit-border-bottom-right-radius: .5rem;-webkit-border-top-right-radius: .5rem;background:rgb(126, 200, 136)"></div>'+
						         		        	'<div id="'+d.CHECKUPITEM_ID+'" class="remove  recover" style="float:right;-webkit-border-bottom-left-radius: .5rem;-webkit-border-top-left-radius: .5rem;color: #000;"  onclick="del('+d.CHECKUPITEM_ID+',\''+d.STATUS+'\',\''+sub1+'\',\''+userId+'\')"><img style="width: 1rem;height:1rem" src=\"../images/right.png\" title=\"恢复\" alt=\"恢复\"/></div>'+	
					         		        	'</div>'+
				         		        	'</div>';
	         		        }else {
	         		        	var str ="<div data-flag='1' id='laiyuan"+sub+"' class='zhiN del source_adr col-lg-12 col-xs-12 col-md-12 col-sm-12' >" +
				         		        	/*"<div class='zhilaiyuan col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
												 "<div class='col-lg-2 col-xs-2 col-md-2 col-sm-2'>项目详情:</div>" +
												 "<div   data-flag='1' class='zhiconceal col-lg-10 col-xs-10 col-md-10 col-sm-10'>"+d.DESCRIPTION+"</div>" +
											 "</div>" +*/
				         		        	 "<div data-flag='1' class='zhisource col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
												 /*"<div class=''>筛查疾病:</div>" +*/
												 "<div  class='zhiconceal_ '><lable class='headline'>筛查疾病</lable>"+d.disease_name+"</div>" +
											 "</div>" +
											 //"<div class='zhisource show_ col-lg-12 col-xs-12 col-md-12 col-sm-12' style='display:none'>" +
												/* "<div class=''>关注因素:</div>" +*/
												// "<div  class='zhiconceal_ '><lable class='headline'>关注因素</lable>"+d.concernedfactors+"</div>" +
											 //"</div>" +
											 //"<div   class='zhisource show_ col-lg-12 col-xs-12 col-md-12 col-sm-12' style='display:none'>" +
											/*	 "<div class='col-lg-2 '>风险描述:</div>" +*/
												// "<div  class='zhiconceal_  '><lable class='headline'>风险描述</lable>"+d.riskDefine+"</div>" +
											// "</div>" +
										 "</div>" +
					         		        //deletli 原来在sub外面  sub 后面有个class（ subgroup1）
					         		        	'<div class="'+sub+' subdiv  col-lg-12 col-xs-12 col-md-12 col-sm-12">'+
					         		        		'<div  class="deletli" style="float: right;" id="'+sub+'">'+
					         		        			//'<a href=\"javascript:del('+d.CHECKUPITEM_ID+',\''+d.STATUS+'\',\''+sub1+'\',\''+userId+'\')\" id="'+d.CHECKUPITEM_ID+'" class="remove weui_btn weui_btn_mini hms" style="float:right"><img style="width: 1rem;height:1rem" src=\"../images/delete.png\" title=\"恢复\" alt=\"恢复\"/></a>'+
						         		        		'<div id="'+d.CHECKUPITEM_ID+'" class="remove delet" style="float:right;-webkit-border-bottom-right-radius: .5rem;-webkit-border-top-right-radius: .5rem;color: #C0BEBE;"  onclick="del('+d.CHECKUPITEM_ID+',\''+d.STATUS+'\',\''+sub1+'\',\''+userId+'\')"><img style="width: 1rem;height:1rem" src=\"../images/gray.png\" title=\"删除\" alt=\"删除\"/></div>'+
							         		        	//'<div id="'+d.CHECKUPITEM_ID+'" class="remove  recover" style="float:right;-webkit-border-bottom-left-radius: .5rem;-webkit-border-top-left-radius: .5rem;background:red"></div>'+	
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
	        }
	        });
	}
	$(".subgroup1").last().find(".iss").remove();
}



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

$('.xmtable').delegate(".subgroup1",'click',function(){
	$(this).parent().siblings('.zhiN').remove();
	//console.log($(this).parent().siblings('.zhiN').attr('class'));
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
	
	
    /*if(ORIGINATE != null && ORIGINATE !='')  {
    	var birthArr1= new Array();
			//按逗号拆分
			birthArr1 = ORIGINATE.split(",");
			if(birthArr1.length > 0){
			 var source = '';
			 source += '<div class="trait_ show_ col-lg-12 col-xs-12 col-md-12 col-sm-12" style="display:none">'+
			 		'<div class="trait_lai ">指南来源:</div>'
			 		'<div class="trait_div "><lable class="trait_lai headline">指南来源</lable>'
						for(var c=0 ; c<birthArr1.length;c++){
							source += '<div class="zhi_source" style="color:#000">'+birthArr1[c]+'</div>';
						}
					 source +='</div></div>';
			}
    }*/
	 /*var source = '';
	 source += '<div class="trait_ show_ col-lg-12 col-xs-12 col-md-12 col-sm-12" style="display:none">'+
		'<div class="trait_div "><lable class="trait_lai headline">指南来源</lable>'
				source += ''+ORIGINATE+'';
		 source +='</div></div>';*/



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
//					 "<div class='zhilaiyuan col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
//						 "<div class='col-lg-2 col-xs-2 col-md-2 col-sm-2'>项目详情:</div>" +
//						 "<div data-flag='1' class='zhiconceal col-lg-10 col-xs-10 col-md-10 col-sm-10'>"+DESCRIPTION+"</div>" +
//					 "</div>" +
					 "<div data-flag='1' class='zhisource col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
				/*		 "<div class=''>筛查疾病:</div>" +*/
						 "<div  class='zhiconceal_ '><lable class='headline'>筛查疾病</lable>"+disease_name+"</div>" +
			 		"</div>" +
			 		//"<div class='zhisource show_ col-lg-12 col-xs-12 col-md-12 col-sm-12' style='display:none'>" +
						/* "<div class=''>关注因素:</div>" +*/
						// "<div  class='zhiconceal_  '><lable class='headline'>关注因素</lable>"+concernedfactors+"</div>" +
					//"</div>" +
					//"<div class='zhisource show_ col-lg-12 col-xs-12 col-md-12 col-sm-12' style='display:none'>" +
						/* "<div class=''>风险描述:</div>" +*/
					//	 "<div class='zhiconceal_  '><lable class='headline'>风险描述</lable>"+riskDefine+"</div>" +
					//"</div>" +
			 		
		 		"</div>";
	 var por= '<div class="deletli" style="float: right;" id="'+sub+'">'+
					//		'<a href=\"javascript:del('+d.CHECKUPITEM_ID+',\''+d.STATUS+'\',\''+sub1+'\',\''+userId+'\')\" id="'+d.CHECKUPITEM_ID+'" class="remove weui_btn weui_btn_mini rms" style="float:right;"><img style="width: 1rem;height:1rem" src=\"../images/delete.png\" title=\"删除\" alt=\"删除\"/></a>'+
					 	//'<div id="'+itemID+'" class="remove delet" style="float:right;-webkit-border-bottom-right-radius: .5rem;-webkit-border-top-right-radius: .5rem;background:rgb(126, 200, 136)"></div>'+
					 	'<div id="'+itemID+'" class="remove  recover" style="float:right;-webkit-border-bottom-left-radius: .5rem;-webkit-border-top-left-radius: .5rem;color: #000;"   onclick="del('+itemID+',\''+status+'\',\''+sub1+'\',\''+userId+'\')"><img style="width: 1rem;height:1rem" src=\"../images/right.png\" title=\"恢复\" alt=\"恢复\"/></div>'+	
					
					'</div>';
	
	      	
		}
	var par = $(this).parent().parent().attr('id');
	$(this).parent().siblings('.zhiN').remove();
	$('.'+sub).find("div").remove();
	$('#'+par).children('.jc_project').after(str);
	$('.'+sub).append(por);
	$('.'+sub).append(len);
	//$("#laiyuan"+sub).append(source);
/*	$(this).parent().siblings("#laiyuan"+sub).html(DESCRIPTION);*/
	$.ajax({
        type: "post",
        url: url+"/rest/editCheckItem",
        contentType:"application/json;charset=utf8",
        data: JSON.stringify({"checkupItemId":itemID,"stauts":'已删除',"subGroup":sub1}),
        dataType: "json",
        success: function (r) {
        	if (r.result == "success") {
        		$(this).parent().siblings('.zhiN').remove();
        		}
        	}
   });
});


$('.container').delegate(".zhiN","click",function(){
	var flag = $(this).attr("data-flag");
	var p = $(this).find("div").first();
	if(flag==1){
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
							/* "<div class=''>关注因素:</div>" +*/
							 "<div  class='zhiconceal_  '><lable class='headline'>关注因素</lable>"+r.concernedfactors+"</div>" +
							"</div>" +
							"<div class='zhisource show_ col-lg-12 col-xs-12 col-md-12 col-sm-12' style='display:none'>" +
								/* "<div class=''>风险描述:</div>" +*/
								 "<div class='zhiconceal_  '><lable class='headline'>风险描述</lable>"+r.riskDefine+"</div>" +
						"</div>" +
						"<div class='trait_ show_ col-lg-12 col-xs-12 col-md-12 col-sm-12' style='display:none'>"+
						"<div class='trait_div '><lable class='trait_lai headline'>指南来源</lable>"+r.ORIGINATE+
						 "</div></div>";
	        	p.after(str);
	        }
		});
		$(this).find('.zhiconceal').css({maxHeight:"100%",display:"block"});
		$(this).find('.show_').css({display:"block"});
		$(this).attr("data-flag","0");
	}else{
		$(this).find('.zhiconceal').css({maxHeight:"40px",overflow:"hidden",wordWrap:"break-word",textOverflow:"ellipsis",WebkitLineClamp:'2',textOverflow: "ellipsis",WebkitBoxOrient: "vertical"});
		$(this).find('.zhiconceal').css({display:"-webkit-box"});
		$(this).find('.show_').css({display:"none"});
		$(this).attr("data-flag","1");
		p.nextAll().remove();
	}
})
    




//确定
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
					        		/*//$("#group_").find(".active").click(); 
					        		$("#"+ID).attr("href","javascript:del('"+ID+"','已选中','"+userId+"')");
					        		 $("#"+ID ).parent().find('.tex').css('color','#8033C3');*/
			        	/*	if(status == '已删除'){
				        		//$("#group_").find(".active").click(); 
				        		//$("#"+ID).attr("href","javascript:del('"+ID+"','已选中','"+userId+"')");
				        	}else if(status == '已选中'){
				        		 //$("#"+ID ).attr("href","javascript:del('"+ID+"','已删除','"+userId+"')");
				        	}*/
			        		/*$('.xmtable').html('');
				        	intn(userId);*/
			        		}
			        	$('.xmtable').html('');
			        	intn(userId);
			        	}
			   });
    	}





//        关联
function guanlian(id){
	clearTimeout(t); 
      		var user_id = $("#"+id).find("input").val();
      		spend(user_id);
        	$('.relevance li').removeClass('relevanceMY');
            $("#"+id).addClass('relevanceMY');
           
    }
function guanlian1(id){
	//$('.pending_img').remove();
	clearTimeout(t); 
			spend(id);
	        	$('.relevance li').removeClass('relevanceMY');
	            $("#my").addClass('relevanceMY');
	            
	    }
    

function tj_carep(){
	window.location = addUrl +"/ihealth-wechat/subject/addcare.html";
	//addUser()
}



	
			






