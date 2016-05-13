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
						str+="<li id='li"+(i+1)+"' onclick='guanlian

(\"li"+(i+1)+"\")'><input type='hidden' value='"+data[i].USER_ID+"'>"+data[i].NAME+"</li>";
					}
				$('#my').attr("onclick","guanlian1('"+userId+"')");
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
	        		var str ="<div class='touch item col-lg-12 col-xs-12 col-md-12 

col-sm-12' id='touch"+j+"' userAddressId='1'><div class='jc_project col-lg-12 col-xs-12 col-

md-12 col-sm-12'>";
	        		var k =0;
	        		for(var i=0;i<data.length;i++){
	        			if(group[j].SUBGROUP == data[i].SUBGROUP){
	        				var name;
	        				if(data[i].STATUS == "已选中"){
	        					CHECKUPITEMid = data[i].CHECKUPITEM_ID;
	        					name = data[i].NAME;
	        					str +="<span class='active_ subgroup1 ' 

>"+data[i].NAME+"("+data[i].FREQUENCY+")<input type='hidden' value='"+data[i].CHECKUPITEM_ID

+"'></span>"+"/";
	        					k++;
	        				}else{
	        					if(k==0){
	        						CHECKUPITEMid = data

[i].CHECKUPITEM_ID;
	        					}
	        					str +="<span class='subgroup1'>"+data

[i].NAME+"("+data[i].FREQUENCY+")<input type='hidden' value='"+data[i].CHECKUPITEM_ID

+"'></span>"+"/";
	        				}
	        			}
	        			if(i==data.length-1){
	        				str = str.substring(0,str.length-1);
	        			}
	        		}
	        		str+="</div>";
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
	         		        	str+="<div onclick='onc(\"laiyuan"+sub+"\")' 

id='laiyuan"+sub+"' class='zhiN source_adr col-lg-12 col-xs-12 col-md-12 col-sm-12' 

>"+d.DESCRIPTION+"</div>";
	         		        	str += '<div class="deletli" id="'+sub+'"><a 

href=\"javascript:del('+d.CHECKUPITEM_ID+',\''+d.STATUS+'\',\''+sub1+'\',\''+userId+'\')\" 

id="'+d.CHECKUPITEM_ID+'" class="remove weui_btn weui_btn_mini weui_btn_primary rms" 

style="float:right;"><img style="width: 1rem;height:1rem" src=\"../images/delete.png\" title=\"

删除\" alt=\"删除\"/></a></div>';
	         		        	str +='<div class="'+sub+'"></div>';
	         		        }else {
	         		        	str+="<div onclick='onc(\"laiyuan"+sub+"\")' 

id='laiyuan"+sub+"' class='zhiN del source_adr col-lg-12 col-xs-12 col-md-12 col-sm-12' 

>"+d.DESCRIPTION+"</div>";
	         		        	str += '<div class="deletli" id="'+sub+'"><a 

href=\"javascript:del('+d.CHECKUPITEM_ID+',\''+d.STATUS+'\',\''+sub1+'\',\''+userId+'\')\" 

id="'+d.CHECKUPITEM_ID+'" class="remove weui_btn weui_btn_mini weui_btn_primary hms" 

style="float:right"><img style="width: 1rem;height:1rem" src=\"../images/huifu.png\" title=\"恢

复\" alt=\"恢复\"/></a></div>';
	         		        	str +='<div class="'+sub+' subgroup1"></div>';
	         		        }
	        		        str+="</div>";
	        		        
	        		        $('.xmtable').append(str);
	        		        
	        		      //添加体检项目的特性
		       				 if (d.FEATURES != null && d.FEATURES !=''){
		           					var birthArr= new Array();
		           					//按逗号拆分
		           					birthArr = d.FEATURES.split

(",");
		           					if(birthArr.length > 0){
		           						var len = '';
		           						for(var 

p=0;p<birthArr.length;p++){
		           							len += '<div 

class="trait">'+birthArr[p]+'</div>';
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
           							source += '<div 

class="zhi_source">'+birthArr1[c]+'</div>';
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
	
}
function onc(e){
	
	
	if($("#"+e).css('maxHeight')=="40px"){
		$("#"+e).css({maxHeight:"100%",overflow:"auto",display:"block"});
	}else{
		$("#"+e).css({maxHeight:"40px",overflow:"hidden",wordWrap:"break-

word",textOverflow:"ellipsis",WebkitLineClamp:'2',textOverflow: "ellipsis",WebkitBoxOrient: 

"vertical"});
		$("#"+e).css({display:"-webkit-box"});
	}
}
    


$(document).delegate(".subgroup1",'click',function(){
	var DESCRIPTION;
	var status;
	var itemID ;
	var userId = ReadCookie("userId");
	var ORIGINATE;
	var FEATURES;
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
	
	var source = '';
		 source ='<div  class="comma">'+
		 			'<div  class="zhi_source">'+ORIGINATE+'</div></div>';
		//添加体检项目的特性
	if (FEATURES != null && FEATURES !=''){
		var birthArr= new Array();
		//按逗号拆分
		birthArr = FEATURES.split(",");
			
		if(birthArr.length > 0){
			var len = '';
			for(var p=0;p<birthArr.length;p++){
				len += '<div class="trait">'+birthArr[p]+'</div>';
			}
		}
	}
	//$('#31').html("");
	$('.'+sub).find("div").remove();
	$('.'+sub).append(len);
	$('.'+sub).append(source);
	$(this).parent().siblings("#laiyuan").html(DESCRIPTION);
	$(this).parent().siblings(".deletli").find("a").attr("href","javascript:del('"+itemID

+"','"+status+"','"+sub1+"','"+userId+"')");
	$(this).parent().siblings(".deletli").find("a").attr("id",itemID);
	if(status == '已选中'){
		$(this).parent().siblings(".deletli").find("a").find("img").attr

("src","../images/delete.png");
		$(this).parent().siblings("#laiyuan").css('color','#000');
		$(this).parent().siblings(".deletli").next("div").css('color','#000');
	}else{
		$(this).parent().siblings(".deletli").find("a").find("img").attr

("src","../images/huifu.png");
		$(this).parent().siblings("#laiyuan").css('color','#C0BEBE');
		$(this).parent().siblings(".deletli").next("div").css('color','#C0BEBE');
	}
	
})



//确定
//删除体检项目

    	function del(ID,status,group,userId){
    		 $.ajax({
			        type: "post",
			        url: url+"/rest/editCheckItem",
			        contentType:"application/json;charset=utf8",
			        data: JSON.stringify

({"checkupItemId":ID,"stauts":status,"subGroup":group}),
			        dataType: "json",
			        success: function (r) {
			        	if (r.result == "success") {
					        	if(status == '已删除'){
					        		//$("#group_").find

(".active").click(); 
					        		$("#"+ID).attr

("href","javascript:del('"+ID+"','已选中','"+userId+"')");
					        		 $("#"+ID ).parent().find

('#laiyuan').css('color','##8033C3');
					        	}else if(status == '已选中'){
					        		 $('.weui_dialog_alert').css

("display","none");
					        		 $("#"+ID ).attr

("href","javascript:del('"+ID+"','已删除','"+userId+"')");
					        		 $("#"+ID ).parent().find

('#laiyuan').css('color','red');
					        	}
			        		}
			        	$('.xmtable').html('');
			        	intn(userId);
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
    










