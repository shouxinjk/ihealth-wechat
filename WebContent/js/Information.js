

function jibenxinxi(userId){
		//获取用户基本信息
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
					var sex = data.SEX;//获取性别
					//获取出生地
					
					var birs = data.BIRTHPLACE;
				if (birs != null && birs !=''){
					var birthArr= new Array();
					//按逗号拆分
					birthArr = birs.split(",");
					//循环取值
					$("#pro option:selected").text(birthArr[0]);
					$("#city option:selected").text(birthArr[1]);
					
					var livs = data.LIVEPLACE;
					var livsArr= new Array();
					livsArr = livs.split(",");
					$("#pro1 option:selected").text(livsArr[0]);
					$("#city1 option:selected").text(livsArr[1]);
				}
					$('#headname').text(data.NAME);
					$('#username').val(data.NAME);//获取姓名
					$("#user_id").val(data.USER_ID);
					$("#marriageM option:selected").text(data.MARRIAGESTATUS);//获取婚姻状况
					//$("#pro option:selected").text(data.);//获取出生地
					//$("#city option:selected").text(data.BIRTHPLACE);
					//$("#pro1 option:selected").text(data.);//获取常住地
					//$("#city1 option:selected").text(data.LIVEPLACE);
					
					$("#s1 option:selected").text(data.CAREER);//获取职业
					$("#s2 option:selected").text(data.DEGREE);//获取学历
					$('.Wdate').val(data.BIRTHDAY);//获取生日
					$('.height').val(data.HEIGHT);//获取身高
					$('.weigth').val(data.WEIGHT);//获取体重
					$('#vali').val(data.PHONE);//获取手机号
					$('.portrait').attr("src",data.AVATAR);//获取用户头像
					
					if (sex == '女') {
						$('#girl').attr("checked", "true");
						$('#boy').removeAttr("checked");

					} else if (sex == '男') {
						$('#boy').attr("checked", "true");
						$('#girl').removeAttr("checked");
					}
				}
			}

		});
		
	}
function revamp(userId,ismodify,isprivacy,connection){//获取修改用户的基本信息
	//$('.Headerul').hide();
	var strr ="<div class='information_header col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
				"<ul>"+
					"<li id='li_1' class=''>"+
						"<img class='portrait'  src='../images/head_portrait.jpg' alt=''/>"+
						"<span id='headname' class='headname'></span>"+
					"</li>"+
					"<li id='li1' class='information_header_li active '>基本信息</li>"+
					"<li id='li2' class='information_header_li '>生活方式</li>"+
					"<li id='li3' class='information_header_li '>疾病信息</li>"+
					
				"</ul>"+
			"</div>";
	
	$('.Header').html(strr);
	
	$('.information_header .information_header_li').click(function(){
	    $('.information_header_li').removeClass('active');
	    $(this).addClass('active');
	    var liID = $(this).attr("id");
	    if(liID == 'li1'){
	    	if(isprivacy == 1 || isprivacy == 'undefined'){
				$('.content').html(basic_ck);
				//$('#li1').before('<span style="font-size: .7rem;padding: 0;text-align: center;" id="up" class="upname col-lg-12 col-xs-12 col-md-12 col-sm-12">您正在查看关心人的信息！</span>');
				$('#vali').attr("disabled", true);//手机更改为只读方式
				$('#relation').attr('readOnly',true);//关系更改为只读方式
				var input1 = $(".content").find("input:radio");//性别更改为只读方式
				input1.attr("disabled","disabled");
			 	$("#marriageM ").prop("disabled", true);//婚姻状况更改为只读方式
				$('#username').attr('readOnly',true); //姓名更改为只读方式
				$('.Wdate').attr("disabled", true);//生日更改为只读方式
				$('.height').attr('readOnly',true);//身高更改为只读方式
				$('.weigth').attr('readOnly',true);//体重更改为只读方式
				$("#pro").prop("disabled", true);//出生地更改为只读方式
				$("#city").prop("disabled", true);
				$("#pro1").prop("disabled", true);//常住地更改为只读方式
				$("#city1").prop("disabled", true);
				$("#s1").prop("disabled", true);//职业更改为只读方式
				$("#s2").prop("disabled", true);//学历更改为只读方式
			 if(ismodify == 1 || ismodify == 'undefined'){
				 $('.content').html(basic_1);
				 //$('.upname').html('您正在修改关心人的信息！');
				 //$('#li1').before('<span style="font-size: .7rem;padding: 0;text-align: center;" id="up" class="upname col-lg-12 col-xs-12 col-md-12 col-sm-12">您正在修改关心人的信息！</span>');
			 }
		
		}else{
			$('.content').html(basic_ck);
			// $('#li1').before('<span style="font-size: .7rem;padding: 0;text-align: center;" id="up" class="upname col-lg-12 col-xs-12 col-md-12 col-sm-12">由于对方隐私您只能查看这些信息！</span>');
			$('#vali').attr("disabled", true);//手机更改为只读方式
			$('#relation').attr('readOnly',true);//关系更改为只读方式
			var input1 = $(".content").find("input:radio");//性别更改为只读方式
			input1.attr("disabled","disabled");
		 	$("#marriageM ").prop("disabled", true);//婚姻状况更改为只读方式
			$('#username').attr('readOnly',true); //姓名更改为只读方式
			$('.Wdate').attr("disabled", true);//生日更改为只读方式
			$('.height').attr('readOnly',true);//身高更改为只读方式
			$('.weigth').attr('readOnly',true);//体重更改为只读方式
			$("#pro").prop("disabled", true);//出生地更改为只读方式
			$("#city").prop("disabled", true);
			$("#pro1").prop("disabled", true);//常住地更改为只读方式
			$("#city1").prop("disabled", true);
			$("#s1").prop("disabled", true);//职业更改为只读方式
			$("#s2").prop("disabled", true);//学历更改为只读方式
			
		}
		
		 $('#li1').addClass('active');
		 //$("#li1,#li2,#li3,#li4").css('display','none');
		$('.information_header_li').next().removeClass('active');
	    $('.tcal').addClass('tcalInput');
	    $.initProv("#pro", "#city", "北京市", "北京市");
	    $.initProv1("#pro1", "#city1", "北京市", "北京市");
	    Height();//身高 体重验证
	    //手机号验证
	    $('#vali').blur(function(){
		  	  var mobilep = $('#vali').val();
		  	   if(!mobilep.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)){
		  	       $("#vali").val('');
		  	       $('#vali').attr('placeholder','请正确输入手机号！');
		  	       $('.error').show();
		  	       /*return;*/
		  	   }else{
		  		 $('.error').hide();
		  		
		  	   }
		  	 
		  });
		//获取用户基本信息
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
					var sex = data.SEX;//获取性别
					//获取出生地
					
					var birs = data.BIRTHPLACE;
				if (birs != null && birs !=''){
					var birthArr= new Array();
					//按逗号拆分
					birthArr = birs.split(",");
					//循环取值
					$("#pro option:selected").text(birthArr[0]);
					$("#city option:selected").text(birthArr[1]);
					
					var livs = data.LIVEPLACE;
					var livsArr= new Array();
					livsArr = livs.split(",");
					$("#pro1 option:selected").text(livsArr[0]);
					$("#city1 option:selected").text(livsArr[1]);
				}
				
					$("#relation").val(connection);//获取关系
					$("#user_id").val(data.USER_ID);
					$("#marriageM option:selected").text(data.MARRIAGESTATUS);//获取婚姻状况
					//$("#pro option:selected").text(data.);//获取出生地
					//$("#city option:selected").text(data.BIRTHPLACE);
					//$("#pro1 option:selected").text(data.);//获取常住地
					//$("#city1 option:selected").text(data.LIVEPLACE);
					
					$("#s1 option:selected").text(data.CAREER);//获取职业
					$("#s2 option:selected").text(data.DEGREE);//获取学历
					$('.Wdate').val(data.BIRTHDAY);//获取生日
					
					if(isprivacy == 0 ||( ismodify==0 && isprivacy == 0)){
						$(".weigth").val("**");
						$('.height').val("**");
						$('#username').val("*" +data.NAME.substring(1, 10));//获取姓名
						$('#vali').val((data.PHONE).substring(0, 3)+ "****" + (data.PHONE).substring(7, 11));//获取手机号
						$('#headname').text("*" +data.NAME.substring(1, 10));
						
					}else{
						$('.height').val(data.HEIGHT);//获取身高
						$('.weigth').val(data.WEIGHT);//获取体重
						$('#vali').val(data.PHONE);//获取手机号
						$('#username').val(data.NAME);//获取姓名
						$('#headname').text(data.NAME);
					}
					
					
					if (sex == '女') {
						$('#girl').attr("checked", "true");
						$('#boy').removeAttr("checked");

					} else if (sex == '男') {
						$('#boy').attr("checked", "true");
						$('#girl').removeAttr("checked");
					}
				}
			}

		});
	    	
	    	
	        $('.tcal').addClass('tcalInput');
	        $.initProv("#pro", "#city", "北京市", "北京市");
	        $.initProv1("#pro1", "#city1", "北京市", "北京市");
	        Height();//身高 体重验证
	        $('.message_next1').remove();
	    }
	    if(liID == 'li2'){
	    	if(isprivacy == 0 ||( ismodify==0 && isprivacy == 0)){
	    		 $('.content').html('对方设置了隐私保护，不能查看该内容，请联系确认!')
	 	        $('.message_next1').remove();
	    	}else{
	        tagCategory(userId);
	        //$('.content').html('由于主人设置了隐私权限，您不查看以下内容！')
	        $('.message_next1').remove();
	    	}
	    }
	    if(liID == 'li3'){
	    	if(isprivacy == 0 ||( ismodify==0 && isprivacy == 0)){
	    		$('.content').html('对方设置了隐私保护，不能查看该内容，请联系确认!')
		        $('.message_next1').remove();
	    	}else{
	    	listDisease_1(userId);
	    	//on_click_3(userId);
	    	//$('.content').html('由于主人设置了隐私权限，您不查看以下内容！')
	        $('.message_next1').remove();
	    	}
	    }
	});

	
	
	if(isprivacy == 1 || isprivacy == 'undefined'){
			$('.content').html(basic_ck);
			//$('#li1').before('<span style="font-size: .7rem;padding: 0;text-align: center;" id="up" class="upname col-lg-12 col-xs-12 col-md-12 col-sm-12">您正在查看关心人的信息！</span>');
			$('#vali').attr("disabled", true);//手机更改为只读方式
			$('#relation').attr('readOnly',true);//关系更改为只读方式
			var input1 = $(".content").find("input:radio");//性别更改为只读方式
			input1.attr("disabled","disabled");
		 	$("#marriageM ").prop("disabled", true);//婚姻状况更改为只读方式
			$('#username').attr('readOnly',true); //姓名更改为只读方式
			$('.Wdate').attr("disabled", true);//生日更改为只读方式
			$('.height').attr('readOnly',true);//身高更改为只读方式
			$('.weigth').attr('readOnly',true);//体重更改为只读方式
			$("#pro").prop("disabled", true);//出生地更改为只读方式
			$("#city").prop("disabled", true);
			$("#pro1").prop("disabled", true);//常住地更改为只读方式
			$("#city1").prop("disabled", true);
			$("#s1").prop("disabled", true);//职业更改为只读方式
			$("#s2").prop("disabled", true);//学历更改为只读方式
		 if(ismodify == 1 || ismodify == 'undefined'){
			 $('.content').html(basic_1);
			 //$('.upname').html('您正在修改关心人的信息！');
			 //$('#li1').before('<span style="font-size: .7rem;padding: 0;text-align: center;" id="up" class="upname col-lg-12 col-xs-12 col-md-12 col-sm-12">您正在修改关心人的信息！</span>');
		 }
	
	}else{
		$('.content').html(basic_ck);
		// $('#li1').before('<span style="font-size: .7rem;padding: 0;text-align: center;" id="up" class="upname col-lg-12 col-xs-12 col-md-12 col-sm-12">由于对方隐私您只能查看这些信息！</span>');
		$('#vali').attr("disabled", true);//手机更改为只读方式
		$('#relation').attr('readOnly',true);//关系更改为只读方式
		var input1 = $(".content").find("input:radio");//性别更改为只读方式
		input1.attr("disabled","disabled");
	 	$("#marriageM ").prop("disabled", true);//婚姻状况更改为只读方式
		$('#username').attr('readOnly',true); //姓名更改为只读方式
		$('.Wdate').attr("disabled", true);//生日更改为只读方式
		$('.height').attr('readOnly',true);//身高更改为只读方式
		$('.weigth').attr('readOnly',true);//体重更改为只读方式
		$("#pro").prop("disabled", true);//出生地更改为只读方式
		$("#city").prop("disabled", true);
		$("#pro1").prop("disabled", true);//常住地更改为只读方式
		$("#city1").prop("disabled", true);
		$("#s1").prop("disabled", true);//职业更改为只读方式
		$("#s2").prop("disabled", true);//学历更改为只读方式
		
	}
	
	 $('#li1').addClass('active');
	 //$("#li1,#li2,#li3,#li4").css('display','none');
	$('.information_header_li').next().removeClass('active');
    $('.tcal').addClass('tcalInput');
    $.initProv("#pro", "#city", "北京市", "北京市");
    $.initProv1("#pro1", "#city1", "北京市", "北京市");
    Height();//身高 体重验证
    //手机号验证
    $('#vali').blur(function(){
	  	  var mobilep = $('#vali').val();
	  	   if(!mobilep.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)){
	  	       $("#vali").val('');
	  	       $('#vali').attr('placeholder','请正确输入手机号！');
	  	       $('.error').show();
	  	       /*return;*/
	  	   }else{
	  		 $('.error').hide();
	  		
	  	   }
	  	 
	  });
	//获取用户基本信息
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
				var sex = data.SEX;//获取性别
				//获取出生地
				
				var birs = data.BIRTHPLACE;
			if (birs != null && birs !=''){
				var birthArr= new Array();
				//按逗号拆分
				birthArr = birs.split(",");
				//循环取值
				$("#pro option:selected").text(birthArr[0]);
				$("#city option:selected").text(birthArr[1]);
				
				var livs = data.LIVEPLACE;
				var livsArr= new Array();
				livsArr = livs.split(",");
				$("#pro1 option:selected").text(livsArr[0]);
				$("#city1 option:selected").text(livsArr[1]);
			}
			
				$("#user_id").val(data.USER_ID);
				$("#relation").val(connection);//获取关系
				$("#marriageM option:selected").text(data.MARRIAGESTATUS);//获取婚姻状况
				//$("#pro option:selected").text(data.);//获取出生地
				//$("#city option:selected").text(data.BIRTHPLACE);
				//$("#pro1 option:selected").text(data.);//获取常住地
				//$("#city1 option:selected").text(data.LIVEPLACE);
				
				$("#s1 option:selected").text(data.CAREER);//获取职业
				$("#s2 option:selected").text(data.DEGREE);//获取学历
				$('.Wdate').val(data.BIRTHDAY);//获取生日
				
				if(isprivacy == 0 ||( ismodify==0 && isprivacy == 0)){
					$(".weigth").val("**");
					$('.height').val("**");
					$('#username').val("*" +data.NAME.substring(1, 10));//获取姓名
					$('#vali').val((data.PHONE).substring(0, 3)+ "****" + (data.PHONE).substring(7, 11));//获取手机号
					$('#headname').text("*" +data.NAME.substring(1, 10));
					
				}else{
					$('.height').val(data.HEIGHT);//获取身高
					$('.weigth').val(data.WEIGHT);//获取体重
					$('#vali').val(data.PHONE);//获取手机号
					$('#username').val(data.NAME);//获取姓名
					$('#headname').text(data.NAME);
				}
				
				
				if (sex == '女') {
					$('#girl').attr("checked", "true");
					$('#boy').removeAttr("checked");

				} else if (sex == '男') {
					$('#boy').attr("checked", "true");
					$('#girl').removeAttr("checked");
				}
			}
		}

	});
}





	function on_click() { //基本信息
		var phone = $('#vali').val();//获取手机号
		var userId = $("#user_id").val();
		var Height = $('.height').val();
		var Weigth = $('.weigth').val();
		var Username = $('#username').val();
		var connection= $("#s3").val();
		var career=$("#s1 option:selected").text();//获取职业
		var degree=$("#s2 option:selected").val();//获取学历
		SetCookie("connection",connection,7);
		//$('#guanxin').css('display','none');
		
		//console.log(phone);   
		msgsave(userId);//基本信息保存
		tagCategory(userId);//获取生活方式
		var connection =  ReadCookie("connection");
		$("#li2").addClass('active');
		$("#li1").removeClass('active');
		$('#guanxin').css('display','none');
	}
	
	function on_click_1() { //修改关心人的基本信息
		
		var userId = $("#user_id").val();
		var Height = $('.height').val();
		var Weigth = $('.weigth').val();
		var Username = $('#username').val();
		var connection= $("#s3").val();
		var career=$("#s1 option:selected").text();//获取职业
		var degree=$("#s2 option:selected").val();//获取学历
		SetCookie("connection",connection,7);
		//$('#guanxin').css('display','none');
		
		    
		msgsave_1(userId);//基本信息保存
		//tg(userId);
		tagCategory_1(userId);//获取修改关心人的生活方式
		var connection =  ReadCookie("connection");
		$("#li2").addClass('active');
		$("#li1").removeClass('active');
		$('#guanxin').css('display','none');
	}
	/*function tg(userId){
		
		var str1 = "<div class='message_next2  col-lg-12 col-xs-12 col-md-12 col-sm-12'>"
			+ "<p style=\"display: block\">"
			+ "<a href=\"#\" class=\"message_next_a2 weui_btn weui_btn_plain_primary\" onclick='revamp(\""+userId+"\")'>返回上一步</a>"
			+ "</p>" + "</div>";
		$('.content').html(str1);
	}*/
	//获取修改关心人的生活方式
	function tagCategory_1(userId) {
		$.ajax({
					url : url+'/resttag/listAllTagCategory',
					type : 'post',
					success : function(r) {
						var data = eval(r.data);
						if (r.success == 'success') {
							var str = "";

							for (var i = 0; i < data.length; i++) {
								
								if(data[i].ISEXCLUSIVE == '0'){
									str += "<div class='ddiv livediv col-lg-12 col-xs-12 col-md-12 col-sm-12' data-name='ddiv"+(i+1)+"' id='ddiv"
										+ (i + 1)
										+ "'>"
										+ "<span class='col-lg-3 col-xs-3 col-md-3 col-sm-3' >"
										+ data[i].NAME + "</span>" + "</div>";
								}else if(data[i].ISEXCLUSIVE == '1'){
									str += "<div class='ddiv dandiv col-lg-12 col-xs-12 col-md-12 col-sm-12' id='ddiv"
										+ (i + 1)
										+ "'>"
										+ "<span class='col-lg-3 col-xs-3 col-md-3 col-sm-3' >"
										+ data[i].NAME + "</span>" + "</div>";
								}
							}
							str += "<div class='message_next2  col-lg-12 col-xs-12 col-md-12 col-sm-12'>"
									+ "<p style=\"display: block\">"
									+ "<a href=\"#\" class=\"message_next_a2 weui_btn weui_btn_plain_primary\" onclick='on_click_2(\""+userId+"\")'>下一步</a>"
									+ "</p>" + "</div>";
							$('.content').html(str);
							
							$.ajax({
								url : url+'/resttag/listAllTagByUserID',
								type : 'post',
								contentType : "application/json;charset=utf8",
								data : JSON
										.stringify({
											"userID" : userId
										}),
								dataType : "json",
								async : false,
								cache : false,
								success : function(ur) {
									var urd = eval(ur.data);
									for (var j = 0; j < data.length; j++) {
										$.ajax({
											url : url+'/resttag/listAllTagByTagCategoryID',
											type : 'post',
											contentType : "application/json;charset=utf8",
											data : JSON
													.stringify({
														"tagCategory_ID" : data[j].TAGCATEGORY_ID
													}),
											dataType : "json",
											async : false,
											cache : false,
											success : function(d) {
												if (d.msg = "success") {
													var data1 = eval(d.data);
													var str1 = "<ul class='liveul col-lg-9 col-xs-9 col-md-9 col-sm-9'>";
													for (var a = 0; a < data1.length; a++) {
														str1+="<li "
														if(urd!=undefined){
															for(var b =0;b<urd.length;b++){
																if(data1[a].TAG_ID == urd[b].TAG_ID){
																	str1 += "class='livefs livefs_3'"
																}
															}
														}
														
														str1+=">"+ data1[a].NAME
														+ "<input type='hidden' value='"+data1[a].TAG_ID+"'/></li>";
													}
													str1 += "</ul>";
													$("#ddiv" + (j + 1)).append(str1);
													
												}
											}
										});

							}
								}
							});	
						}else{
							var str1 = "<div class='message_next2  col-lg-12 col-xs-12 col-md-12 col-sm-12'>"
								+ "<p style=\"display: block\">"
								+ "<a href=\"#\" class=\"message_next_a2 weui_btn weui_btn_plain_primary\" onclick='on_click2(\""+userId+"\")'>下一步</a>"
								+ "</p>" + "</div>";
						$('.content').html(str1);
						}
						
					}
				});
	}
	
	
	
	//获取生活方式
	function tagCategory(userId) {
		$.ajax({
					url : url+'/resttag/listAllTagCategory',
					type : 'post',
					success : function(r) {
						var data = eval(r.data);
						if (r.success == 'success') {
							var str = "";

							for (var i = 0; i < data.length; i++) {
								
								if(data[i].ISEXCLUSIVE == '0'){
									str += "<div class='ddiv livediv col-lg-12 col-xs-12 col-md-12 col-sm-12' data-name='ddiv"+(i+1)+"' id='ddiv"
										+ (i + 1)
										+ "'>"
										+ "<span class='col-lg-3 col-xs-3 col-md-3 col-sm-3' >"
										+ data[i].NAME + "</span>" + "</div>";
								}else if(data[i].ISEXCLUSIVE == '1'){
									str += "<div class='ddiv dandiv col-lg-12 col-xs-12 col-md-12 col-sm-12' id='ddiv"
										+ (i + 1)
										+ "'>"
										+ "<span class='col-lg-3 col-xs-3 col-md-3 col-sm-3' >"
										+ data[i].NAME + "</span>" + "</div>";
								}
							}
							str += "<div class='message_next2  col-lg-12 col-xs-12 col-md-12 col-sm-12'>"
									+ "<p style=\"display: block\">"
									+ "<a href=\"#\" class=\"message_next_a2 weui_btn weui_btn_plain_primary\" onclick='on_click2(\""+userId+"\")'>下一步</a>"
									+ "</p>" + "</div>";
							$('.content').html(str);

							$.ajax({
								url : url+'/resttag/listAllTagByUserID',
								type : 'post',
								contentType : "application/json;charset=utf8",
								data : JSON
										.stringify({
											"userID" : userId
										}),
								dataType : "json",
								async : false,
								cache : false,
								success : function(ur) {
									var urd = eval(ur.data);
									for (var j = 0; j < data.length; j++) {
										$.ajax({
											url : url+'/resttag/listAllTagByTagCategoryID',
											type : 'post',
											contentType : "application/json;charset=utf8",
											data : JSON
													.stringify({
														"tagCategory_ID" : data[j].TAGCATEGORY_ID
													}),
											dataType : "json",
											async : false,
											cache : false,
											success : function(d) {
												if (d.msg = "success") {
													var data1 = eval(d.data);
													var str1 = "<ul class='liveul col-lg-9 col-xs-9 col-md-9 col-sm-9'>";
													for (var a = 0; a < data1.length; a++) {
														str1+="<li "
														if(urd!=undefined){
															for(var b =0;b<urd.length;b++){
																if(data1[a].TAG_ID == urd[b].TAG_ID){
																	str1 += "class='livefs livefs_3'"
																}
															}
														}
														
														str1+=">"+ data1[a].NAME
														+ "<input type='hidden' value='"+data1[a].TAG_ID+"'/></li>";
													}
													str1 += "</ul>";
													$("#ddiv" + (j + 1)).append(str1);
													
												}
											}
										});

							}
								}
							});

							
						}else{
							var str1 = "<div class='message_next2  col-lg-12 col-xs-12 col-md-12 col-sm-12'>"
								+ "<p style=\"display: block\">"
								+ "<a href=\"#\" class=\"message_next_a2 weui_btn weui_btn_plain_primary\" onclick='on_click2(\""+userId+"\")'>下一步</a>"
								+ "</p>" + "</div>";
						$('.content').html(str1);
						}
						
					}
				});
	}






