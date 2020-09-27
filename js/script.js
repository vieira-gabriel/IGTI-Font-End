// precisa colocar "window.addEventListener('load', start);" se não tiver "defer" na chamada do script no html

function start() {
  console.log('Todo o DOM foi carregdo');
}

// Precisa ser chamada caso o codigo no primeiro comentario não seja colocado
start()