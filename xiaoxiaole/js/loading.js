/**
 * Created by Administrator on 2015/11/23 0023.
 */


       var MyGame={
           img:["bg1.jpg","bg2.jpg","bg3.jpg","bg4.jpg","bg5.jpg","btn1.png","btn2.png","btn3.png","btn4.png","btn5.png","card0.png","card1.png","col1.png","col2.png","col3.png","col4.png","col5.png","col1-1.png","col2-1.png","col3-1.png","col4-1.png","col5-1.png","colBg.png","dish.png","dishStart.png","gameConBg.png","gameTimeBg.png","indexPic1.png","indexPic2.png","logo.png","phone.png","quick.png","quick0.png","ready.png","ruleTit.png","share.png","share2.png","winBg.png","winBtnBg.png"],
          
           init:function(){
                this.loading();
           },
           loading:function(){
                var self=this;
               var d=0;
                for(var i=0;i<this.img.length;i++){
                      var imgs=new Image();
                      imgs.src="images/"+this.img[i];
                      imgs.onload=a;

                }
                   function a(){
                           d++;
                           if(d==self.img.length){
                               self.startGame();
                           }
                   }
           },
           startGame:function(){
              $("#loading").hide();
           },
        }
MyGame.init();