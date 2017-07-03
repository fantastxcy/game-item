
    var cnum=2;//可消除色块最小相连数
    $(window).load(function(){
      addCol();
    });
    //生成色块
    function addCol(){
      $(".color").remove();
      for(var y=0;y<7;y++){
        for(var x=0;x<8;x++){
          var colLeft=89*x;
          var colTop=89*y;
          var rand=parseInt(Math.random()*5+1);
          $(".gameCon").append("<div name='c"+rand+"' id='a"+x+"b"+y+"' class='a"+x+"b"+y+" color c"+rand+"' style='top:"+colTop+"px;left:"+colLeft+"px;'></div>");
        }
      }
      //插入95516色块
      for(var i=1;i<=5;i++){
        var cLength=$(".c"+i).length;
        var cRand=parseInt(Math.random()*cLength);
        var cRand2;
        $(".c"+i).eq(cRand).addClass("cMty c"+i+"_1").attr("data",i);
        if(cRand<3){
          cRand2=cRand+2;
        }else{
          cRand2=cRand-2;
        }
      }
    }
    //点击色块
    var sub2=false;
    $(".gameCon").on("touchstart",".color",function(){
      var obj=$(this);
      if(sub2==false){
        sub2=true;
        $(obj).addClass("clearCol");//clearCol用作需要清除色块的标识
        funSearch();//判断点击色块周围颜色
        var clearLength=$(".clearCol").length;
        $(obj).addClass("rotate");
        setTimeout(function(){
          $(".rotate").removeClass("rotate");
          if(clearLength>=cnum){
            if($(".clearCol").hasClass("cMty")){
              var mtyData=parseInt($(".clearCol.cMty").attr("data"));
              var mtyNum=mtyData-1;
              $(".colBg").eq(mtyNum).children("img").fadeIn(300);
            }
            $(".clearCol").remove();
            funMove();
          }else{
            $(".clearCol").removeClass("clearCol");
            sub2=false;
          }
        },300);
        
      }
      
    });

    // 色块移动
    function funMove(){
      var cMtyL=$(".cMty").length;//剩余95516色块的数量
      if(cMtyL<=0){
        funSuc();
      }
      //色块向下移动
      for(var y=0;y<7;y++){
        for(var x=0;x<8;x++){
          var idLength=$("#a"+x+"b"+y+"").length;//判断当前坐标位置是否有色块
          if(idLength==0){
            var h=0;
            for(var i=0;i<y;i++){//遍历当前列判断刚消失的色块上方有多少位置为空
              var l=$("#a"+x+"b"+i+"").length;
              if(l==0){h++;}
            }
            for(var j=y-1;j>=h;j--){//遍历当前列判断刚消失的色块上方有多少色块
              var k=j+1;
              $("#a"+x+"b"+j+"").attr("id","a"+x+"b"+k+"");//更新色块坐标
            }
          }
        }
      }
      //色块向左移动
      for(var x=8;x>=0;x--){
        var m=0;//用于判断当前列有多少位置为空
        for(var y=0;y<7;y++){
          var idLength=$("#a"+x+"b"+y+"").length;
          if(idLength==0){
            m++;
            if(m>=7){//如果整列为空
              for(var j=0;j<7;j++){
                for(var i=x+1;i<8;i++){
                  var k=i-1;
                  $("#a"+i+"b"+j+"").attr("id","a"+k+"b"+j+"");//更新色块坐标
                }
              }
            }
          }
        }
      }
      //执行移动效果
      for(var y=0;y<7;y++){
        for(var x=0;x<8;x++){
          var colLeft=89*x;
          var colTop=89*y;
          $("#a"+x+"b"+y+"").animate({"top":colTop+"px","left":colLeft+"px"},500);
        }
        setTimeout(function(){
          sub2=false;
        },500);
        
      }
    }

    function funSearch(){
      //xy为色块坐标
      for(var y=0;y<7;y++){
        for(var x=0;x<8;x++){
          if($("#a"+x+"b"+y+"").hasClass("clearCol")){
            var colName=$("#a"+x+"b"+y+"").attr("name");//用于判断是否是相同颜色
            var xL=x-1;
            var xR=x+1;
            var yT=y-1;
            var yB=y+1;
            if($("#a"+xL+"b"+y+"").attr("name")==colName||$("#a"+xR+"b"+y+"").attr("name")==colName||$("#a"+x+"b"+yT+"").attr("name")==colName||$("#a"+x+"b"+yB+"").attr("name")==colName){
              // $("#"+colId+"").addClass("clearCol");
              //左边
              if($("#a"+xL+"b"+y+"").attr("name")==colName){
                $("#a"+xL+"b"+y+"").addClass("clearCol");
                $("#a"+xL+"b"+y+"").addClass("rotate");
                searchXY(colName,xL,y);
              }
              //右边
              if($("#a"+xR+"b"+y+"").attr("name")==colName){
                $("#a"+xR+"b"+y+"").addClass("clearCol");
                $("#a"+xR+"b"+y+"").addClass("rotate");
                searchXY(colName,xR,y);
              }
              //上边
              if($("#a"+x+"b"+yT+"").attr("name")==colName){
                $("#a"+x+"b"+yT+"").addClass("clearCol");
                $("#a"+x+"b"+yT+"").addClass("rotate");
                searchXY(colName,x,yT);
              }
              //下边
              if($("#a"+x+"b"+yB+"").attr("name")==colName){
                $("#a"+x+"b"+yB+"").addClass("clearCol");
                $("#a"+x+"b"+yB+"").addClass("rotate");
                searchXY(colName,x,yB);
              }
            }else{
              $("#a"+x+"b"+y+"").removeClass("clearCol");
            }
          }
        }
      }
    }

    //遍历相邻色块
    function searchXY(colName,x,y){
      var xL=x-1;
      var xR=x+1;
      var yT=y-1;
      var yB=y+1;
      //左边
      if($("#a"+xL+"b"+y+"").attr("name")==colName){
        if(!$("#a"+xL+"b"+y+"").hasClass("clearCol")){
          $("#a"+xL+"b"+y+"").addClass("clearCol");
          $("#a"+xL+"b"+y+"").addClass("rotate");
          searchXY(colName,xL,y);
        }
        
      }
      //右边
      if($("#a"+xR+"b"+y+"").attr("name")==colName){
        if(!$("#a"+xR+"b"+y+"").hasClass("clearCol")){
          $("#a"+xR+"b"+y+"").addClass("clearCol");
          $("#a"+xR+"b"+y+"").addClass("rotate");
          searchXY(colName,xR,y);
        }
      }
      //上边
      if($("#a"+x+"b"+yT+"").attr("name")==colName){
        if(!$("#a"+x+"b"+yT+"").hasClass("clearCol")){
          $("#a"+x+"b"+yT+"").addClass("clearCol");
          $("#a"+x+"b"+yT+"").addClass("rotate");
          searchXY(colName,x,yT);
        }
      }
      //下边
      if($("#a"+x+"b"+yB+"").attr("name")==colName){
        if(!$("#a"+x+"b"+yB+"").hasClass("clearCol")){
          $("#a"+x+"b"+yB+"").addClass("clearCol");
          $("#a"+x+"b"+yB+"").addClass("rotate");
          searchXY(colName,x,yB);
        }
      }
              
    }
    
    //点击云闪付
    $(".quick").one("click",function(){
      $(".phone").css({"left":"800px","top":"250px"});
      $(this).css("background","url(images/quick0.png) no-repeat");
      $(".color").addClass("rotate");
      setTimeout(function(){
        $(".color").removeClass("rotate");
        $(".gameCon").hide();
        var colorL=$(".color").length;
        $(".color").removeAttr("id");
        var x=0,y=6;
        for(var i=colorL-1;i>=0;i--){
          if(y<0){
            y=6;
            x++;
          }
          $(".color").eq(i).attr("id","a"+x+"b"+y);
          var obj=$(".color").eq(i);
          //执行移动效果
          var colLeft=89*x;
          var colTop=89*y;
          obj.css({"top":colTop+"px","left":colLeft+"px"});
          y--;
        }
        $(".gameCon").fadeIn(300);
      },1000);
      
    });

    //完成游戏
    function funSuc(){
      clearInterval(st);//停止计时
      $(".bar").stop();
      $(".success").fadeIn(300);
      $("#music")[0].play();
      $(".musicIcon").addClass("round");
      setTimeout(function(){
        $(".success").fadeOut();
        $(".shade").fadeIn(300);
        $(".sucWin").fadeIn(300);
      },5000);
      

    }


    













