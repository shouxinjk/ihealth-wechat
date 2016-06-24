function register1(openId){
	alert(1)
	   $.ajax({
			url : "/ihealth-wechat/userInfoServlet",
			type : "post",
			async : false,
			cache : false,
			success : function(data) {
				var d = eval(data);
				alert(d)
				 $.ajax({
				       type: "post",
				       url: url+"/rest/register",
				       contentType:"application/json;charset=utf8",
				       data: JSON.stringify({"openId":openId,"avatar":d.url,"name":d.name}),
				       dataType: "json",
				       async : false,
						cache : false,
				       success: function (r) {
				    	   alert(r.result);
				    	   alert(r.data.USER_ID);
				           if (r.result == "success") {
				        	  var userId = r.data.USER_ID;
				        	  delCookie("userId");
				        	  SetCookie("userId",userId,7);
				           }else if(r.result == "existence"){
				        	   var userId = r.data.USER_ID;
				        	   SetCookie("userId",userId,7);
				           }
				       },
				       error: function () {
				           //alert("注册失败!");
				       }
				   });
			}
	   });
	  
   }