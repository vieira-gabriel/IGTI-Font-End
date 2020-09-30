let globalNames = ["Um", "Dois", "Três", "Quarto"];
let inputName = null;
let currentIndex = null;
let isEditing = false;

function start() {
  inputName = document.querySelector("#inputName");

  preventFormSubmit();
  startInput();
  render();
}

// Essa função implementa a aplicação de pagina unica
function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmit);
}

function startInput() {
  function insertName(newName) {
    globalNames = [...globalNames, newName];
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }

  function handleTyping(event) {
    var hasText = !!event.target.value && event.target.value.trim() !== "";

    if (!hasText) {
      clearInput();
      return;
    }

    if (event.key === "Enter") {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }

      render();
      isEditing = false;
      clearInput();
    }
  }

  inputName.addEventListener("keyup", handleTyping);
  inputName.focus();
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames = globalNames.filter((_, i) => i !== index);

      render();
    }
    var button = document.createElement("button");
    button.classList.add("deleteButton");
    button.textContent = "x";
    button.addEventListener("click", deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    var span = document.createElement("span");
    span.classList.add("clickable");
    span.textContent = name;
    span.addEventListener("click", editItem);

    return span;
  }

  var divNames = document.querySelector("#names");
  divNames.innerHTML = ""; // Isso apaga a lista anterior

  // Criar ul
  var ul = document.createElement("ul");

  // Fazendo n li's, conforme tamanho de globalNames
  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement("li");
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);
    span.textContent = currentName;

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = "";
  inputName.focus();
}

start();
