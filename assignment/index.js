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
   if ($("input.task_name").val() == "") {
      alert("不能是空的");
   } else {
      
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
$(document).on("click", "button.btn_delete", function(){
   // console.log("移除按鈕")
   setTimeout(() => {
      $(this).closest("li").remove();
    }, 1000);
});


// 按下「清空」按鈕，淡出 1 秒，清除全部的待辦事項。
$("button.btn_empty").on("click", function(){
   // console.log("清空按鈕")
   setTimeout(function(){
      $("ul.task_list").empty();
    }, 1000);
});


// 按下「更新」按鈕，出現一般文字框，然後可以更新。
$(document).on("click", "button.btn_update", function(){
   // console.log("更新按鈕");
   
});
// 再按下「更新」按鈕，回到不可編輯的狀態，但待辦事項要是更新的。

// 如果所更新的待辦事項，沒有輸入文字，跳出提醒視窗(alert)，顯示「請輸入待辦事項」。

// 待辦事項的文字若最左邊、最右邊有空格的話，需移除。