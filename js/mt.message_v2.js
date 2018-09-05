
// new message
mui.plusReady(function() {
    //仅支持竖屏显示
    plus.screen.lockOrientation("portrait-primary");

    document.addEventListener("newintent", function() {
        openWebviewFromOthers();
    });

    plus.push.addEventListener("click", function(msg) {
        console.log("push click");
        pushGetRun(msg.payload);
    }, false);
    plus.push.addEventListener("receive", function(msg) {
        //获取透传数据
        var data = JSON.parse(msg.payload);
        //创建本地消息
          plus.push.createMessage(data.content, data.payload, {
              title: data.title,
              cover: false
          });
    }, false);
    
    openWebviewFromOthers();
});
function pushGetRun(payload) {
    payload = JSON.parse(payload);
    var id = payload.id;
    var autoShow = payload.autoshow;
    var event = payload.event;
    var params = JSON.stringify(payload.params);
    //......//用参数打开指定页面
}
//获取通知栏（app未启动）点击、第三方程序启动本app
function openWebviewFromOthers() {
    var args = plus.runtime.arguments;
        if(args) {
            pushGetRun(args);
        }
}
