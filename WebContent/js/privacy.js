var userId  = ReadCookie("userId");
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
	 var thisId = window.location.hash;
	 var clik_a=document.location.href;	
	 var clik_a1 =clik_a.split("?")[0];
	 var clik_a2 =clik_a1.split("#")[1]; 
	 console.log(thisId);
    if(thisId =='#user'){
    	allpeople(userId);
    	 $('.Care').hide();
    	 $('.care').removeClass('model');
    	 $('.set').addClass('model');
    	 $('.gxdr ').attr("src", "../images/TJ_guide.png");
    	 $('.suo ').attr("src", "../images/suo.png");
    	 $('.TJ_guide_img ').attr("src", "../images/TJ_guide_1.png");
         $('.TJ_guide span').css('color','rgb(126, 200, 136)');
    }else if(thisId== '#sure'){
    	carep(userId);
    	$('.Care').hide();
    	adduser();
    	$('.TJ_guide_img ').attr("src", "../images/TJ_guide_1.png");
        $('.TJ_guide span').css('color','rgb(126, 200, 136)');
    }else if(thisId== 'fumu'){
    	console.log('aaaaaaaaaaaaaaaaaaaaaaa');
    }else{
    	carep(userId);
    	$('.TJ_guide_img ').attr("src", "../images/TJ_guide_1.png");
        $('.TJ_guide span').css('color','rgb(126, 200, 136)');
    }
        console.log(userId);
        
});   
$('.container').delegate(".Headerul li","click",function(){
    $(this).addClass('model').siblings().removeClass('model');  // 删除其他兄弟元素的样式
 });
 $('.Headerul .set').click(function(){
	 allpeople(userId) //获取谁关心了我的人 
	  $('.gxdr ').attr("src", "../images/TJ_guide.png");
	 $('.suo ').attr("src", "../images/suo.png");
 });
 $('.Headerul .care').click(function(){
	 carep(userId);
	 fum();
	 $('.gxdr ').attr("src", "../images/TJ_guide_1.png");
	 $('.suo ').attr("src", "../images/suo1.png");
 });
 //
 function fum(){
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
        		var str="";
        		for(var i=0;i<data.length;i++){
        			str+="<li class='contli'>"+
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
									 	
									 		str +="</div>";
									str+="</li>";
        			}
        		
        		$(".content").html(str);
        	}else{
        		$(".content").html('您亲戚朋友还没有关心您哦！！！！！');
        		$('.content').css('font-size','0.7rem');
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














