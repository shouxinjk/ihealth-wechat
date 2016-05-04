$(".vali").bind('input vali',function(){
    $('.verification_code').css('background','#45c9a2');
});
$('.verification_code'). click (function (){
    var mobilep = $('.vali').val();
   if(!mobilep.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)){
       $(".vali").val('');
       $('.vali').attr('placeholder','请正确输入手机号！');
       $('.verification_code').css('background',"#e9ebec");
       return;
   }
//   else{
//       window.location ="subject/Message.html";
	   
//   }
   $.ajax({
       type: "post",
       url: url+"/rest/register",
       contentType:"application/json;charset=utf8",
       data: JSON.stringify({"phone":mobilep,"openId":"ajshskdha"}),
       dataType: "json",
       success: function (r) {
           if (r.result == "success") {
        	  var userId = r.data.USER_ID;
        	   SetCookie("mobilep",mobilep,7);
        	   SetCookie("userId",userId,7);
        	   alert("注册成功");
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
   
 
});



















