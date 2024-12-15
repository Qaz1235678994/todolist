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