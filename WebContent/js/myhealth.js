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
		url:"http://localhost:8080/ihealth/rest/findUsersById",
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
						str+="<li id='li"+(i+1)+"' onclick='guanlian(\"li"+(i+1)+"\")'><input type='hidden' value='"+data[i].USER_ID+"'>"+data[i].NAME+"</li>";
					}
				$('#my').attr("onclick","guanlian1('"+userId+"')");
				 $('#my').after(str);
			}
	});
}





function intn(userId){
	$.ajax({
        type: "post",
        url: url+"/rest/findCheckItems",
        contentType:"application/json;charset=utf8",
        data: JSON.stringify({"userId":userId}),
        dataType: "json",
        success: function (r) {
        	 $('.xmtable').html("");
        	 if (r.result == "success") {
	        	 if(r.data.length>0){ 
	        		 $(r.data).each(function (i){
	        			 var status= r.data[i].STATUS;
	        			 var checkupItemId= r.data[i].CHECKUPITEM_ID;
	        			 //通过状态判断项目是否显示
	        			 var cont='';
	        			 if(!(status == "已删除")){
		        			 cont = '<div class="touch item col-lg-12 col-xs-12 col-md-12 col-sm-12" id="touch'+i+'" userAddressId="1" ">';
		        		        cont += '<div class="jc_project col-lg-12 col-xs-12 col-md-12 col-sm-12">' +
		        		                    '<span class="jcxm col-lg-3 col-xs-3 col-md-3 col-sm-3" ">检查项目：</span>' +
		        		                    '<div class="pl col-lg-9 col-xs-9 col-md-9 col-sm-9 "><span>'+r.data[i].NAME+'</span><span>【'+r.data[i].FREQUENCY+'】</span>' +
		        		                    '</div>' +
		        		                '</div>';
		        		        cont += '<div class="zhiN col-lg-12 col-xs-12 col-md-12 col-sm-12">' +
		        		                    '<span class="source col-lg-3 col-xs-3 col-md-3 col-sm-3">指南来源：</span>' +
		        		                    '<div class="source_adr col-lg-9 col-xs-9 col-md-9 col-sm-9">'+r.data[i].ORIGINATE+'</div></div>';
		        		        cont += '<div class="deletli"><a href=\"javascript:del('+r.data[i].CHECKUPITEM_ID+',\''+status+'\',\''+userId+'\')\" id="de'+i+'" class="remove weui_btn weui_btn_mini weui_btn_primary" style="float:right;">删除</a></div>';
		        		        
		        		        cont += '</div>';
	        		        }else{
			        			 cont = '<div class="touch item col-lg-12 col-xs-12 col-md-12 col-sm-12" id="touch'+i+'" userAddressId="1" ">';
			        		        cont += '<div class="jc_project col-lg-12 col-xs-12 col-md-12 col-sm-12">' +
			        		                    '<span class="jcxm col-lg-3 col-xs-3 col-md-3 col-sm-3" style="color: #BEBABA">检查项目：</span>' +
			        		                    '<div class="pl col-lg-9 col-xs-9 col-md-9 col-sm-9" style="color: #BEBABA"><span>'+r.data[i].NAME+'</span><span>【'+r.data[i].FREQUENCY+'】</span>' +
			        		                    '</div>' +
			        		                '</div>';
			        		        cont += '<div class="zhiN col-lg-12 col-xs-12 col-md-12 col-sm-12">' +
			        		                    '<span class="source col-lg-3 col-xs-3 col-md-3 col-sm-3" style="color: #BEBABA">指南来源：</span>' +
			        		                    '<div class="source_adr col-lg-9 col-xs-9 col-md-9 col-sm-9" style="color: #BEBABA">'+r.data[i].ORIGINATE+'</div></div>';
			        		        cont += '<div class="deletli"><a href=\"javascript:del('+r.data[i].CHECKUPITEM_ID+',\''+status+'\',\''+userId+'\')\" id="de'+i+'" class="remove weui_btn weui_btn_mini weui_btn_primary" style="background-color: #828B82;color: #ffffff;float:right">恢复</a></div>';
			        		       
			        		        cont += '</div>';
	        		        }
	        			 setTimeout(function(){
	        				 $('.xmtable').append(cont);
	        				 $('.touch').fadeIn("slow");
	        				  }, 300);
	                    
	        		 		});
	        	 		}
	        	 	}
        		}
        });
        
}
//	                      确定
//删除体检项目

    	function del(ID,status,userId){
    		 $.ajax({
			        type: "post",
			        url: url+"/rest/editCheckItem",
			        contentType:"application/json;charset=utf8",
			        data: JSON.stringify({"checkupItemId":ID,"stauts":status}),
			        dataType: "json",
			        success: function (r) {
			        	if (r.result == "success") {
					        	  $('.xmtable').html("");
					        	if(status == '已删除'){
					        		intn(userId);
					        	}else if(status == '已选中'){
					        		 $('.weui_dialog_alert').css("display","none");
						        	intn(userId);
					        	}
			        		}
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
    














