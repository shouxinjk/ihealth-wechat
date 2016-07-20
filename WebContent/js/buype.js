var userId = ReadCookie("userId");
/*$('.container').delegate(".buy_footer div","click",function(){
    $(this).addClass('active').siblings().removeClass('active');  // 删除其他兄弟元素的样式
   
 });*/

$(function () {
/*	//从URL里获取orderid
    (function ($) {../images/right.png
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    })(jQuery);
    var orderid = $.getUrlParam('orderid');*/
    //console.log(orderid);
    $.ajax({
        type: "post",
        url: url+"/restOrder/getCheckItemsByGroup",
        contentType:"application/json;charset=utf8",
        data: JSON.stringify({"userId":userId}),
        dataType: "json",
        async : false,
		cache : false,
        success: function (r) {
        	var data = eval(r.data);
        	if(r.result=="success"){
        		for(var i=0;i<data.length;i++){
        			var price= 0.0;
        			var str="";
        			str+="<ul id='id"+(i+1)+"'   class='buyul col-lg-12 col-xs-12 col-md-12 col-sm-12' onclick='ulclick("+i+");'>";
        			if(data[i].pds.length>1){
        				str+="<img class='ulimg' src='../images/ulimg.png'/>";
        				for(var j=0;j<data[i].pds.length;j++){
							if(j == 0){
									str +="<li class='col-lg-11 col-xs-11 col-md-11 col-sm-11'>";
									str +=  "<input value="+i+" type='checkbox' checked='checked' class='subcheck box col-lg-1 col-xs-1 col-md-1 col-sm-1' onclick='setSelectAll("+i+");'/>";
									str +=	"<div class='detectionli col-lg-8 col-xs-8 col-md-8 col-sm-8'>"+data[i].NAME+"("+data[i].pds[j].MNAME+")<input type='hidden' value='"+data[i].pds[j].MEDICALEXAMITEM_ID+"'/></div>";
									str +=	"<div class='costli col-lg-2 col-xs-2 col-md-2 col-sm-2'><lable>"+data[i].pds[j].PRICE+"</lable>元</div>";
									str +="</li>";
									
							}
							else{
									str +="<li style='display:none;'  class='col-lg-11 col-xs-11 col-md-11 col-sm-11'>";
									str +=  "<input  value="+i+" type='checkbox'  class='subcheck nocheck col-lg-1 col-xs-1 col-md-1 col-sm-1' onclick='setSelectAll("+i+");'/>";
									str +=	"<div class='detectionli col-lg-8 col-xs-8 col-md-8 col-sm-8'>"+data[i].NAME+"("+data[i].pds[j].MNAME+")<input type='hidden' value='"+data[i].pds[j].MEDICALEXAMITEM_ID+"'/></div>";
									str +=	"<div class='costli col-lg-2 col-xs-2 col-md-2 col-sm-2'><lable>"+data[i].pds[j].PRICE+"</lable>元</div>";
									str +="</li>";
									 $(".nocheck").attr("checked", false);	
							}
		        			price +=data[i].pds[j].PRICE;
						}
        			}else{
        						for(var j=0;j<data[i].pds.length;j++){
        							if(j == 0){
    										str +="<li class='col-lg-11 col-xs-11 col-md-11 col-sm-11'>";
    										str +=  "<input type='checkbox' checked='checked' class='subcheck box col-lg-1 col-xs-1 col-md-1 col-sm-1' onclick='setSelectAll("+i+");'/>";
    										str +=	"<div class='detectionli col-lg-8 col-xs-8 col-md-8 col-sm-8'>"+data[i].NAME+"("+data[i].pds[j].MNAME+")<input type='hidden' value='"+data[i].pds[j].MEDICALEXAMITEM_ID+"'/></div>";
    										str +=	"<div class='costli col-lg-2 col-xs-2 col-md-2 col-sm-2'><lable>"+data[i].pds[j].PRICE+"</lable>元</div>";
    										str +="</li>";
    										
									}
        							else{
    										str +="<li style='display:none;'  class='col-lg-11 col-xs-11 col-md-11 col-sm-11'>";
    										str +=  "<input type='checkbox'  class='subcheck nocheck col-lg-1 col-xs-1 col-md-1 col-sm-1' onclick='setSelectAll("+i+");'/>";
    										str +=	"<div class='detectionli col-lg-8 col-xs-8 col-md-8 col-sm-8'>"+data[i].NAME+"("+data[i].pds[j].MNAME+")<input type='hidden' value='"+data[i].pds[j].MEDICALEXAMITEM_ID+"'/></div>";
    										str +=	"<div class='costli col-lg-2 col-xs-2 col-md-2 col-sm-2'><lable>"+data[i].pds[j].PRICE+"</lable>元</div>";
    										str +="</li>";
    										 $(".nocheck").attr("checked", false);	
									}
        		        			price +=data[i].pds[j].PRICE;
        						}
        			}
        						str +="</ul>";
			        			$(".buy_table .buydiv").append(str);
			        			 allp();
			        			 
        		}
        		
        	}
        }
	});
    $(".subcheck").live("change",function(){
    	if($(".subcheck").attr("checked")=='checked'){
	    		$(".subcheck").css("background","url(../images/right.png) no-repeat");
	    	}else{
	    		$(".subcheck").css("background","url(../images/gray.png) no-repeat");
	    	}
    	});
   
});

/**/


$('.container').delegate(".buyul .ulimg","click",function(){
	$(this).siblings('li').show();
	$(this).attr('src','../images/ulimg1.png');
	$(this).removeClass().addClass("ulimg1");
	$(this).parent().css("background","rgb(248, 249, 248)");
});
$('.container').delegate(".buyul .ulimg1","click",function(){
	//$(this).siblings('li').hide();
	$(this).attr('src','../images/ulimg.png');
	$(this).removeClass().addClass("ulimg");
	 $(this).siblings('li').find(':checked').parent().siblings('li').css('display','none');
});


function ulclick(i){//多个体检项目 只能勾选一个
	 var fanxiBox = $("#id"+(i+1)+" input:checkbox");
     fanxiBox.click(function () {
        if(this.checked || this.checked=='checked'){

            fanxiBox.removeAttr("checked");
            //这里需注意jquery1.6以后必须用prop()方法
            $(this).prop("checked", true);
            allp();
          }
     });
		 
	
};

function allp(){ 
	var price= 0.0;//进入算总价
	$(".buydiv ul li input[type=checkbox]").each(function(){
	    //var chk = $(this).find("[checked]");
	    if(this.checked){
	    	var m=$(this).siblings().last().children('lable').text();
	    	price +=m*1;
	    	$('.money span').text(price);
	    }
	});
	
}


/*function selectAll(){  //点击全选时计算总价
	var price= 0.0;
	  $(":checkbox").attr("checked", true);
	$('.costli').children('lable').each(function(){ 
		price += parseInt($(this).text());
		});     	
    	$('.money span').html(price);
}  */



//子复选框的事件  

function setSelectAll(i){ //点击checkbox 时总价变化 
	var price= 0.0;
	$(".buydiv ul li input[type=checkbox]").each(function(){
	    //var chk = $(this).find("[checked]");
	    if(this.checked){
	    	var m=$(this).siblings().last().children('lable').text();
	    	price +=m*1;
	    	$('.money span').text(price);
	    }
	    
	  
	});  
	
    //当没有选中某个子复选框时，SelectAll取消选中  
    if (!$(".subcheck").checked) {  
        $(".SelectAll").attr("checked", false);  
    }  
    var chsub = $(".buydiv ul li .subcheck").length; //获取subcheck的个数  
    var checkedsub = $(".subcheck:checked").length; //获取选中的subcheck的个数  
    if (checkedsub == chsub) {  
        $(".SelectAll").attr("checked", true); 
        
    }
    if(checkedsub == 0){//全部没有选中时 总价为0
    	$('.money span').text(0);
    }
}  






























