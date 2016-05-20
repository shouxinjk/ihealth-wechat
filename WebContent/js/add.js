var guanxin ="<tr id='guanxin' class='occupation col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
		"<td>关系:</td>" +
		"<td>" +
		 "&nbsp;<input id='s3' type='text' value='朋友' placeholder='如:朋友!'/>" +
		"</td>" +
		"</tr>" ; 
    
var  basic = "<table style='display: block; width:100%;height:100%;'>" +
    "<tbody style='display: block;width:100%;height:100%;' >" +
    "<tr class='Name col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
    "<td>姓名：</td>" +
            "<td>" +
                "<input id='username' value='张三' type='text' placeholder='请填写姓名!'/>" +
                "<input id='user_id' type='hidden' value=''/>" +
            "</td>" +
        "</tr>" +
        "<tr class='Sex col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
            "<td>性别：</td>" +
            "<td class='boy'>" +
                "<lable><input type='radio' checked='checked' name='Sex' value='man' id='boy'/><span class='man'>男</span></lable>" +
            "</td>" +
            "<td>" +
                "<lable><input type='radio' name='Sex' value='woman' id='girl' /><span class='woman'>女</span></lable>" +
            "</td>" +
        "</tr>" +
        "<tr class='marital_status col-lg-12 col-xs-12 col-md-12 col-sm-12 '>" +
            "<td>婚姻：</td>" +
//            "<td class='marriage'>" +
//                "<input type='radio' checked='checked' name='married' value='married' /><span>已婚</span>" +
//            "</td>" +
//            "<td>" +
//                "<input type='radio' name='married' value='spinsterhood' /><span>未婚</span>" +
//            "</td>" +
            "<td>" +
	            "<select id='marriageM' class='marriageM'>" +
	                "<option name='married'  selected = 'selected' value='1' >未婚</option>"+
	                "<option name='married' value='2'>已婚</option>"+
	                "<option name='married' value='3'>同居</option>"+ 
	                "<option name='married' value='4'>离异</option>"+
	                "<option name='married' value='5'>寡居</option>"+   
	            "</select>" +
            "</td>" +
        "</tr>" +
        "<tr class='birthday col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
            "<td>生日：</td>" +
            "<td>" +
                "<input type=\"text\" maxlength=\"4\" name=\"date\" class=\"Wdate\" placeholder=\"如:19920101\"  value='' onfocus=\"WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd'})\"/>" +
            "</td>" +
        "</tr>" +
        "<tr class='stature col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
            "<td style='display: inline-block;'>身高：</td>" +
            "<td style='display: inline-block;width:29%;'>" +
                "<input type='text' maxlength=\"4\" id='stature' name='height' class='height' value='175'  placeholder=\"170\" />" +
                "<span style='margin-left:0.2rem;'>cm</span>" +
            "</td>" +
            "<td style='display: inline-block;'>体重：</td>" +
            "<td style='display: inline-block;width:29%;'>" +
                "<input type='text' name='weigth' class='weigth' value='65' placeholder=\"50\"/><span style='margin-left:0.2rem;'>kg</span>" +
            "</td>" +
        "</tr>" +
        
            "<tr class='Birthplace col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
                "<td>出生地：</td>" +
                "<td>" +
                    "<select id='pro'></select><select id='city'></select>" +
                "</td>" +
            "</tr>" +
            "<tr class='permanent_residence col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
                "<td>常住地：</td>" +
                "<td>" +
                    "<select id='pro1'></select><select id='city1'></select>" +
                "</td>" +
            "</tr>" +
            "<tr class='occupation col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
                "<td>职业：</td>" +
                "<td>" +
                    "<select id='s1' class='nn'>" +
                        "<option  selected = 'selected' value='0' >IT|通信|电子|互联网</option>"+
                        "<option value='1'>金融业</option>"+
                        "<option value='2'>房地产|建筑业</option>"+
                        "<option value='3'>商业服务</option>"+
                        "<option value='4'>贸易|批发|零售|租赁业</option>"+
                        "<option value='5'>文体教育|工艺美术</option>"+
                        "<option value='6'>生产|加工|制造</option>"+
                        "<option value='7'>交通|运输|物流|仓储</option>"+
                    "</select>" +
                "</td>" +
            "</tr>" +
            "<tr class='education col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
                "<td>学历：</td>" +
                "<td>" +
                    "<select id='s2'>" +
                    "<option value='1'>小学</option>"+
                    "<option value='2'>初中</option>"+
                    "<option value='3'>高中</option>"+
                    "<option value='4'>中专</option>"+
                    "<option value='5'>大专</option>"+
                    "<option value='6'>本科</option>"+
                    "<option value='7'>硕士</option>"+
                    "<option value='8'>博士</option>"+
                    "</select>" +
                "</td>" +
            "</tr>" +
            "<tr class='message_next  col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
                "<td style=\"display: block\">" +
                    "<a href=\"#\" class=\"message_next_a1 weui_btn weui_btn_plain_primary\" onclick='on_click()'>下一步</a>" +
                "</td>" +
            "</tr>" +
        "</tbody>" +
    "</table>";


var  liveway =  "<div class='ddiv col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
                    "<span class='col-lg-3 col-xs-3 col-md-3 col-sm-3' >生活起居</span>" +
                    "<ul class='liveul col-lg-9 col-xs-9 col-md-9 col-sm-9'>" +
                        "<li>生活起居</li>" +
                        "<li>生活起居</li>" +
                        "<li>生活起居</li>" +
                        "<li>生活起居</li>" +
                        "<li>生活起居</li>" +
                    "</ul>" +
                "</div>"+
                "<div class='ddiv col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
                    "<span class='col-lg-3 col-xs-3 col-md-3 col-sm-3' >生活起居</span>" +
                    "<ul class='liveul col-lg-9 col-xs-9 col-md-9 col-sm-9'>" +
                        "<li>生活起居</li>" +
                        "<li>生活起居</li>" +
                        "<li>生活起居</li>" +
                        "<li>生活起居</li>" +
                        "<li>生活起居</li>" +
                    "</ul>" +
                "</div>"+
                "<div class='ddiv col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
                    "<span class='col-lg-3 col-xs-3 col-md-3 col-sm-3' >生活起居</span>" +
                    "<ul class='liveul col-lg-9 col-xs-9 col-md-9 col-sm-9'>" +
                        "<li>生活起居</li>" +
                        "<li>生活起居</li>" +
                        "<li>生活起居</li>" +
                        "<li>生活起居</li>" +
                        "<li>生活起居</li>" +
                    "</ul>" +
                "</div>"+
                "<div class='ddiv col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
                    "<span class='col-lg-3 col-xs-3 col-md-3 col-sm-3' >生活起居</span>" +
                    "<ul class='liveul col-lg-9 col-xs-9 col-md-9 col-sm-9'>" +
                        "<li>生活起居</li>" +
                        "<li>生活起居</li>" +
                        "<li>生活起居</li>" +
                        "<li>生活起居</li>" +
                        "<li>生活起居</li>" +
                    "</ul>" +
                "</div>" +
            "<div class='message_next2  col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
                "<p style=\"display: block\">" +
                 "<a href=\"#\" class=\"message_next_a2 weui_btn weui_btn_plain_primary\" onclick='on_click2()'>下一步</a>" +
                "</p>" +
            "</div>" ;


var  illnessMassage = "<h4 class='personage col-lg-12 col-xs-12 col-md-12 col-sm-12'>个人疾病信息</h4>"+
                    "<div class='personage_illness  col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
                        "<ul>"+
                            "<li>什么病都有</li>"+
                            "<li>什么病都有</li>"+
                            "<li>什么病都有</li>"+
                            "<li>什么病都有</li>"+
                            "<li>什么病都有</li>"+
                        "</ul>"+
                    "</div>"+
                    "<h4 class='family col-lg-12 col-xs-12 col-md-12 col-sm-12'>家族疾病信息</h4>"+
                    "<div class='family_illness  col-lg-12 col-xs-12 col-md-12 col-sm-12'>"+
                       "<ul>"+
                            "<li>什么病都有</li>"+
                            "<li>什么病都有</li>"+
                            "<li>什么病都有</li>"+
                            "<li>什么病都有</li>"+
                            "<li>什么病都有</li>"+
                        "</ul>"+
                    "</div>"  +
                    "<div class='message_next3  col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
                     "<p style=\"display: block\">" +
                        "<a href=\"#\" class=\"message_next_a3 weui_btn weui_btn_plain_primary\" onclick='on_click3()'>下一步</a>" +
                     "</p>" +
                    "</div>" ;


var Care_People ="<div class=\"Care\">"+
                            "<div class=\"Care_one col-lg-12 col-xs-12 col-md-12 col-sm-12\">"+
                                "<div class=\"Care_img col-lg-3 col-xs-3 col-md-3 col-sm-3\">"+
                                "<img src=\"../WEB-INF/images/head_portrait.jpg\" alt=\"\"/>"+
                            "</div>"+
                            "<span class=\"col-lg-9 col-xs-9 col-md-9 col-sm-9\">用户名</span>"+
                        "</div>"+
                        "<div class=\"Care_one col-lg-12 col-xs-12 col-md-12 col-sm-12\">"+
                            "<div class=\"Care_img col-lg-3 col-xs-3 col-md-3 col-sm-3\">"+
                                "<img src=\"../WEB-INF/images/head_portrait.jpg\" alt=\"\"/>"+
                            "</div>"+
                            "<span class=\"col-lg-9 col-xs-9 col-md-9 col-sm-9\">用户名</span>"+
                        "</div>"+
                   "</div>"+
                    "<div class=\"button_sp_area\">"+
                            "<a href=\"#\"  class=\"add weui_btn_plain_primary\">添加</a>"+
                    "</div>";




var cont = "<div class=\"touch item col-lg-12 col-xs-12 col-md-12 col-sm-12\" id=\"touch\" userAddressId=\"1\">";
"<div class=\"jc_project col-lg-12 col-xs-12 col-md-12 col-sm-12\">" +
"<span class=\"jcxm col-lg-3 col-xs-3 col-md-3 col-sm-3\">检查项目：</span>" +
"<div class=\"pl col-lg-9 col-xs-9 col-md-9 col-sm-9\"><span>腹部彩超联合AFP无损、高费效比腹部彩超联合AFP无损、高费效比</span><span class='pingl'>【一年一次</span>】" +
"</div>" +
"</div>"+
"<div class=\"zhiN col-lg-12 col-xs-12 col-md-12 col-sm-12\">" +
"<span class=\"source col-lg-3 col-xs-3 col-md-3 col-sm-3\">指南来源：</span>" +
"<div class=\"source_adr col-lg-9 col-xs-9 col-md-9 col-sm-9\">美国NCCN及USPSTF美国NCCN及USPSTF美国NCCN及USPSTF美国NCCN及USPSTF</div></div>";
"<div id=\"remove\" class=\"remove weui_btn weui_btn_mini weui_btn_primary\">删除</div>";
"<div class=\"weui_dialog_alert\" id=\"dialog\" style=\"display:none;\">" +
"<div class=\"weui_mask\"></div>" +
"<div class=\"weui_dialog\">" +
"<div class=\"weui_dialog_hd\"><strong class=\"weui_dialog_title\">友情提示！</strong></div>" +
"<div class=\"weui_dialog_bd\">您确定删除吗？</div>" +
"<div class=\"weui_dialog_ft\">" +
"<a href=\"#\" class=\"weui_btn_dialog default\">取消</a>"+
"<a href=\"#\" class=\"weui_btn_dialog primary\">确定</a>" +
"</div>" +
"</div>" +
"</div>";
"</div>";
