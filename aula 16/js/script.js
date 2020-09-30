function start() {
  // O .then() garante q uma função de callback executará se a requisição for bem sucedida
  fetch("https://api.github.com/users/vieira-gabriel").then((res) => {
    res.json().then((data) => {
      showData(data);
    });
  });
}

function showData(data) {
  const user = document.querySelector("#user");
  user.textContent = data.login + " " + data.name;
}

start();
