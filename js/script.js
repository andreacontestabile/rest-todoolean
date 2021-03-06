$(document).ready(function() {

  // Carico la lista dei todo con la funzione apposita
  getTodoList();

  // Evento click sul pulsante "Aggiungi"
  $("button#add").click(function() {
    addTodo();
  });

  // Evento pressione tasto INVIO nell'input #text-input
  $("input#text-input").keypress(function(e) {
    if ((e.which == 13) && ($(this).val().length > 0)) {
      addTodo();
    }
  });

  // Evento click sul pulsante "Delete"
  $("ul#todo-list").on("click", "button.delete", function() {
    // Salvo in una variabile il selettore dell'elemento cliccato
    var thisItem = $(this).parents("li.todo-item");
    // Salvo l'id dell'elemento corrispondente
    var thisItemId = $(thisItem).attr("id");

    $.ajax(
      {
        "url": "http://157.230.17.132:3013/todos/" + thisItemId,
        "method": "DELETE",
        "success": function() {
          // Al successo, elimino l'elemento dalla view
          thisItem.remove();
        },
        "error": function() {
          alert("Errore");
        }
      }
    );

  });

  // Evento click sul pulsante Edit
  $("ul#todo-list").on("click", "button.edit", function() {
    $(this).siblings(".edit-input").fadeToggle();
  });

  // Evento pressione tasto INVIO nel campo edit-input
  $("ul#todo-list").on("keypress", ".edit-input", function(e) {
    if ((e.which == 13) && ($(this).val().length > 0)) {
      // Salvo il valore dell'input
      var editInput = $(this).val();
      console.log(editInput);
      // Salvo l'elemento corrispondente
      var thisItem = $(this).parents("li.todo-item")
      // Salvo l'id dell'elemento
      var editId = $(thisItem).attr("id");

      $.ajax(
        {
          "url": "http://157.230.17.132:3013/todos/" + editId,
          "method": "PATCH",
          "data": {
            "text": editInput
          },
          "success": function(data) {
            // Al successo, svuoto la lista dei todo
            $("#todo-list").empty();
            // E la chiedo nuovamente, per aggiornare la view
            getTodoList();
          },
          "error": function() {
            alert("Errore");
          }
        }
      );
    }
  });

});

// Funzione getTodoList
// Effettua una chiamata get verso l'api ed ottiene la lista dei todo
function getTodoList() {
  $.ajax(
    {
      "url": "http://157.230.17.132:3013/todos",
      "method": "GET",
      "success": function(data) {
        // Al successo, eseguo la funzione di render della lista
        renderTodoList(data);
      },
      "error": function() {
        alert("Errore");
      }
    }
  );
}

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
function renderNewTodo(data) {
  //Inizializzo il template Handlebars
  var source = $("#todo-item-template").html();
  var template = Handlebars.compile(source);
  // Preparo il context con il testo dell'input
  var context = {
    "text": data.text,
    "id": data.id
  }
  // Compilo il template
  var html = template(context);
  // Faccio l'append dell'elemento compilato nella lista
  $("#todo-list").append(html);
  console.log(data);
}

// Funzione addTodo (CREATE)
// fa una nuova chiamata all'api e aggiunge un nuovo todo a partire dall'input utente
function addTodo() {
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
        renderNewTodo(data);
      },
      "error": function() {
        alert("Errore");
      }
    }
  );
  // Svuoto il campo input
  $("#text-input").val("");
}
