// =======================================
// LA VIDA DE GONZALO
// SCRIPT.JS - PARTE 1
// =======================================

// ---------- VARIABLES ----------

let jugador = {

    nombre:"Gonzalo",

    edad:20,

    ovr:60,

    dinero:100,

    salud:100,

    amor:20,

    amigos:50,

    prestigio:40,


    // ESTADÍSTICAS OCULTAS

    academia:50,

    fama:10,

    dignidad:70,

    ideologia:50,

    alcohol:20,

    suerte:50

};

let eventoActual = 0;
let jugando = false;
let logros = [];
let historial = [];

// ---------- EVENTOS ----------

const eventos = [

{
titulo:"La Capital",

texto:"Tu jefe te pide escribir un artículo desprestigiando a Newell's.",

opciones:[

{
texto:"Escribirlo",

resultado(){

jugador.ovr+=5;
jugador.prestigio+=8;
jugador.amigos-=10;

return "El jefe quedó encantado. Felipe está indignado.";

}

},

{
texto:"Negarte",

resultado(){

if(Math.random()<0.40){

gameOver("Te despidieron de La Capital.");

return;

}

jugador.amigos+=10;

return "Has mantenido tus principios.";

}

}

]

},

{

titulo:"Instagram",

texto:"Victoria Lomello te invita a dormir a su casa.",

opciones:[

{

texto:"Aceptar",

resultado(){

jugador.ovr+=3;
jugador.amor+=10;

desbloquear("Sediento");

return "Actuación de 5 puntos. Está conforme y vas a tener que aguantarla.";

}

},

{

texto:"Quedarte viendo Instagram",

resultado(){

jugador.amor-=5;

return "Te quedaste mirando historias de Clari Cremaschi.";

}

}

]

},

{

titulo:"Asma",

texto:"Tus padres te piden sacar hielo del freezer.",

opciones:[

{

texto:"Aceptar",

resultado(){

if(Math.random()<0.50){

gameOver("Tus pulmones no resistieron y falleciste en el acto.");

return;

}

jugador.ovr+=2;

return "Sorprendentemente sobreviviste.";

}

},

{

texto:"Negarte",

resultado(){

jugador.amigos-=5;

return "Tus padres están decepcionados.";

}

}

]

},

{

titulo:"Viernes",

texto:"Has cobrado el sueldo y tus amigos quieren salir.",

opciones:[

{

texto:"Invitar",

resultado(){

jugador.dinero-=50;
jugador.amigos+=20;

return "Ahora eres el héroe del grupo.";

}

},

{

texto:"No gastar",

resultado(){

jugador.amigos-=15;

return "Guido Eduardo Piazza te llamó rata hasta en arameo.";

}

}

]

},

{

titulo:"Peugeot 208",

texto:"Has bebido demasiado. Una chica necesita volver a casa.",

opciones:[

{

texto:"Llevarla",

resultado(){

if(Math.random()<0.45){

gameOver("Chocaste el Peugeot.");

return;

}

jugador.ovr+=4;

desbloquear("Caballero");

return "Todo salió bien.";

}

},

{

texto:"Pedir Uber",

resultado(){

jugador.amor-=5;

desbloquear("Conductor responsable");

return "Fue la decisión inteligente.";

}

}

]

},

{

titulo:"Instagram",

texto:"Paulina Devigili ha subido una historia.",

opciones:[

{

texto:"Responder",

resultado(){

let r=Math.random();

if(r<0.15){

jugador.amor+=30;

desbloquear("Milagro");

return "¡Te respondió!";

}

if(r<0.80){

return "Te dejó en visto.";

}

jugador.amor-=10;

return "Te bloqueó.";

}

},

{

texto:"No responder",

resultado(){

jugador.ovr++;

return "Las calles dicen que sos un cagón.";

}

}

]

}

];

// ---------- INICIO ----------

document.getElementById("start").onclick=function(){

document.getElementById("menu").style.display="none";

document.getElementById("game").style.display="block";

jugando=true;

actualizarHUD();

mostrarEvento();

};

// ---------- HUD ----------

function actualizarHUD(){

document.getElementById("ovr").textContent=jugador.ovr;

document.getElementById("edad").textContent=jugador.edad;

document.getElementById("dinero").textContent=jugador.dinero;

document.getElementById("amor").textContent=jugador.amor;

document.getElementById("amigos").textContent=jugador.amigos;

document.getElementById("salud").textContent=jugador.salud;

let porcentaje=((jugador.edad-20)/15)*100;

if(porcentaje<0) porcentaje=0;

if(porcentaje>100) porcentaje=100;

document.getElementById("barraEdad").style.width=porcentaje+"%";

}

function mostrarEvento(){

    if(eventoActual>=eventos.length){
        finalBueno();
        return;
    }

    let evento=eventos[eventoActual];

    document.getElementById("tituloEvento").innerHTML=evento.titulo;
    document.getElementById("textoEvento").innerHTML=evento.texto;
    document.getElementById("mensaje").innerHTML="";

    document.getElementById("op1").innerHTML=evento.opciones[0].texto;
    document.getElementById("op2").innerHTML=evento.opciones[1].texto;

    document.getElementById("op1").onclick=function(){

        let r=evento.opciones[0].resultado();

        if(r){

            document.getElementById("mensaje").innerHTML=r;

            historial.push(r);

            siguienteEvento();

        }

    }

    document.getElementById("op2").onclick=function(){

        let r=evento.opciones[1].resultado();

        if(r){

            document.getElementById("mensaje").innerHTML=r;

            historial.push(r);

            siguienteEvento();

        }

    }

}

// ---------- PASAR AL SIGUIENTE EVENTO ----------

function siguienteEvento(){

    actualizarHUD();

    document.getElementById("op1").disabled=true;
    document.getElementById("op2").disabled=true;

    setTimeout(function(){

        jugador.edad++;

        actualizarHUD();

        eventoActual++;

        document.getElementById("edadGrande").innerHTML=
        "AÑO "+(2026);

        document.getElementById("op1").disabled=false;
        document.getElementById("op2").disabled=false;

        mostrarEvento();

    },1800);

}

// ---------- LOGROS ----------

function desbloquear(nombre){

    if(logros.includes(nombre)) return;

    logros.push(nombre);

    let caja=document.getElementById("logro");

    caja.innerHTML=
    "🏆 Logro desbloqueado<br><br>"+nombre;

    caja.style.right="20px";

    setTimeout(function(){

        caja.style.right="-420px";

    },3000);

}

// ---------- GAME OVER ----------

function gameOver(causa){

    jugando=false;

    document.getElementById("gameover").style.display="flex";

    document.getElementById("causaMuerte").innerHTML=

    causa+

    "<br><br>"

    +"Edad: "+jugador.edad+

    "<br>"

    +"OVR: "+jugador.ovr+

    "<br>"

    +"Dinero: $"+jugador.dinero+

    "<br>"

    +"Amigos: "+jugador.amigos;

}

// ---------- FINAL FELIZ ----------

function finalBueno(){

    document.getElementById("tituloEvento").innerHTML=
    "FIN DE LA PARTIDA";

    document.getElementById("textoEvento").innerHTML=
    "Has sobrevivido a la vida de Gonzalo.";

    document.getElementById("op1").style.display="none";
    document.getElementById("op2").style.display="none";

    let texto="";

    if(jugador.ovr>=80){

        texto+="<h2>🌟 Leyenda absoluta</h2>";

    }

    else if(jugador.ovr>=70){

        texto+="<h2>⭐ Muy buena carrera</h2>";

    }

    else{

        texto+="<h2>😐 Carrera bastante normalita</h2>";

    }

    texto+="<br>";

    texto+="OVR FINAL: <b>"+jugador.ovr+"</b><br>";
    texto+="Edad: <b>"+jugador.edad+"</b><br>";
    texto+="Dinero: <b>$"+jugador.dinero+"</b><br>";
    texto+="Salud: <b>"+jugador.salud+"</b><br>";
    texto+="Amigos: <b>"+jugador.amigos+"</b><br>";
    texto+="Amor: <b>"+jugador.amor+"</b><br>";
    texto+="Prestigio: <b>"+jugador.prestigio+"</b><br>";

    texto+="<br><h3>🏆 Logros</h3>";

    if(logros.length===0){

        texto+="Ninguno";

    }

    else{

        texto+="<ul>";

        for(let l of logros){

            texto+="<li>"+l+"</li>";

        }

        texto+="</ul>";

    }

    document.getElementById("mensaje").innerHTML=texto;

}

// ---------- EFECTO OVR ----------

setInterval(function(){

    let carta=document.getElementById("ovr");

    carta.style.transform="scale(1.08)";

    setTimeout(function(){

        carta.style.transform="scale(1)";

    },180);

},3000);

// ---------- INICIO ----------

actualizarHUD();
// =======================================
// SCRIPT.JS - PARTE 3
// EVENTOS EXTRA + TITULARES + FINALES
// =======================================


// ---------- TITULARES DE PRENSA ----------

const titulares = [

{
texto:"📰 LA CAPITAL: Gonzalo toma una decisión polémica que divide a Rosario."
},

{
texto:"📰 OLÉ: Nuevo talento aparece en la noche rosarina."
},

{
texto:"📰 INFOSPORT: Las decisiones de Gonzalo empiezan a cambiar su carrera."
},

{
texto:"📰 ROSARIO3: Amigos y enemigos reaccionan a su última jugada."
},

{
texto:"📰 EL CIUDADANO: Gonzalo vuelve a ser noticia."
}

];


function mostrarTitular(){

    let noticia =
    titulares[Math.floor(Math.random()*titulares.length)];

    document.getElementById("mensaje").innerHTML +=
    "<br><br>"+noticia.texto;

}



// ---------- EVENTOS SECRETOS ----------

const eventosSecretos=[


{

probabilidad:0.15,

titulo:"Newell's",

texto:"Newell's consigue una victoria histórica y toda la ciudad habla de ello.",

accion(){

jugador.amigos+=10;
jugador.prestigio+=5;

return "No te dejaste amendrentar por el sinaliento.";

}

},


{

probabilidad:0.10,

titulo:"Periodismo",

texto:"Te ofrecen una exclusiva que podría cambiar tu carrera.",

accion(){

jugador.dinero+=100;
jugador.ovr+=5;

desbloquear("Periodista de élite");

return "La exclusiva fue un éxito.";

}

},


{

probabilidad:0.08,

titulo:"Noche complicada",

texto:"Una salida con amigos termina peor de lo esperado.",

accion(){

jugador.salud-=20;
jugador.dinero-=30;

return "La noche salió cara.";

}

},


{

probabilidad:0.05,

titulo:"Momento histórico",

texto:"Un vídeo tuyo se vuelve viral.",

accion(){

jugador.prestigio+=25;
jugador.ovr+=10;

desbloquear("Famoso accidental");

return "Ahora todo Rosario te conoce.";

}

}

// ================================
// EVENTOS EXTRA GONZALO
// ================================


{

titulo:"TRASPASO A BUENOS AIRES",

texto:"Llega una oportunidad de irte a la UCA de Buenos Aires. Es un salto importante, pero significa alejarte de Rosario y empezar de cero.",

opciones:[

{

texto:"Aceptar el traspaso",

resultado(){

jugador.prestigio+=10;
jugador.amigos-=20;
jugador.ovr+=3;

desbloquear("Aventura porteña");

return "Te fuiste 6 meses a Buenos Aires. El grupo nuevo no terminó de aceptarte y volviste a Rosario por burro.";

}

},

{

texto:"Rechazar",

resultado(){

jugador.amigos+=15;

return "Te quedaste en Rosario. La gente valoró tu decisión.";

}

}

]

},



{

titulo:"CITA POLÍTICA",

texto:"Una muchacha peronista de dudosa procedencia te invita a una cita. Puede cambiar tu vida... o tus ideales.",

opciones:[

{

texto:"Aceptar y entrar al movimiento popular",

resultado(){

jugador.amor+=15;
jugador.prestigio-=5;

desbloquear("Militante inesperado");

return "La cita salió bien. Ahora tenés reuniones políticas que no entendés.";

}

},

{

texto:"Mantener tus ideales",

resultado(){

jugador.ovr+=2;

return "Elegiste mantener tus convicciones.";

}

}

]

},



{

titulo:"NOCHE DE FIESTA",

texto:"En plena noche de fiesta alguien te ofrece un vaper de marihuana.",

opciones:[

{

texto:"Aceptar",

resultado(){

if(Math.random()<0.4){

gameOver("El vaper salió demasiado fuerte.");

return;

}

jugador.amigos+=10;
jugador.salud-=10;

return "La noche fue un éxito, aunque al día siguiente no eras persona.";

}

},

{

texto:"Rechazar",

resultado(){

jugador.salud+=5;

desbloquear("Cabeza fría");

return "Mantuviste la calma y sobreviviste otra noche.";

}

}

]

},



{

titulo:"MIGRACIONES USA",

texto:"Llegás al aeropuerto de Miami. Migraciones revisa tus datos y estás muy nervioso.",

opciones:[

{

texto:"Respirar tranquilo y responder lo preparado",

resultado(){

jugador.ovr+=5;
jugador.prestigio+=5;

desbloquear("Welcome to America");

return "El agente te deja pasar. Disfrutás Estados Unidos.";

}

},

{

texto:"Decir absolutamente toda la verdad",

resultado(){

jugador.dinero-=100;

return "Te deportan instantáneamente. Estados Unidos no estaba preparado para tanta sinceridad.";

}

}

]

},



{

titulo:"PICADO CON AMIGOS",

texto:"Tenés un picado y querés romperla. Sabés que el paf puede darte una ventaja.",

opciones:[

{

texto:"Tomar el paf",

resultado(){

jugador.ovr+=5;

if(Math.random()<0.35){

jugador.amigos-=15;

return "Te descubrieron. Tus compañeros todavía se ríen.";

}

return "Jugaste como si fueras Messi.";

}

},

{

texto:"Jugar limpio",

resultado(){

jugador.ovr+=1;
jugador.amigos+=5;

return "Rendimiento correcto. Nadie sospechó nada.";

}

}

]

},



{

titulo:"EL CABEZAZO",

texto:"Minuto 90. Te queda la pelota abajo del arco. Tenés que elegir dónde cabecear.",

opciones:[

{

texto:"Cabecear al palo izquierdo",

resultado(){

let resultado=Math.random();

if(resultado<0.33){

jugador.ovr+=5;

return "¡GOOOOOOL! Definición perfecta.";

}

return "El arquero adivinó el lado.";

}

},

{

texto:"Cabecear al palo derecho",

resultado(){

let resultado=Math.random();

if(resultado<0.33){

jugador.ovr+=5;

return "Golazo. La gente te ovaciona.";

}

return "El arquero voló y te la sacó.";

}

}

]

},

];



// ---------- COMPROBAR EVENTOS SECRETOS ----------


function comprobarSecretos(){

    let numero=Math.random();

    for(let evento of eventosSecretos){

        if(numero < evento.probabilidad){

            document.getElementById("tituloEvento")
            .innerHTML=evento.titulo;


            document.getElementById("textoEvento")
            .innerHTML=evento.texto;


            document.getElementById("op1")
            .innerHTML="Aceptar";


            document.getElementById("op2")
            .innerHTML="Ignorar";


            document.getElementById("op1").onclick=function(){

                let resultado=evento.accion();

                document.getElementById("mensaje")
                .innerHTML=resultado;

                actualizarHUD();

                setTimeout(mostrarEvento,1800);

            };


            document.getElementById("op2").onclick=function(){

                document.getElementById("mensaje")
                .innerHTML="Decidiste ignorarlo.";

                setTimeout(mostrarEvento,1800);

            };


            return true;

        }

    }


    return false;

}



// ---------- MODIFICAR SIGUIENTE EVENTO ----------


// Guardamos la función original

let mostrarEventoOriginal = mostrarEvento;


// Sustituimos por una versión mejorada

mostrarEvento=function(){


    if(comprobarSecretos()){

        return;

    }


    mostrarEventoOriginal();


};



// ---------- CONTROL DE ESTADÍSTICAS ----------


function limitarStats(){

    if(jugador.ovr>99)
        jugador.ovr=99;


    if(jugador.ovr<1)
        jugador.ovr=1;


    if(jugador.salud>100)
        jugador.salud=100;


    if(jugador.salud<0)
        jugador.salud=0;


    if(jugador.amor>100)
        jugador.amor=100;


    if(jugador.amor<0)
        jugador.amor=0;


    if(jugador.amigos>100)
        jugador.amigos=100;


    if(jugador.amigos<0)
        jugador.amigos=0;

}



// Ejecutar límites antes de actualizar

let actualizarHUDOriginal=actualizarHUD;


actualizarHUD=function(){

    limitarStats();

    actualizarHUDOriginal();

};



// ---------- FINALES ESPECIALES ----------


function comprobarFinalEspecial(){


    if(jugador.amor>=80){

        return "💍 FINAL: Gonzalo encontró el amor verdadero.";

    }


    if(jugador.ovr>=90){

        return "🏆 FINAL: Gonzalo se convirtió en una leyenda.";

    }


    if(jugador.dinero<=0){

        return "💸 FINAL: Gonzalo terminó completamente arruinado.";

    }


    if(jugador.amigos<=10){

        return "😔 FINAL: Gonzalo acabó completamente solo.";

    }


    if(jugador.salud<=20){

        return "🏥 FINAL: La salud pasó factura.";

    }


    return "⚽ FINAL: Una vida normal, pero llena de historias.";

}



// ---------- MEJORAR FINAL ----------


let finalBuenoOriginal=finalBueno;


finalBueno=function(){


    finalBuenoOriginal();


    document.getElementById("mensaje").innerHTML +=

    "<br><br><h2>"+

    comprobarFinalEspecial()

    +"</h2>";


};



// ---------- EFECTO AL CAMBIAR OVR ----------


function animarOVR(){

    let elemento=document.getElementById("ovr");

    elemento.style.color="#ffd700";

    setTimeout(()=>{

        elemento.style.color="#18b6ff";

    },500);

}


// Detectar cambios de OVR

let ovrAnterior=jugador.ovr;


setInterval(()=>{


    if(jugador.ovr!==ovrAnterior){

        animarOVR();

        ovrAnterior=jugador.ovr;

    }


},500);
// =======================================
// SCRIPT.JS - PARTE 4
// LOGROS AVANZADOS + PERIÓDICO FINAL
// =======================================


// ---------- LOGROS EXTRA ----------

const logrosDisponibles = [

{
nombre:"Virgen por elección",
condicion:()=> jugador.amor < 15
},

{
nombre:"Rey del boliche",
condicion:()=> jugador.amigos >= 90
},

{
nombre:"Periodista del año",
condicion:()=> jugador.prestigio >= 90
},

{
nombre:"Millonario rosarino",
condicion:()=> jugador.dinero >= 500
},

{
nombre:"El amigo rata",
condicion:()=> jugador.amigos < 25
},

{
nombre:"Superviviente",
condicion:()=> jugador.edad >= 25
},

{
nombre:"OVR 90",
condicion:()=> jugador.ovr >= 90
},

{
nombre:"Vida equilibrada",
condicion:()=> 
jugador.salud >=70 &&
jugador.amigos>=70 &&
jugador.amor>=70
}

];



function revisarLogros(){

    for(let logro of logrosDisponibles){

        if(
            logro.condicion() &&
            !logros.includes(logro.nombre)
        ){

            desbloquear(logro.nombre);

        }

    }

}



// Revisar logros cada vez que cambia algo

let actualizarHUDViejo=actualizarHUD;


actualizarHUD=function(){

    revisarLogros();

    actualizarHUDViejo();

};




// ---------- PERIÓDICO FINAL ----------


function generarTitularFinal(){

    let titularesFinales=[

        "Gonzalo termina una carrera llena de polémicas y éxitos.",

        "El joven rosarino que nunca tomó una decisión normal.",

        "La Capital analiza la trayectoria de una figura inesperada.",

        "Amigos, romances y decisiones cuestionables: la historia de Gonzalo.",

        "De desconocido a protagonista absoluto."

    ];


    return titularesFinales[
        Math.floor(Math.random()*titularesFinales.length)
    ];

}





function generarValoracion(){

    let puntos=0;


    puntos += jugador.ovr;

    puntos += jugador.amigos;

    puntos += jugador.amor;

    puntos += jugador.prestigio;


    puntos -= (100-jugador.salud);



    if(puntos>=300){

        return "LEYENDA";

    }


    if(puntos>=220){

        return "ÍDOLO LOCAL";

    }


    if(puntos>=150){

        return "BUENA CARRERA";

    }


    return "CARRERA IRREGULAR";

}





// ---------- FINAL TIPO FIFA ----------


function crearPantallaFinal(){


    document.getElementById("tituloEvento").innerHTML=
    "🏁 FIN DE CARRERA";


    document.getElementById("textoEvento").innerHTML=

    `

    <h2>${generarTitularFinal()}</h2>

    <br>

    <h3>
    Valoración:
    ${generarValoracion()}
    </h3>

    <br>

    📅 Edad alcanzada:
    ${jugador.edad}

    <br><br>

    ⭐ OVR:
    ${jugador.ovr}

    <br><br>

    💰 Dinero:
    ${jugador.dinero}

    <br><br>

    ❤️ Amor:
    ${jugador.amor}

    <br><br>

    👬 Amigos:
    ${jugador.amigos}

    <br><br>

    📰 Prestigio:
    ${jugador.prestigio}

    <br><br>

    🏆 Logros conseguidos:
    <br>

    ${logros.length===0 
    ?"Ninguno"
    :logros.join("<br>")}

    `;


    document.getElementById("op1").style.display="none";
    document.getElementById("op2").style.display="none";


}



// Reemplazar final anterior

let finalAnterior=finalBueno;


finalBueno=function(){

    finalAnterior();

    setTimeout(()=>{

        crearPantallaFinal();

    },500);

};




// ---------- EFECTOS DE DECISIÓN ----------


function mostrarCambio(texto){

    let mensaje=
    document.getElementById("mensaje");


    mensaje.innerHTML=

    "⚡ "+texto;


    mensaje.style.transform="scale(1.1)";


    setTimeout(()=>{

        mensaje.style.transform="scale(1)";

    },300);

}




// ---------- GUARDADO AUTOMÁTICO ----------


function guardarPartida(){

    localStorage.setItem(
        "vidaGonzalo",
        JSON.stringify({
            jugador,
            eventoActual,
            logros
        })
    );

}



setInterval(()=>{

    if(jugando){

        guardarPartida();

    }

},5000);




// ---------- CARGAR PARTIDA ----------


function cargarPartida(){

    let guardado=
    localStorage.getItem("vidaGonzalo");


    if(!guardado)
        return false;


    let datos=JSON.parse(guardado);


    jugador=datos.jugador;

    eventoActual=datos.eventoActual;

    logros=datos.logros;


    actualizarHUD();

    mostrarEvento();


    return true;

}