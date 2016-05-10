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
        	var group = eval(r.group);
        	$("#group_").empty();
        	 $('.xmtable').html("");
        	 if (r.result == "success") {
        		 if(group.length>0){
        			var gro ='';
        				 for(var i=0;i<group.length;i++){
        					 gro += 
        						 '<li id="subgroup'+i+'" class="subgroup" data-sub=\"'+group[i].SUBGROUP+'\">'+group[i].SUBGROUP+''+
        						 	'<em>('+group[i].FREQUENCY+')</em>'+
        						 '</li>';	
        					 var slash ="<em>/</em>";
                			
        				 }
        			 $('#group_').html(gro);
        				 $('#subgroup0 em').after(slash);
        				 $('#subgroup2 em').before(slash);
        		 }
        		 
        		 var subgroup = $(".subgroup").eq(0).addClass("active").attr("data-sub");
        		 				defalut(userId,subgroup);
	        	 	}
        		}
        });
        
}


//默认
function defalut(userId,subgroup){
	 var cont='';
	$.ajax({
        type: "post",
        url: url+"/rest/getCheckItemsByGroup",
        contentType:"application/json;charset=utf8",
        data: JSON.stringify({"userId":userId,"subgroup":subgroup}),
        dataType: "json",
        success: function (r) {
       	 if(r.data){ 
       		 for(var i=0;i<r.data.length;i++){
       			 (function(index,file){
           			 var status= r.data[i].STATUS;
           			 var features = r.data[i].FEATURES;
        			 var checkupItemId= r.data[i].CHECKUPITEM_ID;
        			 //通过状态判断项目是否显示
        				 console.log(status);
            			 cont += '<div class="touch item col-lg-12 col-xs-12 col-md-12 col-sm-12" id="touch'+i+'" userAddressId="1" ">';
            		        cont += '<div class="jc_project col-lg-12 col-xs-12 col-md-12 col-sm-12">' +
	            		                    ''+r.data[i].NAME+'<span class="spanclass tijian_pl2">('+r.data[i].FREQUENCY+')</span>'+
            		                    '</div>';
            		               
            		        cont += '<div id="laiyuan'+[i]+'" class="zhiN source_adr col-lg-12 col-xs-12 col-md-12 col-sm-12" onclick="openl('+i+')">'+
            		                    ''+r.data[i].ORIGINATE+'</div>';
            		        
//            		        cont += '<div id="abc'+[i]+'" class="col-lg-9 col-xs-9 col-md-9 col-sm-9" ></div>';
            		        	
            		        if(!(status == "已删除")){
            		        	cont += '<div class="deletli"><a href=\"javascript:del('+r.data[i].CHECKUPITEM_ID+',\''+status+'\',\''+userId+'\')\" id="de'+i+'" class="remove weui_btn weui_btn_mini weui_btn_primary rms" style="float:right;"><img style="width: 1rem;height:1rem" src=\"../images/delete.png\" title=\"删除\" alt=\"删除\"/></a></div>';
            		        }else{
            		        	cont += '<div class="deletli"><a href=\"javascript:del('+r.data[i].CHECKUPITEM_ID+',\''+status+'\',\''+userId+'\')\" id="de'+i+'" class="remove weui_btn weui_btn_mini weui_btn_primary hms" style="float:right"><img style="width: 1rem;height:1rem" src=\"../images/huifu.png\" title=\"恢复\" alt=\"恢复\"/></a></div>';
            		        }
            		        cont += '</div>'+
            		        '</div>';
	        			 setTimeout(function(){
	        				 $('.xmtable').html(cont);
	        				 $('.touch').fadeIn("slow");
	        				 if (features != null && features !=''){
	            					var birthArr= new Array();
	            					//按逗号拆分
	            					birthArr = features.split(",");
	            				
	            					if(birthArr.length > 0){
	            						var len = '';
	            						for(var p=0;p<birthArr.length;p++){
	            							len +=  '<div class="" >'+
	            										'<div class="trait">'+birthArr[p]+'</div>'+
            										'</div>';
	            						}
	            						$('.deletli').before(len);
	            					}
	            		    	}
	        				 
	        				 
	        				$('.rms').parent().siblings().css('color','#000000');
	        				$('.hms').parent().siblings().css('color','#ADACAC');
	        				  }, 300);
	        			  if(index === (r.data.length - 1)){
	        				 
	                       }
	        			
       			 		})(i,r.data[i]);
       		 		}
    	 		}
        	}
        })
        
}
function openl(i){
	$("#laiyuan"+i).css({maxHeight:"100%",overflow:"auto",display:"block"});
};


$(document).delegate(".subgroup",'click',function(){
	var subgroup = $(this).attr("data-sub");
	$(this).addClass("active").siblings().removeClass("active");
	defalut(userId,subgroup);
})

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
					        		 $("#group_").find(".active").click(); 
					        		
					        	}else if(status == '已选中'){
					        		 $('.weui_dialog_alert').css("display","none");
					        		 $("#group_").find(".active").click();
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
    















