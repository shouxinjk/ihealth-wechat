$(function(){	
	var str = "<table style='display: block; width:100%;'>" +
					    "<tbody style='display: block' >" +
					    "<tr class='Name col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
					    "<td>" +
					    		"<img style='width:.7rem;margin-right: .5rem;' class='guan_phone' src=\"../images/phone.png\" alt=\"\"/>"+
					    "</td>" +
					    "<td>手机号</td>" +
					            "<td>" +
					                "<input id='phone'style='margin-left: .5rem;' type='text' maxlength='11' placeholder='请输入您要关心人的手机号！'/>" +
					            "</td>" +
					        "</tr>" +
					        "<tr class='message_next  col-lg-12 col-xs-12 col-md-12 col-sm-12'>" +
					        "<td style=\"display: block\">" +
					            "<a href=\"#\" id='message_next' class=\"message_next_a1 weui_btn weui_btn_plain_primary\" onclick='lookupUser()'>下一步</a>" +
					        "</td>" +
					    "</tr>" +
					        "</tbody>" +
				    "</table>";
		$('.content').html(str);
});