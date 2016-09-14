(function ($) {
    	        $.getUrlParam = function (name) {
    	            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    	            var r = window.location.search.substr(1).match(reg);
    	            if (r != null) return unescape(r[2]); return null;
    	        }
    	    })(jQuery);
var times =$.getUrlParam('time');  


window.onload=function(){
	    var mydate;
	    var day;
    	if(times == "NaN-NaN-NaN"){
    		mydate=new Date();
    	}else{
    		mydate = new Date(times);
    	}
        
        var thisyear=mydate.getFullYear();

        var thismonth=mydate.getMonth()+1;

        var thisday=mydate.getDate(); //初始选择日期

        var mydate1=new Date();

        var thisyear1=mydate1.getFullYear();

        var thismonth1=mydate1.getMonth()+1;

        var thisday1=mydate1.getDate();//初始选择日期

        var selectday=thisday; //标记日期

        var indate=thisday; //入住日期

        var inmonth=thismonth;//入住月份

      //  var outdate=thisday+1; //退房日期
        //var outmonth=thismonth; //退房月份
        var datetxt="datetoday";

        var datefirst;

        var datesecond;

        function initdata(){//日期初始填充
            var tdheight=$(".data_table tbody tr").eq(0).find("td").height();

            $(".data_table tbody td").css("height",tdheight);

            $(".selectdate").val(thisyear+"年"+thismonth+"月");
            var days=getdaysinonemonth(thisyear,thismonth);
            var weekday=getfirstday(thisyear,thismonth);
            setcalender(days,weekday);
            markdate(thisyear,thismonth,selectday);
            orderabledate(thisyear,thismonth,day);
        }
        initdata();
        $(".datetoday").val(thisyear+"-"+thismonth+"-"+thisday);
        jQuery(".dateendday").val(thisyear+"-"+thismonth+"-"+(thisday+1));
        function orderabledate(thisyear,thismonth,thisday){//能预订的日期
            if(thisyear<thisyear1){
                $(".data_table tbody td").addClass("orderdate");
                $(".data_table tbody td").removeClass("usedate");
            }else if(thisyear==thisyear1){
                if(thismonth<thismonth1){
                    $(".data_table tbody td").addClass("orderdate");
                    $(".data_table tbody td").removeClass("usedate");
                }else if(thismonth==thismonth1){
                    for(var j=0;j<6;j++){
                        for(var i=0;i<7;i++){
                            var tdhtml=$(".data_table tbody tr").eq(j).find("td").eq(i).html();
                            if(tdhtml<thisday){
                                $(".data_table tbody tr").eq(j).find("td").eq(i).addClass("orderdate");
                                $(".data_table tbody tr").eq(j).find("td").eq(i).removeClass("usedate");
                            }else{
                                $(".data_table tbody tr").eq(j).find("td").eq(i).removeClass("orderdate");
                            }
                        }
                    }
                }
            }
        }
        function markdate(thisyear,thismonth,thisday){//标记日期
            var datetxt=thisyear+"年"+thismonth+"月";
            var thisdatetxt=thisyear1+"年"+thismonth1+"月";
            $(".data_table td").removeClass("tdselect");
            if(datetxt==thisdatetxt){
                for(var j=0;j<6;j++){
                    for(var i=0;i<7;i++){
                        var tdhtml=$(".data_table tbody tr").eq(j).find("td").eq(i).html();
                        if(tdhtml==thisday){
                            $(".data_table tbody tr").eq(j).find("td").eq(i).addClass("tdselect");
                        }
                    }
                }
            }
        }
        function getdaysinonemonth(year,month){ //算某个月的总天数
            month=parseInt(month,10);
            var d=new Date(year,month,0);
            return d.getDate();
        }
        function getfirstday(year,month){//算某个月的第一天是星期几
            month=month-1;
            var d=new Date(year,month,1);
            return d.getDay();
        }
        function setcalender(days,weekday){//往日历中填入日期
            var a=1;
            for(var j=0;j<6;j++){
                for(var i=0;i<7;i++){
                    if(j==0&&i<weekday){
                        $(".data_table tbody tr").eq(0).find("td").eq(i).html("");
                        $(".data_table tbody tr").eq(0).find("td").eq(i).removeClass("usedate");
                    }else{
                        if(a<=days){
                            $(".data_table tbody tr").eq(j).find("td").eq(i).html(a);
                            $(".data_table tbody tr").eq(j).find("td").eq(i).addClass("usedate");
                            a++;
                        }else{
                            $(".data_table tbody tr").eq(j).find("td").eq(i).html("");
                            $(".data_table tbody tr").eq(j).find("td").eq(i).removeClass("usedate");
                            a=days+1;
                        }
                    }
                }
            }
        }
        function errorreset(){//日期报错后，数据重置
            thisyear=thisyear1;
            thismonth=thismonth1;
            thisday=thisday1;
            selectday=thisday1;
            indate=thisday1;
            inmonth=thismonth1;
            outdate=thisday1+1;
            outmonth=thismonth1;
            initdata();
        }
        $('.data_table').delegate(".data_table tbody td.usedate","click",function(){
       //点击日期的效果
            var thishtml=parseInt(jQuery(this).html());
            $(".data_table td").removeClass("tdselect");
            $(this).addClass("tdselect");
            selectday=thishtml;
            if(datetxt=="datetoday"){
                $(".datetoday").val(thisyear+"-"+thismonth+"-"+selectday);
                indate=selectday;
                inmonth=thismonth;
            }else{
               // jQuery(".dateendday").val(thisyear+"-"+thismonth+"-"+selectday);
                outdate=selectday;
                outmonth=thismonth;
                if(outmonth<inmonth){
                    alert("日期填写错误");
                    $(".datetoday").val(thisyear1+"-"+thismonth1+"-"+thisday1);
                   // jQuery(".dateendday").val(thisyear1+"-"+thismonth1+"-"+(thisday1+1));
                    errorreset();
                }else if(outmonth==inmonth){
                    if(outdate<=indate){
                        alert("日期填写错误");
                        $(".datetoday").val(thisyear1+"-"+thismonth1+"-"+thisday1);
                       // jQuery(".dateendday").val(thisyear1+"-"+thismonth1+"-"+(thisday1+1));
                        errorreset();
                    }
                }
            }
        });

        $(".datetoday").click(function(){//选择入住日期
            datetxt="datetoday";
        });

       /* jQuery(".dateendday").click(function(){//选择退房日期
            datetxt="dateendday";
        });*/
        $(".lastmonth").click(function(){//上一个月
            thismonth--;
            if(thismonth==0){
                thismonth=12;
                thisyear--;
            }
            initdata();
        });

        $(".nextmonth").click(function(){//上一个月
            thismonth++;
            if(thismonth==13){
                thismonth=1;
                thisyear++;
            }
            initdata();
        });

        /*jQuery(".btsure").click(function(){//确定日期
            var start = new Date($(".datetoday").val());
           // var end = new Date($(".dateendday").val());
          //  var diff = parseInt((end - start) / (1000*3600*24));
            jQuery(".bookdate").html(inmonth+"月"+indate+"日至"+outmonth+"月"+outdate+"日("+diff+")晚")
        });*/
       /* jQuery(".caltline1").toggle(
                function(){
                    jQuery(".caltline2").slideDown(500);
                    jQuery(".calender").fadeIn(500);
                    errorreset();
                    jQuery(".caltline1").find("img").attr("src","images/iconpointup.png");
                },
                function(){
                    jQuery(".caltline2").slideUp(500);
                    jQuery(".calender").fadeOut(500);
                    jQuery(".caltline1").find("img").attr("src","images/iconpoint.png");
                }
        );*/
        

    }
    $('.choosecal').delegate(".suretijian","click",function(){
    	 
    	    var orderid = $.getUrlParam('mdcid');
    	
    	  var time  = $(".datetoday").val();
    	  var order_id = $.getUrlParam('ORDER_ID');
    	
    	  $.ajax({
    	        type: "post",
    	        url: url+"/restOrder/editAboutTime",
    	        contentType:"application/json;charset=utf8",
    	        data: JSON.stringify({"order_id":orderid,"time":time}),
    	        dataType: "json",
    	        async : false,
    			cache : false,
    	        success: function (r) {
    	        	var data = eval(r.items);
    	        	if(r.msg=="success"){
    	        		alert('预约成功！');
    	        		window.location ="../subject/booking.html?ORDER_ID="+order_id;
    	        		}
    	        	}
    	  });
    	
    	
    	
    	
    	
    });    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    