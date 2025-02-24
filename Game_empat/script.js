// Array untuk menentukan jumlah langkah acak berdasarkan tingkat kesulitan
const GameDifficulty = [20, 50, 70];

class Game {
  difficulty; // Menyimpan tingkat kesulitan berdasarkan GameDifficulty array
  cols = 3; // Jumlah kolom dalam puzzle (3x3 grid)
  rows = 3; // Jumlah baris dalam puzzle
  count; // Total jumlah blok (cols * rows)
  blocks; // Elemen HTML dengan class "puzzle_block"
  emptyBlockCoords = [2, 2]; // Koordinat awal blok kosong (posisi kanan bawah)
  indexes = []; // Menyimpan urutan blok saat ini

  constructor(difficultyLevel = 1) {
    this.difficulty = GameDifficulty[difficultyLevel - 1]; // Set tingkat kesulitan awal
    this.count = this.cols * this.rows; // Hitung total blok
    this.blocks = document.getElementsByClassName("puzzle_block"); // Ambil elemen puzzle
    this.init(); // Inisialisasi permainan
  }

  init() {
    // Menempatkan setiap blok pada posisi awalnya
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let blockIdx = x + y * this.cols;
        if (blockIdx + 1 >= this.count) break; // Lewati blok kosong
        let block = this.blocks[blockIdx];
        this.positionBlockAtCoord(blockIdx, x, y);
        block.addEventListener("click", (e) => this.onClickOnBlock(blockIdx)); // Tambahkan event listener untuk klik
        this.indexes.push(blockIdx); // Simpan indeks blok
      }
    }
    this.indexes.push(this.count - 1); // Tambahkan blok kosong ke indeks
    this.randomize(this.difficulty); // Acak puzzle berdasarkan tingkat kesulitan
  }

  randomize(iterationCount) {
    // Mengacak posisi blok dengan memindahkan secara acak
    for (let i = 0; i < iterationCount; i++) {
      let randomBlockIdx = Math.floor(Math.random() * (this.count - 1));
      let moved = this.moveBlock(randomBlockIdx);
      if (!moved) i--; // Jika tidak bisa bergerak, ulangi perintah
    }
  }

  moveBlock(blockIdx) {
    // Memindahkan blok dan mengembalikan true jika berhasil
    let block = this.blocks[blockIdx];
    let blockCoords = this.canMoveBlock(block);
    if (blockCoords != null) {
      this.positionBlockAtCoord(
        blockIdx,
        this.emptyBlockCoords[0],
        this.emptyBlockCoords[1]
      );
      this.indexes[
        this.emptyBlockCoords[0] + this.emptyBlockCoords[1] * this.cols
      ] = this.indexes[blockCoords[0] + blockCoords[1] * this.cols];

      // Memperbarui koordinat blok kosong
      this.emptyBlockCoords[0] = blockCoords[0];
      this.emptyBlockCoords[1] = blockCoords[1];
      return true;
    }
    return false;
  }

  canMoveBlock(block) {
    // Mengecek apakah blok dapat dipindahkan ke posisi kosong
    let blockPos = [parseInt(block.style.left), parseInt(block.style.top)];
    let blockWidth = block.clientWidth;
    let blockCoords = [blockPos[0] / blockWidth, blockPos[1] / blockWidth];

    let diff = [
      Math.abs(blockCoords[0] - this.emptyBlockCoords[0]),
      Math.abs(blockCoords[1] - this.emptyBlockCoords[1]),
    ];

    let canMove =
      (diff[0] == 1 && diff[1] == 0) || (diff[0] == 0 && diff[1] == 1);
    return canMove ? blockCoords : null; // Mengembalikan koordinat jika bisa dipindahkan
  }

  positionBlockAtCoord(blockIdx, x, y) {
    // Menempatkan blok pada koordinat tertentu
    let block = this.blocks[blockIdx];
    block.style.left = x * block.clientWidth + "px";
    block.style.top = y * block.clientWidth + "px";
  }

  onClickOnBlock(blockIdx) {
    // Coba pindahkan blok saat diklik dan periksa apakah puzzle selesai
    if (this.moveBlock(blockIdx)) {
      if (this.checkPuzzleSolved()) {
        setTimeout(() => alert("Puzzle Solved!!"), 600); // Tampilkan pesan kemenangan
      }
    }
  }

  checkPuzzleSolved() {
    // Mengecek apakah puzzle sudah tersusun dengan benar
    for (let i = 0; i < this.indexes.length; i++) {
      if (i == this.emptyBlockCoords[0] + this.emptyBlockCoords[1] * this.cols)
        continue;
      if (this.indexes[i] != i) return false;
    }
    return true;
  }

  setDifficulty(difficultyLevel) {
    // Mengatur tingkat kesulitan puzzle
    this.difficulty = GameDifficulty[difficultyLevel - 1];
    this.randomize(this.difficulty);
  }
}

// Membuat instance baru dari permainan dengan tingkat kesulitan 1 (EASY)
var game = new Game(1);

// Menangani tombol tingkat kesulitan
var difficulty_buttons = Array.from(
  document.getElementsByClassName("difficulty_button")
);
difficulty_buttons.forEach((elem, idx) => {
  elem.addEventListener("click", (e) => {
    difficulty_buttons[
      GameDifficulty.indexOf(game.difficulty)
    ].classList.remove("active"); // Hapus kelas aktif dari tombol sebelumnya
    elem.classList.add("active"); // Tambahkan kelas aktif pada tombol yang dipilih
    game.setDifficulty(idx + 1); // Ubah tingkat kesulitan permainan
  });
});
