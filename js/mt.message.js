
function mtGetPushMessage(){
	var remoteHost = localStorage.getItem('$remoteHost');
	var state = app.getState();
	
	console.log("push message:"+ remoteHost);
	
	mui.ajax(remoteHost + '/user/message',{
		data:{
			"token": state.token
		},
		dataType:'json',//服务器返回json格式数据
		type:'post',//HTTP请求类型
		timeout:10000,//超时时间设置为10秒；
		headers:{'Content-Type':'application/json'},	              
		success:function(data){
			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("push: "+data.message);
			if(data.status == 200){
				console.log("push content: "+data.data.content);
				sendLocalMsg(data.data.content);
			}
		},
		error:function(xhr,type,errorThrown){
			//异常处理； 
			console.log("error happened: " + type);
		}
	});
}


function createLocalPushMsg(){
    var options = {cover:false};
    var str = ": 欢迎使用Html5 Plus创建本地消息---00！";
    plus.push.createMessage( str, "LocalMSG", options );
    console.log( "创建本地消息成功！" );

    if(plus.os.name=="iOS"){
        console.log('*如果无法创建消息，请到"设置"->"通知"中配置应用在通知中心显示!');
    }
}


function sendLocalMsg(message){
    plus.push.createMessage("大牛消息:" + message, "LocalMSG", {cover:false});
}



// new message
//mui.plusReady(function() {
//  //仅支持竖屏显示
//  plus.screen.lockOrientation("portrait-primary");
//
//  document.addEventListener("newintent", function() {
//      openWebviewFromOthers();
//  });
//
//  plus.push.addEventListener("click", function(msg) {
//      console.log("push click");
//      pushGetRun(msg.payload);
//  }, false);
//  plus.push.addEventListener("receive", function(msg) {
//      //获取透传数据
//      var data = JSON.parse(msg.payload);
//      //创建本地消息
//        plus.push.createMessage(data.content, data.payload, {
//            title: data.title,
//            cover: false
//        });
//  }, false);
//  
//  openWebviewFromOthers();
//});
//function pushGetRun(payload) {
//  payload = JSON.parse(payload);
//  var id = payload.id;
//  var autoShow = payload.autoshow;
//  var event = payload.event;
//  var params = JSON.stringify(payload.params);
//  //......//用参数打开指定页面
//}
////获取通知栏（app未启动）点击、第三方程序启动本app
//function openWebviewFromOthers() {
//  var args = plus.runtime.arguments;
//      if(args) {
//          pushGetRun(args);
//      }
//}










// old 
mui.plusReady(function(){
	var messageEventNew = setInterval("mtGetPushMessage()", 10000);
	
	plus.push.addEventListener( "click", function(msg){
	  	var self = plus.webview.currentWebview();
		console.log("message mainID:" + self.id);
		
		var mainID = localStorage.getItem('$mainWindow');
	  	var main = plus.webview.getWebviewById(mainID);
		//触发列表界面的自定义事件（refresh）,从而进行数据刷新
		mui.fire(main,'refresh');
		console.log("refresh main");
		
		plus.push.clear();
	}, false );
	
	plus.push.addEventListener("receive", function(msg) {
        //获取透传数据
        var data = JSON.parse(msg.payload);
        //创建本地消息
        
        sendLocalMsg(data.content);
    }, false);

	window.addEventListener("refresh", function (e) {
		if(!e.detail){
			location.reload();
		}
		
		console.log("refresh detail: "+e.detail);
	});
});