let main = {
  variables: {
    turn: "w", // Menentukan giliran permainan (w = putih, b = hitam)
    selectedpiece: "", // Menyimpan bidak catur yang dipilih oleh pemain
    highlighted: [], // Menyimpan posisi yang disorot untuk bidak yang dapat bergerak
    pieces: {
      // Objek yang menyimpan semua bidak catur dan posisi awalnya
      w_king: {
        position: "5_1", // Posisi awal raja putih di papan catur
        img: "&#9812;", // Karakter Unicode untuk raja putih
        captured: false, // Status apakah bidak telah ditangkap lawan
        moved: false, // Status apakah bidak telah bergerak sebelumnya
        type: "w_king", // Jenis bidak untuk identifikasi
      },
      w_queen: {
        position: "4_1", // Posisi awal menteri (ratu) putih
        img: "&#9813;", // Karakter Unicode untuk ratu putih
        captured: false, // Apakah bidak telah ditangkap
        moved: false, // Apakah bidak sudah pernah bergerak
        type: "w_queen", // Jenis bidak
      },
      w_bishop1: {
        position: "3_1", // Posisi awal gajah (bishop) putih di sisi kiri
        img: "&#9815;", // Karakter Unicode untuk gajah putih
        captured: false, // Apakah bidak telah ditangkap
        moved: false, // Apakah bidak telah bergerak
        type: "w_bishop", // Jenis bidak
      },
      w_bishop2: {
        position: "6_1", // Posisi awal gajah putih di sisi kanan
        img: "&#9815;",
        captured: false,
        moved: false,
        type: "w_bishop",
      },
      w_knight1: {
        position: "2_1", // Posisi awal kuda putih di sisi kiri
        img: "&#9816;", // Karakter Unicode untuk kuda putih
        captured: false,
        moved: false,
        type: "w_knight",
      },
      w_knight2: {
        position: "7_1", // Posisi awal kuda putih di sisi kanan
        img: "&#9816;",
        captured: false,
        moved: false,
        type: "w_knight",
      },
      w_rook1: {
        position: "1_1", // Posisi awal benteng putih di sudut kiri
        img: "&#9814;", // Karakter Unicode untuk benteng putih
        captured: false,
        moved: false,
        type: "w_rook",
      },
      w_rook2: {
        position: "8_1", // Posisi awal benteng putih di sudut kanan
        img: "&#9814;",
        captured: false,
        moved: false,
        type: "w_rook",
      },
      w_pawn1: {
        position: "1_2", // Posisi awal pion putih di kolom 1
        img: "&#9817;", // Karakter Unicode untuk pion putih
        captured: false,
        type: "w_pawn",
        moved: false,
      },
      w_pawn2: {
        position: "2_2", // Posisi awal pion putih di kolom 2
        img: "&#9817;",
        captured: false,
        type: "w_pawn",
        moved: false,
      },
      w_pawn3: {
        position: "3_2", // Posisi awal pion putih di kolom 3
        img: "&#9817;",
        captured: false,
        type: "w_pawn",
        moved: false,
      },
      w_pawn4: {
        position: "4_2", // Posisi awal pion putih di kolom 4
        img: "&#9817;",
        captured: false,
        type: "w_pawn",
        moved: false,
      },
      w_pawn5: {
        position: "5_2", // Posisi awal pion putih di kolom 5
        img: "&#9817;",
        captured: false,
        type: "w_pawn",
        moved: false,
      },
      w_pawn6: {
        position: "6_2", // Posisi awal pion putih di kolom 6
        img: "&#9817;",
        captured: false,
        type: "w_pawn",
        moved: false,
      },
      w_pawn7: {
        position: "7_2", // Posisi awal pion putih di kolom 7
        img: "&#9817;",
        captured: false,
        type: "w_pawn",
        moved: false,
      },
      w_pawn8: {
        position: "8_2", // Posisi awal pion putih di kolom 8
        img: "&#9817;",
        captured: false,
        type: "w_pawn",
        moved: false,
      },
      b_king: {
        position: "5_8", // Posisi awal Raja Hitam di papan catur (baris ke-8, kolom ke-5)
        img: "&#9818;", // Unicode untuk simbol Raja Hitam
        captured: false, // Menunjukkan apakah bidak telah ditangkap (false = belum ditangkap)
        moved: false, // Menunjukkan apakah bidak sudah pernah bergerak (false = belum)
        type: "b_king", // Jenis bidak (Raja Hitam)
      },

      b_queen: {
        position: "4_8", // Posisi awal Ratu Hitam
        img: "&#9819;", // Unicode untuk simbol Ratu Hitam
        captured: false,
        moved: false,
        type: "b_queen",
      },

      b_bishop1: {
        position: "3_8", // Posisi awal Uskup Hitam pertama
        img: "&#9821;", // Unicode untuk simbol Uskup (Gajah) Hitam
        captured: false,
        moved: false,
        type: "b_bishop",
      },

      b_bishop2: {
        position: "6_8", // Posisi awal Uskup Hitam kedua
        img: "&#9821;",
        captured: false,
        moved: false,
        type: "b_bishop",
      },

      b_knight1: {
        position: "2_8", // Posisi awal Kuda Hitam pertama
        img: "&#9822;", // Unicode untuk simbol Kuda Hitam
        captured: false,
        moved: false,
        type: "b_knight",
      },

      b_knight2: {
        position: "7_8", // Posisi awal Kuda Hitam kedua
        img: "&#9822;",
        captured: false,
        moved: false,
        type: "b_knight",
      },

      b_rook1: {
        position: "1_8", // Posisi awal Benteng Hitam pertama
        img: "&#9820;", // Unicode untuk simbol Benteng Hitam
        captured: false,
        moved: false,
        type: "b_rook",
      },

      b_rook2: {
        position: "8_8", // Posisi awal Benteng Hitam kedua
        img: "&#9820;",
        captured: false,
        moved: false,
        type: "b_rook",
      },

      b_pawn1: {
        position: "1_7", // Posisi awal Pion Hitam pertama
        img: "&#9823;", // Unicode untuk simbol Pion Hitam
        captured: false,
        type: "b_pawn",
        moved: false,
      },

      b_pawn2: {
        position: "2_7", // Posisi awal Pion Hitam kedua
        img: "&#9823;",
        captured: false,
        type: "b_pawn",
        moved: false,
      },

      b_pawn3: {
        position: "3_7", // Posisi awal Pion Hitam ketiga
        img: "&#9823;",
        captured: false,
        type: "b_pawn",
        moved: false,
      },

      b_pawn4: {
        position: "4_7", // Posisi awal Pion Hitam keempat
        img: "&#9823;",
        captured: false,
        type: "b_pawn",
        moved: false,
      },

      b_pawn5: {
        position: "5_7", // Posisi awal Pion Hitam kelima
        img: "&#9823;",
        captured: false,
        type: "b_pawn",
        moved: false,
      },

      b_pawn6: {
        position: "6_7", // Posisi awal Pion Hitam keenam
        img: "&#9823;",
        captured: false,
        type: "b_pawn",
        moved: false,
      },

      b_pawn7: {
        position: "7_7", // Posisi awal Pion Hitam ketujuh
        img: "&#9823;",
        captured: false,
        type: "b_pawn",
        moved: false,
      },

      b_pawn8: {
        position: "8_7", // Posisi awal Pion Hitam kedelapan
        img: "&#9823;",
        captured: false,
        type: "b_pawn",
        moved: false,
      },
    },
  },

  methods: {
    // Fungsi untuk menyiapkan permainan dengan menempatkan bidak catur di papan
    gamesetup: function () {
      $(".gamecell").attr("chess", "null"); // Mengatur semua sel papan menjadi kosong (tidak ada bidak)
      for (let gamepiece in main.variables.pieces) {
        // Mengisi papan dengan bidak sesuai dengan posisi awalnya
        $("#" + main.variables.pieces[gamepiece].position).html(
          main.variables.pieces[gamepiece].img // Menampilkan gambar bidak pada sel yang sesuai
        );
        $("#" + main.variables.pieces[gamepiece].position).attr(
          "chess",
          gamepiece // Menandai sel dengan nama bidak yang berada di dalamnya
        );
      }
    },

    // Fungsi untuk menentukan opsi gerakan yang tersedia untuk bidak yang dipilih
    moveoptions: function (selectedpiece) {
      let position = { x: "", y: "" };
      // Memisahkan koordinat X dan Y dari posisi bidak yang dipilih
      position.x = main.variables.pieces[selectedpiece].position.split("_")[0];
      position.y = main.variables.pieces[selectedpiece].position.split("_")[1];

      // Menggunakan var untuk memastikan variabel dapat digunakan di seluruh fungsi
      var options = [];
      var coordinates = [];
      var startpoint = main.variables.pieces[selectedpiece].position;
      var c1, c2, c3, c4, c5, c6, c7, c8; // Variabel kosong yang mungkin digunakan nanti

      // Jika ada highlight aktif sebelumnya, hapus highlight tersebut
      if (main.variables.highlighted.length != 0) {
        main.methods.togglehighlight(main.variables.highlighted);
      }

      // Menentukan gerakan berdasarkan jenis bidak yang dipilih
      switch (main.variables.pieces[selectedpiece].type) {
        case "w_king": // Jika bidak adalah Raja Putih (w_king)
          // Pengecekan untuk rokade (castling) sisi kanan jika posisi masih memenuhi syarat
          if (
            $("#6_1").attr("chess") == "null" && // Pastikan jalur rokade kosong
            $("#7_1").attr("chess") == "null" &&
            main.variables.pieces["w_king"].moved == false && // Raja belum pernah bergerak
            main.variables.pieces["w_rook2"].moved == false // Benteng kanan belum pernah bergerak
          ) {
            // Jika rokade diperbolehkan, tambahkan koordinat tambahan untuk langkah rokade
            coordinates = [
              { x: 1, y: 1 },
              { x: 1, y: 0 },
              { x: 1, y: -1 },
              { x: 0, y: -1 },
              { x: -1, y: -1 },
              { x: -1, y: 0 },
              { x: -1, y: 1 },
              { x: 0, y: 1 },
              { x: 2, y: 0 }, // Langkah rokade (ke kanan dua langkah)
            ].map(function (val) {
              return (
                parseInt(position.x) +
                parseInt(val.x) +
                "_" +
                (parseInt(position.y) + parseInt(val.y)) // Konversi koordinat ke format "x_y"
              );
            });
          } else {
            // Jika tidak rokade, hanya gerakan normal Raja (1 langkah ke segala arah)
            coordinates = [
              { x: 1, y: 1 },
              { x: 1, y: 0 },
              { x: 1, y: -1 },
              { x: 0, y: -1 },
              { x: -1, y: -1 },
              { x: -1, y: 0 },
              { x: -1, y: 1 },
              { x: 0, y: 1 },
            ].map(function (val) {
              return (
                parseInt(position.x) +
                parseInt(val.x) +
                "_" +
                (parseInt(position.y) + parseInt(val.y))
              );
            });
          }

          // Menentukan opsi gerakan untuk bidak yang dipilih
          options = main.methods
            .options(
              startpoint, // Posisi awal bidak yang dipilih
              coordinates, // Daftar koordinat yang memungkinkan untuk bidak ini
              main.variables.pieces[selectedpiece].type // Jenis bidak yang dipilih
            )
            .slice(0); // Membuat salinan array untuk mencegah perubahan pada array asli

          // Menyimpan opsi gerakan yang telah dihitung ke dalam variabel highlighted
          main.variables.highlighted = options.slice(0);

          // Menyorot sel yang menjadi opsi gerakan bidak
          main.methods.togglehighlight(options);

          break;

        case "b_king": // Jika bidak yang dipilih adalah Raja Hitam
          // Memeriksa apakah rokade (castling) sisi kanan memungkinkan
          if (
            $("#6_8").attr("chess") == "null" && // Pastikan jalur rokade kosong
            $("#7_8").attr("chess") == "null" &&
            main.variables.pieces["b_king"].moved == false && // Raja belum pernah bergerak
            main.variables.pieces["b_rook2"].moved == false // Benteng kanan belum pernah bergerak
          ) {
            // Jika rokade memungkinkan, tambahkan gerakan rokade ke dalam daftar koordinat
            coordinates = [
              { x: 1, y: 1 },
              { x: 1, y: 0 },
              { x: 1, y: -1 },
              { x: 0, y: -1 },
              { x: -1, y: -1 },
              { x: -1, y: 0 },
              { x: -1, y: 1 },
              { x: 0, y: 1 },
              { x: 2, y: 0 }, // Langkah rokade (ke kanan dua langkah)
            ].map(function (val) {
              return (
                parseInt(position.x) +
                parseInt(val.x) +
                "_" +
                (parseInt(position.y) + parseInt(val.y)) // Konversi koordinat ke format "x_y"
              );
            });
          } else {
            // Jika tidak rokade, hanya gerakan normal Raja (1 langkah ke segala arah)
            coordinates = [
              { x: 1, y: 1 },
              { x: 1, y: 0 },
              { x: 1, y: -1 },
              { x: 0, y: -1 },
              { x: -1, y: -1 },
              { x: -1, y: 0 },
              { x: -1, y: 1 },
              { x: 0, y: 1 },
            ].map(function (val) {
              return (
                parseInt(position.x) +
                parseInt(val.x) +
                "_" +
                (parseInt(position.y) + parseInt(val.y))
              );
            });
          }

          // Menentukan opsi gerakan untuk Raja Hitam berdasarkan koordinat yang dihitung
          options = main.methods
            .options(
              startpoint, // Posisi awal Raja Hitam
              coordinates, // Daftar langkah yang mungkin dilakukan
              main.variables.pieces[selectedpiece].type // Jenis bidak (Raja Hitam)
            )
            .slice(0);

          // Menyimpan opsi gerakan yang telah dihitung ke dalam variabel highlighted
          main.variables.highlighted = options.slice(0);

          // Menyorot sel yang menjadi opsi gerakan bidak
          main.methods.togglehighlight(options);

          break;

        case "w_queen": // Jika bidak yang dipilih adalah Ratu Putih (w_queen)
          // Menentukan semua langkah yang mungkin untuk Ratu Putih berdasarkan kombinasi gerakan Benteng dan Uskup

          // Gerakan diagonal ke kanan atas (↗)
          c1 = main.methods.w_options(position, [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
            { x: 4, y: 4 },
            { x: 5, y: 5 },
            { x: 6, y: 6 },
            { x: 7, y: 7 },
          ]);

          // Gerakan diagonal ke kanan bawah (↘)
          c2 = main.methods.w_options(position, [
            { x: 1, y: -1 },
            { x: 2, y: -2 },
            { x: 3, y: -3 },
            { x: 4, y: -4 },
            { x: 5, y: -5 },
            { x: 6, y: -6 },
            { x: 7, y: -7 },
          ]);

          // Gerakan diagonal ke kiri atas (↖)
          c3 = main.methods.w_options(position, [
            { x: -1, y: 1 },
            { x: -2, y: 2 },
            { x: -3, y: 3 },
            { x: -4, y: 4 },
            { x: -5, y: 5 },
            { x: -6, y: 6 },
            { x: -7, y: 7 },
          ]);

          // Gerakan diagonal ke kiri bawah (↙)
          c4 = main.methods.w_options(position, [
            { x: -1, y: -1 },
            { x: -2, y: -2 },
            { x: -3, y: -3 },
            { x: -4, y: -4 },
            { x: -5, y: -5 },
            { x: -6, y: -6 },
            { x: -7, y: -7 },
          ]);

          // Gerakan horizontal ke kanan (→)
          c5 = main.methods.w_options(position, [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 0 },
            { x: 4, y: 0 },
            { x: 5, y: 0 },
            { x: 6, y: 0 },
            { x: 7, y: 0 },
          ]);

          // Gerakan vertikal ke atas (↑)
          c6 = main.methods.w_options(position, [
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 },
            { x: 0, y: 4 },
            { x: 0, y: 5 },
            { x: 0, y: 6 },
            { x: 0, y: 7 },
          ]);

          // Gerakan horizontal ke kiri (←)
          c7 = main.methods.w_options(position, [
            { x: -1, y: 0 },
            { x: -2, y: 0 },
            { x: -3, y: 0 },
            { x: -4, y: 0 },
            { x: -5, y: 0 },
            { x: -6, y: 0 },
            { x: -7, y: 0 },
          ]);

          // Gerakan vertikal ke bawah (↓)
          c8 = main.methods.w_options(position, [
            { x: 0, y: -1 },
            { x: 0, y: -2 },
            { x: 0, y: -3 },
            { x: 0, y: -4 },
            { x: 0, y: -5 },
            { x: 0, y: -6 },
            { x: 0, y: -7 },
          ]);

          // Menggabungkan semua koordinat gerakan yang memungkinkan
          coordinates = c1
            .concat(c2)
            .concat(c3)
            .concat(c4)
            .concat(c5)
            .concat(c6)
            .concat(c7)
            .concat(c8);

          // Menyimpan daftar langkah ke dalam opsi yang dapat dilakukan
          options = coordinates.slice(0);

          // Menyimpan langkah yang mungkin untuk ditampilkan dalam highlight
          main.variables.highlighted = options.slice(0);

          // Menyorot kotak pada papan yang dapat ditempati oleh Ratu Putih
          main.methods.togglehighlight(options);

          break;

        case "b_queen": // Jika bidak yang dipilih adalah Ratu Hitam (b_queen)
          // Menentukan semua langkah yang mungkin untuk Ratu Hitam berdasarkan kombinasi gerakan Benteng dan Uskup

          // Gerakan diagonal ke kanan atas (↗)
          c1 = main.methods.b_options(position, [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
            { x: 4, y: 4 },
            { x: 5, y: 5 },
            { x: 6, y: 6 },
            { x: 7, y: 7 },
          ]);

          // Gerakan diagonal ke kanan bawah (↘)
          c2 = main.methods.b_options(position, [
            { x: 1, y: -1 },
            { x: 2, y: -2 },
            { x: 3, y: -3 },
            { x: 4, y: -4 },
            { x: 5, y: -5 },
            { x: 6, y: -6 },
            { x: 7, y: -7 },
          ]);

          // Gerakan diagonal ke kiri atas (↖)
          c3 = main.methods.b_options(position, [
            { x: -1, y: 1 },
            { x: -2, y: 2 },
            { x: -3, y: 3 },
            { x: -4, y: 4 },
            { x: -5, y: 5 },
            { x: -6, y: 6 },
            { x: -7, y: 7 },
          ]);

          // Gerakan diagonal ke kiri bawah (↙)
          c4 = main.methods.b_options(position, [
            { x: -1, y: -1 },
            { x: -2, y: -2 },
            { x: -3, y: -3 },
            { x: -4, y: -4 },
            { x: -5, y: -5 },
            { x: -6, y: -6 },
            { x: -7, y: -7 },
          ]);

          // Gerakan horizontal ke kanan (→)
          c5 = main.methods.b_options(position, [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 0 },
            { x: 4, y: 0 },
            { x: 5, y: 0 },
            { x: 6, y: 0 },
            { x: 7, y: 0 },
          ]);

          // Gerakan vertikal ke atas (↑)
          c6 = main.methods.b_options(position, [
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 },
            { x: 0, y: 4 },
            { x: 0, y: 5 },
            { x: 0, y: 6 },
            { x: 0, y: 7 },
          ]);

          // Gerakan horizontal ke kiri (←)
          c7 = main.methods.b_options(position, [
            { x: -1, y: 0 },
            { x: -2, y: 0 },
            { x: -3, y: 0 },
            { x: -4, y: 0 },
            { x: -5, y: 0 },
            { x: -6, y: 0 },
            { x: -7, y: 0 },
          ]);

          // Gerakan vertikal ke bawah (↓)
          c8 = main.methods.b_options(position, [
            { x: 0, y: -1 },
            { x: 0, y: -2 },
            { x: 0, y: -3 },
            { x: 0, y: -4 },
            { x: 0, y: -5 },
            { x: 0, y: -6 },
            { x: 0, y: -7 },
          ]);

          // Menggabungkan semua koordinat gerakan yang memungkinkan
          coordinates = c1
            .concat(c2)
            .concat(c3)
            .concat(c4)
            .concat(c5)
            .concat(c6)
            .concat(c7)
            .concat(c8);

          // Menyimpan daftar langkah ke dalam opsi yang dapat dilakukan
          options = coordinates.slice(0);

          // Menyimpan langkah yang mungkin untuk ditampilkan dalam highlight
          main.variables.highlighted = options.slice(0);

          // Menyorot kotak pada papan yang dapat ditempati oleh Ratu Hitam
          main.methods.togglehighlight(options);

          break;

        case "w_bishop": // Jika bidak yang dipilih adalah Uskup/Gajah Putih (w_bishop)
          // Menentukan semua langkah yang mungkin untuk Uskup Putih yang hanya bergerak secara diagonal

          // Gerakan diagonal ke kanan atas (↗)
          c1 = main.methods.w_options(position, [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
            { x: 4, y: 4 },
            { x: 5, y: 5 },
            { x: 6, y: 6 },
            { x: 7, y: 7 },
          ]);

          // Gerakan diagonal ke kanan bawah (↘)
          c2 = main.methods.w_options(position, [
            { x: 1, y: -1 },
            { x: 2, y: -2 },
            { x: 3, y: -3 },
            { x: 4, y: -4 },
            { x: 5, y: -5 },
            { x: 6, y: -6 },
            { x: 7, y: -7 },
          ]);

          // Gerakan diagonal ke kiri atas (↖)
          c3 = main.methods.w_options(position, [
            { x: -1, y: 1 },
            { x: -2, y: 2 },
            { x: -3, y: 3 },
            { x: -4, y: 4 },
            { x: -5, y: 5 },
            { x: -6, y: 6 },
            { x: -7, y: 7 },
          ]);

          // Gerakan diagonal ke kiri bawah (↙)
          c4 = main.methods.w_options(position, [
            { x: -1, y: -1 },
            { x: -2, y: -2 },
            { x: -3, y: -3 },
            { x: -4, y: -4 },
            { x: -5, y: -5 },
            { x: -6, y: -6 },
            { x: -7, y: -7 },
          ]);

          // Menggabungkan semua koordinat gerakan diagonal yang memungkinkan
          coordinates = c1.concat(c2).concat(c3).concat(c4);

          // Menyimpan daftar langkah ke dalam opsi yang dapat dilakukan
          options = coordinates.slice(0);

          // Menyimpan langkah yang mungkin untuk ditampilkan dalam highlight
          main.variables.highlighted = options.slice(0);

          // Menyorot kotak pada papan yang dapat ditempati oleh Uskup Putih
          main.methods.togglehighlight(options);

          break;

        case "b_bishop": // Jika bidak yang dipilih adalah Uskup/Gajah Hitam (b_bishop)
          // Menentukan semua langkah yang mungkin untuk Uskup Hitam yang hanya bergerak secara diagonal

          // Gerakan diagonal ke kanan atas (↗)
          c1 = main.methods.b_options(position, [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
            { x: 4, y: 4 },
            { x: 5, y: 5 },
            { x: 6, y: 6 },
            { x: 7, y: 7 },
          ]);

          // Gerakan diagonal ke kanan bawah (↘)
          c2 = main.methods.b_options(position, [
            { x: 1, y: -1 },
            { x: 2, y: -2 },
            { x: 3, y: -3 },
            { x: 4, y: -4 },
            { x: 5, y: -5 },
            { x: 6, y: -6 },
            { x: 7, y: -7 },
          ]);

          // Gerakan diagonal ke kiri atas (↖)
          c3 = main.methods.b_options(position, [
            { x: -1, y: 1 },
            { x: -2, y: 2 },
            { x: -3, y: 3 },
            { x: -4, y: 4 },
            { x: -5, y: 5 },
            { x: -6, y: 6 },
            { x: -7, y: 7 },
          ]);

          // Gerakan diagonal ke kiri bawah (↙)
          c4 = main.methods.b_options(position, [
            { x: -1, y: -1 },
            { x: -2, y: -2 },
            { x: -3, y: -3 },
            { x: -4, y: -4 },
            { x: -5, y: -5 },
            { x: -6, y: -6 },
            { x: -7, y: -7 },
          ]);

          // Menggabungkan semua koordinat gerakan diagonal yang memungkinkan
          coordinates = c1.concat(c2).concat(c3).concat(c4);

          // Menyimpan daftar langkah ke dalam opsi yang dapat dilakukan
          options = coordinates.slice(0);

          // Menyimpan langkah yang mungkin untuk ditampilkan dalam highlight
          main.variables.highlighted = options.slice(0);

          // Menyorot kotak pada papan yang dapat ditempati oleh Uskup Hitam
          main.methods.togglehighlight(options);

          break;

        case "w_knight": // Jika bidak yang dipilih adalah Kuda Putih (w_knight)
          // Menentukan semua langkah yang mungkin untuk Kuda Putih sesuai aturan catur

          coordinates = [
            { x: -1, y: 2 }, // Loncat ke kiri atas
            { x: 1, y: 2 }, // Loncat ke kanan atas
            { x: 1, y: -2 }, // Loncat ke kanan bawah
            { x: -1, y: -2 }, // Loncat ke kiri bawah
            { x: 2, y: 1 }, // Loncat ke atas kanan
            { x: 2, y: -1 }, // Loncat ke bawah kanan
            { x: -2, y: -1 }, // Loncat ke bawah kiri
            { x: -2, y: 1 }, // Loncat ke atas kiri
          ].map(function (val) {
            return (
              parseInt(position.x) +
              parseInt(val.x) +
              "_" +
              (parseInt(position.y) + parseInt(val.y)) // Mengonversi koordinat ke format "x_y"
            );
          });

          // Menentukan opsi gerakan yang valid berdasarkan koordinat yang dihitung
          options = main.methods
            .options(
              startpoint, // Posisi awal Kuda
              coordinates, // Daftar langkah yang mungkin dilakukan
              main.variables.pieces[selectedpiece].type // Jenis bidak (Kuda Putih)
            )
            .slice(0);

          // Menyimpan daftar langkah yang bisa dilakukan untuk ditampilkan sebagai highlight
          main.variables.highlighted = options.slice(0);

          // Menyorot sel di papan yang menjadi opsi gerakan Kuda Putih
          main.methods.togglehighlight(options);

          break;

        case "b_knight": // Jika bidak yang dipilih adalah Kuda Hitam (b_knight)
          // Menentukan semua langkah yang mungkin untuk Kuda Hitam sesuai aturan catur

          coordinates = [
            { x: -1, y: 2 }, // Loncat ke kiri atas
            { x: 1, y: 2 }, // Loncat ke kanan atas
            { x: 1, y: -2 }, // Loncat ke kanan bawah
            { x: -1, y: -2 }, // Loncat ke kiri bawah
            { x: 2, y: 1 }, // Loncat ke atas kanan
            { x: 2, y: -1 }, // Loncat ke bawah kanan
            { x: -2, y: -1 }, // Loncat ke bawah kiri
            { x: -2, y: 1 }, // Loncat ke atas kiri
          ].map(function (val) {
            return (
              parseInt(position.x) +
              parseInt(val.x) +
              "_" +
              (parseInt(position.y) + parseInt(val.y)) // Mengonversi koordinat ke format "x_y"
            );
          });

          // Menentukan opsi gerakan yang valid berdasarkan koordinat yang dihitung
          options = main.methods
            .options(
              startpoint, // Posisi awal Kuda
              coordinates, // Daftar langkah yang mungkin dilakukan
              main.variables.pieces[selectedpiece].type // Jenis bidak (Kuda Hitam)
            )
            .slice(0);

          // Menyimpan daftar langkah yang bisa dilakukan untuk ditampilkan sebagai highlight
          main.variables.highlighted = options.slice(0);

          // Menyorot sel di papan yang menjadi opsi gerakan Kuda Hitam
          main.methods.togglehighlight(options);

          break;

        case "w_rook": // Jika bidak yang dipilih adalah Benteng Putih (w_rook)
          // Menentukan semua langkah yang mungkin untuk Benteng Putih sesuai aturan catur

          // Gerakan horizontal ke kanan (→)
          c1 = main.methods.w_options(position, [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 0 },
            { x: 4, y: 0 },
            { x: 5, y: 0 },
            { x: 6, y: 0 },
            { x: 7, y: 0 },
          ]);

          // Gerakan vertikal ke atas (↑)
          c2 = main.methods.w_options(position, [
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 },
            { x: 0, y: 4 },
            { x: 0, y: 5 },
            { x: 0, y: 6 },
            { x: 0, y: 7 },
          ]);

          // Gerakan horizontal ke kiri (←)
          c3 = main.methods.w_options(position, [
            { x: -1, y: 0 },
            { x: -2, y: 0 },
            { x: -3, y: 0 },
            { x: -4, y: 0 },
            { x: -5, y: 0 },
            { x: -6, y: 0 },
            { x: -7, y: 0 },
          ]);

          // Gerakan vertikal ke bawah (↓)
          c4 = main.methods.w_options(position, [
            { x: 0, y: -1 },
            { x: 0, y: -2 },
            { x: 0, y: -3 },
            { x: 0, y: -4 },
            { x: 0, y: -5 },
            { x: 0, y: -6 },
            { x: 0, y: -7 },
          ]);

          // Menggabungkan semua koordinat gerakan horizontal dan vertikal yang memungkinkan
          coordinates = c1.concat(c2).concat(c3).concat(c4);

          // Menyimpan daftar langkah ke dalam opsi yang dapat dilakukan
          options = coordinates.slice(0);

          // Menyimpan langkah yang mungkin untuk ditampilkan dalam highlight
          main.variables.highlighted = options.slice(0);

          // Menyorot kotak pada papan yang dapat ditempati oleh Benteng Putih
          main.methods.togglehighlight(options);

          break;

        case "b_rook": // Jika bidak yang dipilih adalah Benteng Hitam (b_rook)
          // Menentukan semua langkah yang mungkin untuk Benteng Hitam sesuai aturan catur

          // Gerakan horizontal ke kanan (→)
          c1 = main.methods.b_options(position, [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 0 },
            { x: 4, y: 0 },
            { x: 5, y: 0 },
            { x: 6, y: 0 },
            { x: 7, y: 0 },
          ]);

          // Gerakan vertikal ke atas (↑)
          c2 = main.methods.b_options(position, [
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 },
            { x: 0, y: 4 },
            { x: 0, y: 5 },
            { x: 0, y: 6 },
            { x: 0, y: 7 },
          ]);

          // Gerakan horizontal ke kiri (←)
          c3 = main.methods.b_options(position, [
            { x: -1, y: 0 },
            { x: -2, y: 0 },
            { x: -3, y: 0 },
            { x: -4, y: 0 },
            { x: -5, y: 0 },
            { x: -6, y: 0 },
            { x: -7, y: 0 },
          ]);

          // Gerakan vertikal ke bawah (↓)
          c4 = main.methods.b_options(position, [
            { x: 0, y: -1 },
            { x: 0, y: -2 },
            { x: 0, y: -3 },
            { x: 0, y: -4 },
            { x: 0, y: -5 },
            { x: 0, y: -6 },
            { x: 0, y: -7 },
          ]);

          // Menggabungkan semua koordinat gerakan horizontal dan vertikal yang memungkinkan
          coordinates = c1.concat(c2).concat(c3).concat(c4);

          // Menyimpan daftar langkah ke dalam opsi yang dapat dilakukan
          options = coordinates.slice(0);

          // Menyimpan langkah yang mungkin untuk ditampilkan dalam highlight
          main.variables.highlighted = options.slice(0);

          // Menyorot kotak pada papan yang dapat ditempati oleh Benteng Hitam
          main.methods.togglehighlight(options);

          break;

        case "w_pawn": // Jika bidak yang dipilih adalah Pion Putih (w_pawn)
          // Mengecek apakah pion sudah pernah bergerak sebelumnya
          if (main.variables.pieces[selectedpiece].moved == false) {
            // Jika pion belum pernah bergerak, maka bisa maju 1 atau 2 langkah ke depan, serta menyerang secara diagonal
            coordinates = [
              { x: 0, y: 1 }, // Maju 1 langkah ke depan
              { x: 0, y: 2 }, // Maju 2 langkah ke depan (hanya pada langkah pertama)
              { x: 1, y: 1 }, // Menyerang ke kanan atas
              { x: -1, y: 1 }, // Menyerang ke kiri atas
            ].map(function (val) {
              return (
                parseInt(position.x) +
                parseInt(val.x) +
                "_" +
                (parseInt(position.y) + parseInt(val.y)) // Mengonversi koordinat ke format "x_y"
              );
            });
          } else if (main.variables.pieces[selectedpiece].moved == true) {
            // Jika pion sudah pernah bergerak sebelumnya, hanya bisa maju 1 langkah atau menyerang secara diagonal
            coordinates = [
              { x: 0, y: 1 }, // Maju 1 langkah ke depan
              { x: 1, y: 1 }, // Menyerang ke kanan atas
              { x: -1, y: 1 }, // Menyerang ke kiri atas
            ].map(function (val) {
              return (
                parseInt(position.x) +
                parseInt(val.x) +
                "_" +
                (parseInt(position.y) + parseInt(val.y))
              );
            });
          }

          // Menentukan opsi gerakan yang valid berdasarkan koordinat yang dihitung
          options = main.methods
            .options(
              startpoint, // Posisi awal pion
              coordinates, // Daftar langkah yang mungkin dilakukan
              main.variables.pieces[selectedpiece].type // Jenis bidak (Pion Putih)
            )
            .slice(0);

          // Menyimpan daftar langkah yang bisa dilakukan untuk ditampilkan sebagai highlight
          main.variables.highlighted = options.slice(0);

          // Menyorot sel di papan yang menjadi opsi gerakan Pion Putih
          main.methods.togglehighlight(options);

          break;

        case "b_pawn": // Jika bidak yang dipilih adalah Pion Hitam (b_pawn)
          // Menentukan opsi gerakan pion

          if (main.variables.pieces[selectedpiece].moved == false) {
            // Jika pion belum pernah bergerak, maka bisa maju 1 atau 2 langkah ke depan, serta menyerang secara diagonal
            coordinates = [
              { x: 0, y: -1 }, // Maju 1 langkah ke depan
              { x: 0, y: -2 }, // Maju 2 langkah ke depan (hanya pada langkah pertama)
              { x: 1, y: -1 }, // Menyerang ke kanan bawah
              { x: -1, y: -1 }, // Menyerang ke kiri bawah
            ].map(function (val) {
              return (
                parseInt(position.x) +
                parseInt(val.x) +
                "_" +
                (parseInt(position.y) + parseInt(val.y)) // Mengonversi koordinat ke format "x_y"
              );
            });
          } else if (main.variables.pieces[selectedpiece].moved == true) {
            // Jika pion sudah pernah bergerak sebelumnya, hanya bisa maju 1 langkah atau menyerang secara diagonal
            coordinates = [
              { x: 0, y: -1 }, // Maju 1 langkah ke depan
              { x: 1, y: -1 }, // Menyerang ke kanan bawah
              { x: -1, y: -1 }, // Menyerang ke kiri bawah
            ].map(function (val) {
              return (
                parseInt(position.x) +
                parseInt(val.x) +
                "_" +
                (parseInt(position.y) + parseInt(val.y))
              );
            });
          }

          // Menentukan opsi gerakan yang valid berdasarkan koordinat yang dihitung
          options = main.methods
            .options(
              startpoint, // Posisi awal pion
              coordinates, // Daftar langkah yang mungkin dilakukan
              main.variables.pieces[selectedpiece].type // Jenis bidak (Pion Hitam)
            )
            .slice(0);

          // Menyimpan daftar langkah yang bisa dilakukan untuk ditampilkan sebagai highlight
          main.variables.highlighted = options.slice(0);

          // Menyorot sel di papan yang menjadi opsi gerakan Pion Hitam
          main.methods.togglehighlight(options);

          break;
      }
    },

    options: function (startpoint, coordinates, piecetype) {
      // Pertama, cek apakah ada koordinat yang berada di luar batas papan catur (1-8)

      coordinates = coordinates.filter((val) => {
        let pos = { x: 0, y: 0 };
        pos.x = parseInt(val.split("_")[0]); // Mendapatkan koordinat x dari string "x_y"
        pos.y = parseInt(val.split("_")[1]); // Mendapatkan koordinat y dari string "x_y"

        if (!(pos.x < 1) && !(pos.x > 8) && !(pos.y < 1) && !(pos.y > 8)) {
          // Jika koordinat berada dalam batas papan catur (1-8), maka dikembalikan
          return val;
        }
      });

      // Menyesuaikan opsi gerakan berdasarkan jenis bidak yang dipilih
      switch (piecetype) {
        case "w_king": // Jika bidak adalah Raja Putih
          coordinates = coordinates.filter((val) => {
            return (
              $("#" + val).attr("chess") == "null" || // Langkah sah jika kotak kosong
              $("#" + val)
                .attr("chess")
                .slice(0, 1) == "b" // Atau jika ada bidak lawan (bidak hitam)
            );
          });
          break;

        case "b_king": // Jika bidak adalah Raja Hitam
          coordinates = coordinates.filter((val) => {
            return (
              $("#" + val).attr("chess") == "null" || // Langkah sah jika kotak kosong
              $("#" + val)
                .attr("chess")
                .slice(0, 1) == "w" // Atau jika ada bidak lawan (bidak putih)
            );
          });
          break;

        case "w_knight": // Jika bidak adalah Kuda Putih
          coordinates = coordinates.filter((val) => {
            return (
              $("#" + val).attr("chess") == "null" || // Langkah sah jika kotak kosong
              $("#" + val)
                .attr("chess")
                .slice(0, 1) == "b" // Atau jika ada bidak lawan (bidak hitam)
            );
          });
          break;

        case "b_knight": // Jika bidak adalah Kuda Hitam
          coordinates = coordinates.filter((val) => {
            return (
              $("#" + val).attr("chess") == "null" || // Langkah sah jika kotak kosong
              $("#" + val)
                .attr("chess")
                .slice(0, 1) == "w" // Atau jika ada bidak lawan (bidak putih)
            );
          });
          break;

        case "w_pawn": // Jika bidak yang dipilih adalah Pion Putih (w_pawn)
          coordinates = coordinates.filter((val) => {
            let sp = { x: 0, y: 0 }; // Objek untuk menyimpan koordinat posisi awal pion
            let coordinate = val.split("_"); // Memisahkan koordinat x dan y dari val ("x_y")

            sp.x = startpoint.split("_")[0]; // Mendapatkan posisi x awal pion
            sp.y = startpoint.split("_")[1]; // Mendapatkan posisi y awal pion

            if (coordinate[0] < sp.x || coordinate[0] > sp.x) {
              // Jika pion bergerak ke samping (serangan diagonal)
              // Cek apakah ada bidak lawan di posisi tersebut
              return (
                $("#" + val).attr("chess") != "null" && // Kotak tidak kosong
                $("#" + val)
                  .attr("chess")
                  .slice(0, 1) == "b" // Bidak lawan (hitam)
              ); // Hanya kembalikan koordinat yang memiliki bidak lawan
            } else {
              // Jika pion bergerak lurus ke depan
              if (
                coordinate[1] == parseInt(sp.y) + 2 && // Jika ini adalah langkah pertama (dua langkah)
                $("#" + sp.x + "_" + (parseInt(sp.y) + 1)).attr("chess") !=
                  "null" // Cek apakah ada bidak di depan
              ) {
                // Jika ada bidak di depan pion, maka tidak bisa maju dua langkah
              } else {
                return $("#" + val).attr("chess") == "null"; // Hanya bisa maju jika kotak kosong
              }
            }
          });

          break;

        case "b_pawn": // Jika bidak yang dipilih adalah Pion Hitam (b_pawn)
          coordinates = coordinates.filter((val) => {
            let sp = { x: 0, y: 0 }; // Objek untuk menyimpan koordinat posisi awal pion
            let coordinate = val.split("_"); // Memisahkan koordinat x dan y dari val ("x_y")

            sp.x = startpoint.split("_")[0]; // Mendapatkan posisi x awal pion
            sp.y = startpoint.split("_")[1]; // Mendapatkan posisi y awal pion

            if (coordinate[0] < sp.x || coordinate[0] > sp.x) {
              // Jika pion bergerak ke samping (serangan diagonal)
              // Cek apakah ada bidak lawan di posisi tersebut
              return (
                $("#" + val).attr("chess") != "null" && // Kotak tidak kosong
                $("#" + val)
                  .attr("chess")
                  .slice(0, 1) == "w" // Bidak lawan (putih)
              ); // Hanya kembalikan koordinat yang memiliki bidak lawan
            } else {
              // Jika pion bergerak lurus ke depan
              if (
                coordinate[1] == parseInt(sp.y) - 2 && // Jika ini adalah langkah pertama (dua langkah)
                $("#" + sp.x + "_" + (parseInt(sp.y) - 1)).attr("chess") !=
                  "null" // Cek apakah ada bidak di depan
              ) {
                // Jika ada bidak di depan pion, maka tidak bisa maju dua langkah
              } else {
                return $("#" + val).attr("chess") == "null"; // Hanya bisa maju jika kotak kosong
              }
            }
          });

          break;
      }

      return coordinates; // Mengembalikan daftar koordinat langkah yang valid
    },

    w_options: function (position, coordinates) {
      let flag = false; // Variabel flag digunakan untuk menghentikan pergerakan saat bertemu bidak lain

      coordinates = coordinates
        .map(function (val) {
          // Mengonversi koordinat relatif (x,y) menjadi ID kotak di papan catur dalam format "x_y"
          return (
            parseInt(position.x) +
            parseInt(val.x) +
            "_" +
            (parseInt(position.y) + parseInt(val.y))
          );
        })
        .filter((val) => {
          let pos = { x: 0, y: 0 };
          pos.x = parseInt(val.split("_")[0]); // Mengambil koordinat x dari string "x_y"
          pos.y = parseInt(val.split("_")[1]); // Mengambil koordinat y dari string "x_y"

          if (!(pos.x < 1) && !(pos.x > 8) && !(pos.y < 1) && !(pos.y > 8)) {
            // Jika koordinat masih berada dalam batas papan (1-8), maka dikembalikan
            return val;
          }
        })
        .filter((val) => {
          // Algoritma untuk menentukan gerakan dalam garis lurus bagi Uskup (bishop), Benteng (rook), dan Ratu (queen)
          if (flag == false) {
            if ($("#" + val).attr("chess") == "null") {
              // Jika kotak kosong, maka bidak dapat melangkah ke sana
              console.log(val);
              return val;
            } else if (
              $("#" + val)
                .attr("chess")
                .slice(0, 1) == "b" // Jika ada bidak lawan (Hitam)
            ) {
              flag = true; // Set flag agar tidak bisa bergerak lebih jauh dalam arah ini
              console.log(val);
              return val; // Menyimpan langkah terakhir yang bisa menyerang bidak lawan
            } else if (
              $("#" + val)
                .attr("chess")
                .slice(0, 1) == "w" // Jika ada bidak sendiri (Putih)
            ) {
              console.log(val + "-3"); // Log bahwa langkah ini terblokir oleh bidak sendiri
              flag = true; // Set flag agar tidak bisa bergerak lebih jauh dalam arah ini
            }
          }
        });

      return coordinates; // Mengembalikan daftar langkah yang valid
    },

    b_options: function (position, coordinates) {
      let flag = false; // Variabel flag digunakan untuk menghentikan pergerakan saat bertemu bidak lain

      coordinates = coordinates
        .map(function (val) {
          // Mengonversi koordinat relatif (x,y) menjadi ID kotak di papan catur dalam format "x_y"
          return (
            parseInt(position.x) +
            parseInt(val.x) +
            "_" +
            (parseInt(position.y) + parseInt(val.y))
          );
        })
        .filter((val) => {
          let pos = { x: 0, y: 0 };
          pos.x = parseInt(val.split("_")[0]); // Mengambil koordinat x dari string "x_y"
          pos.y = parseInt(val.split("_")[1]); // Mengambil koordinat y dari string "x_y"

          if (!(pos.x < 1) && !(pos.x > 8) && !(pos.y < 1) && !(pos.y > 8)) {
            // Jika koordinat masih berada dalam batas papan (1-8), maka dikembalikan
            return val;
          }
        })
        .filter((val) => {
          // Algoritma untuk menentukan gerakan dalam garis lurus bagi Uskup (bishop), Benteng (rook), dan Ratu (queen)
          if (flag == false) {
            if ($("#" + val).attr("chess") == "null") {
              // Jika kotak kosong, maka bidak dapat melangkah ke sana
              return val;
            } else if (
              $("#" + val)
                .attr("chess")
                .slice(0, 1) == "w" // Jika ada bidak lawan (Putih)
            ) {
              flag = true; // Set flag agar tidak bisa bergerak lebih jauh dalam arah ini
              return val; // Menyimpan langkah terakhir yang bisa menyerang bidak lawan
            } else if (
              $("#" + val)
                .attr("chess")
                .slice(0, 1) == "b" // Jika ada bidak sendiri (Hitam)
            ) {
              flag = true; // Set flag agar tidak bisa bergerak lebih jauh dalam arah ini
            }
          }
        });

      return coordinates; // Mengembalikan daftar langkah yang valid
    },

    capture: function (target) {
      // Mendapatkan informasi bidak yang dipilih untuk melakukan penangkapan
      let selectedpiece = {
        name: $("#" + main.variables.selectedpiece).attr("chess"), // Nama bidak yang dipilih
        id: main.variables.selectedpiece, // ID posisi bidak yang dipilih
      };

      // Memindahkan bidak ke sel baru (menangkap bidak lawan)
      $("#" + target.id).html(main.variables.pieces[selectedpiece.name].img); // Menampilkan gambar bidak di sel baru
      $("#" + target.id).attr("chess", selectedpiece.name); // Mengatur atribut "chess" dengan nama bidak yang dipindahkan

      // Menghapus bidak dari sel lama
      $("#" + selectedpiece.id).html(""); // Menghapus tampilan bidak di posisi sebelumnya
      $("#" + selectedpiece.id).attr("chess", "null"); // Menandai sel lama sebagai kosong

      // Memperbarui informasi posisi bidak yang dipindahkan
      main.variables.pieces[selectedpiece.name].position = target.id; // Memperbarui posisi bidak
      main.variables.pieces[selectedpiece.name].moved = true; // Menandai bahwa bidak telah bergerak

      // Menandai bidak lawan yang ditangkap sebagai "captured"
      main.variables.pieces[target.name].captured = true;
    },

    move: function (target) {
      // Mendapatkan nama bidak yang sedang dipilih
      let selectedpiece = $("#" + main.variables.selectedpiece).attr("chess");

      // Memindahkan bidak ke sel baru (tanpa menangkap bidak lawan)
      $("#" + target.id).html(main.variables.pieces[selectedpiece].img); // Menampilkan gambar bidak di sel baru
      $("#" + target.id).attr("chess", selectedpiece); // Menandai sel baru dengan bidak yang dipindahkan

      // Menghapus bidak dari sel lama
      $("#" + main.variables.selectedpiece).html(""); // Menghapus tampilan bidak dari sel lama
      $("#" + main.variables.selectedpiece).attr("chess", "null"); // Menandai sel lama sebagai kosong

      // Memperbarui informasi posisi bidak
      main.variables.pieces[selectedpiece].position = target.id; // Memperbarui posisi bidak di dalam objek
      main.variables.pieces[selectedpiece].moved = true; // Menandai bahwa bidak telah bergerak
    },

    endturn: function () {
      if (main.variables.turn == "w") {
        // Jika giliran saat ini adalah Putih (w)
        main.variables.turn = "b"; // Ubah giliran menjadi Hitam (b)

        // Menghapus highlight dari langkah sebelumnya
        main.methods.togglehighlight(main.variables.highlighted);
        main.variables.highlighted.length = 0;

        // Mengatur ulang bidak yang dipilih agar tidak ada yang dipilih saat giliran berubah
        main.variables.selectedpiece = "";

        // Menampilkan pesan giliran pemain di UI
        $("#turn").html("It's Blacks Turn"); // Menampilkan bahwa giliran sekarang adalah Hitam

        // Menambahkan efek visual untuk memberi tahu pemain tentang perubahan giliran
        $("#turn").addClass("turnhighlight");
        window.setTimeout(function () {
          $("#turn").removeClass("turnhighlight"); // Menghapus highlight setelah 1.5 detik
        }, 1500);
      } else if ((main.variables.turn = "b")) {
        // Jika giliran saat ini adalah Hitam (b)
        main.variables.turn = "w"; // Ubah giliran menjadi Putih (w)

        // Menghapus highlight dari langkah sebelumnya
        main.methods.togglehighlight(main.variables.highlighted);
        main.variables.highlighted.length = 0;

        // Mengatur ulang bidak yang dipilih agar tidak ada yang dipilih saat giliran berubah
        main.variables.selectedpiece = "";

        // Menampilkan pesan giliran pemain di UI
        $("#turn").html("It's Whites Turn"); // Menampilkan bahwa giliran sekarang adalah Putih

        // Menambahkan efek visual untuk memberi tahu pemain tentang perubahan giliran
        $("#turn").addClass("turnhighlight");
        window.setTimeout(function () {
          $("#turn").removeClass("turnhighlight"); // Menghapus highlight setelah 1.5 detik
        }, 1500);
      }
    },

    togglehighlight: function (options) {
      // Menambahkan atau menghapus highlight pada kotak-kotak langkah yang tersedia
      options.forEach(function (element, index, array) {
        $("#" + element).toggleClass("green shake-little neongreen_txt");
        // Menambahkan atau menghapus kelas CSS untuk highlight (efek warna hijau dan animasi)
      });
    },
  },
};

$(document).ready(function () {
  // Mengatur permainan saat halaman pertama kali dimuat
  main.methods.gamesetup();

  // Menangani klik pada setiap kotak papan catur
  $(".gamecell").click(function (e) {
    var selectedpiece = {
      name: "",
      id: main.variables.selectedpiece, // ID bidak yang sedang dipilih
    };

    if (main.variables.selectedpiece == "") {
      // Jika belum ada bidak yang dipilih, ambil nama bidak dari kotak yang diklik
      selectedpiece.name = $("#" + e.target.id).attr("chess");
    } else {
      // Jika sudah ada bidak yang dipilih, gunakan bidak yang sedang dipilih
      selectedpiece.name = $("#" + main.variables.selectedpiece).attr("chess");
    }

    var target = {
      name: $(this).attr("chess"), // Nama bidak pada kotak target
      id: e.target.id, // ID kotak target
    };

    if (
      main.variables.selectedpiece == "" && // Jika belum ada bidak yang dipilih
      target.name.slice(0, 1) == main.variables.turn // Pastikan bidak yang dipilih sesuai dengan giliran
    ) {
      // Menampilkan opsi pergerakan untuk bidak yang dipilih
      main.variables.selectedpiece = e.target.id;
      main.methods.moveoptions($(this).attr("chess"));
    } else if (main.variables.selectedpiece != "" && target.name == "null") {
      // Jika bidak sudah dipilih dan target adalah kotak kosong, maka pindahkan bidak

      if (selectedpiece.name == "w_king" || selectedpiece.name == "b_king") {
        // Menangani langkah rokade (castling) untuk raja
        let t0 = (selectedpiece.name = "w_king");
        let t1 = (selectedpiece.name = "b_king");
        let t2 = main.variables.pieces[selectedpiece.name].moved == false;
        let t3 = main.variables.pieces["b_rook2"].moved == false;
        let t4 = main.variables.pieces["w_rook2"].moved == false;
        let t5 = target.id == "7_8";
        let t6 = target.id == "7_1";

        if (t0 && t2 && t4 && t6) {
          // Rokade untuk Raja Putih (w_king)
          let k_position = "5_1"; // Posisi awal Raja Putih
          let k_target = "7_1"; // Posisi akhir Raja setelah rokade
          let r_position = "8_1"; // Posisi awal Benteng Putih
          let r_target = "6_1"; // Posisi akhir Benteng setelah rokade

          // Memindahkan Raja
          main.variables.pieces["w_king"].position = "7_1";
          main.variables.pieces["w_king"].moved = true;
          $("#" + k_position).html("");
          $("#" + k_position).attr("chess", "null");
          $("#" + k_target).html(main.variables.pieces["w_king"].img);
          $("#" + k_target).attr("chess", "w_king");

          // Memindahkan Benteng
          main.variables.pieces["w_rook2"].position = "6_1";
          main.variables.pieces["w_rook2"].moved = true;
          $("#" + r_position).html("");
          $("#" + r_position).attr("chess", "null");
          $("#" + r_target).html(main.variables.pieces["w_rook2"].img);
          $("#" + r_target).attr("chess", "w_rook2");

          main.methods.endturn();
        } else if (t1 && t2 && t3 && t5) {
          // Rokade untuk Raja Hitam (b_king)
          let k_position = "5_8";
          let k_target = "7_8";
          let r_position = "8_8";
          let r_target = "6_8";

          // Memindahkan Raja
          main.variables.pieces["b_king"].position = "7_8";
          main.variables.pieces["b_king"].moved = true;
          $("#" + k_position).html("");
          $("#" + k_position).attr("chess", "null");
          $("#" + k_target).html(main.variables.pieces["b_king"].img);
          $("#" + k_target).attr("chess", "b_king");

          // Memindahkan Benteng
          main.variables.pieces["b_rook2"].position = "6_8";
          main.variables.pieces["b_rook2"].moved = true;
          $("#" + r_position).html("");
          $("#" + r_position).attr("chess", "null");
          $("#" + r_target).html(main.variables.pieces["b_rook2"].img);
          $("#" + r_target).attr("chess", "b_rook2");

          main.methods.endturn();
        } else {
          // Pindahkan bidak jika bukan rokade
          main.methods.move(target);
          main.methods.endturn();
        }
      } else {
        // Jika bukan raja, langsung pindahkan bidak
        main.methods.move(target);
        main.methods.endturn();
      }
    } else if (
      main.variables.selectedpiece != "" &&
      target.name != "null" &&
      target.id != selectedpiece.id &&
      selectedpiece.name.slice(0, 1) != target.name.slice(0, 1)
    ) {
      // Menangkap bidak lawan

      if (
        selectedpiece.id != target.id &&
        main.variables.highlighted.indexOf(target.id) != -1
      ) {
        // Memastikan bidak hanya menangkap lawan dalam area geraknya
        main.methods.capture(target);
        main.methods.endturn();
      }
    } else if (
      main.variables.selectedpiece != "" &&
      target.name != "null" &&
      target.id != selectedpiece.id &&
      selectedpiece.name.slice(0, 1) == target.name.slice(0, 1)
    ) {
      // Jika bidak yang diklik adalah bidak sendiri, ubah pilihan bidak

      // Hapus highlight sebelumnya
      main.methods.togglehighlight(main.variables.highlighted);
      main.variables.highlighted.length = 0;

      // Pilih bidak baru dan tampilkan opsi langkahnya
      main.variables.selectedpiece = target.id;
      main.methods.moveoptions(target.name);
    }
  });

  // Menonaktifkan menu konteks (klik kanan) pada halaman untuk mencegah interaksi yang tidak diinginkan
  $("body").contextmenu(function (e) {
    e.preventDefault();
  });
});
