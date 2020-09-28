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

  // Evento click sul pulsante "Aggiungi"
  $("button#add").click(function() {
    //Salvo il valore dell'input attuale
    var textValue = $("#text-input").val();
    // Effettuo una chiamata con metodo POST, per salvare il valore
    $.ajax(
      {
        "url": "http://157.230.17.132:3013/todos",
        "method": "POST",
        "data": {
          // Imposto il valore dell'input come valore della chiave "text"
          "text": textValue
        },
        "success": function(data) {
          renderNewTodo(textValue);
        },
        "error": function() {
          alert("Errore");
        }
      }
    );
  });

});

// Funzione renderTodoList
// fa il render della lista dei todo, dopo averla ricevuta dall'api
function renderTodoList(data) {
  for (var i = 0; i < data.length; i++) {
    //Inizializzo il template Handlebars
    var source = $("#todo-item-template").html();
    var template = Handlebars.compile(source);
    // Compilo il template con i dati dell'oggetto corrente
    var html = template(data[i]);
    // Faccio l'append dell'elemento compilato nella lista
    $("#todo-list").append(html);
  }
}
// Funzione renderNewTodo
// fa il render di un singolo todo, dopo che è stato inserito
function renderNewTodo(text) {
  //Inizializzo il template Handlebars
  var source = $("#todo-item-template").html();
  var template = Handlebars.compile(source);
  // Preparo il context con il testo dell'input
  var context = {
    "text": text
  }
  // Compilo il template
  var html = template(context);
  // Faccio l'append dell'elemento compilato nella lista
  $("#todo-list").append(html);
}
