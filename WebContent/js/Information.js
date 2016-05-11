

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
	
		var userId = $("#user_id").val();
		var Height = $('.height').val();
		var Weigth = $('.weigth').val();
		var Username = $('#username').val();
		var connection= $("#s3").val();
		var career=$("#s1 option:selected").text();//获取职业
		var degree=$("#s2 option:selected").val();//获取学历
		SetCookie("connection",connection,7);
		//$('#guanxin').css('display','none');
		if(connection ==""){
	    	alert('请输入您们的关系！');
	    	 return;
	    }
		 if(Username ==""){
		    	alert('请输入姓名！');
		    	 return;
		    }
		    if(career ==""){
		    	alert('请输入职业！');
		    	 return;
		    }
		    if(degree ==""){
		    	alert('请输入学历！');
		    	 return;
		    }
		    if(Height ==""){
		    	alert('请输入身高！');
		    	 return;
		    }
		    if(Weigth ==""){
		    	alert('请输入体重！');
		    	 return;
		    }
		    
		msgsave(userId);//基本信息保存
		tagCategory(userId);
		var connection =  ReadCookie("connection");
		$("#li2").addClass('active');
		$("#li1").removeClass('active');
		$('#guanxin').css('display','none');
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
								
								if(data[i].ISEXCLUSIVE == '1'){
									str += "<div class='ddiv livediv col-lg-12 col-xs-12 col-md-12 col-sm-12' id='ddiv"
										+ (i + 1)
										+ "' onclick='duoliv(\"ddiv"+(i+1)+"\")'>"
										+ "<span class='col-lg-3 col-xs-3 col-md-3 col-sm-3' >"
										+ data[i].NAME + "</span>" + "</div>";
								}else if(data[i].ISEXCLUSIVE == '0'){
									str += "<div class='ddiv col-lg-12 col-xs-12 col-md-12 col-sm-12' id='ddiv"
										+ (i + 1)
										+ "' onclick='liv(\"ddiv"+(i+1)+"\")'>"
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

							
						}
						
					}
				});
	}






