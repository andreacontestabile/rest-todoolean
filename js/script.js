$(document).ready(function() {

  //READ

  $.ajax(
    {
      "url": "http://157.230.17.132:3013/todos",
      "method": "GET",
      "success": function(data) {
        console.log(data);
        renderTodoList(data);
      },
      "error": function() {
        alert("Errore");
      }
    }
  );



});

function renderTodoList(data) {
  for (var i = 0; i < data.length; i++) {
    var source = $("#todo-item-template").html();
    var template = Handlebars.compile(source);

    var html = template(data[i]);
    $("#todo-list").append(html);
  }
}
