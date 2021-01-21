你的期末專題主題簡介
	病毒閃躲遊戲（因為新冠肺炎的關係故以台灣跟病毒當角色）

使用者要怎麼使用你的網站
利用鍵盤的上下左右控制台灣的移動方向，當台灣碰到綠色的病毒就會結束遊戲，並會在畫面右上方顯示分數。
<br>
你在這次專題中做了什麼，使用了什麼技術
角色方向控制：鍵盤上下左右的keydown、keyup加上switch選擇case
角色速度控制：一開始是零，用if判斷，if收到keydown的case就會以該方向增加速度（speed=5），若都不為零（斜角）則以原速度1/根號2倍速度前進（math函式），包在角色動畫loop = setInterval
裡面
角色不跑出遊戲畫面：if加上math函式
隨機角度生成病毒：getRandomInt讓病毒以隨機角度（0,359）生成，並以生成角度的（angle+90,angle+270)結束。包在create的函數裡面。
讓病毒數量保持在50個：for(var i=0; i<50; i++)
append、find：將病毒append到畫面中，並找出stage裡最新生成的病毒（last）
病毒離開：math函式計算，當病毒與遊戲畫面兩中心點距離大於兩圓半徑合時就代表病毒離開畫面，並會生成一個新的病毒（跑create）
角色及病毒碰到：同上原理，當碰到時就會結束整個loop(clearInterval(loop))
計分器：counter
alert：跳出遊戲結束通知，顯示分數


git網址:
https://judyliu1225.github.io/final/index.html

