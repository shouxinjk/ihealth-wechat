 $(document).ready(function () {
	 $('.xin1').raty({
     	hints: ['1', '2', '3', '4', '5'],
     	path:"../images/",
     	 click: function (score, evt) {
     		 alert(score);
     	},
     score: function() {
         return $(this).attr('data-score');
       }
     });
	   $('.xin2').raty({
     	hints: ['1', '2', '3', '4', '5'],
     	path:"../images/",
     	click: function (score, evt) {
    		 alert(score);
    	   },
    	score: function() {
    	    return $(this).attr('data-score');
    	  }
     });
	    $('.xin3').raty({
		  	hints: ['1', '2', '3', '4', '5'],
		  	path:"../images/",
		  	click: function (score, evt) {
    		 alert(score);
    	   },
    	score: function() {
    	    return $(this).attr('data-score');
    	  }
	    }); 

 });	    