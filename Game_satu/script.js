// Memilih elemen-elemen DOM yang diperlukan untuk permainan
const selectors = {
  boardContainer: document.querySelector(".board-container"),
  board: document.querySelector(".board"),
  moves: document.querySelector(".moves"),
  timer: document.querySelector(".timer"),
  start: document.querySelector("#start-button"),
  win: document.querySelector(".win"),
  levelSelect: document.querySelector("#level-select"),
  winSound: document.querySelector("#win-sound"),
  loseSound: document.querySelector("#lose-sound"),
  losePopup: document.querySelector("#lose-popup"), // Elemen popup untuk pesan kalah
};

// Menyimpan status permainan
const state = {
  gameStarted: false, // Status apakah permainan sudah dimulai
  flippedCards: 0, // Jumlah kartu yang sedang terbuka
  totalFlips: 0, // Total gerakan membalik kartu
  totalTime: 0, // Total waktu permainan
  loop: null, // Timer untuk permainan
  boardDimension: 4, // Ukuran papan default (mudah)
  timerDuration: 180, // Durasi waktu default dalam detik (3 menit untuk level mudah)
  countdown: null, // Timer untuk hitung mundur
};

// Fungsi untuk mengacak array
const shuffle = (array) => {
  const clonedArray = [...array];

  for (let i = clonedArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const original = clonedArray[i];

    clonedArray[i] = clonedArray[randomIndex];
    clonedArray[randomIndex] = original;
  }

  return clonedArray;
};

// Fungsi untuk memilih item secara acak dari array
const pickRandom = (array, items) => {
  const clonedArray = [...array];
  const randomPicks = [];

  for (let i = 0; i < items; i++) {
    const randomIndex = Math.floor(Math.random() * clonedArray.length);

    randomPicks.push(clonedArray[randomIndex]);
    clonedArray.splice(randomIndex, 1);
  }

  return randomPicks;
};

// Fungsi untuk membuat papan permainan
const generateGame = () => {
  const dimensions = state.boardDimension; // Menggunakan ukuran papan dari state

  // Memastikan dimensi papan adalah angka genap
  if (dimensions % 2 !== 0) {
    throw new Error("The dimension of the board must be an even number.");
  }

  // Daftar emoji yang digunakan sebagai kartu
  const emojis = ["🚗", "🚕", "🚑", "🚒", "🚲", "🏍️", "✈️", "🚁", "🛥️", "🚈"];
  const picks = pickRandom(emojis, (dimensions * dimensions) / 2);
  const items = shuffle([...picks, ...picks]);

  // Membuat HTML untuk papan permainan
  const cards = ` 
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items
              .map(
                (item) => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `
              )
              .join("")}
       </div>
    `;

  const parser = new DOMParser().parseFromString(cards, "text/html");
  selectors.board.replaceWith(parser.querySelector(".board"));
};

// Fungsi untuk memulai permainan
const startGame = () => {
  state.gameStarted = true;
  selectors.start.classList.add("disabled");

  // Memulai timer permainan
  state.loop = setInterval(() => {
    state.totalTime++;

    // Memperbarui tampilan moves dan timer
    selectors.moves.innerText = `${state.totalFlips} moves`;
    selectors.timer.innerText = `Time: ${
      state.timerDuration - state.totalTime
    } sec`;

    // Mengakhiri permainan jika waktu habis
    if (state.totalTime >= state.timerDuration) {
      clearInterval(state.loop);
      selectors.win.innerHTML = `
                <span class="win-text">
                    Time's up!<br />
                    You lost with <span class="highlight">${state.totalFlips}</span> moves<br />
                </span>
            `;
      selectors.loseSound.play(); // Memutar suara kalah
      showLosePopup(); // Menampilkan popup kalah
    }
  }, 1000);
};

// Fungsi untuk membalik kembali kartu yang tidak cocok
const flipBackCards = () => {
  document.querySelectorAll(".card:not(.matched)").forEach((card) => {
    card.classList.remove("flipped");
  });

  state.flippedCards = 0;
};

// Fungsi untuk membalik kartu
const flipCard = (card) => {
  state.flippedCards++;
  state.totalFlips++;

  if (!state.gameStarted) {
    startGame();
  }

  if (state.flippedCards <= 2) {
    card.classList.add("flipped");
  }

  // Memeriksa kecocokan kartu jika dua kartu terbuka
  if (state.flippedCards === 2) {
    const flippedCards = document.querySelectorAll(".flipped:not(.matched)");

    if (flippedCards[0].innerText === flippedCards[1].innerText) {
      flippedCards[0].classList.add("matched");
      flippedCards[1].classList.add("matched");
    }

    setTimeout(() => {
      flipBackCards();
    }, 1000);
  }

  // Memeriksa kondisi kemenangan
  if (!document.querySelectorAll(".card:not(.flipped)").length) {
    setTimeout(() => {
      selectors.boardContainer.classList.add("flipped");
      selectors.win.innerHTML = `
                <span class="win-text">
                    You won!<br />
                    with <span class="highlight">${state.totalFlips}</span> moves<br />
                    under <span class="highlight">${state.totalTime}</span> seconds
                </span>
            `;
      selectors.winSound.play(); // Memutar suara menang
      clearInterval(state.loop);
    }, 1000);
  }
};

// Fungsi untuk menambahkan event listener
const attachEventListeners = () => {
  // Event listener untuk klik kartu dan tombol mulai
  document.addEventListener("click", (event) => {
    const eventTarget = event.target;
    const eventParent = eventTarget.parentElement;

    if (
      eventTarget.className.includes("card") &&
      !eventParent.className.includes("flipped")
    ) {
      flipCard(eventParent);
    } else if (
      eventTarget.nodeName === "BUTTON" &&
      !eventTarget.className.includes("disabled")
    ) {
      startGame();
    }
  });

  // Event listener untuk pemilihan level
  selectors.levelSelect.addEventListener("change", (e) => {
    const level = e.target.value;
    if (level === "easy") {
      state.boardDimension = 4;
      state.timerDuration = 180; // 3 menit untuk level mudah
    } else if (level === "medium") {
      state.boardDimension = 6;
      state.timerDuration = 120; // 2 menit untuk level sedang
    } else if (level === "hard") {
      state.boardDimension = 8;
      state.timerDuration = 60; // 1 menit untuk level sulit
    }

    if (state.gameStarted) {
      location.reload(); // Memuat ulang permainan setelah mengubah level
    } else {
      generateGame(); // Membuat permainan baru saat halaman dimuat
    }
  });
};

// Fungsi untuk menampilkan popup kalah
const showLosePopup = () => {
  selectors.losePopup.style.display = "flex"; // Menampilkan popup
  setTimeout(() => {
    selectors.losePopup.style.display = "none"; // Menyembunyikan popup setelah 3 detik
  }, 3000);
};

// Inisialisasi permainan
generateGame();
attachEventListeners();
