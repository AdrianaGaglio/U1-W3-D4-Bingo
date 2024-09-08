// array di appoggio per controllare i numeri già estratti
const numbers = [];
const array1 = [];
const array2 = [];
const array3 = [];

// funzione per generare tabellone e cartelline utente
const board = (num, scope) => {
  const mainBoard = document.getElementById(scope);
  if (scope === "board") {
    for (let i = 0; i < num; i++) {
      const boardNumber = document.createElement("div");
      boardNumber.className = "board-number";
      if (scope === "board") {
        boardNumber.innerHTML = `<span>${i + 1}</span>`;
        mainBoard.appendChild(boardNumber);
        numbers.push(i + 1);
      }
    }
  } else if (scope === "user") {
    const userSheet = document.createElement("div");
    userSheet.className = "user-sheet";
    const newNumbers = numbers.slice(0);
    for (let j = 0; j < num; j++) {
      const randomIndex = Math.floor(Math.random() * newNumbers.length);
      const boardNumber = document.createElement("div");
      boardNumber.className = "board-number";
      boardNumber.innerHTML = `<span>${newNumbers[randomIndex]}</span>`;
      newNumbers.splice(randomIndex, 1);
      userSheet.appendChild(boardNumber);
    }

    mainBoard.appendChild(userSheet);
  }
};

// // genero numero random estratto
const extractedNumber = () => {
  const randomIndex = Math.floor(Math.random() * numbers.length);
  const extracted = numbers[randomIndex];
  numbers.splice(randomIndex, 1);
  const boardNumbers = document.querySelectorAll(".board-number");
  // evidenzio il numero estratto
  boardNumbers.forEach((num) => {
    if (parseInt(num.innerText) === extracted) {
      num.classList.add("extracted");
    }
  });
  // faccio in modo che i numeri già estratti non possano più essere estratti
  if (numbers.length === 0) {
    // se sono stati estratti tutti i numeri, ricarica la pagina
    alert("Sono stati estratti tutti i numeri, inizia una nuova partita!");
    location.reload();
  }
};

// scatena l'estrazione dei numeri
const randomNumBtn = document.getElementById("extraction");
randomNumBtn.onclick = () => {
  extractedNumber();
};

// genero il tabellone al caricamento
window.onload = () => {
  board(90, "board");
};

// creo il numero di tabelline per l'utente
const chooseNumOfSheet = document.querySelector("form");

chooseNumOfSheet.onsubmit = (event) => {
  event.preventDefault();
  const numberOfSheet = document.getElementById("number-of-sheet").value;
  for (let i = 0; i < numberOfSheet; i++) {
    board(24, "user");
  }
  const numOfSheets = Array.from(document.querySelectorAll(".user-sheet"));
  for (let i = 0; i < numOfSheets.length; i++) {
    numOfSheets[i].id = i + 1;
    if (document.getElementById("3")) {
      for (let j = 0; j < 24; j++) {}
    }
  }
  document.querySelector("#extraction").style.display = "block";
  document.querySelector("form").style.display = "none";
};

// --- NOTE ---
// Aggiungere controllo su tabellina vincente
