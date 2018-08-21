
		
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
	            	var remoteHost = localStorage.getItem('$remoteHost');
				var state = app.getState();
		
	            	mui.post(remoteHost + '/user/getUserInfo',{
						"token": state.token
					},function(data){
						//服务器返回响应，根据响应结果，分析是否登录成功；
						if(data.status == 200){
							var url_setting = "home.html";
							console.log("main to setting:" + url_setting);
					     	mui.openWindow({
					     		url: url_setting,
					     		id: "home",
					     		createNew: true
				     		});
						}else{
							mui.openWindow({
					            url: 'login_new.html',
					            id: 'login_new'
				             });
						}
						
						console.log(data.message);
					},'json'
				);
				
	     	});
