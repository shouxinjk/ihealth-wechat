$(function(){	 
    var thisId = window.location.hash;
    var userId = ReadCookie("userId");
    if(thisId =='#message'){				//基本信息
        $('.content').html(basic);
        $.initProv("#pro", "#city", "北京市", "北京市");
        $.initProv1("#pro1", "#city1", "北京市", "北京市");
        Height();//身高 体重验证
    }
    if(thisId == '#live'){					//生活方式
        $('#li1').removeClass('active');
        $('#li2').addClass('active');
        //$('.content').html(liveway);
        tagCategory(userId);
        $('#guanxin').remove();
        //liv();
    }
    if(thisId == '#disease_information'){	//疾病信息
        $('#li1').removeClass('active');
        $('#li3').addClass('active');
        listDisease(userId);
        $('#guanxin').remove();
        //disease();
    }
    if(thisId == '#Care_People'){			//关心的人
        $('#li1').removeClass('active');
        $('#li4').addClass('active');
        //$('.content').html(Care_People);
        carep(userId);
        $('#guanxin').remove();
    }
});


//生活方式多选
$('.content').delegate(".livediv li","click",function(){
	$(this).toggleClass('livefs livefs_3');
})
//生活方式单选
.delegate(".dandiv li","click",function(){
    $(this).addClass('livefs livefs_3').siblings().removeClass('livefs livefs_3');  // 删除其他兄弟元素的样式
 });


//疾病信息
function duoDisliv_1(){
	$('.content').delegate('.personage_illness_1 ul li',"click",function(){
		$(this).toggleClass('livefs_1 livefs');
	})
}
function duoDisliv_2(){
	$('.content').delegate('.personage_illness_2 ul li',"click",function(){
		$(this).toggleClass('livefs_2 livefs');
	})
}

function duoDisliv_3(){
		$('.content').delegate('.personage_illness_3 ul li',"click",function(){
		$(this).toggleClass('livefs_3 livefs');
	})
}


//nav
$('.information_header .information_header_li').click(function(){
    $('.information_header_li').removeClass('active');
    $(this).addClass('active');
    var liID = $(this).attr("id");
    var userId = ReadCookie("userId");
    if(liID == 'li1'){
        $('.content').html(basic);
        jibenxinxi(userId);
        $('.tcal').addClass('tcalInput');
        $.initProv("#pro", "#city", "北京市", "北京市");
        $.initProv1("#pro1", "#city1", "北京市", "北京市");
        Height();//身高 体重验证
        $('.message_next1').remove();
    }
    if(liID == 'li2'){
        tagCategory(userId);
        $('.message_next1').remove();
    }
    if(liID == 'li3'){
        listDisease(userId);
        $('.message_next1').remove();
    }
    if(liID == 'li4'){
        carep(userId);
    }
});

//身高 体重验证
function Height(){
    $('#stature,.weigth').blur(function(event){
        var str = $(this).val();
        if(str.length!=0){
            var partten = /^\d+$/;
            if(!partten.test($(this).val())){
                $(this).val('');
            }
        }
    });
}

//next 基本信息保存下一步
function msgsave(userId){
	
	var SEX = $(".Sex input[name='Sex']:checked").val();
	if(SEX == 'man'){
		SEX = '男';
	}else if(SEX == 'woman'){
		SEX = '女';
	}
	var NAME= $('#username').val();
	var MARRIAGESTATUS= $("#marriageM option:selected").val();
	//获取出生地
	var pro=$("#pro option:selected").text();
	var pro1=$("#pro1 option:selected").text();
	//获取常住地
	var city=$("#city option:selected").text();
	var city1=$("#city1 option:selected").text();
	//以逗号分隔
	var BIRTHPLACE = pro + "," + city;
	var LIVEPLACE = pro1 + "," + city1;
	
	var CAREER=$("#s1 option:selected").text();//获取职业
    var DEGREE=$("#s2 option:selected").val();//获取学历
    var BIRTHDAY=$('.Wdate').val();//获取生日
    var HEIGHT= $('.height').val();//获取身高
    var WEIGHT=$('.weigth').val();//获取体重
    var phone = $('#vali').val();//获取手机号
    if(phone != ''){
    	  $.ajax({
  	        type: "post",
  	        url: url+"/rest/updateUser",
  	        contentType:"application/json;charset=utf8",
  	        data: JSON.stringify({"tel":phone,"userId":userId,"sex":SEX,"name":NAME,"marriageStatus":MARRIAGESTATUS,"birthPlace":BIRTHPLACE,"livePlace":LIVEPLACE,"career":CAREER,"degree":DEGREE,"birthday":BIRTHDAY,"height":HEIGHT,"weight":WEIGHT}),
  	        dataType: "json",
  	        success: function (r) {
  	            if (r.result == "success") {
  	            	 console.log('保存成功');
  	            }else{
  	            	
  	            }
  	        }
  	       
  	    });
    	
    }else{
    	$('.error').show();
    };
    /*//修改状态
    $.ajax({
	        type: "post",
	        url: url+"/rest/updateUser",
	        contentType:"application/json;charset=utf8",
	        data: JSON.stringify({}),
	        dataType: "json",
	        success: function (r) {
	           
	        }
	    });*/
}

function obtainId(id){
	var strId = "";
	$("."+id).find("input").each(function(){
		strId += $(this).val()+",";
	});
	strId = strId.substring(0,strId.length-1);
	return strId;
}

function on_click2(userId){   //生活方式
	//duoDisliv_1();
	$.ajax({
		url:url+"/resttag/updateTag",
  		type:"post",
  		contentType:'application/json;charset=utf8',
  		data:JSON
  			.stringify({
  				"userID" : userId,
  				"tagID" :obtainId("livefs")
  			}),
  		dataType : "json",
  		async : false,
		cache : false,
		success:function(delr){
			if(delr.msg == "success"){
				listDisease(userId);
			}
		}
	});
	$('#guanxin').remove();
    $("#li3").addClass('active');
    $("#li2").removeClass('active');
}

function on_click_2(userId){   //修改关心人的生活方式
	//duoDisliv_1();
	$.ajax({
		url:url+"/resttag/updateTag",
  		type:"post",
  		contentType:'application/json;charset=utf8',
  		data:JSON
  			.stringify({
  				"userID" : userId,
  				"tagID" :obtainId("livefs")
  			}),
  		dataType : "json",
  		async : false,
		cache : false,
		success:function(delr){
			if(delr.msg == "success"){
				listDisease_1(userId);
			}
		}
	});
	$('#guanxin').remove();
    $("#li3").addClass('active');
    $("#li2").removeClass('active');
}



function listDisease(userId){//疾病信息
	 $.ajax({
		  	url:url+"/restdisease/listAllDiseaseByUserID",
	  		type:"post",
	  		contentType:'application/json;charset=utf8',
	  		data:JSON
	  			.stringify({
	  				"userID" : userId
	  			}),
	  		dataType : "json",
	  		async : false,
			cache : false,
			success:function(ur){
				var urallData = eval(ur.allData);
				var urIsInheritableDiseaseData = eval(ur.IsInheritableDiseaseData);
				var urIsHighIncidence = eval(ur.IsHighIncidence);
				 $.ajax({
				    	url:url+"/restdisease/listAllDisease",
				    	type:"post",
				    	async : false,
						cache : false,
				    	success:function(r){
				    		if(r.msg == "success"){
				    			var str = "";
				    			var allData = eval(r.allData);//个人疾病
				    			var IsInheritableDiseaseData = eval(r.IsInheritableDiseaseData);//家族疾病
				    			var IsHighIncidence = eval(r.IsHighIncidence);//关注疾病（高发疾病）
				    			str+="<h4 id='personage1' class='personage col-lg-12 col-xs-12 col-md-12 col-sm-12'>个人疾病信息</h4>"+
				                	 "<div class='personage_illness_1  col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
				                	 	"<ul>";
				    			for(var i=0;i<allData.length;i++){
				    				str+= "<li ";
				    				if(urallData!=undefined){
				    					for(var j=0;j<urallData.length;j++){
					    					if(allData[i].DISEASE_ID == urallData[j].DISEASE_ID){
					    						str+= "id='personal' class='livefs_1 livefs'";
					    					}
					    				}
				    				}
				    				str+= " >"+allData[i].NAME+"<input type='hidden' value='"+allData[i].DISEASE_ID+"'></li>";
				    			}
				    			str += "</ul>"+
				               			"</div>"+
						                "<h4 id='personage2' class='family col-lg-12 col-xs-12 col-md-12 col-sm-12'>家族疾病信息</h4>"+
						                "<div class='personage_illness_2  col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
						                   "<ul>";
				    			for(var i=0;i<IsInheritableDiseaseData.length;i++){
				    				str+= "<li ";
				    				if(urIsInheritableDiseaseData!=undefined){
					    				for(var j=0;j<urIsInheritableDiseaseData.length;j++){
					    					if(IsInheritableDiseaseData[i].DISEASE_ID == urIsInheritableDiseaseData[j].DISEASE_ID){
					    						str+= "id='family' class='livefs_2 livefs'";
					    					}
					    				}
				    				}
				    				str+= " >"+IsInheritableDiseaseData[i].NAME+"<input type='hidden' value='"+IsInheritableDiseaseData[i].DISEASE_ID+"'></li>";
				    				//str+= "<li>"+IsInheritableDiseaseData[i].NAME+"</li>";
				    			}
				    			str += "</ul>"+
				       			"</div>"+
				                "<h4 id='personage3' class='family col-lg-12 col-xs-12 col-md-12 col-sm-12'>关注疾病信息</h4>"+
				                "<div class='personage_illness_3  col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
				                   "<ul>";
				    			for(var i=0;i<IsHighIncidence.length;i++){
				    				str+= "<li ";
				    				if(urIsHighIncidence!=undefined){
					    				for(var j=0;j<urIsHighIncidence.length;j++){
					    					if(IsHighIncidence[i].DISEASE_ID == urIsHighIncidence[j].DISEASE_ID){
					    						str+= "id='focus' class='livefs_3 livefs'";
					    					}
					    				}
				    				}
				    				str+= " >"+IsHighIncidence[i].NAME+"<input type='hidden' value='"+IsHighIncidence[i].DISEASE_ID+"'></li>";
				    				//str+= "<li>"+IsHighIncidence[i].NAME+"</li>";
				    			}
				    			str+=  "</ul>"+
				                "</div>"  +
				                "<div class='message_next3  col-lg-12 col-xs-12 col-md-12 col-sm-12' >" +
				                 "<p style=\"display: block\">";
				    			if(userId == ReadCookie("userId")){
				    				 str+="<a href=\"#\" class=\"message_next_a3 weui_btn weui_btn_plain_primary\" onclick='on_click3(\""+userId+"\")'>下一步</a>" ;
				    			}else{
				    				str+= "<a href=\"#\" class=\"message_next_a3 weui_btn weui_btn_plain_primary\" onclick='addUserAndUser(\""+userId+"\")'>确定添加</a>" ;
				    			}
				                   
				                str+= "</p>" +
				                "</div>" ;
				    			  $('.content').html(str);
				    			  duoDisliv_1();
				    			  duoDisliv_2();
				    			  duoDisliv_3();
				    		}
				    	}
				    });
			}
	  });
}

function listDisease_1(userId){//修改关心人的疾病信息
	 $.ajax({
		  	url:url+"/restdisease/listAllDiseaseByUserID",
	  		type:"post",
	  		contentType:'application/json;charset=utf8',
	  		data:JSON
	  			.stringify({
	  				"userID" : userId
	  			}),
	  		dataType : "json",
	  		async : false,
			cache : false,
			success:function(ur){
				var urallData = eval(ur.allData);
				var urIsInheritableDiseaseData = eval(ur.IsInheritableDiseaseData);
				var urIsHighIncidence = eval(ur.IsHighIncidence);
				 $.ajax({
				    	url:url+"/restdisease/listAllDisease",
				    	type:"post",
				    	async : false,
						cache : false,
				    	success:function(r){
				    		if(r.msg == "success"){
				    			var str = "";
				    			var allData = eval(r.allData);//个人疾病
				    			var IsInheritableDiseaseData = eval(r.IsInheritableDiseaseData);//家族疾病
				    			var IsHighIncidence = eval(r.IsHighIncidence);//关注疾病（高发疾病）
				    			str+="<h4 id='personage1' class='personage col-lg-12 col-xs-12 col-md-12 col-sm-12'>个人疾病信息</h4>"+
				                	 "<div class='personage_illness_1  col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
				                	 	"<ul>";
				    			for(var i=0;i<allData.length;i++){
				    				str+= "<li ";
				    				if(urallData!=undefined){
				    					for(var j=0;j<urallData.length;j++){
					    					if(allData[i].DISEASE_ID == urallData[j].DISEASE_ID){
					    						str+= "id='personal' class='livefs_1 livefs'";
					    					}
					    				}
				    				}
				    				str+= " >"+allData[i].NAME+"<input type='hidden' value='"+allData[i].DISEASE_ID+"'></li>";
				    			}
				    			str += "</ul>"+
				               			"</div>"+
						                "<h4 id='personage2' class='family col-lg-12 col-xs-12 col-md-12 col-sm-12'>家族疾病信息</h4>"+
						                "<div class='personage_illness_2  col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
						                   "<ul>";
				    			for(var i=0;i<IsInheritableDiseaseData.length;i++){
				    				str+= "<li ";
				    				if(urIsInheritableDiseaseData!=undefined){
					    				for(var j=0;j<urIsInheritableDiseaseData.length;j++){
					    					if(IsInheritableDiseaseData[i].DISEASE_ID == urIsInheritableDiseaseData[j].DISEASE_ID){
					    						str+= "id='family' class='livefs_2 livefs'";
					    					}
					    				}
				    				}
				    				str+= " >"+IsInheritableDiseaseData[i].NAME+"<input type='hidden' value='"+IsInheritableDiseaseData[i].DISEASE_ID+"'></li>";
				    				//str+= "<li>"+IsInheritableDiseaseData[i].NAME+"</li>";
				    			}
				    			str += "</ul>"+
				       			"</div>"+
				                "<h4 id='personage3' class='family col-lg-12 col-xs-12 col-md-12 col-sm-12'>关注疾病信息</h4>"+
				                "<div class='personage_illness_3  col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
				                   "<ul>";
				    			for(var i=0;i<IsHighIncidence.length;i++){
				    				str+= "<li ";
				    				if(urIsHighIncidence!=undefined){
					    				for(var j=0;j<urIsHighIncidence.length;j++){
					    					if(IsHighIncidence[i].DISEASE_ID == urIsHighIncidence[j].DISEASE_ID){
					    						str+= "id='focus' class='livefs_3 livefs'";
					    					}
					    				}
				    				}
				    				str+= " >"+IsHighIncidence[i].NAME+"<input type='hidden' value='"+IsHighIncidence[i].DISEASE_ID+"'></li>";
				    				//str+= "<li>"+IsHighIncidence[i].NAME+"</li>";
				    			}
				    			str+=  "</ul>"+
				                "</div>"  +
				                "<div class='message_next3  col-lg-12 col-xs-12 col-md-12 col-sm-12' >" +
				                 "<p style=\"display: block\">";
				    			
				    				 str+="<a href=\"#\" class=\"message_next_a3 weui_btn weui_btn_plain_primary\" onclick='on_click_3(\""+userId+"\")'>下一步</a>" ;
				    			
				                   
				                str+= "</p>" +
				                "</div>" ;
				    			  $('.content').html(str);
				    			  duoDisliv_1();
				    			  duoDisliv_2();
				    			  duoDisliv_3();
				    		}
				    	}
				    });
			}
	  });
}







function on_click3(userId){   //疾病信息 下一步
	$.ajax({
		url:url+"/restdisease/updateDisease",
  		type:"post",
  		contentType:'application/json;charset=utf8',
  		data:JSON
  			.stringify({
  				"userID" : userId,
  				"personalDiseaseID" :obtainId("livefs_1"),
  				"familyDiseaseID" :obtainId("livefs_2"),
  				"focusDiseaseID" :obtainId("livefs_3")
  			}),
  		dataType : "json",
  		async : false,
		cache : false,
		success:function(delr){
			
			if(delr.msg == "success"){
				carep(userId);
			}
		}
	});
	$('#guanxin').remove();
    $("#li4").addClass('active');
    $("#li3").removeClass('active');
}
function on_click_3(userId){
		$.ajax({
			url:url+"/restdisease/updateDisease",
	  		type:"post",
	  		contentType:'application/json;charset=utf8',
	  		data:JSON
	  			.stringify({
	  				"userID" : userId,
	  				"personalDiseaseID" :obtainId("livefs_1"),
	  				"familyDiseaseID" :obtainId("livefs_2"),
	  				"focusDiseaseID" :obtainId("livefs_3")
	  			}),
	  		dataType : "json",
	  		async : false,
			cache : false,
			success:function(delr){
				if(delr.msg == "success"){
					var userId = ReadCookie("userId");
					carep(userId);
				}
			}
		});
		
		$('.upname').hide();
		$('.information_header li').show();
	    $("#li4").addClass('active');
	    $("#li3").removeClass('active');
}

function black_(){
	var userId = ReadCookie("userId");
	$("#li1,#li2,#li3,#li4").css('display','block');
	 $("#li1").removeClass('active');
	 $("#li4").addClass('active');
	$("#up").remove();
	carep(userId);
	$('.message_next1').remove();
}



//获取关心的人
function carep(userId){
	$('.message_next1').remove();
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
				var str = "<div class=\"Care\">";
				var data = eval(r.data);
				if(data!=undefined){
					for(var i=0;i<data.length;i++){
						if(data[i].AVATAR != null){
							str+="<div  class=\"Care_one col-lg-5 col-xs-5 col-md-5 col-sm-5\">"+
									"<div class=\"Care_img\"  onclick='revamp(\""+data[i].USER_ID+"\",\""+data[i].ismodify+"\",\""+data[i].isprivacy+"\")'>"+
										"<img src="+data[i].AVATAR+" alt=\"\"/>"+
									"</div>"+
									"<div class=\"Care_guanxi\" style='text-align: center;padding-left: 1.2rem;'>"+
										"<span  class=\"guanming\">"+data[i].NAME+"</span>"+
										"<i  class=\"relation\">("+data[i].connection+")</i>"+
									"</div>"+
									"<div class=\"cancel \" onclick='delguan(\""+data[i].useranduser_id+"\",\""+userId+"\")'>取消关注</div>"+
								"</div>";
						}else{
							str+="<div  class=\"Care_one col-lg-5 col-xs-5 col-md-5 col-sm-5\">"+
							"<div class=\"Care_img\" onclick='revamp(\""+data[i].USER_ID+"\",\""+data[i].ismodify+"\",\""+data[i].isprivacy+"\")'>"+
								"<img src=\"../images/defaultimg.png\" alt=\"\"/>"+
							"</div>"+
							"<div class=\"Care_guanxi\" style='text-align: center;padding-left: 1.2rem;'>"+
								"<span  class=\"guanming\">"+data[i].NAME+"</span>"+
								"<i  class=\"relation\">("+data[i].connection+")</i>"+
							"</div>"+
							"<div class=\"cancel \" onclick='delguan(\""+data[i].useranduser_id+"\",\""+userId+"\")'>取消关注</div>"+
						"</div>";
						}
					}
				}
				
				str+= "</div>"+
					  "<div class=\"button_sp_area col-lg-12 col-xs-12 col-md-12 col-sm-12\">"+
					  	"<a href=\"../subject/addcare.html\"  class=\"add weui_btn_plain_primary\" >添加</a>"+
					  "</div>";
				 $('.content').html(str);
			}
	});
}



function lookupUser(userId){
	 var userId = ReadCookie("userId");
	var phone = $("#phone").val();
	   if(!phone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)){
	       $("#phone").val('');
	       $('#phone').attr('placeholder','请正确输入手机号！');
	       $('.message_next_a1').css({'background':'rgb(69, 201, 162)','border':'none','color':'#ffffff'});
	       return;
	   };
	 
	$.ajax({
		url:url+"/rest/saveByPhone",
  		type:"post",
  		contentType:'application/json;charset=utf8',
  		data:JSON
  			.stringify({
  				"phone" : phone,
  				"userId":userId
  			}),
  		dataType : "json",
  		async : false,
		cache : false,
		success:function(r){
			var data = eval(r.data);
			if(r.result == "success"){
				findByUserId(data.USER_ID);
			}else if(r.result == "repeat"){
				
				var str ="<div class='uldiv'>";
				for(var i=0;i<data.length;i++){
					str +="<ul id='"+data[i].USER_ID+"' class='cf' onclick='addition(\""+data[i].USER_ID+"\")' >"+
								"<li>"+data[i].NAME+"</li>"+
								"<li>"+data[i].PHONE+"</li>"+
							 "</ul>";
				}
				str+="</div>";
				$('.Name').after(str);
				$('.uldiv').before('<p class="sele">请选择你要添加关系的人！</p>');
				$('.message_next').before("<div class='addguanxi'></div>");
				$('.message_next').hide();
				var ensure= "<tr class='message_next1  col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
					        "<td style=\"display: block\">" +
					            "<a href=\"#\" id='message_next1' class=\"message_next_a1 weui_btn weui_btn_plain_primary\" onclick='lookupUser1()'>确认添加</a>" +
					        "</td>" +
					    "</tr>" ;
				$('.kongdiv').html(ensure);
			}
		}
	});
}
function addition(id){
	//console.log(id);
	$('#'+id).addClass('color').siblings().removeClass('color'); 
	$('.addguanxi').html('<span class="gx">请输入关系:</span><input id="relation_" class="relation_" type="text" placeholder="如：朋友"/><input id="userid_two" type="hidden" value="'+id+'"/><p class="shuru"  style="display:none;float: left;text-align: center;width: 100%;color: red;">请输入关系！！！</p>');
}
function lookupUser1(){
	var userId = ReadCookie("userId");
	var userid_two = $('#userid_two').val();
	var relation =$('#relation_').val();
	$.ajax({
		url:url+"/rest/repeatUser",
  		type:"post",
  		contentType:'application/json;charset=utf8',
  		data:JSON
  			.stringify({
  				"userid_one" : userId,
  				"userid_two":userid_two,
  				"connection":relation
  			}),
  		dataType : "json",
  		async : false,
		cache : false,
		success:function(r){
			if(r.result == "success"){
				black_();
				$('.message_next1').remove();
				$('.shuru').hide();
			}else if(r.result == 'error'){
				$('.shuru').show();
			}else if(r.result == 'existence'){
				$('.shuru').show();
				$('.shuru').text('关系已存在！');
			}
			
		}
	});
	
}


function findByUserId(userId){
	$('.content').html(basic);
	$('.iphone').remove();
	$(".information_header").append(guanxin);
	$("#li1,#li2,#li3,#li4").css('display','none');
	$('#li1').css('color', 'rgb(126, 200, 136)');
	
	$('#li1').before('<span style="font-size: .7rem;padding: 0;text-align: center;" class="addname col-lg-12 col-xs-12 col-md-12 col-sm-12">您正在添加关心人的信息！</span>');
	$.initProv("#pro", "#city", "北京市", "北京市");
    $.initProv1("#pro1", "#city1", "北京市", "北京市");
	jibenxinxi(userId);
	
}

function addUserAndUser(userId){
	var user_id = ReadCookie("userId");
	var connection = ReadCookie("connection");
	$.ajax({
		url:url+"/rest/saveUserAndUser",
  		type:"post",
  		contentType:'application/json;charset=utf8',
  		data:JSON
  			.stringify({
  				"userId" : user_id,
  				"user_Id":userId,
  				"connection":connection
  			}),
  		dataType : "json",
  		async : false,
		cache : false,
		success:function(r){
			if(r.result == "success"){
				on_click3(user_id);
				$("#li1,#li2,#li3,#li4").css('display','block');
				$('#li4').css('margin-left', '0');
				$('.addname').css('display','none');
				$("#li1").css('color','#000000');
			}
		}
	});
}
$('.content').delegate("#personage1",'click',function(){
	$(".personage_illness_1").toggle(300);
})
$('.content').delegate("#personage2",'click',function(){
	$(".personage_illness_2").toggle(300);
})
$('.content').delegate("#personage3",'click',function(){
	$(".personage_illness_3").toggle(300);
})


//取消关注

function delguan(useranduserid,userId){
	$.ajax({
		url:url+"/rest/deleteRelationUser",
  		type:"post",
  		contentType:'application/json;charset=utf8',
  		data:JSON
  			.stringify({
  				"useranduser_id" : useranduserid
  			}),
  		dataType : "json",
  		async : false,
		cache : false,
		success:function(r){
			if(r.result == "success"){
				carep(userId);
				}else{
					alert('程序异常！');
				}
			}
	})
}






