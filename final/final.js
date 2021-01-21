  // 隨機取整數
  function getRandomInt(min, max){
    return Math.floor(Math.random()*(max-min+1))+min;
  }

  
  $(function(){
    var $body=$("body"),
        $stage=$("#stage"),
        $player=$("#player"),
        $score=$("#score"),
        counter=0,
        player_speed=5,
        player_x=0,
        player_y=0,
        // stage半徑
        vr=Math.sqrt(Math.pow($stage.width()/2,2)+Math.pow($stage.height()/2,2)),
        v_speed= 3;
    // 角色起始位置
    $player.css("left",($stage.width()-$player.width())/2+"px");
    $player.css("top",($stage.height()-$player.height())/2+"px");
    // keyboard控制角色
    $body.keydown(function(e){
      switch(e.which)
      {
        case 38:player_y=-1;break;
        case 40:player_y=1;break;
        case 37:player_x=-1;break;
        case 39:player_x=1;break;
      }
    });
    $body.keyup(function(){
      player_x=0;
      player_y=0;
    })
    //生成病毒 （隨機角度
    function createvirus(){
        $stage.append("<div class='character virus'></div>");
        var v = $stage.find(".virus:last"),
            v_angle = getRandomInt(0,359),
            vx =$stage.width()/2+vr*Math.cos(Math.PI*v_angle/180)-v.width()/2,
            vy =$stage.height()/2+vr*Math.sin(Math.PI*v_angle/180)-v.height()/2,
           // 隨機產生結束角度
            v_end_angle=getRandomInt(v_angle+90,v_angle+270);
            // 以某速度至某叫度
            v.data("x_speed",v_speed*Math.cos(Math.PI*v_end_angle/180));
            v.data("y_speed",v_speed*Math.sin(Math.PI*v_end_angle/180));
        // 起始位置
        v.css("left",vx+"px");
        v.css("top",vy+"px");
    }
    // 50的病毒
    for(var i=0; i<50; i++)
    createvirus();
    // 角色動畫
    var loop = setInterval(function(){
        // player動襪
        // 一開始是0
        var xspeed = 0, 
            yspeed = 0,
            x = parseInt($player.css("left")),
            y = parseInt($player.css("top"));

        // 往左速度
        if (player_y==0 && player_x==-1)xspeed=player_speed*player_x;
        // 往上
        if (player_y==1 && player_x==0)yspeed=player_speed*player_y;
        // 往右
        if (player_y==0 && player_x==1)xspeed=player_speed*player_x;       
        // 往下
        if (player_y==-1 && player_x==0)yspeed=player_speed*player_y;
        // 斜角速度
        if(player_x!=0 && player_y!=0){
          xspeed = player_speed/Math.sqrt(2)* player_x;
          yspeed = player_speed/Math.sqrt(2)* player_y;
        } 
        // 讓playre不要超過stage
        x= x+xspeed;
        y= y+yspeed;
        if(x<0)x=0;
        if(y<0)y=0;
        if(x>$stage.width()-$player.width())x=$stage.width()-$player.width();
        if(y>$stage.height()-$player.height())y=$stage.height()-$player.height();
        $player.css("left",x+"px");
        $player.css("top",y+"px");
        
        // 病毒動畫
        $(".virus").each(function(){
          var $this = $(this),
              // 病毒的X,Y軸
              vx=parseInt($this.css("left")),
              vy=parseInt($this.css("top"));
              // 兩點距離
              distance = Math.sqrt(Math.pow($stage.width()/2-(vx+$this.width()/2),2)+Math.pow($stage.height()/2-(vy+$this.height()/2),2));
            vx = Math.round(vx+$this.data("x_speed"));
            vy = Math.round(vy+$this.data("y_speed"));
            $this.css("left",vx+"px");
            $this.css("top",vy+"px");
            // 病毒離開 半徑和<兩中心距離 把病毒刪掉 新增一個
            if($this.width()/2+vr < distance){
              $this.remove();
              createvirus();
            }
            // 碰到結束
            //  player圓心位置
             var player_center_x = parseInt($player.css("left"))+$player.width()/2,
                 player_center_y = parseInt($player.css("top"))+$player.height()/2;
                 player_virus_d = Math.sqrt(Math.pow(player_center_x-(vx+$this.width()/2),2)+Math.pow(player_center_y-(vy+$this.height()/2),2));
            if($this.width()/2+$player.width()/2>player_virus_d){
             alert("Game Over!你獲得" + counter + "分");
             clearInterval(loop);
            
            }


            
        })
        // 分數
        $score.html(++counter);

        
    }, 1000/60);
  })