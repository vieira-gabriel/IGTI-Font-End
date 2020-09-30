function start() {
  //   doFetch();
  doFetchAsync();
}

function doFetch() {
  // O .then() garante q uma função de callback executará se a requisição for bem sucedida
  fetch("https://api.github.com/users/vieira-gabriel").then((res) => {
    res.json().then((data) => {
      showData(data);
    });
  });
}

// Forma mais simples de escrever a função de cima
async function doFetchAsync() {
  const res = await fetch("https://api.github.com/users/vieira-gabriel");
  const json = await res.json();
  showData(json);
}

function showData(data) {
  const user = document.querySelector("#user");
  user.textContent = data.login + " " + data.name;
}

start();
