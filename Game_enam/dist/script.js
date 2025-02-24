// Vanilla JavaScript (tanpa library tambahan)

// MEMAINKAN GAME DALAM MODE LAYAR PENUH!

// Menjalankan fungsi game setelah halaman sepenuhnya dimuat
window.addEventListener("DOMContentLoaded", game);

// Memuat sprite untuk elemen grafis dalam permainan
var sprite = new Image();
var spriteExplosion = new Image();
sprite.src =
  "https://marclopezavila.github.io/planet-defense-game/img/sprite.png";

// Memuat sprite untuk animasi ledakan saat halaman selesai dimuat
window.onload = function () {
  spriteExplosion.src =
    "https://marclopezavila.github.io/planet-defense-game/img/explosion.png";
};

// Fungsi utama permainan
function game() {
  // Mendapatkan elemen canvas dan mengatur ukuran sesuai dengan ukuran layar
  var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    cH = (ctx.canvas.height = window.innerHeight), // Tinggi canvas sesuai tinggi jendela browser
    cW = (ctx.canvas.width = window.innerWidth); // Lebar canvas sesuai lebar jendela browser

  // Variabel permainan
  var bullets = [], // Array untuk menyimpan peluru
    asteroids = [], // Array untuk menyimpan asteroid
    explosions = [], // Array untuk menyimpan ledakan
    destroyed = 0, // Jumlah asteroid yang dihancurkan
    record = 0, // Rekor skor tertinggi
    count = 0, // Penghitung skor
    playing = false, // Status permainan (berjalan atau tidak)
    gameOver = false, // Status apakah permainan sudah selesai
    _planet = { deg: 0 }; // Sudut rotasi planet

  // Objek pemain
  var player = {
    posX: -35, // Posisi X awal
    posY: -(100 + 82), // Posisi Y awal
    width: 70, // Lebar pemain
    height: 79, // Tinggi pemain
    deg: 0, // Sudut rotasi pemain
  };

  // Menambahkan event listener ke canvas untuk menangani klik dan gerakan mouse
  canvas.addEventListener("click", action);
  canvas.addEventListener("mousemove", action);
  window.addEventListener("resize", update); // Menyesuaikan ukuran canvas saat jendela diubah ukurannya

  // Fungsi untuk memperbarui ukuran canvas saat jendela diubah
  function update() {
    cH = ctx.canvas.height = window.innerHeight;
    cW = ctx.canvas.width = window.innerWidth;
  }

  // Fungsi untuk menangani pergerakan pemain berdasarkan posisi mouse
  function move(e) {
    player.deg = Math.atan2(e.offsetX - cW / 2, -(e.offsetY - cH / 2)); // Menghitung sudut rotasi pemain terhadap posisi mouse
  }

  // Fungsi utama untuk menangani aksi pemain
  function action(e) {
    e.preventDefault(); // Mencegah aksi default dari event klik

    if (playing) {
      // Jika permainan sedang berjalan, tambahkan peluru ke dalam array bullets
      var bullet = {
        x: -8,
        y: -179,
        sizeX: 2, // Lebar peluru
        sizeY: 10, // Tinggi peluru
        realX: e.offsetX, // Posisi X target tembakan
        realY: e.offsetY, // Posisi Y target tembakan
        dirX: e.offsetX, // Arah X tembakan
        dirY: e.offsetY, // Arah Y tembakan
        deg: Math.atan2(e.offsetX - cW / 2, -(e.offsetY - cH / 2)), // Menghitung sudut tembakan
        destroyed: false, // Status apakah peluru sudah mengenai target atau belum
      };

      bullets.push(bullet); // Menambahkan peluru ke dalam array
    } else {
      var dist;
      if (gameOver) {
        // Jika permainan berakhir, periksa apakah pemain mengklik tombol restart
        dist = Math.sqrt(
          (e.offsetX - cW / 2) * (e.offsetX - cW / 2) +
            (e.offsetY - (cH / 2 + 45 + 22)) * (e.offsetY - (cH / 2 + 45 + 22))
        );

        if (dist < 27) {
          // Jika klik berada dalam area tombol restart
          if (e.type == "click") {
            // Reset permainan
            gameOver = false;
            count = 0;
            bullets = [];
            asteroids = [];
            explosions = [];
            destroyed = 0;
            player.deg = 0;

            // Menghapus event listener yang tidak diperlukan
            canvas.removeEventListener("contextmenu", action);
            canvas.removeEventListener("mousemove", move);
            canvas.style.cursor = "default";
          } else {
            canvas.style.cursor = "pointer"; // Mengubah kursor menjadi pointer saat mouse berada di area tombol restart
          }
        } else {
          canvas.style.cursor = "default"; // Mengembalikan kursor ke default jika tidak berada di area tombol restart
        }
      } else {
        // Jika permainan belum dimulai, periksa apakah pemain mengklik tombol mulai
        dist = Math.sqrt(
          (e.offsetX - cW / 2) * (e.offsetX - cW / 2) +
            (e.offsetY - cH / 2) * (e.offsetY - cH / 2)
        );

        if (dist < 27) {
          // Jika klik berada dalam area tombol mulai
          if (e.type == "click") {
            playing = true; // Memulai permainan
            canvas.removeEventListener("mousemove", action);
            canvas.addEventListener("contextmenu", action);
            canvas.addEventListener("mousemove", move);
            canvas.setAttribute("class", "playing");
            canvas.style.cursor = "default";
          } else {
            canvas.style.cursor = "pointer"; // Mengubah kursor menjadi pointer saat mouse berada di area tombol mulai
          }
        } else {
          canvas.style.cursor = "default"; // Mengembalikan kursor ke default jika tidak berada di area tombol mulai
        }
      }
    }
  }

  function fire() {
    var distance; // Variabel untuk menyimpan jarak antara peluru dan asteroid

    for (var i = 0; i < bullets.length; i++) {
      if (!bullets[i].destroyed) {
        // Periksa apakah peluru masih aktif (belum mengenai asteroid)
        ctx.save();
        ctx.translate(cW / 2, cH / 2); // Pusatkan koordinat canvas ke tengah layar
        ctx.rotate(bullets[i].deg); // Putar canvas sesuai arah tembakan peluru

        // Menggambar peluru pada layar
        ctx.drawImage(
          sprite, // Gambar sumber dari sprite
          211, // Posisi x dalam sprite
          100, // Posisi y dalam sprite
          50, // Lebar gambar dalam sprite
          75, // Tinggi gambar dalam sprite
          bullets[i].x, // Posisi x dalam canvas
          (bullets[i].y -= 20), // Posisi y dalam canvas (peluru bergerak ke atas)
          19, // Lebar yang akan ditampilkan dalam canvas
          30 // Tinggi yang akan ditampilkan dalam canvas
        );

        ctx.restore();

        // Menghitung koordinat aktual peluru di dalam canvas
        bullets[i].realX = 0 - (bullets[i].y + 10) * Math.sin(bullets[i].deg);
        bullets[i].realY = 0 + (bullets[i].y + 10) * Math.cos(bullets[i].deg);

        // Menyesuaikan koordinat dengan pusat canvas
        bullets[i].realX += cW / 2;
        bullets[i].realY += cH / 2;

        // Deteksi tabrakan antara peluru dan asteroid
        for (var j = 0; j < asteroids.length; j++) {
          if (!asteroids[j].destroyed) {
            // Periksa apakah asteroid masih ada
            distance = Math.sqrt(
              Math.pow(asteroids[j].realX - bullets[i].realX, 2) +
                Math.pow(asteroids[j].realY - bullets[i].realY, 2)
            ); // Hitung jarak antara peluru dan asteroid menggunakan rumus Pythagoras

            if (
              distance < // Jika jarak antara asteroid dan peluru lebih kecil dari ukuran asteroid dan peluru
              asteroids[j].width / asteroids[j].size / 2 - 4 + (19 / 2 - 4)
            ) {
              destroyed += 1; // Tambah skor asteroid yang dihancurkan
              asteroids[j].destroyed = true; // Tandai asteroid sebagai hancur
              bullets[i].destroyed = true; // Tandai peluru sebagai hancur
              explosions.push(asteroids[j]); // Tambahkan asteroid ke daftar ledakan untuk efek animasi
            }
          }
        }
      }
    }
  }

  function planet() {
    ctx.save();
    ctx.fillStyle = "white"; // Warna planet
    ctx.shadowBlur = 100; // Efek blur untuk bayangan planet
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor = "#999"; // Warna bayangan planet

    // Menggambar planet sebagai lingkaran putih di tengah canvas
    ctx.arc(cW / 2, cH / 2, 100, 0, Math.PI * 2);
    ctx.fill();

    // Rotasi planet
    ctx.translate(cW / 2, cH / 2); // Pusatkan rotasi di tengah canvas
    ctx.rotate((_planet.deg += 0.1) * (Math.PI / 180)); // Putar planet sedikit demi sedikit setiap frame
    ctx.drawImage(sprite, 0, 0, 200, 200, -100, -100, 200, 200); // Gambar planet dari sprite
    ctx.restore();
  }

  function _player() {
    ctx.save();
    ctx.translate(cW / 2, cH / 2); // Memindahkan titik referensi ke tengah canvas

    ctx.rotate(player.deg); // Memutar pemain sesuai dengan sudut arah bidikannya
    ctx.drawImage(
      sprite, // Sumber gambar (sprite)
      200, // Posisi X dalam sprite
      0, // Posisi Y dalam sprite
      player.width, // Lebar gambar yang diambil dari sprite
      player.height, // Tinggi gambar yang diambil dari sprite
      player.posX, // Posisi X di canvas
      player.posY, // Posisi Y di canvas
      player.width, // Lebar yang ditampilkan dalam canvas
      player.height // Tinggi yang ditampilkan dalam canvas
    );

    ctx.restore(); // Mengembalikan transformasi canvas ke kondisi sebelumnya

    // Jika masih ada peluru tersisa dan permainan sedang berjalan, jalankan fungsi fire()
    if (bullets.length - destroyed && playing) {
      fire();
    }
  }

  function newAsteroid() {
    var type = random(1, 4), // Menentukan jenis arah spawn asteroid (1 hingga 4)
      coordsX,
      coordsY;

    // Menentukan lokasi awal asteroid berdasarkan tipe spawn (arah kemunculannya)
    switch (type) {
      case 1: // Asteroid muncul dari atas layar
        coordsX = random(0, cW); // Posisi X acak dalam lebar canvas
        coordsY = 0 - 150; // Posisi Y di atas layar (di luar tampilan)
        break;
      case 2: // Asteroid muncul dari sisi kanan layar
        coordsX = cW + 150; // Posisi X di luar kanan layar
        coordsY = random(0, cH); // Posisi Y acak dalam tinggi canvas
        break;
      case 3: // Asteroid muncul dari bawah layar
        coordsX = random(0, cW); // Posisi X acak dalam lebar canvas
        coordsY = cH + 150; // Posisi Y di bawah layar (di luar tampilan)
        break;
      case 4: // Asteroid muncul dari sisi kiri layar
        coordsX = 0 - 150; // Posisi X di luar kiri layar
        coordsY = random(0, cH); // Posisi Y acak dalam tinggi canvas
        break;
    }

    // Membuat objek asteroid dengan properti yang ditentukan
    var asteroid = {
      x: 278, // Posisi X dalam sprite
      y: 0, // Posisi Y dalam sprite
      state: 0, // Status animasi asteroid
      stateX: 0, // Posisi animasi asteroid dalam sprite sheet
      width: 134, // Lebar asteroid dalam sprite
      height: 123, // Tinggi asteroid dalam sprite
      realX: coordsX, // Posisi X sebenarnya di canvas
      realY: coordsY, // Posisi Y sebenarnya di canvas
      moveY: 0, // Pergerakan asteroid di sumbu Y
      coordsX: coordsX, // Posisi awal X asteroid
      coordsY: coordsY, // Posisi awal Y asteroid
      size: random(1, 3), // Ukuran asteroid (acak dari 1 hingga 3)
      deg: Math.atan2(coordsX - cW / 2, -(coordsY - cH / 2)), // Menghitung sudut arah asteroid menuju pusat
      destroyed: false, // Status apakah asteroid telah dihancurkan atau belum
    };

    asteroids.push(asteroid); // Menambahkan asteroid baru ke dalam array asteroid
  }

  function _asteroids() {
    var distance; // Variabel untuk menyimpan jarak asteroid dari pusat layar (planet)

    for (var i = 0; i < asteroids.length; i++) {
      if (!asteroids[i].destroyed) {
        // Jika asteroid belum hancur
        ctx.save();
        ctx.translate(asteroids[i].coordsX, asteroids[i].coordsY); // Pindahkan titik referensi ke posisi asteroid
        ctx.rotate(asteroids[i].deg); // Putar asteroid sesuai dengan sudut gerakannya

        // Menggambar asteroid pada layar
        ctx.drawImage(
          sprite, // Sumber gambar sprite asteroid
          asteroids[i].x, // Posisi x dalam sprite
          asteroids[i].y, // Posisi y dalam sprite
          asteroids[i].width, // Lebar asteroid dalam sprite
          asteroids[i].height, // Tinggi asteroid dalam sprite
          -(asteroids[i].width / asteroids[i].size) / 2, // Posisi x di canvas (pusat asteroid)
          (asteroids[i].moveY += 1 / asteroids[i].size), // Posisi y di canvas (asteroid bergerak ke bawah)
          asteroids[i].width / asteroids[i].size, // Lebar asteroid yang ditampilkan
          asteroids[i].height / asteroids[i].size // Tinggi asteroid yang ditampilkan
        );

        ctx.restore();

        // Menghitung koordinat sebenarnya dari asteroid di dalam canvas
        asteroids[i].realX =
          0 -
          (asteroids[i].moveY + asteroids[i].height / asteroids[i].size / 2) *
            Math.sin(asteroids[i].deg);
        asteroids[i].realY =
          0 +
          (asteroids[i].moveY + asteroids[i].height / asteroids[i].size / 2) *
            Math.cos(asteroids[i].deg);

        // Menyesuaikan koordinat dengan posisi awal asteroid
        asteroids[i].realX += asteroids[i].coordsX;
        asteroids[i].realY += asteroids[i].coordsY;

        // Menentukan apakah asteroid telah mencapai planet (game over)
        distance = Math.sqrt(
          Math.pow(asteroids[i].realX - cW / 2, 2) +
            Math.pow(asteroids[i].realY - cH / 2, 2)
        );

        if (distance < asteroids[i].width / asteroids[i].size / 2 - 4 + 100) {
          gameOver = true; // Mengatur status permainan menjadi game over
          playing = false; // Menghentikan permainan
          canvas.addEventListener("mousemove", action); // Mengaktifkan kembali input pemain untuk restart
        }
      } else if (!asteroids[i].extinct) {
        // Jika asteroid sudah hancur tetapi belum dihapus dari game, jalankan efek ledakan
        explosion(asteroids[i]);
      }
    }

    // Menentukan kapan asteroid baru harus dibuat (jumlah asteroid menyesuaikan dengan skor)
    if (asteroids.length - destroyed < 10 + Math.floor(destroyed / 6)) {
      newAsteroid(); // Membuat asteroid baru jika jumlah yang ada kurang dari batas yang ditentukan
    }
  }

  function explosion(asteroid) {
    ctx.save();
    ctx.translate(asteroid.realX, asteroid.realY); // Pusatkan ledakan pada posisi asteroid yang dihancurkan
    ctx.rotate(asteroid.deg); // Gunakan rotasi yang sama dengan asteroid

    var spriteY,
      spriteX = 256;

    // Menentukan frame animasi ledakan berdasarkan state dari asteroid
    if (asteroid.state == 0) {
      spriteY = 0;
      spriteX = 0;
    } else if (asteroid.state < 8) {
      spriteY = 0;
    } else if (asteroid.state < 16) {
      spriteY = 256;
    } else if (asteroid.state < 24) {
      spriteY = 512;
    } else {
      spriteY = 768;
    }

    // Reset frame horizontal animasi ketika mencapai batas tertentu
    if (asteroid.state == 8 || asteroid.state == 16 || asteroid.state == 24) {
      asteroid.stateX = 0;
    }

    // Menggambar sprite ledakan asteroid di canvas
    ctx.drawImage(
      spriteExplosion, // Gambar sprite ledakan
      (asteroid.stateX += spriteX), // Menentukan posisi X dari sprite ledakan dan memperbarui koordinat X asteroid
      spriteY, // Menentukan posisi Y dari sprite ledakan
      256, // Lebar gambar sprite yang diambil dari sumber gambar
      256, // Tinggi gambar sprite yang diambil dari sumber gambar
      -(asteroid.width / asteroid.size) / 2, // Menyesuaikan posisi X agar ledakan berada di tengah asteroid
      -(asteroid.height / asteroid.size) / 2, // Menyesuaikan posisi Y agar ledakan berada di tengah asteroid
      asteroid.width / asteroid.size, // Menentukan lebar ledakan berdasarkan ukuran asteroid
      asteroid.height / asteroid.size // Menentukan tinggi ledakan berdasarkan ukuran asteroid
    );

    // Menambah status animasi asteroid (berpindah ke frame animasi berikutnya)
    asteroid.state += 1;

    // Jika animasi telah mencapai frame ke-31, asteroid dianggap musnah
    if (asteroid.state == 31) {
      asteroid.extinct = true; // Menandai asteroid telah hancur dan dihapus dari permainan
    }

    // Mengembalikan konteks canvas ke keadaan sebelumnya setelah menggambar ledakan
    ctx.restore();
  }

  function start() {
    // Mengecek apakah permainan belum berakhir
    if (!gameOver) {
      // Membersihkan seluruh area canvas sebelum menggambar ulang
      ctx.clearRect(0, 0, cW, cH);
      ctx.beginPath();

      // Memanggil fungsi untuk menggambar planet di layar
      planet();

      // Memanggil fungsi untuk menggambar pemain
      _player();

      // Mengecek apakah permainan sedang berlangsung
      if (playing) {
        // Memanggil fungsi untuk menggambar asteroid di layar
        _asteroids();

        // Menampilkan teks skor tertinggi (Record) di pojok kiri atas layar
        ctx.font = "20px Verdana"; // Menentukan jenis dan ukuran font
        ctx.fillStyle = "white"; // Warna teks putih
        ctx.textBaseline = "middle"; // Posisi teks sejajar tengah secara vertikal
        ctx.textAlign = "left"; // Posisi teks sejajar kiri secara horizontal
        ctx.fillText("Record: " + record, 20, 30); // Menampilkan teks skor tertinggi

        // Menampilkan jumlah asteroid yang telah dihancurkan di tengah layar
        ctx.font = "40px Verdana"; // Menentukan jenis dan ukuran font yang lebih besar
        ctx.fillStyle = "white"; // Warna teks putih
        ctx.strokeStyle = "black"; // Warna garis luar teks hitam
        ctx.textAlign = "center"; // Posisi teks sejajar tengah secara horizontal
        ctx.textBaseline = "middle"; // Posisi teks sejajar tengah secara vertikal
        ctx.strokeText("" + destroyed, cW / 2, cH / 2); // Menggambar teks dengan garis luar hitam
        ctx.fillText("" + destroyed, cW / 2, cH / 2); // Menggambar teks utama dengan warna putih
      } else {
        // Jika permainan tidak berlangsung, menampilkan tombol (sprite) untuk memulai ulang permainan
        ctx.drawImage(
          sprite,
          428,
          12, // Posisi X dan Y gambar sumber di sprite sheet
          70,
          70, // Ukuran lebar dan tinggi dari gambar sprite yang diambil
          cW / 2 - 35, // Posisi X agar tombol berada di tengah layar
          cH / 2 - 35, // Posisi Y agar tombol berada di tengah layar
          70,
          70 // Ukuran lebar dan tinggi tombol yang ditampilkan di layar
        );
      }
    } // Jika permainan telah berakhir dan count masih kurang dari 1
    else if (count < 1) {
      count = 1; // Mengatur count menjadi 1 agar kondisi ini hanya dijalankan sekali

      // Mengatur latar belakang transparan gelap untuk tampilan Game Over
      ctx.fillStyle = "rgba(0,0,0,0.75)"; // Warna hitam dengan transparansi 75%
      ctx.rect(0, 0, cW, cH); // Membuat persegi panjang menutupi seluruh layar
      ctx.fill(); // Mengisi persegi panjang dengan warna yang telah ditentukan

      // Menampilkan teks "GAME OVER" di layar
      ctx.font = "60px Verdana"; // Menentukan font dengan ukuran besar
      ctx.fillStyle = "white"; // Warna teks putih
      ctx.textAlign = "center"; // Posisi teks di tengah secara horizontal
      ctx.fillText("GAME OVER", cW / 2, cH / 2 - 150); // Menampilkan teks Game Over di tengah atas layar

      // Menampilkan jumlah asteroid yang telah dihancurkan oleh pemain
      ctx.font = "20px Verdana"; // Menentukan font dengan ukuran lebih kecil
      ctx.fillStyle = "white"; // Warna teks putih
      ctx.textAlign = "center"; // Posisi teks di tengah
      ctx.fillText("Total destroyed: " + destroyed, cW / 2, cH / 2 + 140); // Menampilkan total asteroid yang dihancurkan

      // Memperbarui skor tertinggi jika pemain mencapai rekor baru
      record = destroyed > record ? destroyed : record;

      // Menampilkan rekor tertinggi di layar
      ctx.font = "20px Verdana"; // Font dengan ukuran sedang
      ctx.fillStyle = "white"; // Warna teks putih
      ctx.textAlign = "center"; // Posisi teks di tengah
      ctx.fillText("RECORD: " + record, cW / 2, cH / 2 + 185); // Menampilkan skor tertinggi yang dicapai pemain

      // Menampilkan tombol restart (sprite) di tengah layar
      ctx.drawImage(
        sprite,
        500,
        18, // Posisi X dan Y sprite dalam sprite sheet
        70,
        70, // Ukuran lebar dan tinggi sprite
        cW / 2 - 35, // Posisi X agar tombol restart berada di tengah layar
        cH / 2 + 40, // Posisi Y sedikit di bawah skor
        70,
        70 // Ukuran tombol restart
      );

      // Menghapus atribut class dari elemen canvas (kemungkinan untuk mengubah tampilan atau efek CSS)
      canvas.removeAttribute("class");
    }
  }

  // Fungsi init() digunakan untuk menjalankan permainan dalam loop animasi
  function init() {
    // Memanggil kembali fungsi init() pada setiap frame baru untuk animasi yang lancar
    window.requestAnimationFrame(init);

    // Memanggil fungsi start() untuk memperbarui dan menggambar elemen permainan di canvas
    start();
  }

  // Memulai permainan dengan memanggil fungsi init() untuk memulai loop animasi
  init();

  //Utils
  // Utils (Fungsi Utilitas)

  // Fungsi untuk menghasilkan angka acak dalam rentang tertentu
  function random(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
    // Menghasilkan angka acak dari nilai 'from' hingga 'to' (inklusif)
    // Math.random() menghasilkan angka desimal antara 0 dan 1
    // Dikalikan dengan (to - from + 1) agar mencakup seluruh rentang angka yang diinginkan
    // Math.floor() digunakan untuk membulatkan angka ke bawah agar tetap dalam rentang integer yang valid
  }

  // Mengecek apakah URL halaman mengandung kata "full"
  if (~window.location.href.indexOf("full")) {
    // Jika URL mengandung "full", maka menyembunyikan elemen <a> pertama pada halaman
    var full = document.getElementsByTagName("a");
    full[0].setAttribute("style", "display: none");
    // Menyembunyikan elemen dengan CSS "display: none" agar tidak terlihat di halaman
  }
}
