﻿var userId  = ReadCookie("userId");
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
        console.log(userId);
        allpeople(userId) //获取谁关心了我的人  
});   


function allpeople(userId){ //获取谁关心了我的人  
	$.ajax({
        type: "post",
        url: url+"/rest/listCareAboutMe",
        contentType:"application/json;charset=utf8",
        data: JSON.stringify({"userID":userId}),
        dataType: "json",
        async : false,
		cache : false,
        success: function (r) {
        	var data = eval(r.data);
        	if(r.result == "success"){
        		for(var i=0;i<data.length;i++){
        			var str="<li>"+
		        				"<img class='userimg  col-lg-2 col-xs-2 col-md-2 col-sm-2'  src='"+data[i].AVATAR+"' alt='' />"+
										"<span class='username col-lg-4 col-xs-4 col-md-4 col-sm-4'>"+data[i].NAME+"<i>("+data[i].CONNECTION+")</i></span>"+
										"<div class='privacymessage col-lg-3 col-xs-3 col-md-3 col-sm-3'>"+
									 		"<span class='lookprivacy'>允许查看</span>";
									 		if(data[i].ISPRIVACY == 1){
									 			str +="<input class='privacy_ck' name='privacy_ck' checked='checked' type='checkbox' id='"+data[i].USER_ID+"' value='1' onclick='privacy_ck(\""+data[i].USER_ID+"\");'>";
									 		}else if(data[i].ISPRIVACY == 0 || data[i].ISPRIVACY== undefined){
									 			str +="<input class='privacy_ck' name='privacy_ck' type='checkbox' id='"+data[i].USER_ID+"' value='1' onclick='privacy_ck(\""+data[i].USER_ID+"\");'>";
									 		}
									 		str +="</div>"+
									 	"<div class='addmessage col-lg-3 col-xs-3 col-md-3 col-sm-3'>"+
									 	"<span class='addprivacy'>允许修改</span>";
									 		if(data[i].ISMODIFY == 1){
									 			str +="<input class='privacy_add' name='privacy_ck' type='checkbox' checked='checked' id='"+data[i].USER_ID+"m' value='1' onclick='privacy_add(\""+data[i].USER_ID+"\");'>";
									 		}else if(data[i].ISMODIFY == 0||data[i].ISMODIFY == undefined){
									 			str +="<input class='privacy_add' name='privacy_ck' type='checkbox' id='"+data[i].USER_ID+"m' value='1' onclick='privacy_add(\""+data[i].USER_ID+"\");'>";
									 		}
									 	
									 		str +="</div>"+
        					"</li>";
        			$(".content").append(str);
        		}
        	}
        }
	});
}

//设置是否查看信息
function privacy_ck(p){      
	var userid_two = ReadCookie("userId");
	var isprivacy = 0;
	    if($('#'+p).is(':checked')){
	    	isprivacy = 1;
	    }else{
	    	isprivacy = 0;
	    }
	    $.ajax({
   		 type: "post",
   	     url: url+"/rest/updatePrivacy",
   	     contentType:"application/json;charset=utf8",
   	     data: JSON.stringify({"userID_one":p,"userID_two":userid_two,"isprivacy":isprivacy}),
   	     dataType: "json",
   	     async : false,
   	     cache : false,
   	     success:function(d){
   	    	 //alert(d.result)
   	     }
   	});
}

//设置是否修改信息
function privacy_add(i){	
	var userid_two = ReadCookie("userId");
	var ismodify = 0;
	 if($('#'+i+'m').is(':checked')){
			 	ismodify = 1;
		    }else{
		    	ismodify = 0;
		    }
	 $.ajax({
   		 type: "post",
   	     url: url+"/rest/updateModify",
   	     contentType:"application/json;charset=utf8",
   	     data: JSON.stringify({"userID_one":i,"userID_two":userid_two,"ismodify":ismodify}),
   	     dataType: "json",
   	     async : false,
   	     cache : false,
   	     success:function(d){
   	    	// alert(d.result)
   	     }
    });
}














