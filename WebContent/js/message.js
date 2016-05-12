
$(document).ready(function () {
    	function ReadCookie(cookieName) {
    	    var theCookie = "" + document.cookie;
    	    var ind = theCookie.indexOf(cookieName);
    	    if(ind==-1 || cookieName=="") return "";
    	    var ind1 = theCookie.indexOf(';',ind);
    	    if(ind1==-1) ind1 = theCookie.length;
    	    /*读取Cookie值*/
    	    return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
    	}
        $('.my_message_img ').attr("src", "../images/my_message_1.png");
        $('.my_message span').css('color','rgb(126, 200, 136)');
        var userId  = ReadCookie("userId");
        alert(userId+"massageuserid");
        Usern(userId);
        wxdu(userId);
        var name1 = $(".Username").html();
		if (name1 == "") {
			$.ajax({
				url : "/ihealth-wechat/userInfoServlet",
				type : "post",
				success : function(data) {
					var d = eval(data);
					$(".head_portrait").attr("src", d.url);
					var name = $(".Username").html();
					if (name == "") {
						$(".Username").html(d.name);
					}
					alert(d.url.length+"====urlLength");
					var userId = ReadCookie("userId");
					alert(userId+"====htmluserId");
					$.ajax({
						type : "post",
						url : url + "/rest/updateUser",
						contentType : "application/json;charset=utf8",
						data : JSON.stringify({
							"userId" : userId,
							"name" : d.name,
							"avatar" : d.url
						}),
						dataType : "json",
						success : function(r) {
							if (r.result == "success") {
								console.log('保存成功');
							} else {

							}
						}

					});
				}
			});
		}
    });
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
					alert(data+"===userdaTA");
					alert(data.NAME+"====data.NAME");
					$('.Username').text(data.NAME);//获取姓名
					$(".head_portrait").attr("src",data.AVATAR);
				}
			}

		});

    }
 
    
  
	
    

function wxdu(userId){
//用户名
	$.ajax({
		type : "post",
		url : url+"/rest/findMessageIntegrity",
		contentType : "application/json;charset=utf8",
		data : JSON.stringify({
			"userId" : userId
		}),
		dataType : "json",
		success : function(r) {
			if (r.result == "success") {
				var data = eval(r.data);
				
				$('#userNumber em').text(data.userNumber);//
				$('.project-progress1 i').text(data.userNumber);
				
				$('#tagNumber em').text(data.tagNumber);
				$('.project-progress2 i').text(data.tagNumber);
				
				$('#diseaseNumber em').text(data.diseaseNumber );
				$('.project-progress3 i').text(data.diseaseNumber);
				
				$('#connectionNumber em').text(data.connectionNumber);
				$('.project-progress4 i').text(data.connectionNumber);
				var userNumber= $('#userNumber em').text();
				var tagNumber= $('#tagNumber em').text();
				var diseaseNumber= $('#diseaseNumber em').text();
				var connectionNumber= $('#connectionNumber em').text();
				
				

				if((userNumber >=0)  &&( userNumber<=30)){ //基本信息
						$('#userNumber').css("color",'red');
						$('#userNumber').css("background-image", "url(\"../images/jiantou1.png\")");
						$('.project-progress1 i').css({"background":'red',"width":data.userNumber+'%'});
					}
					else if((userNumber <=80 )&& (userNumber>30)){
						$('#userNumber').css("color",'rgb(247, 38, 205)');
						$('#userNumber').css("background-image", "url(\"../images/jiantou2.png\")");
						$('.project-progress1 i').css({"background":'rgb(247, 38, 205)',"width":data.userNumber+'%'});
					}
					else if((userNumber <=100) && (userNumber>80)){
						$('#userNumber').css("color",'#00ff00');
						$('#userNumber').css("background-image", "url(\"../images/jiantou3.png\")");
						$('.project-progress1 i').css({"background":'#00ff00',"width":data.userNumber+'%'});
					}
				
				
				if((tagNumber >=0)  &&( tagNumber<=30)){//生活方式
						$('#tagNumber').css("color",'red');
						$('#tagNumber').css("background-image", "url(\"../images/jiantou1.png\")");
						$('.project-progress2 i').css({"background":'red',"width":data.tagNumber+'%'});
					}
					else if((tagNumber <=80 )&& (tagNumber>30)){
						$('#tagNumber').css("color",'rgb(247, 38, 205)');
						$('#tagNumber').css("background-image", "url(\"../images/jiantou2.png\")");
						$('.project-progress2 i').css({"background":'rgb(247, 38, 205)',"width":data.tagNumber+'%'});
					}
					else if((tagNumber <=100) && (tagNumber>80)){
						$('#tagNumber').css("color",'#00ff00');
						$('#tagNumber').css("background-image", "url(\"../images/jiantou3.png\")");
						$('.project-progress2 i').css({"background":'#00ff00',"width":data.tagNumber+'%'});
					}
					
				
				if((diseaseNumber >=0)  &&( diseaseNumber<=30)){//疾病信息
						$('#diseaseNumber').css("color",'red');
						$('#diseaseNumber').css("background-image", "url(\"../images/jiantou1.png\")");
						$('.project-progress3 i').css({"background":'red',"width":data.diseaseNumber+'%'});
					}
					else if((diseaseNumber <=80 )&& (diseaseNumber>30)){
						$('#diseaseNumber').css("color",'rgb(247, 38, 205)');
						$('#diseaseNumber').css("background-image", "url(\"../images/jiantou2.png\")");
						$('.project-progress3 i').css({"background":'rgb(247, 38, 205)',"width":data.diseaseNumber+'%'});
					}
					else if((diseaseNumber <=100) && (diseaseNumber>80)){
						$('#diseaseNumber').css("color",'#00ff00');
						$('#diseaseNumber').css("background-image", "url(\"../images/jiantou3.png\")");
						$('.project-progress3 i').css({"background":'#00ff00',"width":data.diseaseNumber+'%'});
					}



				if((connectionNumber >=0)  &&( connectionNumber<=30)){//关心的人
						$('#connectionNumber').css("color",'red');
						$('#connectionNumber').css("background-image", "url(\"../images/jiantou1.png\")");
						$('.project-progress4 i').css({"background":'red',"width":data.connectionNumber+'%'});
					}
					else if((connectionNumber <=80 )&& (connectionNumber>30)){
						$('#connectionNumber').css("color",'rgb(247, 38, 205)');
						$('#connectionNumber').css("background-image", "url(\"../images/jiantou2.png\")");
						$('.project-progress4 i').css({"background":'rgb(247, 38, 205)',"width":data.connectionNumber+'%'});
					}
					else if((connectionNumber>80) && (connectionNumber <=100)){
						$('#connectionNumber').css("color",'#00ff00');
						$('#connectionNumber').css("background-image", "url(\"../images/jiantou3.png\")");
						$('.project-progress4 i').css({"background":'#00ff00',"width":data.connectionNumber+'%'});
					}
				
			}
		}

	});
}
    
    
    
    
    














