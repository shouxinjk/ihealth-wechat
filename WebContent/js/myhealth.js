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
					for(var i=0;i<data.length;i++){
						str+="<li data-val='"+data[i].USER_ID+"'  id='li"+(i+1)+"' onclick='guanlian(\"li"+(i+1)+"\")'><input type='hidden' value='"+data[i].USER_ID+"'>"+data[i].NAME+"</li>";
					}
				$('#my').attr("onclick","guanlian1('"+userId+"')").attr("data-val",userId);
				 $('#my').after(str);
			}
	});
}





function intn(userId){
	$('.xmtable').html('');
	var judge = true;
	var group;
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
	                    	var sub1 = d.SUBGROUP;
	    		        	var sub = MD5(sub1);
	                    	//通过状态判断项目是否显示
	    		        	 if(!(d.STATUS == "已删除")){
	         		        	 var str ="<div  data-flag='1' id='laiyuan"+sub+"' class='zhiN source_adr col-lg-12 col-xs-12 col-md-12 col-sm-12' style='color:#000'>"+d.DESCRIPTION+"</div>"+
	         		        	 
				         		        	'<div class="'+sub+' subdiv col-lg-12 col-xs-12 col-md-12 col-sm-12">'+
					         		        	'<div class="deletli" style="float: right;" id="'+sub+'">'+
	//					         		        		'<a href=\"javascript:del('+d.CHECKUPITEM_ID+',\''+d.STATUS+'\',\''+sub1+'\',\''+userId+'\')\" id="'+d.CHECKUPITEM_ID+'" class="remove weui_btn weui_btn_mini rms" style="float:right;"><img style="width: 1rem;height:1rem" src=\"../images/delete.png\" title=\"删除\" alt=\"删除\"/></a>'+
						         		        	'<div id="'+d.CHECKUPITEM_ID+'" class="remove delet" style="float:right;">恢复</div>'+
						         		        	'<div id="'+d.CHECKUPITEM_ID+'" class="remove  recover" style="float:right;background: rgb(126, 200, 136);-webkit-border-bottom-left-radius: .5rem;-webkit-border-top-left-radius: .5rem;color: #fff;"  onclick="del('+d.CHECKUPITEM_ID+',\''+d.STATUS+'\',\''+sub1+'\',\''+userId+'\')">删除</div>'+	
					         		        	'</div>'+
				         		        	'</div>';
	         		        }else {
	         		        	var str ="<div  data-flag='1' id='laiyuan"+sub+"' class='zhiN del source_adr col-lg-12 col-xs-12 col-md-12 col-sm-12' >"+d.DESCRIPTION+"</div>"+
					         		        //deletli 原来在sub外面  sub 后面有个class（ subgroup1）
					         		        	'<div class="'+sub+' subdiv  col-lg-12 col-xs-12 col-md-12 col-sm-12">'+
					         		        		'<div  class="deletli" style="float: right;" id="'+sub+'">'+
					         		        			//'<a href=\"javascript:del('+d.CHECKUPITEM_ID+',\''+d.STATUS+'\',\''+sub1+'\',\''+userId+'\')\" id="'+d.CHECKUPITEM_ID+'" class="remove weui_btn weui_btn_mini hms" style="float:right"><img style="width: 1rem;height:1rem" src=\"../images/delete.png\" title=\"恢复\" alt=\"恢复\"/></a>'+
						         		        		'<div id="'+d.CHECKUPITEM_ID+'" class="remove delet" style="float:right;background: rgb(126, 200, 136);-webkit-border-bottom-right-radius: .5rem;-webkit-border-top-right-radius: .5rem;color: #fff;"  onclick="del('+d.CHECKUPITEM_ID+',\''+d.STATUS+'\',\''+sub1+'\',\''+userId+'\')">恢复</div>'+
							         		        	'<div id="'+d.CHECKUPITEM_ID+'" class="remove  recover" style="float:right;"  >删除</div>'+	
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
		       				
	        		    if(d.ORIGINATE != null && d.ORIGINATE !='')  {
	        		    	
	        		    	var birthArr1= new Array();
           					//按逗号拆分
           					birthArr1 = d.ORIGINATE.split(",");
           					if(birthArr1.length > 0){
           					 var source = '';
           						for(var c=0 ; c<birthArr1.length;c++){
           						 if(!(d.STATUS == "已删除")){
           							source += '<div class="tex zhi_source">'+birthArr1[c]+'</div>';
           						  }else{
           							source += '<div id="idname" class="tex zhi_source">'+birthArr1[c]+'</div>';
           						  }
           						}
           					}
	        		    }
   						$('.'+sub).append(source);
   						
	                    }
	            	});
	        	  }
	        	}
	        });
	}
	$(".subgroup1").last().find(".iss").remove();
	
}

$(".subgroup1").live('click', function() {
	var DESCRIPTION;
	var status;
	var itemID ;
	var userId = $(".relevanceMY").attr("data-val");
	var ORIGINATE;
	var FEATURES;
	var sub1;
	var sub;
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
        	status = d.STATUS;
        	itemID = d.CHECKUPITEM_ID;
        	ORIGINATE = d.ORIGINATE;
        	FEATURES = d.FEATURES;
        	sub1 =d.SUBGROUP;
        	sub = MD5(sub1);
        }
	});
	
	
    if(ORIGINATE != null && ORIGINATE !='')  {
    	var birthArr1= new Array();
			//按逗号拆分
			birthArr1 = ORIGINATE.split(",");
			if(birthArr1.length > 0){
			 var source = '';
				for(var c=0 ; c<birthArr1.length;c++){
					source += '<div class="zhi_source" style="color:#000">'+birthArr1[c]+'</div>';
				}
			}
    }
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
	$('.'+sub).find("div").remove();
	$('.'+sub).append(len);
	$('.'+sub).append(source);
	$(this).parent().siblings("#laiyuan"+sub).html(DESCRIPTION);
	$.ajax({
        type: "post",
        url: url+"/rest/editCheckItem",
        contentType:"application/json;charset=utf8",
        data: JSON.stringify({"checkupItemId":itemID,"stauts":"已删除","subGroup":sub1}),
        dataType: "json",
        success: function (r) {
        	if (r.result == "success") {
        		
		        	/*	$("#"+itemID).attr("href","javascript:del('"+itemID+"','已选中','"+userId+"')");
		        		 $("#"+itemID ).parent().find('#laiyuan').css('color','#000');*/
        		}
        	$('.xmtable').html('');
        	intn(userId);
        	}
   });
	/*$(this).parent().siblings(".deletli").find("a").attr("href","javascript:del('"+itemID+"','"+status+"','"+sub1+"','"+userId+"')");
	$(this).parent().siblings(".deletli").find("a").attr("id",itemID);*/
	/*if(status == '已选中'){
		$(this).find(".deletli").find("a").find("img").attr("src","../images/delete.png");
		$(this).find("#laiyuan"+sub).css('color','#000');
		$(this).find(".deletli").next("div").css('color','#000');
	}else{
		$(this).find(".deletli").find("a").find("img").attr("src","../images/huifu.png");
		$(this).find("#laiyuan"+sub).css('color','#C0BEBE');
	}*/
	
});
function onc(e){
	if($("#"+e).attr("data-flag")==1){
		$("#"+e).css({maxHeight:"100%",overflow:"auto",display:"block"});
		$("#"+e).attr("data-flag","0");
	}else{
		$("#"+e).css({maxHeight:"40px",overflow:"hidden",wordWrap:"break-word",textOverflow:"ellipsis",WebkitLineClamp:'2',textOverflow: "ellipsis",WebkitBoxOrient: "vertical"});
		$("#"+e).css({display:"-webkit-box"});
		$("#"+e).attr("data-flag","1");
	}
}

$(document).delegate(".zhiN","click",function(){
	var flag = $(this).attr("data-flag");
	if(flag==1){
		$(this).css({maxHeight:"100%",overflow:"auto",display:"block"});
		$(this).attr("data-flag","0");
	}else{
		$(this).css({maxHeight:"40px",overflow:"hidden",wordWrap:"break-word",textOverflow:"ellipsis",WebkitLineClamp:'2',textOverflow: "ellipsis",WebkitBoxOrient: "vertical"});
		$(this).css({display:"-webkit-box"});
		$(this).attr("data-flag","1");
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
			        		$('.xmtable').html('');
				        	intn(userId);
			        		}
			        	/*$('.xmtable').html('');
			        	intn(userId);*/
			        	}
			   });
    	}





//        关联
function guanlian(id){
      		var user_id = $("#"+id).find("input").val();
        	intn(user_id);
        	$('.relevance li').removeClass('relevanceMY');
            $("#"+id).addClass('relevanceMY');
    }
function guanlian1(id){
	        	intn(id);
	        	$('.relevance li').removeClass('relevanceMY');
	            $("#my").addClass('relevanceMY');
	    }
    










