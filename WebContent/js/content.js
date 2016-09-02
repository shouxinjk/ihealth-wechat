
function SetCookie(cookieName,cookieValue,nDays) {
            /*当前日期*/
            var today = new Date();
            /*Cookie过期时间*/
            var expire = new Date();
            /*如果未设置nDays参数或者nDays为0，取默认值1*/
            if(nDays == null || nDays == 0) nDays = 1;
            /*计算Cookie过期时间*/
            expire.setTime(today.getTime() + 3600000 * 24 * nDays);
            /*设置Cookie值*/
            document.cookie = cookieName + "=" + encodeURIComponent(cookieValue)
                    + ";expires=" + expire.toGMTString();
        }


	function ReadCookie(cookieName) {
	    var theCookie = "" + document.cookie;
	    var ind = theCookie.indexOf(cookieName);
	    if(ind==-1 || cookieName=="") return "";
	    var ind1 = theCookie.indexOf(';',ind);
	    if(ind1==-1) ind1 = theCookie.length;
	    /*读取Cookie值*/
	    return decodeURIComponent(theCookie.substring(ind+cookieName.length+1,ind1));

	}
	
	function random(){
		return Math.floor(Math.random()*n+1);
	}

	function delCookie(cookieName)//删除cookie
	{
	    var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    var cval=ReadCookie(cookieName);
	    if(cval!=null) document.cookie= cookieName + "="+cval+";expires="+exp.toGMTString();
	}



