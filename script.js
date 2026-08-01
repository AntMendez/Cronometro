window.onload = () => {
    init();
    initTemporizador();
}

// Estado encapsulado — evita colisión con variables del temporizador
const crono = {
    h: 0,
    m: 0,
    s: 0,
    ms: 0,
    interval: null,
};

const elemHms = document.getElementById("hms");
const elemMs = document.getElementById("ms");
const btnStart = document.querySelector(".start");
const btnStop = document.querySelector(".stop");
const btnReset = document.querySelector(".reset");
let cronoCorriendo = false;

function init() {
    elemHms.textContent = "00:00:00";
    elemMs.textContent = ".00";

    btnStart.addEventListener("click", cronometrar);
    btnStop.addEventListener("click", parar);
    btnReset.addEventListener("click", reiniciar);
}

function cronometrar() {
    cronoCorriendo = true;
    escribir(); // llamado para evitar el delay inicial de 10ms
    crono.interval = setInterval(escribir, 10);
    btnStart.classList.toggle("oculto")
}

function escribir() {
    crono.ms++;

    if (crono.ms > 99) { crono.s++; crono.ms = 0; }
    if (crono.s > 59) { crono.m++; crono.s = 0; }
    if (crono.m > 59) { crono.h++; crono.m = 0; }
    // cambio posterior: opcion 24hs o mas.
    if (crono.h >= 24) {
        reiniciar();
        alert("Pasaron más de 24hs");
        return;
    }

    const pad = (n) => n.toString().padStart(2, "0"); // funcion tipo map()

    elemHms.textContent = `${pad(crono.h)}:${pad(crono.m)}:${pad(crono.s)}`;
    elemMs.textContent = `.${pad(crono.ms)}`;
}

function parar() {
    clearInterval(crono.interval);
    if (cronoCorriendo) {
        btnStart.classList.toggle("oculto")
    }
    cronoCorriendo = false
}

function reiniciar() {
    clearInterval(crono.interval);
    crono.h = 0;
    crono.m = 0;
    crono.s = 0;
    crono.ms = 0;

    elemHms.textContent = "00:00:00";
    elemMs.textContent = ".00";
    if (cronoCorriendo) {
        btnStart.classList.toggle("oculto")
    }
    cronoCorriendo = false
}

// --- Toggle Cronómetro / Temporizador ---

const divCrono = document.querySelector(".cronometro");
const divTemp = document.querySelector(".temporizador");
const btnCambioVista = document.querySelector(".change_btn");
let tempOculto = divTemp.classList.contains("oculto");

btnCambioVista.addEventListener("click", () => {
    console.log(cronoCorriendo)
    console.log(tempCorriendo)
    if (cronoCorriendo || tempCorriendo) {
        return
    }
    divCrono.classList.toggle("oculto");
    divTemp.classList.toggle("oculto");
    tempOculto = !tempOculto;
    btnCambioVista.textContent = tempOculto ? "Temporizador" : "Cronómetro";
});

// -------------TEMPORIZADOR-------------

const temp = {
    h: 0,
    m: 0,
    s: 0,
    interval: null,
};

const elemTempHms = document.getElementById("temp-hms");
const inputH = document.getElementById("input-h");
const inputM = document.getElementById("input-m");
const inputS = document.getElementById("input-s");
const btnTempStart = document.querySelector(".temp-start");
const btnTempStop = document.querySelector(".temp-stop");
const btnTempReset = document.querySelector(".temp-reset");
let tempCorriendo = false;
function initTemporizador() {
    elemTempHms.textContent = "00:00:00";
    btnTempStart.addEventListener("click", timerStart);
    btnTempStop.addEventListener("click", timerToggle);
    btnTempReset.addEventListener("click", timerReset);
}

function timerStart() {
    temp.h = parseInt(inputH.value) || 0;
    temp.m = parseInt(inputM.value) || 0;
    temp.s = parseInt(inputS.value) || 0;

    if (temp.h < 0 || temp.m < 0 || temp.s < 0) {
        alert("No se permiten valores negativos");
        return;
    }
    // Validacion de mas. Arriba si no se convierte a numero se lo cambia a 0 por defecto.
    // el "===" compara el valor y tipo. Se valida que se ingreso un numero y si es igual a cero.
    if (temp.h === 0 && temp.m === 0 && temp.s === 0) {
        alert("Ingresá un tiempo mayor a 0");
        return;
    }

    escribirTimer();
    temp.interval = setInterval(tick, 1000);
    tempCorriendo = true;

    btnTempStart.classList.add("oculto");
    btnTempStop.classList.remove("oculto");
    btnTempStop.textContent = "Stop";
    btnTempReset.classList.remove("oculto");
}

function tick() {
    if (temp.s > 0) {
        temp.s--;
    } else if (temp.m > 0) {
        temp.m--;
        temp.s = 59;
    } else if (temp.h > 0) {
        temp.h--;
        temp.m = 59;
        temp.s = 59;
    } else {
        clearInterval(temp.interval);
        tempCorriendo = false;
        alert("Timer finalizado");
        timerReset();
        return;
    }
    escribirTimer();
}

function escribirTimer() {
    const pad = (n) => n.toString().padStart(2, "0");
    elemTempHms.textContent = `${pad(temp.h)}:${pad(temp.m)}:${pad(temp.s)}`;
}

// Un solo botón "Stop/Play" que alterna, en vez de reasignar listeners
function timerToggle() {
    if (tempCorriendo) {
        clearInterval(temp.interval);
        tempCorriendo = false;
        btnTempStop.textContent = "Play";
    } else {
        temp.interval = setInterval(tick, 1000);
        tempCorriendo = true;
        btnTempStop.textContent = "Stop";
    }
}

function timerReset() {
    clearInterval(temp.interval);
    tempCorriendo = false;
    temp.h = 0;
    temp.m = 0;
    temp.s = 0;

    elemTempHms.textContent = "00:00:00";
    inputH.value = 0;
    inputM.value = 0;
    inputS.value = 0;

    btnTempStart.classList.remove("oculto");
    btnTempStop.classList.add("oculto");
    btnTempReset.classList.add("oculto");
}

const root = document.documentElement;
const themeToggle = document.querySelector(".theme_toggle");

function aplicarTema(tema) {
    root.setAttribute("data-theme", tema);
    themeToggle.textContent = tema === "dark" ? "☀️" : "🌙";
    localStorage.setItem("tema", tema);
}

const temaGuardado = localStorage.getItem("tema") || "light";
aplicarTema(temaGuardado);

themeToggle.addEventListener("click", () => {
    const temaActual = root.getAttribute("data-theme");
    aplicarTema(temaActual === "dark" ? "light" : "dark");
});