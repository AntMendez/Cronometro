window.onload = init;

function init(){
    document.getElementById("hms").innerHTML="00:00:00";
    document.getElementById("ms").innerHTML=".00"
    h = 0; // var globales
    m = 0;
    s = 0;
    ms = 0;
    document.querySelector(".start").addEventListener("click",cronometrar);
    document.querySelector(".stop").addEventListener("click",parar);
    document.querySelector(".reset").addEventListener("click",reiniciar);
}   


function cronometrar(){
    escribir(); // llamado para evitar primer delay inicial de 10ms
    start_interval=setInterval(escribir,10); // var global
    // en lugar de remover -> ocultar boton hasta pausar o reiniciar !!!
    document.querySelector(".start").removeEventListener("click",cronometrar);
}

function escribir(){
    ms++;
    if (ms>99){s++;ms=0}
    if (s>59){m++;s=0}
    if (m>59){h++;s=0}
    if (h>24){alert('Pasaron mas de 24hs'),reiniciar()}

    var sAux, mAux, hAux, msAux // var locales
    if (ms<10){msAux="0"+ms}else{msAux=ms} // usar .toString().padStart(2,"0")
    if (s<10){sAux='0'+s;}else{sAux=s}
    if (m<10){mAux='0'+m;}else{mAux=m}
    if (h<10){hAux='0'+h;}else{hAux=h}
    document.getElementById('hms').innerHTML= hAux + ':' + mAux + ':' + sAux;
    document.getElementById("ms").innerHTML= "." + msAux;
}

function parar(){
    clearInterval(start_interval)
    document.querySelector(".start").addEventListener("click",cronometrar);

}

function reiniciar(){
    clearInterval(start_interval)
    document.getElementById("hms").innerHTML="00:00:00";
    document.getElementById("ms").innerHTML=".00";
    document.querySelector(".start").addEventListener("click",cronometrar);
    h = 0;
    m = 0;
    s = 0;
    ms = 0;
}