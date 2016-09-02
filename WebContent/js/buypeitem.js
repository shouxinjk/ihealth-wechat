var userId = ReadCookie("userId");
/*$('.container').delegate(".buy_footer div","click",function(){
    $(this).addClass('active').siblings().removeClass('active');  // 删除其他兄弟元素的样式
   
 });*/

$(function () {
	//从URL里获取orderid
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    })(jQuery);
    var orderid = $.getUrlParam('orderid');
    
    var chid;
	var check;
    //console.log(orderid);
    $.ajax({
        type: "post",
        url: url+"/restOrder/listExamItem",
        contentType:"application/json;charset=utf8",
        data: JSON.stringify({"orderId":orderid}),
        dataType: "json",
        async : false,
		cache : false,
        success: function (r) {
        	var data = eval(r.items);
        	var price= 0.0;
        	if(r.msg=="success"){
        		for(var i=0;i<data.length;i++){
        			var str="<li class='col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
								"<input type='checkbox'  value='"+data[i].medicalexamitem_ID+"' class='subcheck box col-lg-1 col-xs-1 col-md-1 col-sm-1' onclick='setSelectAll("+i+");'/>"+
								"<div class='detectionli col-lg-8 col-xs-8 col-md-8 col-sm-8'>"+data[i].name+"</div>"+
								"<div class='costli col-lg-3 col-xs-3 col-md-3 col-sm-3'><lable>"+(data[i].settlementprice/100)+"</lable>元</div>"+
							"</li>";
        			
        			
        			$(".buy_table ul").append(str);
        			$(":checkbox").attr("checked", true);
        			price +=data[i].settlementprice;
        		}
        		chid = tname.substring(0,tname.length-1);
        		$('.dis').html(chid);
        		$('.money span').text((price/100));
        	}
        	/*check=chid.replace(/,/g, "");*/
        }
	});
    
});

	




function selectAll(){  //点击全选时计算总价
	var price= 0.0;
	  $(":checkbox").attr("checked", true);
	$('.costli').children('lable').each(function(){ 
		price += parseInt($(this).text());
		});     	
    	$('.money span').html(price);
}  



//子复选框的事件  

function setSelectAll(i){ //点击checkbox 时总价变化 
	var price= 0.0;
	$(".buy_table ul li input[type=checkbox]").each(function(){
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
    var chsub = $(".buy_table ul li .subcheck").length; //获取subcheck的个数  
    var checkedsub = $(".subcheck:checked").length; //获取选中的subcheck的个数  
    if (checkedsub == chsub) {  
        $(".SelectAll").attr("checked", true); 
        
    }
    if(checkedsub == 0){//全部没有选中时 总价为0
    	$('.money span').text(0);
    }
}  







