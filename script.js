document.addEventListener("DOMContentLoaded", () => {
    const words = ["CASAS", "BAILA", "ASADO", "CIELO", "JUEGO", "PALAB", "NIEVE", "SOLAR", "LUNAR", "COMER"]; 
    let WORD = getRandomWord(words);
    const maxAttempts = 6;
    let attempts = 0;

    const guessInput = document.getElementById("guess-input");
    const guessButton = document.getElementById("guess-button");
    const grid = document.getElementById("grid");
    const keys = document.querySelectorAll(".key");
    const deleteKey = document.getElementById("delete-key");
    const enterKey = document.getElementById("enter-key");
    const modal = document.getElementById("modal");
    const modalClose = document.getElementById("modal-close");
    const modalMessage = document.getElementById("modal-message");

    keys.forEach(key => {
        key.addEventListener("click", () => {
            if (guessInput.value.length < 5) {
                guessInput.value += key.textContent;
            }
        });
    });

    deleteKey.addEventListener("click", () => {
        guessInput.value = guessInput.value.slice(0, -1);
    });

    enterKey.addEventListener("click", makeGuess);
    guessButton.addEventListener("click", makeGuess);
    modalClose.addEventListener("click", closeModal);

    function makeGuess() {
        const guess = guessInput.value.toUpperCase();
        if (guess.length !== 5) {
            showModal("La palabra debe tener 5 letras.");
            return;
        }

        if (attempts >= maxAttempts) {
            showModal("No más intentos disponibles.");
            return;
        }

        addGuessToGrid(guess);
        attempts++;

        if (guess === WORD) {
            showModal("¡Felicidades, has adivinado la palabra!");
            resetGame();
        } else if (attempts === maxAttempts) {
            showModal("¡Lo siento, no has adivinado la palabra! La palabra era " + WORD);
            resetGame();
        }

        guessInput.value = '';
    }

    function addGuessToGrid(guess) {
        const row = document.createElement("div");
        row.classList.add("row");
        grid.appendChild(row);

        for (let i = 0; i < 5; i++) {
            const tile = document.createElement("div");
            tile.classList.add("letter");

            const letter = guess[i];
            tile.textContent = letter;

            if (letter === WORD[i]) {
                tile.style.backgroundColor = 'green';
                tile.style.color = 'white';
            } else if (WORD.includes(letter)) {
                tile.style.backgroundColor = 'yellow';
                tile.style.color = 'black';
            } else {
                tile.style.backgroundColor = 'gray';
                tile.style.color = 'white';
            }

            row.appendChild(tile);
        }
    }

    function showModal(message) {
        modalMessage.textContent = message;
        modal.style.display = "block";
    }

    function closeModal() {
        modal.style.display = "none";
    }

    function resetGame() {
        attempts = 0;
        grid.innerHTML = '';
        WORD = getRandomWord(words);
        guessButton.disabled = false;
    }

    function getRandomWord(words) {
        
        const filteredWords = words.filter(word => word.length === 5);
        
        return filteredWords[Math.floor(Math.random() * filteredWords.length)];
    }
});
