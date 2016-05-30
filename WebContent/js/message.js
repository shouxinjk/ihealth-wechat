
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
        Usern(userId);
        wxdu(userId);
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
					alert(data)
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
						//$('#userNumber').css("background-image", "url(\"../images/jiantou1.png\")");
						$('.project-progress1 i').css({"background":'red',"width":data.userNumber+'%'});
					}
					else if((userNumber <=80 )&& (userNumber>30)){
						$('#userNumber').css("color",'#ff7f58');
						//$('#userNumber').css("background-image", "url(\"../images/jiantou2.png\")");
						$('.project-progress1 i').css({"background":'#ff7f58',"width":data.userNumber+'%'});
					}
					else if((userNumber <=100) && (userNumber>80)){
						$('#userNumber').css("color",'#00ff00');
						//$('#userNumber').css("background-image", "url(\"../images/jiantou3.png\")");
						$('.project-progress1 i').css({"background":'#00ff00',"width":data.userNumber+'%'});
					}
				
				
				if((tagNumber >=0)  &&( tagNumber<=30)){//生活方式
						$('#tagNumber').css("color",'red');
						//$('#tagNumber').css("background-image", "url(\"../images/jiantou1.png\")");
						$('.project-progress2 i').css({"background":'red',"width":data.tagNumber+'%'});
					}
					else if((tagNumber <=80 )&& (tagNumber>30)){
						$('#tagNumber').css("color",'#ff7f58');
						//$('#tagNumber').css("background-image", "url(\"../images/jiantou2.png\")");
						$('.project-progress2 i').css({"background":'#ff7f58',"width":data.tagNumber+'%'});
					}
					else if((tagNumber <=100) && (tagNumber>80)){
						$('#tagNumber').css("color",'#00ff00');
						//$('#tagNumber').css("background-image", "url(\"../images/jiantou3.png\")");
						$('.project-progress2 i').css({"background":'#00ff00',"width":data.tagNumber+'%'});
					}
					
				
				if((diseaseNumber >=0)  &&( diseaseNumber<=30)){//疾病信息
						$('#diseaseNumber').css("color",'red');
						//$('#diseaseNumber').css("background-image", "url(\"../images/jiantou1.png\")");
						$('.project-progress3 i').css({"background":'red',"width":data.diseaseNumber+'%'});
					}
					else if((diseaseNumber <=80 )&& (diseaseNumber>30)){
						$('#diseaseNumber').css("color",'#ff7f58');
						//$('#diseaseNumber').css("background-image", "url(\"../images/jiantou2.png\")");
						$('.project-progress3 i').css({"background":'#ff7f58',"width":data.diseaseNumber+'%'});
					}
					else if((diseaseNumber <=100) && (diseaseNumber>80)){
						$('#diseaseNumber').css("color",'#00ff00');
						//$('#diseaseNumber').css("background-image", "url(\"../images/jiantou3.png\")");
						$('.project-progress3 i').css({"background":'#00ff00',"width":data.diseaseNumber+'%'});
					}



				if((connectionNumber >=0)  &&( connectionNumber<=30)){//关心的人
						$('#connectionNumber').css("color",'red');
						//$('#connectionNumber').css("background-image", "url(\"../images/jiantou1.png\")");
						$('.project-progress4 i').css({"background":'red',"width":data.connectionNumber+'%'});
					}
					else if((connectionNumber <=80 )&& (connectionNumber>30)){
						$('#connectionNumber').css("color",'#ff7f58');
						//$('#connectionNumber').css("background-image", "url(\"../images/jiantou2.png\")");
						$('.project-progress4 i').css({"background":'#ff7f58',"width":data.connectionNumber+'%'});
					}
					else if((connectionNumber>80) && (connectionNumber <=100)){
						$('#connectionNumber').css("color",'#00ff00');
						//$('#connectionNumber').css("background-image", "url(\"../images/jiantou3.png\")");
						$('.project-progress4 i').css({"background":'#00ff00',"width":data.connectionNumber+'%'});
					}
				
			}
		}

	});
}
    
    
    
    
    














