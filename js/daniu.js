
		
   //  菜单     
			/*
			$(".settingNew").on("click", function() {
				var url_setting = "main.html";
				console.log("main to setting:" + url_setting);
		     	mui.openWindow({
		     		url: url_setting,
		     		id: "main",
		     		createNew: true
	     		});
		     });
            */
            $(".settingNew").on("click", function() { 
				var state = app.getState();
				var isLogin = 0;
	            if(typeof(state.token) != "undefined")
	              {
		            isLogin = 1;
	              }
	              if(!isLogin)
	              {
	              	mui.openWindow({
			            url: 'login_new.html',
			            id: 'login_new'
		             });
	              	return;
	              }
			
				
				var url_setting = "home.html";
				console.log("main to setting:" + url_setting);
		     	mui.openWindow({
		     		url: url_setting,
		     		id: "home",
		     		createNew: true
	     		});
	     	});
