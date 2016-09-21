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
        //carep(userId);
        window.location="../subject/privacy.html";
        $('#guanxin').remove();
    }
});


//生活方式多选
$('.content').delegate(".livediv li","click",function(){
	$(this).toggleClass('livefs livefs_3');
	
});
//生活方式单选
$('.content').delegate(".dandiv li","click",function(){
    //$(this).addClass('livefs livefs_3').siblings().removeClass('livefs livefs_3');  // 删除其他兄弟元素的样式
	$(this).toggleClass('livefs livefs_3').siblings().removeClass('livefs livefs_3');
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
    if(liID == 'li4'){  //亚健康
        //carep(userId);
    	sub_health(userId);
    	//window.location="../subject/privacy.html";
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
    var BIRTHDAY=$('#appDate').val();//获取生日
    //alert(BIRTHDAY);
    var HEIGHT= $('.height').val();//获取身高
    var WEIGHT=$('.weigth').val();//获取体重
    var phone = $('#vali').val();//获取手机号
    
   // if(phone != ''){
    	  $.ajax({
  	        type: "post",
  	        url: url+"/rest/updateUser",
  	        contentType:"application/json;charset=utf8",
  	        data: JSON.stringify({"tel":phone,"userId":userId,"sex":SEX,"name":NAME,"marriageStatus":MARRIAGESTATUS,"birthPlace":BIRTHPLACE,"livePlace":LIVEPLACE,"career":CAREER,"degree":DEGREE,"birthday":BIRTHDAY,"height":HEIGHT,"weight":WEIGHT}),
  	        dataType: "json",
  	        success: function (r) {
  	            if (r.result == "success") {
  	            	 console.log('保存成功');
  	            	$('#headname').text(r.data.NAME);//获取姓名
  	            }else{
  	            	 console.log('1');
  	            }
  	        }
  	       
  	    });
    	
    //}else{
    	//$('.error').show();
    //};
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

//next 修改关心的人  基本信息保存下一步
function msgsave_1(userId){
	var userID  = ReadCookie("userId");
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
    var relation =$("#relation").val();
    var BIRTHDAY=$('#appDate').val();//获取生日
    var HEIGHT= $('.height').val();//获取身高
    var WEIGHT=$('.weigth').val();//获取体重
    var phone = $('#vali').val();//获取手机号
    var relation =$('#relation').val();//获取关系
    console.log(relation);
    console.log(userID);
   /* if(phone != ''){*/
    	  $.ajax({
  	        type: "post",
  	        url: url+"/rest/updateUser",
  	        contentType:"application/json;charset=utf8",
  	        data: JSON.stringify({"connection":relation,"userid":userID,"tel":phone,"userId":userId,"sex":SEX,"name":NAME,"marriageStatus":MARRIAGESTATUS,"birthPlace":BIRTHPLACE,"livePlace":LIVEPLACE,"career":CAREER,"degree":DEGREE,"birthday":BIRTHDAY,"height":HEIGHT,"weight":WEIGHT}),
  	        dataType: "json",
  	        success: function (r) {
  	            if (r.result == "success") {
  	            	 console.log('保存成功');
  	            	$('#headname').text(r.data.NAME);//获取姓名
  	            }else{
  	            	 console.log('1');
  	            }
  	        }
  	       
  	    });
    	
   /* }else{
    	$('.error').show();
    };*/
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
				//listDisease(userId);
				sub_health(userId);
			}
		}
	});
	$('#guanxin').remove();
    $("#li4").addClass('active');
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
				//listDisease_1(userId);
				sub_health_1(userId);
			}
		}
	});
	$('#guanxin').remove();
    $("#li4").addClass('active');
    $("#li2").removeClass('active');
}



function listDisease(userId){//疾病信息
	console.log(userId);
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
				    				str+= "<a href=\"#\" class=\"message_next_a3 weui_btn weui_btn_plain_primary\" onclick='addUserAndUser(\""+userId+"\")'>确认添加</a>" ;
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
				//carep(userId);
				//window.location="../subject/Message.html";
				//sub_health(userId);
			}
		}
	});
	$('#guanxin').remove();
    $("#li4").addClass('active');
    $("#li3").removeClass('active');
}



function sub_health(userId){  //用户自己 亚健康
	$.ajax({
		url : url+'/restSubhealth/listAllTSubhealthAndCategory',
		type : 'post',
		contentType:'application/json;charset=utf8',
		data:JSON
			.stringify({
				"userID" : userId
			}),
		dataType : "json",
  		async : false,
		cache : false,
		success : function(r) {
			var data1 = eval(r.categorydata);
			var data2 = eval(r.subdata);
			var data3 = eval(r.userdata);
			var i='';
			var str3 = "";
			if (r.creategoryResult == 'success') {
				$('.content').html('');
				for (var i = 0; i < data1.length; i++) {
					var str1 = "";
					var str = "";
						str += "<div class='ddiv livediv col-lg-12 col-xs-12 col-md-12 col-sm-12' data-name='ddiv"+(i+1)+"' id='ddiv"
							+ (i + 1)
							+ "'>"
							+ "<span class='col-lg-3 col-xs-3 col-md-3 col-sm-3' >"
							+ data1[i].NAME + "</span>" + "</div>";
						if (r.subhealthResult == 'success') {
							 str1 += "<ul class='liveul col-lg-9 col-xs-9 col-md-9 col-sm-9'>";
								for (var a = 0; a < data2.length; a++) {
									if(data2[a].SUBHEALTHCATEGORY_ID == data1[i].SUBHEALTHCATEGORY_ID){
										str1 +="<li "
										if( data3!=undefined){
										for(var b=0; b<data3.length; b++){
											if(data3[b].SUBHEALTH_ID == data2[a].SUBHEALTH_ID){
												str1 += "class='livefs livefs_3'"
												}
											}
										str1 +=">"+ data2[a].NAME+ "<input type='hidden' value='"+data2[a].SUBHEALTH_ID+"'/></li>";
										}
										
									}
									
								}
								str1 += "</ul>";
							
						}
						$('.content').append(str);
						$("#ddiv" + (i+ 1)).append(str1);
				}
				
			
			str3 += "<div class='message_next2  col-lg-12 col-xs-12 col-md-12 col-sm-12'>"
						+ "<p style=\"display: block\">"
						+ "<a href=\"#\" class=\"message_next_a2 weui_btn weui_btn_plain_primary\" onclick='sub_click2(\""+userId+"\")'>下一步</a>"
						+ "</p>" + "</div>";
				$('.content').append(str3);
				
			}else{
				var str4 = "<div class='message_next2  col-lg-12 col-xs-12 col-md-12 col-sm-12'>"
					+ "<p style=\"display: block\">"
					+ "<a href=\"#\" class=\"message_next_a2 weui_btn weui_btn_plain_primary\" onclick='sub_click2(\""+userId+"\")'>下一步</a>"
					+ "</p>" + "</div>";
			$('.content').html(str4);
			}
		}
	})
}
function sub_click2(userId){  //亚健康修改或保存
		var str=""
			$(".livefs_3 input").each(function() {
				str += $(this).val()+","
		    });
	$.ajax({
		url:url+"/restSubhealth/updateSubhealth",
  		type:"post",
  		contentType:'application/json;charset=utf8',
  		data:JSON
  			.stringify({
  				"userID" : userId,
  				"subhealthID" :str
  			}),
  		dataType : "json",
  		async : false,
		cache : false,
		success:function(r){
			if(r.msg == "success"){
				listDisease(userId);
				 $("#li3").addClass('active');
				 $("#li4").removeClass('active');
				//window.location="../subject/Message.html";
			}
		}
	});
}



function on_click_3(userId){//新用户 修改关系的人
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
					//carep(userId);
					//sub_health_1(userId);
					window.location="../subject/privacy.html";
				}
			}
		});
		
		$('.upname').hide();
		$('.information_header li').show();
	    $("#li4").addClass('active');
	    $("#li3").removeClass('active');
}

function sub_health_1(userId){  //用户自己 亚健康
	$.ajax({
		url : url+'/restSubhealth/listAllTSubhealthAndCategory',
		type : 'post',
		contentType:'application/json;charset=utf8',
		data:JSON
			.stringify({
				"userID" : userId
			}),
		dataType : "json",
  		async : false,
		cache : false,
		success : function(r) {
			var data1 = eval(r.categorydata);
			var data2 = eval(r.subdata);
			var data3 = eval(r.userdata);
			var i='';
			var str3 = "";
			if (r.creategoryResult == 'success') {
				$('.content').html('');
				for (var i = 0; i < data1.length; i++) {
					var str1 = "";
					var str = "";
						str += "<div class='ddiv livediv col-lg-12 col-xs-12 col-md-12 col-sm-12' data-name='ddiv"+(i+1)+"' id='ddiv"
							+ (i + 1)
							+ "'>"
							+ "<span class='col-lg-3 col-xs-3 col-md-3 col-sm-3' >"
							+ data1[i].NAME + "</span>" + "</div>";
						if (r.subhealthResult == 'success') {
							 str1 += "<ul class='liveul col-lg-9 col-xs-9 col-md-9 col-sm-9'>";
								for (var a = 0; a < data2.length; a++) {
									if(data2[a].SUBHEALTHCATEGORY_ID == data1[i].SUBHEALTHCATEGORY_ID){
										str1 +="<li "
										if( data3!=undefined){
										for(var b=0; b<data3.length; b++){
											if(data3[b].SUBHEALTH_ID == data2[a].SUBHEALTH_ID){
												str1 += "class='livefs livefs_3'"
												}
											}
										str1 +=">"+ data2[a].NAME+ "<input type='hidden' value='"+data2[a].SUBHEALTH_ID+"'/></li>";
										}
										
									}
									
								}
								str1 += "</ul>";
							
						}
						$('.content').append(str);
						$("#ddiv" + (i+ 1)).append(str1);
				}
				
			
			str3 += "<div class='message_next2  col-lg-12 col-xs-12 col-md-12 col-sm-12'>"
						+ "<p style=\"display: block\">"
						+ "<a href=\"#\" class=\"message_next_a2 weui_btn weui_btn_plain_primary\" onclick='sub_click2_1(\""+userId+"\")'>下一步</a>"
						+ "</p>" + "</div>";
				$('.content').append(str3);
				
			}else{
				var str4 = "<div class='message_next2  col-lg-12 col-xs-12 col-md-12 col-sm-12'>"
					+ "<p style=\"display: block\">"
					+ "<a href=\"#\" class=\"message_next_a2 weui_btn weui_btn_plain_primary\" onclick='sub_click2_1(\""+userId+"\")'>下一步</a>"
					+ "</p>" + "</div>";
			$('.content').html(str4);
			}
		}
	})
}
function sub_click2_1(userId){  //亚健康修改或保存
		var str=""
			$(".livefs_3 input").each(function() {
				str += $(this).val()+","
		    });
	$.ajax({
		url:url+"/restSubhealth/updateSubhealth",
  		type:"post",
  		contentType:'application/json;charset=utf8',
  		data:JSON
  			.stringify({
  				"userID" : userId,
  				"subhealthID" :str
  			}),
  		dataType : "json",
  		async : false,
		cache : false,
		success:function(r){
			if(r.msg == "success"){
				listDisease_1(userId);
				//window.location="../subject/privacy.html";
				 $("#li3").addClass('active');
				 $("#li4").removeClass('active');
			}
		}
	});
}




function black_(){
	var userId = ReadCookie("userId");
	$("#li1,#li2,#li3,#li4").css('display','block');
	 $("#li1").removeClass('active');
	 $("#li4").addClass('active');
	$("#up").remove();
	//carep(userId);
	window.location="../subject/privacy.html";
	$('.message_next1').remove();
	$('.upname').remove();
}
function click_yins(){
	 $("#li1").removeClass('active');
	 $("#li2").addClass('active');
	 $('.content').html('对方设置了隐私保护，不能查看该内容，请联系确认!');
	 $('.content').css('font-size','0.7rem');
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
							/*str+="<div  class=\"Care_one col-lg-5 col-xs-5 col-md-5 col-sm-5\">"+
									"<div class=\"Care_img\"  onclick='revamp(\""+data[i].USER_ID+"\",\""+data[i].uismodify+"\",\""+data[i].isprivacy+"\")'>"+
										"<img src="+data[i].AVATAR+" alt=\"\"/>"+
									"</div>"+
									"<div class=\"Care_guanxi\" style='text-align: center;padding-left: 1.2rem;'>"+
										"<span  class=\"guanming\">"+data[i].NAME+"</span>"+
										"<i  class=\"relation\">("+data[i].connection+")</i>"+
									"</div>"+
									"<div class=\"cancel \" onclick='delguan(\""+data[i].useranduser_id+"\",\""+userId+"\")'>取消关注</div>"+
								"</div>";*/
							str+="<div  class=\"Care_one line-normal-wrapper\" >"+
							"<div class= \"item  line-scroll-wrapper  \">"+	
							"<div class= \"line-normal-wrapper\" onclick='revamp(\""+data[i].USER_ID+"\",\""+data[i].uismodify+"\",\""+data[i].isprivacy+"\",\""+data[i].connection+"\")'>"+	
							"<div class=\"Care_img  \">"+
										"<img src="+data[i].AVATAR+" alt=\"\"/>"+
									"</div>"+
									"<div class=\"Care_guanxi \">"+
										"<div class=\"Care_guanxi_\"> "+
											"<span  class=\"guanming\">"+data[i].NAME+"</span>"+
											"<i  class=\"relation\">/"+data[i].connection+"</i>"+
										"</div>"+
										"<div class=\"Care_addr\"> "+
											"<span  class=\"juzhud\">居住地:</span>";
											//"<span  class=\"guanming\">"+data[i].LIVEPLACE+"</span>"+
											if(data[i].LIVEPLACE == undefined){
												str +="<span  class=\"guanming\">未填写</span>";
											}else{
												str +="<span  class=\"guanming\">"+data[i].LIVEPLACE+"</span>";
											}
											str +="</div>"+
									"</div>"+
									"<div class=\"Care_img1 \">"+
										"<img src=\"../images/arrows.png\" alt=\"\"/>"+
									"</div>"+
									"</div>"+
									"<div class=\"delg line-btn-delete \" onclick='delguan(\""+data[i].useranduser_id+"\",\""+userId+"\")'><img src=\"../images/delgx.png\" alt=\"\"/><span>取消</span></div>"+
									"</div>"+
								"</div>";
								//str+="<div class=\"cancel \" onclick='delguan(\""+data[i].useranduser_id+"\",\""+userId+"\")'>取消关注</div>";
						}else{
							/*str+="<div  class=\"Care_one col-lg-5 col-xs-5 col-md-5 col-sm-5\">"+
							"<div class=\"Care_img\" onclick='revamp(\""+data[i].USER_ID+"\",\""+data[i].uismodify+"\",\""+data[i].isprivacy+"\")'>"+
								"<img src=\"../images/defaultimg.png\" alt=\"\"/>"+
							"</div>"+
							"<div class=\"Care_guanxi\" style='text-align: center;padding-left: 1.2rem;'>"+
								"<span  class=\"guanming\">"+data[i].NAME+"</span>"+
								"<i  class=\"relation\">("+data[i].connection+")</i>"+
							"</div>"+*/
							//"<div class=\"cancel \" onclick='delguan(\""+data[i].useranduser_id+"\",\""+userId+"\")'>取消关注</div>"+
							str+="<div  class=\"Care_one line-wrapper\"  >"+
									"<div class= \"item  line-scroll-wrapper\">"+
									"<div class= \"line-normal-wrapper\"	onclick='revamp(\""+data[i].USER_ID+"\",\""+data[i].uismodify+"\",\""+data[i].isprivacy+"\",\""+data[i].connection+"\")'>"+
									"<div class=\"Care_img \" >"+
											"<img src=\"../images/defaultimg.png\" alt=\"\"/>"+
										"</div>"+
										"<div class=\"Care_guanxi \">"+
											"<div class=\"Care_guanxi_\"> "+
												"<span  class=\"guanming\">"+data[i].NAME+"</span>"+
												"<i  class=\"relation\">/"+data[i].connection+"</i>"+
											"</div>"+
											"<div class=\"Care_addr\"> "+
												"<span  class=\"juzhud\">居住地:</span>";
												//"<span  class=\"guanming\">"+data[i].LIVEPLACE+"</span>"+
												if(data[i].LIVEPLACE == undefined){
													str +="<span  class=\"guanming\">未填写</span>";
												}else{
													str +="<span  class=\"guanming\">"+data[i].LIVEPLACE+"</span>";
												}
												str +="</div>"+
										"</div>"+
										"<div class=\"Care_img1 \">"+
											"<img src=\"../images/arrows.png\" alt=\"\"/>"+
										"</div>"+
										"</div>"+
										"<div class=\"delg line-btn-delete\" onclick='delguan(\""+data[i].useranduser_id+"\",\""+userId+"\")'><img src=\"../images/delgx.png\" alt=\"\"/><span>取消</span></div>"+
										
										"</div>"+
										"</div>";
										//str += "<div class=\"cancel \" onclick='delguan(\""+data[i].useranduser_id+"\",\""+userId+"\")'>取消关注</div>";
						}
					}
				}
				
				str+= "</div>"+
					 /*"<div class=\"button_sp_area col-lg-12 col-xs-12 col-md-12 col-sm-12\">"+
					  	"<a href=\"../subject/addcare.html\"  class=\"add weui_btn_plain_primary\" >添加</a>"+
					  "</div>";*/
				 "<div class=\"button_sp_area col-lg-12 col-xs-12 col-md-12 col-sm-12\" onclick='adduser()'>"+
				 	"<a href=\"#\"  class=\"add weui_btn_plain_primary\" >添加</a>"+
			  	 "</div>";
				 $('.content').html(str);
			}
	});
	
}
function adduser(){
	var str = "<table style='display: block; width:100%;' class='tabl col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
				    "<tbody style='display: block' >" +
				    "<tr id='trname' class='Name col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
					    "<td>" +
					    		"<img style='width:.7rem;margin-right: .5rem;' class='guan_phone' src=\"../images/phone.png\" alt=\"\"/>"+
					    "</td>" +
					    "<td>手机号/名字</td>" +
					            "<td>" +
					                "<input id='phone'style='margin-left: .5rem;width: 8rem;' type='text' maxlength='11' placeholder='请输入手机号/名字！'/>" +
					            "</td>" +
				     "</tr>" +
				     
				     "<tr class='message_next  col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
				        "<td style=\"display: block\">" +
				            "<a href=\"#\" id='message_next' class=\"message_next_a1 weui_btn weui_btn_plain_primary\" onclick='lookupUser()'>下一步</a>" +
				        "</td>" +
				    "</tr>" +
				        "</tbody>" +
		        "</table>";
	var he =($('.Header ').height() + $('.content').height()+$('.kong_div').height()+$('.footer').height());
	var whe =$(window).height();
		$('.button_sp_area').before(str);
		$('.button_sp_area').hide();
		if(he > whe){
			 $.scrollTo('.kong_div'); 
			//$('.content').scrollTop( $('.content')[0].scrollHeight );
		}
}


function lookupUser(userId){
	 var userId = ReadCookie("userId");
	var phone = $("#phone").val();
	var i;
	   if(!phone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)){
	      /* $("#phone").val('');
	       $('#phone').attr('placeholder','请正确输入手机号！');
	       $('.message_next_a1').css({'background':'rgb(69, 201, 162)','border':'none','color':'#ffffff'});*/
	       i =1;
	   }else{
		   i =0;
	   }
	  
	$.ajax({
		url:url+"/rest/saveByPhone",
  		type:"post",
  		contentType:'application/json;charset=utf8',
  		data:JSON
  			.stringify({
  				"phone" :phone,
  				"userId":userId,
  				"i":i
  			}),
  		dataType : "json",
  		async : false,
		cache : false,
		success:function(r){
			var data = eval(r.data);
			if(r.result == "success"){
				findByUserId(data.USER_ID);
			}else if(r.result == "repeat"){
				//$('.button_sp_area').show();
				var str ="<div class='uldiv'>";
				for(var i=0;i<data.length;i++){
					/*str +="<ul id='"+data[i].USER_ID+"' class='cf'  >"+
								"<li>"+data[i].NAME+"</li>"+
								"<li>"+data[i].PHONE+"</li>"+
							 "</ul>";*/
					str +="<div id='"+data[i].USER_ID+"'  class=\"Care_one cf col-lg-12 col-xs-12 col-md-12 col-sm-12\"  onclick='addition(\""+data[i].USER_ID+"\")'>"+
					"<div class=\"Care_img col-lg-2 col-xs-2 col-md-2 col-sm-2\">"+
						"<img src="+data[i].AVATAR+" alt=\"\"/>"+
					"</div>"+
					"<div class=\"Care_guanxi col-lg-7 col-xs-7 col-md-7 col-sm-7\">"+
						"<div class=\"Care_guanxi_\"> "+
							"<span  class=\"guanming\">"+data[i].NAME+"</span>"+
							"<i  class=\"relation\">/"+data[i].PHONE+ "</i>"+
						"</div>"+
						"<div class=\"Care_addr1\"> "+
							"<span  class=\"juzhud\">居住地:</span>"+
							"<span  class=\"guanming\">"+data[i].LIVEPLACE+"</span>"+
						"</div>"+
					"</div>"+
					"<div class=\"Care_img1 col-lg-3 col-xs-3 col-md-3 col-sm-3\">"+
						"<img src=\"../images/arrows.png\" alt=\"\"/>"+
					"</div>"+
				"</div>";
				}
				str+="</div>";
				$('.Name').after(str);
				$('.uldiv').before('<p class="sele">请选择并添加关心的人</p>');
				$('.message_next').before("<div class='addguanxi'></div>");
				$('.message_next').hide();
				var ensure= "<tr class='message_next1  col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
					        "<td style=\"display: block\">" +
					            "<a href=\"#\" id='message_next1' class=\"message_next_a1 weui_btn weui_btn_plain_primary\" onclick='lookupUser1()'>确认添加</a>" +
					        "</td>" +
					    "</tr>" ;
				$('.addguanxi').after(ensure);
				$('#phone').bind('input propertychange', function() { 
					 //进行相关操作 
					//console.log($('#phone').val());
					$('.sele').remove();
					$('.uldiv').remove(); 
					$('.message_next').show();
					$('.kongdiv').html('');
					$('.addguanxi').remove();
					$('.message_next1').remove();
					});
			}
		}
	});
}

function addition(id){
	
	$('#'+id).addClass('color').siblings().removeClass('color');
	$('#'+id).find('.Care_img1 img').attr('src','../images/arrows1.png');
	$('#'+id).siblings().find('.Care_img1 img').attr('src','../images/arrows.png');
	$('.addguanxi').html('<span class="gx">请输入关系:</span><input id="relation_" class="relation_" type="text" placeholder="如：朋友、同事等。"/><input id="userid_two" type="hidden" value="'+id+'"/><span class="shuru"  style="display:none;font-size: .5rem;margin-left: .5rem;color: red;">请输入关系！</span>');
}
function lookupUser1(id){
	var userId = ReadCookie("userId");
	var userid_two = $('#userid_two').val();
	var relation =$('#relation_').val();
	if(userid_two == userId){
		$('.addguanxi').html('<span class="gx" style="color:red;">不能添加自己！！！</span>');
	}
	else{
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
				//black_();
				window.location="../subject/privacy.html";
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
}


function findByUserId(userId){
	$('.Headerul').hide();
	$('.content').html(basic);
	 var currYear = (new Date()).getFullYear();	
		var opt={};
		opt.date = {preset : 'date'};
		opt.datetime = {preset : 'datetime'};
		opt.time = {preset : 'time'};
		opt.default = {
			theme: 'android-ics light', //皮肤样式
	        display: 'modal', //显示方式 
	        mode: 'scroller', //日期选择模式
			dateFormat: 'yyyy-mm-dd',
			lang: 'zh',
			showNow: true,
			nowText: "今天",
	        startYear: currYear - 86, //开始年份
	        endYear: currYear + 10 //结束年份
		};

	  	$("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
	//$('.iphone').remove();
	//("#li1,#li2,#li3").css('display','none');
	$('#li1').css('color', 'rgb(126, 200, 136)');
	//$('.Header').html('<span style="font-size: .7rem;padding: 0;text-align: center;" class="addname col-lg-12 col-xs-12 col-md-12 col-sm-12">您正在添加关心人的信息！</span>');
	$(".Header").after(guanxin);
	$.initProv("#pro", "#city", "北京市", "北京市");
    $.initProv1("#pro1", "#city1", "北京市", "北京市");
    var strr ="<div class='information_header col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
		"<ul>"+
			"<li id='li_1' class=''>"+
				"<img class='portrait'  src='../images/head_portrait.jpg' alt=''/>"+
				"<span id='headname' class='headname'></span>"+
			"</li>"+
			"<li id='li1' class='information_header_li active '>基本信息</li>"+
			"<li id='li2' class='information_header_li '>生活方式</li>"+
			"<li id='li4' class='information_header_li '>亚健康</li>"+
			"<li id='li3' class='information_header_li '>疾病信息</li>"+
			
			
		"</ul>"+
		"</div>";

    $('.Header').html(strr);
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
				//on_click_3(user_id);
				//sub_health_3(userId);
				window.location="../subject/privacy.html";
			}
		}
	});
	$('.upname').hide();
	$('.information_header li').show();
}

function sub_health_3(userId){  //添加关心人  亚健康
	$.ajax({
		url : url+'/restSubhealth/listAllTSubhealthAndCategory',
		type : 'post',
		contentType:'application/json;charset=utf8',
		data:JSON
			.stringify({
				"userID" : userId
			}),
		dataType : "json",
  		async : false,
		cache : false,
		success : function(r) {
			var data1 = eval(r.categorydata);
			var data2 = eval(r.subdata);
			var data3 = eval(r.userdata);
			var i='';
			var str3 = "";
			if (r.creategoryResult == 'success') {
				$('.content').html('');
				for (var i = 0; i < data1.length; i++) {
					var str1 = "";
					var str = "";
						str += "<div class='ddiv livediv col-lg-12 col-xs-12 col-md-12 col-sm-12' data-name='ddiv"+(i+1)+"' id='ddiv"
							+ (i + 1)
							+ "'>"
							+ "<span class='col-lg-3 col-xs-3 col-md-3 col-sm-3' >"
							+ data1[i].NAME + "</span>" + "</div>";
						if (r.subhealthResult == 'success') {
							 str1 += "<ul class='liveul col-lg-9 col-xs-9 col-md-9 col-sm-9'>";
								for (var a = 0; a < data2.length; a++) {
									if(data2[a].SUBHEALTHCATEGORY_ID == data1[i].SUBHEALTHCATEGORY_ID){
										str1 +="<li "
										if( data3!=undefined){
										for(var b=0; b<data3.length; b++){
											if(data3[b].SUBHEALTH_ID == data2[a].SUBHEALTH_ID){
												str1 += "class='livefs livefs_3'"
												}
											}
										str1 +=">"+ data2[a].NAME+ "<input type='hidden' value='"+data2[a].SUBHEALTH_ID+"'/></li>";
										}
										
									}
									
								}
								str1 += "</ul>";
							
						}
						$('.content').append(str);
						$("#ddiv" + (i+ 1)).append(str1);
				}
				
			
			str3 += "<div class='message_next2  col-lg-12 col-xs-12 col-md-12 col-sm-12'>"
						+ "<p style=\"display: block\">"
						+ "<a href=\"#\" class=\"message_next_a2 weui_btn weui_btn_plain_primary\" onclick='sub_click3(\""+userId+"\")'>确认添加</a>"
						+ "</p>" + "</div>";
				$('.content').append(str3);
				
			}else{
				var str4 = "<div class='message_next2  col-lg-12 col-xs-12 col-md-12 col-sm-12'>"
					+ "<p style=\"display: block\">"
					+ "<a href=\"#\" class=\"message_next_a2 weui_btn weui_btn_plain_primary\" onclick='sub_click3(\""+userId+"\")'>确认添加</a>"
					+ "</p>" + "</div>";
			$('.content').html(str4);
			}
		}
	})
}
function sub_click3(userId){  //亚健康修改或保存
		var str=""
			$(".livefs_3 input").each(function() {
				str += $(this).val()+","
		    });
	$.ajax({
		url:url+"/restSubhealth/updateSubhealth",
  		type:"post",
  		contentType:'application/json;charset=utf8',
  		data:JSON
  			.stringify({
  				"userID" : userId,
  				"subhealthID" :str
  			}),
  		dataType : "json",
  		async : false,
		cache : false,
		success:function(r){
			if(r.msg == "success"){
				window.location="../subject/privacy.html";
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
				huand();
				}else{
					alert('程序异常！');
				}
			}
	})
}


function huand(){
	   // 设定每一行的宽度=屏幕宽度+按钮宽度
	   $(".line-scroll-wrapper").width($(".line-wrapper").width() + $(".line-btn-delete").width());
	    // 设定常规信息区域宽度=屏幕宽度
	    $(".line-normal-wrapper").width($(".line-wrapper").width());
	    // 设定文字部分宽度（为了实现文字过长时在末尾显示...）
	   
	    // 获取所有行，对每一行设置监听
	    var lines = $(".line-normal-wrapper");
	    var len = lines.length;
	    var lastX, lastXForMobile;
	    // 用于记录被按下的对象
	    var pressedObj;  // 当前左滑的对象
	    var lastLeftObj; // 上一个左滑的对象
	    // 用于记录按下的点
	    var start;
	    // 网页在移动端运行时的监听
	    for (var i = 0; i < len; ++i) {
	        lines[i].addEventListener('touchstart', function(e){
	            lastXForMobile = e.changedTouches[0].pageX;
	            pressedObj = this; // 记录被按下的对象
	            // 记录开始按下时的点
	            var touches = event.touches[0];
	            start = {
	                x: touches.pageX, // 横坐标
	                y: touches.pageY  // 纵坐标
	            };
	        });
	        lines[i].addEventListener('touchmove',function(e){
	            // 计算划动过程中x和y的变化量
	            var touches = event.touches[0];
	            delta = {
	                x: touches.pageX - start.x,
	                y: touches.pageY - start.y
	            };
	            // 横向位移大于纵向位移，阻止纵向滚动
	            if (Math.abs(delta.x) > Math.abs(delta.y)) {
	                event.preventDefault();
	            }
	        });
	        lines[i].addEventListener('touchend', function(e){
	            var diffX = e.changedTouches[0].pageX - lastXForMobile;
	            if (diffX < -150) {
	                $(pressedObj).animate({marginLeft:"-40px"}, 200); // 左滑
	                lastLeftObj && lastLeftObj != pressedObj &&
	                $(lastLeftObj).animate({marginLeft:"0"}, 200); // 已经左滑状态的按钮右滑
	                lastLeftObj = pressedObj; // 记录上一个左滑的对象
	            } else if (diffX > 150) {
	                $(pressedObj).animate({marginLeft:"0"}, 200); // 右滑
	                lastLeftObj = null; // 清空上一个左滑的对象
	            }
	        });
	    }
	    // 网页在PC浏览器中运行时的监听
	    for (var i = 0; i < len; ++i) {
	        $(lines[i]).bind('mousedown', function(e){
	            lastX = e.clientX;
	            pressedObj = this; // 记录被按下的对象
	        });
	        $(lines[i]).bind('mouseup', function(e){
	            var diffX = e.clientX - lastX;
	            if (diffX < -150) {
	                $(pressedObj).animate({marginLeft:"-40px"}, 200); // 左滑
	                lastLeftObj && lastLeftObj != pressedObj &&
	                $(lastLeftObj).animate({marginLeft:"0"}, 200); // 已经左滑状态的按钮右滑
	                lastLeftObj = pressedObj; // 记录上一个左滑的对象
	            } else if (diffX > 150) {
	                $(pressedObj).animate({marginLeft:"0"}, 200); // 右滑
	                lastLeftObj = null; // 清空上一个左滑的对象
	            }
	        });
	    }
}

