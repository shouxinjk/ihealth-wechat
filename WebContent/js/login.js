$(".vali").bind('input vali',function(){
    $('.verification_code').css('background','#45c9a2');
});
function register(){
	var openId = $("#openId").val();
	var headimgurl = $("#headimgurl").val();
	var name = $("#name").val();
	//alert(openId);
    var mobilep = $('.vali').val();
   if(!mobilep.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)){
       $(".vali").val('');
       $('.vali').attr('placeholder','请正确输入手机号！');
       $('.verification_code').css('background',"#e9ebec");
       return;
   }
//   var openId = ReadCookie("openId");
//   alert(ReadCookie("openId"));
   $.ajax({
       type: "post",
       url: url+"/rest/register",
       contentType:"application/json;charset=utf8",
       data: JSON.stringify({"phone":mobilep,"openId":openId,"avatar":headimgurl,"name":name}),
       dataType: "json",
       success: function (r) {
           if (r.result == "success") {
        	  var userId = r.data.USER_ID;
        	  alert(userId+"===loginuserId");
        	  SetCookie("mobilep",mobilep,7);
        	  SetCookie("userId",userId,7);
        	  alert(ReadCookie("userId")+"=====cookieuserid11");
        	   alert("注册成功11"+userId);
        	   window.location="http://www.shouxinjk.net/ihealth-wechat/subject/Message.html?userId="+r.data.USER_ID;
           }else if(r.result == "existence"){
        	   var userId = r.data.USER_ID;
        	   SetCookie("mobilep",mobilep,7);
        	   SetCookie("userId",userId,7);
        	   alert("该手机号已经注册"+ r.data.USER_ID);
        	   window.location ="http://www.shouxinjk.net/ihealth-wechat/subject/Message.html?userId="+r.data.USER_ID;
           }
       },
       error: function () {
           alert("注册失败!");
       }
   });
   

}

function register2(){
	//var openId = $("#openId").val();
	//alert(openId);
    var mobilep = $('.vali').val();
   if(!mobilep.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)){
       $(".vali").val('');
       $('.vali').attr('placeholder','请正确输入手机号！');
       $('.verification_code').css('background',"#e9ebec");
       return;
   }
//   var openId = ReadCookie("openId");
//   alert(ReadCookie("openId"));
   $.ajax({
       type: "post",
       url: "http://localhost:8080/ihealth/rest/register",
       contentType:"application/json;charset=utf8",
       data: JSON.stringify({"phone":mobilep,"openId":"aaa"}),
       dataType: "json",
       success: function (r) {
    	   alert(r);
           if (r.result == "success") {
        	  var userId = r.data.USER_ID;
        	  SetCookie("mobilep",mobilep,7);
        	  SetCookie("userId",userId,7);
        	   alert("注册成功11"+userId);
        	   window.location="subject/Message.html?userId="+r.data.USER_ID;
           }else if(r.result == "existence"){
        	   var userId = r.data.USER_ID;
        	   SetCookie("mobilep",mobilep,7);
        	   SetCookie("userId",userId,7);
        	   alert("该手机号已经注册"+ r.data.USER_ID);
        	   window.location ="subject/Message.html?userId="+r.data.USER_ID;
           }
       },
       error: function () {
           alert("注册失败!");
       }
   });
   

}



















