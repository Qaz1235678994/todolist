// input.task_name 在 focus 事件觸發時，div.task_add_block 加上 -on class。
// input.task_name 在 blur 事件觸發時，div.task_add_block 移除 -on class。
$(function(){
   $("input.task_name").on("focus", function() {
    // console.log("focus觸發");
    $(this).closest("div.task_add_block").addClass("-on");
   });

   $("input.task_name").on("blur", function() {
    // console.log("blur觸發");
    $(this).closest("div.task_add_block").removeClass("-on");
   });

})

// 輸入的待辦事項，如果文字的最左邊、最右邊有空格，需移除。(語法：JS 內建的 trim() 函式)。
$("input.task_name").val().trim();

// 按下「新增」按鈕時，將以上的待辦事項 html，新增到 ul.task_list 裡，新增到裡面的最前面。
// 如果沒有輸入待辦事項，按「新增」的話，不能有任何反應。
// 新增成功的話，待辦事項欄位要清空。
function addTask() { 
   if ($("input.task_name").val() != "") {
      $("ul.task_list").prepend(`<li>
         <div class="item_flex">
           <div class="left_block">
             <div class="btn_flex">
               <button type="button" class="btn_up">往上</button>
               <button type="button" class="btn_down">往下</button>
             </div>
           </div>
           <div class="middle_block">
             <div class="star_block">
               <span class="star" data-star="1"><i class="fas fa-star"></i></span>
               <span class="star" data-star="2"><i class="fas fa-star"></i></span>
               <span class="star" data-star="3"><i class="fas fa-star"></i></span>
               <span class="star" data-star="4"><i class="fas fa-star"></i></span>
               <span class="star" data-star="5"><i class="fas fa-star"></i></span>
             </div>
             <p class="para">${$("input.task_name").val()}</p>
             <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${$("input.task_name").val()}">
           </div>
           <div class="right_block">
             <div class="btn_flex">
               <button type="button" class="btn_update">更新</button>
               <button type="button" class="btn_delete">移除</button>
             </div>
           </div>
         </div>
       </li>`);
       $("input.task_name").val("");
   } 
      
     
   }


$("button.task_add").on("click", function(){
   // console.log("綁定成功");
   addTask();
});

// 按下「Enter」鍵，也要能新增待辦事項。
$(document).on("keyup", function(e){
   if(e.which == 13){
   addTask();
   }
});


// 按下「移除」按鈕，淡出 1 秒，然後移除該筆待辦事項。
$(document).on("click", "button.btn_delete", function() {
   $(this).fadeOut(1000, function(){
     $(this).closest("li").remove();
   });
 });
 



// 按下「清空」按鈕，淡出 1 秒，清除全部的待辦事項。
$(document).on("click", "button.btn_empty", function() {
    // console.log("清空按鈕")
   // 使用 fadeOut() 讓列表逐漸消失，再清空列表內容
   $("ul.task_list").fadeOut(1000, function() {
      $(this).empty();  // 清空所有待辦事項
      $(this).fadeIn(0);  // 恢復透明度，顯示清空後的空列表
   });
});

 


// 按下「更新」按鈕，出現一般文字框，然後可以更新。
// 再按下「更新」按鈕，回到不可編輯的狀態，但待辦事項要是更新的。
// 如果所更新的待辦事項，沒有輸入文字，跳出提醒視窗(alert)，顯示「請輸入待辦事項」。
// 待辦事項的文字若最左邊、最右邊有空格的話，需移除。
$(document).on("click", "button.btn_update", function(e) {
   // console.log("更新按鈕");
   // console.log(this);
   // console.log($(this).closest("li").find("p.para"));
   var $li = $(this).closest("li");  // 找到包含該按鈕的 <li> 元素
   var $para = $li.find("p.para");  // 找到顯示待辦事項文字的 <p> 元素
   var $input = $li.find("input.task_name_update");  // 找到顯示更新文字框的 <input> 元素

   // 檢查文字框是否已經顯示，是否處於編輯模式
   if ($input.hasClass("-none")) {
      // 如果是顯示模式，顯示文字框，並把原本的待辦事項文字填入文字框
      $para.addClass("-none");  // 隱藏待辦事項文字
      $input.removeClass("-none").val($para.text());  // 顯示文字框，並設置其值為當前待辦事項文字
   } else {
      // 如果是編輯模式，則將文字框中的內容更新到顯示區域
      var updatedText = $input.val().trim();  // 獲取文字框中的文字

      if (updatedText === "") {
         alert("請輸入待辦事項！");  // 如果文字框為空，彈出提示
      } else {
         $para.text(updatedText);  // 更新待辦事項文字
         $input.addClass("-none");  // 隱藏文字框
         $para.removeClass("-none");  // 顯示待辦事項文字
      }
   }
});


// 第一個的待辦事項，「往上」按鈕按了要沒反應；最後一個的待辦事項，「往下」按鈕按了要沒反應。
// 按下「往上」按鈕，與上面的待辦事項對調。(註：每個待辦事項是以 li為單位。)
$(document).on("click", "button.btn_up",function(){
    console.log("往上");
   var $li = $(this).closest("li"); 
   var $prevLi = $li.prev();  // 找到上面一個 <li> 元素
   // 確保前面有一個兄弟元素可供交換
   if ($prevLi.length) {
      $li.insertBefore($prevLi);  // 將當前的 <li> 移動到前一個 <li> 之前
   }
});

// 按下「往下」按鈕，與下面的待辦事項對調。
$(document).on("click", "button.btn_down",function(){
    console.log("往下");
   var $li = $(this).closest("li"); 
   var $nextLi = $li.next();  // 找到下面一個 <li> 元素
   // 確保前面有一個兄弟元素可供交換
   if ($nextLi.length) {
      $li.insertAfter($nextLi);  // 將當前的 <li> 移動到前一個 <li> 之前
   }
});



// 點擊星號的時候，該星號加上 -on
// 這個 class，然後該筆待辦事項，
// 星號數( data-star)小於等於點擊的星號數的話，
// 也要加上 -on這個 class；反之則移除。


$(document).on("click", "span.star", function() {
   var $star = $(this);  // 當前被點擊的星星
   var starValue = parseInt($star.attr("data-star"));  // 獲取該星星的 data-star 值

   // 獲取包含待辦事項的 <li> 元素
   var $li = $star.closest("li");

   // 迭代所有星星，根據 data-star 的值來處理 -on 類別
   $li.find("span.star").each(function() {
      var $thisStar = $(this);
      var thisStarValue = parseInt($thisStar.attr("data-star"));

      if (thisStarValue <= starValue) {
         $thisStar.addClass("-on");  // 小於等於點擊星星的級別，加入 -on 類別
      } else {
         $thisStar.removeClass("-on");  // 大於點擊星星的級別，移除 -on 類別
      }
   });
});
