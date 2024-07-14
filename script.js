//Prendo gli elementi dal DOM
const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  cpuResult = document.querySelector(".cpu_result img"),
  result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image");

//Cicla attraverso ciascun elemento l'immagine di scelta
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");

    userResult.src = cpuResult.src = "img/rock.png";
    result.textContent = "Aspetta...";

    //Cicla nuovamente l'immagine
    optionImages.forEach((image2, index2) => {
      //Se l'indice corrente non corrisponde all'indice cliccato
      //Rimuovi la classe "active" dalle altre immagini di scelta
      index !== index2 && image2.classList.remove("active");
    });

    gameContainer.classList.add("start");

    //Imposta un timeout per ritardare il calcolo del risultato
    let time = setTimeout(() => {
      gameContainer.classList.remove("start");

      //Ottieni la fonte dell'immagine di opzione cliccata
      let imageSrc = e.target.querySelector("img").src;
      //Imposta l'immagine utente sull'immagine di opzione cliccata
      userResult.src = imageSrc;

      //Genera un numero casuale tra 0 e 2
      let randomNumber = Math.floor(Math.random() * 3);
      //Crea un array di opzioni immagine per la CPU
      let cpuImages = ["img/rock.png", "img/paper.png", "img/scissors.png"];
      //Imposta l'immagine della CPU su un'opzione casuale dall'array
      cpuResult.src = cpuImages[randomNumber];

      //Assegna una lettere con i possibili esiti della CPU (R for rock, P for paper, S for scissors)
      let cpuValue = ["R", "P", "S"][randomNumber];
      //Assegna una lettera con i possibili esiti dell'utente
      let userValue = ["R", "P", "S"][index];

      //Crea un oggetto con i possibili risultati
      let outcomes = {
        RR: "Pari",
        RP: "Cpu",
        RS: "Utente",
        PP: "Pari",
        PR: "Utente",
        PS: "Cpu",
        SS: "Pari",
        SR: "Cpu",
        SP: "Utente",
      };

      //Valuta il valore in base alla scelta di utente e CPU
      let outComeValue = outcomes[userValue + cpuValue];

      //Mostra il risultato
      result.textContent =
        userValue === cpuValue ? "Parità" : `${outComeValue} Vince!!`;
    }, 2500);
  });
});
