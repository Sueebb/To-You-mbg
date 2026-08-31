let password = "";
const passwordBenar = "0505";

function masukkanAngka(angka) {
    if (password.length >= 4) {
        return;
    }
    password += angka;
    updateDots();
    if (password.length === 4) {
        if (password === passwordBenar) {
            alert("Password benar!");

            // pindah ke halaman lain
            // window.location.href = "home.html";

        } else {
            alert("Password salah!");
            password = "";
            updateDots();
        }
    }
}

function updateDots() {
    const dots = document.querySelectorAll(".dots span");
    dots.forEach((dot, index) => {
        if (index < password.length) {
            dot.classList.add("terisi");
        } else {
            dot.classList.remove("terisi");
            dot.classList.remove("pop");
        }
    });
    if (password.length > 0) {
        const dotBaru = dots[password.length - 1];
        dotBaru.classList.remove("pop");
        void dotBaru.offsetWidth;
        dotBaru.classList.add("pop");
    }
}

function hapus() {
    password = "";
    updateDots();
}

/* =========================
SWIPE LOCK SCREEN
========================= */
const main = document.querySelector("main");
let posisiAwal = 0;
let posisiAkhir = 0;
let sedangGeser = false;

/* SAAT JARI MULAI MENYENTUH */
main.addEventListener("touchstart", function(event) {
        posisiAwal = event.touches[0].clientY;
    }
);

/* SAAT JARI DILEPAS */
main.addEventListener("touchend", function(event) {
            posisiAkhir = event.changedTouches[0].clientY;
        const jarak = posisiAwal - posisiAkhir;

        /* GESER KE ATAS */
        if (jarak > 80) {
            main.classList.add("unlock");
        }

        /* GESER KE BAWAH */
        if (jarak < -80) {
            main.classList.remove("unlock");
        }
    }
);

/* =========================
   MOUSE / LAPTOP
========================= */
main.addEventListener("mousedown", function(event) {
    sedangGeser = true;
    posisiAwal = event.clientY;
});

main.addEventListener("mouseup", function(event) {
    if (!sedangGeser) {
        return;
    }
    posisiAkhir = event.clientY;
    const jarak = posisiAwal - posisiAkhir;

    // GESER KE ATAS
    if (jarak > 80) {
        main.classList.add("unlock");
    }

    // GESER KE BAWAH
    if (jarak < -80) {
        main.classList.remove("unlock");
    }
    sedangGeser = false;
});

/* Jika mouse keluar dari area */
main.addEventListener("mouseleave", function() {
        sedangGeser = false;

});

/* =========================
   JAM DAN TANGGAL OTOMATIS
========================= */
function updateWaktu() {
    const sekarang = new Date();
    // JAM
    const jam = String(sekarang.getHours()).padStart(2, "0");
    const menit = String(sekarang.getMinutes()).padStart(2, "0");
    document.getElementById("waktu").textContent =
        `${jam}:${menit}`;

    // HARI
    const namaHari = [
        "Min",
        "Sen",
        "Sel",
        "Rab",
        "Kam",
        "Jum",
        "Sab"
    ];

    // BULAN
    const namaBulan = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des"
    ];
    const hari = namaHari[sekarang.getDay()];
    const tanggal = sekarang.getDate();
    const bulan = namaBulan[sekarang.getMonth()];
    document.getElementById("tanggal").innerHTML =
        `${hari} &nbsp; ${tanggal} ${bulan}`;
}

// Jalankan langsung
updateWaktu();

// Update setiap 1 detik
setInterval(updateWaktu, 1000);

function kembali() {
    main.classList.remove("unlock");
    password = "";
    updateDots();
}