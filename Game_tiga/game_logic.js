// Mengambil elemen-elemen dari DOM berdasarkan id dan class
let playerText = document.getElementById("playerText"); // Menampilkan teks status pemain
let restartBtn = document.getElementById("restartBtn"); // Tombol untuk restart permainan
let boxes = Array.from(document.getElementsByClassName("box")); // Mengubah elemen div dengan class 'box' menjadi array
let levelText = document.getElementById("level"); // Menampilkan level permainan
let lifeText = document.getElementById("life"); // Menampilkan jumlah nyawa pemain

// Mengambil warna indikator kemenangan dari CSS
let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

// Menentukan simbol pemain
const O_TEXT = "O"; // Simbol untuk komputer
const X_TEXT = "X"; // Simbol untuk pemain
let currentPlayer = X_TEXT; // Pemain pertama selalu 'X'
let spaces = Array(9).fill(null); // Array untuk menyimpan status kotak permainan
let level = 1; // Level awal permainan
let life = 3; // Nyawa awal pemain

// Memuat efek suara kemenangan dan kekalahan
const winSound = new Audio("assets/win.wav");
const loseSound = new Audio("assets/lose.wav");

// Memulai permainan dengan menambahkan event listener pada setiap kotak
const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

// Fungsi yang dijalankan saat kotak diklik oleh pemain
function boxClicked(e) {
  const id = e.target.id;

  // Jika kotak belum diisi dan giliran pemain 'X'
  if (!spaces[id] && currentPlayer === X_TEXT) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    // Mengecek apakah pemain telah menang
    if (playerHasWon() !== false) {
      playerText.innerHTML = `${currentPlayer} has won!`;
      let winning_blocks = playerHasWon();

      // Mengubah warna latar belakang kotak yang menang
      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
      winSound.play(); // Memutar suara kemenangan
      levelUp(); // Naikkan level permainan
      return;
    }

    // Beralih ke giliran komputer (O)
    currentPlayer = O_TEXT;
    setTimeout(computerMove, 500); // Menunda pergerakan komputer selama 500ms
  }
}

// Fungsi untuk mengecek apakah ada pemain yang menang
function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    // Jika ada tiga simbol yang sama dalam satu baris, kolom, atau diagonal
    if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
      return [a, b, c]; // Mengembalikan kombinasi pemenang
    }
  }
  return false; // Tidak ada pemenang
}

// Fungsi untuk pergerakan komputer (O)
function computerMove() {
  const emptySpaces = spaces
    .map((val, idx) => (val === null ? idx : null)) // Mendapatkan indeks kotak yang kosong
    .filter((val) => val !== null);

  let move;
  if (level === 1) {
    // Level mudah: komputer memilih kotak secara acak
    move = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
  } else if (level === 2) {
    // Level menengah: komputer mencoba untuk memblokir pemain atau memilih kotak acak
    move = mediumAI(emptySpaces);
  } else {
    // Level sulit: komputer mencoba menang atau memblokir pemain
    move = hardAI(emptySpaces);
  }

  spaces[move] = O_TEXT;
  boxes[move].innerText = O_TEXT;

  // Mengecek apakah komputer telah menang
  if (playerHasWon() !== false) {
    playerText.innerHTML = `O has won!`;
    let winning_blocks = playerHasWon();
    winning_blocks.map(
      (box) => (boxes[box].style.backgroundColor = winnerIndicator)
    );
    loseSound.play(); // Memutar suara kekalahan
    decreaseLife(); // Mengurangi nyawa pemain
    return;
  }

  // Kembali ke giliran pemain (X)
  currentPlayer = X_TEXT;
}

// Algoritma AI untuk tingkat menengah (Medium)
function mediumAI(emptySpaces) {
  // Cek apakah ada langkah untuk menang atau memblokir pemain
  for (let i = 0; i < emptySpaces.length; i++) {
    let testBoard = [...spaces];
    testBoard[emptySpaces[i]] = O_TEXT;
    if (playerHasWon.call({ spaces: testBoard })) {
      return emptySpaces[i]; // Pilih langkah terbaik
    }
  }
  return emptySpaces[Math.floor(Math.random() * emptySpaces.length)]; // Pilih langkah acak jika tidak ada langkah menang atau blokir
}

// Algoritma AI untuk tingkat sulit (Hard)
function hardAI(emptySpaces) {
  // Coba untuk menang atau memblokir langkah pemain
  for (let i = 0; i < emptySpaces.length; i++) {
    let testBoard = [...spaces];
    testBoard[emptySpaces[i]] = O_TEXT;
    if (playerHasWon.call({ spaces: testBoard })) {
      return emptySpaces[i];
    }
  }
  return mediumAI(emptySpaces); // Gunakan strategi Medium jika tidak ada langkah menang
}

// Kombinasi kemenangan (baris, kolom, dan diagonal)
const winningCombos = [
  [0, 1, 2], // Baris atas
  [3, 4, 5], // Baris tengah
  [6, 7, 8], // Baris bawah
  [0, 3, 6], // Kolom kiri
  [1, 4, 7], // Kolom tengah
  [2, 5, 8], // Kolom kanan
  [0, 4, 8], // Diagonal kiri atas ke kanan bawah
  [2, 4, 6], // Diagonal kanan atas ke kiri bawah
];

// Fungsi untuk menaikkan level permainan
function levelUp() {
  level++;
  levelText.innerText = level; // Memperbarui tampilan level di layar
}

// Fungsi untuk mengurangi nyawa pemain
function decreaseLife() {
  life--;
  lifeText.innerText = life; // Memperbarui tampilan nyawa di layar
  if (life === 0) {
    level = 1; // Mengatur ulang level ke 1 jika nyawa habis
    levelText.innerText = level;
    playerText.innerHTML = "Game Over! Starting new game...";
    setTimeout(restart, 2000); // Memulai ulang permainan setelah jeda 2 detik
  }
}

// Menambahkan event listener untuk tombol restart
restartBtn.addEventListener("click", restart);

// Fungsi untuk mereset permainan
function restart() {
  spaces.fill(null); // Menghapus semua isi kotak permainan

  // Mengosongkan tampilan papan permainan
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });

  playerText.innerHTML = "Tic Tac Toe"; // Mengembalikan teks default
  lifeText.innerText = life; // Menampilkan jumlah nyawa yang tersisa
  currentPlayer = X_TEXT; // Mengatur ulang pemain pertama menjadi X
}

// Memulai permainan dengan memanggil fungsi startGame()
startGame();
