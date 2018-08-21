 //扩展API完成后执行的操作
function plusReady(){               
 //给选中的li增加判别class
//                  $("#button-select-img p").on("tap",".imageup",function(){
//                  	$(".list li").on("tap",".imageup",function(){

	$("#button-select-img").click(function(){
         page.imgUp();
  });
} 
//弹出系统按钮选择框
var page=null; 
page={ 
    imgUp:function(){ 
        var m=this; 
       /* console.log(m);*/
        plus.nativeUI.actionSheet({cancel:"取消",buttons:[ 
            {title:"拍照"}, 
            {title:"从相册中选择"} 
        ]}, function(e){//1 是拍照  2 从相册中选择 
            switch(e.index){ 
                case 1:appendByCamera();break; 
                case 2:appendByGallery();break; 
            } 
        }); 
    } 
} 
   
// 拍照添加文件
function appendByCamera(){
		if(imageRemain <= 0){
		mui.toast("您只能选择"+imageNumAllow+"张图片");
		return;
	}
    plus.camera.getCamera().captureImage(function(e){
        console.log("e is" +  e);
        plus.io.resolveLocalFileSystemURL(e, function(entry) {
            var path = entry.toLocalURL();
//                      var indexa = liIndex()
//                      console.log(indexa);
//                      $(".headimg")[indexa].src = path; 
			compressImage(entry.toLocalURL(),entry.name);
        }, function(e) {
            mui.toast("读取拍照文件错误：" + e.message);
                });
 
            });   
        }
        // 从相册添加文件
//          function appendByGallery(){
//              plus.gallery.pick(function(path){
////                  var indexa = liIndex();
////                  console.log(indexa);
//                  addNewimageToList(path);
////                  $(".headimg")[indexa].src = path;
//              });
//          }

// 从相册中选择多张图片 
function appendByGallery(){
	if(imageRemain <= 0){
		mui.toast("您只能选择"+imageNumAllow+"张图片");
		return;
	}
	// 从相册中选择图片
	console.log("从相册中选择多张图片:");
    plus.gallery.pick( function(e){

	    	for(var i in e.files){
		    	console.log(e.files[i]);
		    	// 压缩：

             plus.io.resolveLocalFileSystemURL(e.files[i], function(entry) {
			     compressImage(entry.toLocalURL(),entry.name);   
			}, function(e) {   
			     plus.nativeUI.toast("读取拍文件错误：" + e.message);   
			});   
	    	}
    }, function ( e ) {
    		console.log( "取消选择图片" );
    },{filter:"image",multiple:true,maximum:imageRemain,system:false});// 最多选择3张图片
}

function addNewimageToList(imagePath){
		var imageList = $("#article-image-list");
		var image = '<img src=\''+imagePath+'\' data-preview-src=""   data-preview-group="999" >';
		
		if(imageRemain <= 0){
			mui.toast("您只能选择"+imageNumAllow+"张图片");
			return;
		}
		
		imageList.append($(image));
		
		imageRemain--;
		imageCount++;
}

//压缩图片   
  function compressImage(url,filename){   
	   var name="_doc/upload/_"+filename;//_doc/upload/F_ZDDZZ-1467602809090.jpg   
	   plus.zip.compressImage({   
		     src:url,//src: (String 类型 )压缩转换原始图片的路径   
		     dst:name,//压缩转换目标图片的路径   
		     quality:20,//quality: (Number 类型 )压缩图片的质量.取值范围为1-100   
		     overwrite:true//overwrite: (Boolean 类型 )覆盖生成新文件   
	    },   
	    function(event) {    
		     //uploadf(event.target,divid);   
		     var path = name;//压缩转换目标图片的路径   
		     //event.target获取压缩转换后的图片url路   
		     //filename图片名称   
		     console.log("compress success.");
		     
		     addNewimageToList(event.target);
		     
	//		     saveimage(event.target,divid,filename,path);   
		},
		function(error) {
	     	plus.nativeUI.toast("压缩图片失败，请稍候再试");   
		});   
  }   
  //保存信息到本地   
  /**   
   *    
   * @param {Object} url  图片的地址   
   * @param {Object} divid  字段的名称   
   * @param {Object} name   图片的名称   
   */   
  function saveimage(url,divid,name,path){   
	   //alert(url);//file:///storage/emulated/0/Android/data/io.dcloud...../doc/upload/F_ZDDZZ-1467602809090.jpg   
	   //alert(path);//_doc/upload/F_ZDDZZ-1467602809090.jpg   
	   var  state=0;   
	   var wt = plus.nativeUI.showWaiting();   
	    //  plus.storage.clear();    
	   namename=name.substring(0,name.indexOf("."));//图片名称：1467602809090   
	   var id = document.getElementById("ckjl.id").value;   
	   var itemname=id+"img-"+divid;//429img-F_ZDDZ   
	   var itemvalue=plus.storage.getItem(itemname);   
	   if(itemvalue==null){   
	    itemvalue="{"+name+","+path+","+url+"}";//{IMG_20160704_112614,_doc/upload/F_ZDDZZ-IMG_20160704_112614.jpg,file:///storage/emulated/0/Android/data/io.dcloud...../doc/upload/F_ZDDZZ-1467602809090.jpg}   
	   }else{     
	    itemvalueitemvalue=itemvalue+"{"+name+","+path+","+url+"}";   
	   }   
	   plus.storage.setItem(itemname, itemvalue);   
	        
	   var src = 'src="'+url+'"';   
	   //alert("itemvalue="+itemvalue);   
	   showImgDetail(name,divid,id,src);   
	   wt.close();   
        
  } 
            
//          var server = "http://martintest.qa3.ppcdev.tech/image/create";

//获取图片元素
//          var files = document.getElementById('headimg');
// 上传文件
function upload(){
		if(imageCount <= 0){
//			mui.toast("亲，您还没有选择图片！");
//			return;
		}
    var wt=plus.nativeUI.showWaiting();
    var task=plus.uploader.createUpload(remoteHost + "/user/update/"+state.user_id,
        {method:"POST"},
        function(t,status){ //上传完成
            if(status==200){
                console.log("修改成功：" + t.responseText);
                
                var data = eval('(' + t.responseText + ')');
                
                console.log("修改header：" + data.data.header);
                console.log("status：" + data.status);
                
                if(data.status != 200){
                		mui.toast(data.message);
                }else{
                		mui.toast("修改成功");
                }
                
                
                wt.close(); //关闭等待提示按钮
                
                var state = app.getState();
                
                var headerImage = (typeof(data.data.header) != 'undefined') ? data.data.header : state.header;
                var loginSuccessInfo = {
					"account"	: state.account,
					"token"		: state.token,
					"user_id"	: state.user_id,
					"nickname"	: state.nickname,
					"is_super"	: state.is_super,
					"header"		: headerImage
				};
				
				app.createStateRemote(loginSuccessInfo);
				
                mui.openWindow({
                		url:'home.html',
                		id: "home"
                });
                
                var home = plus.webview.getWebviewById("home");
				//触发列表界面的自定义事件（refresh）,从而进行数据刷新
				mui.fire(home,'refresh');
            }else{
                console.log("修改失败："+status);
                console.log("error message:" + t.responseText);
                mui.toast("修改失败:" + t.responseText);
                wt.close();//关闭等待提示按钮
            }
        }
    );  
    console.log("remoteHost:" + remoteHost);
    //添加其他参数
    task.addData("nickname", $("#nickname").val());
    task.addData("password", $("#password").val());
    task.addData("token", state.token);
//              task.addFile(files.src,{key:"dddd"});
    
    //获取图片元素，添加到上传参数中
    var index = 1;
    var imageList = $("#article-image-list").find("img").each(function(){
    		task.addFile($(this).attr("src"), {"key": "articleImage"+index});
    		console.log($(this).attr("src")); 
    		index++;
    }); 

    task.start();
} 

 //判断点击的是上传的第几个li             
 function liIndex(){
    var lis = $(".list").children();
    console.log(lis.length)
    for(var i = 0; i < lis.length;i++){ 
        console.log($(lis[i]).attr("class"))
        var lisClass = $(lis[i]).attr("class").split(" ");
        if(lisClass[2] == "selectLi"){
                console.log(i);
                return i;
            }
        }
     }
     
     
  //扩展API是否准备好，如果没有准备好则监听plusReady 
 if(window.plus){
        plusReady();
    }else{
        document.addEventListener("plusready",plusReady,false);
}