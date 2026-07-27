// ======================================
// LA VIDA DE GONZALO
// SCRIPT.JS
// PARTE 1
// ======================================

const jugador = {
    nombre: "Gonzalo",
    edad: 20,
    ovr: 60,
    dinero: 100,
    salud: 100,
    amigos: 50,
    amor: 20,
    prestigio: 40,

    // estadísticas ocultas
    fama: 10,
    dignidad: 80,
    alcohol: 0,
    ideologia: 50,
    suerte: 50,
    academia: 50
};

let indice = 0;
let logros = [];
let historial = [];

const eventos = [];
// ======================================
// FUNCIONES GENERALES
// ======================================

function actualizarHUD(){

    document.getElementById("ovr").textContent=jugador.ovr;
    document.getElementById("dinero").textContent=jugador.dinero;
    document.getElementById("salud").textContent=jugador.salud;
    document.getElementById("amigos").textContent=jugador.amigos;
    document.getElementById("amor").textContent=jugador.amor;

}

function limitarStats(){

    jugador.ovr=Math.max(1,Math.min(99,jugador.ovr));
    jugador.dinero=Math.max(0,jugador.dinero);
    jugador.salud=Math.max(0,Math.min(100,jugador.salud));
    jugador.amigos=Math.max(0,Math.min(100,jugador.amigos));
    jugador.amor=Math.max(0,Math.min(100,jugador.amor));
    jugador.prestigio=Math.max(0,Math.min(100,jugador.prestigio));

    jugador.fama=Math.max(0,Math.min(100,jugador.fama));
    jugador.dignidad=Math.max(0,Math.min(100,jugador.dignidad));
    jugador.alcohol=Math.max(0,Math.min(100,jugador.alcohol));
    jugador.ideologia=Math.max(0,Math.min(100,jugador.ideologia));
    jugador.suerte=Math.max(0,Math.min(100,jugador.suerte));
    jugador.academia=Math.max(0,Math.min(100,jugador.academia));

}

function modificar(stat,cantidad){

    jugador[stat]+=cantidad;

    limitarStats();

    actualizarHUD();

}

function desbloquear(nombre){

    if(logros.includes(nombre)) return;

    logros.push(nombre);

    let aviso=document.getElementById("resultado");

    aviso.innerHTML=
    "🏆 Logro desbloqueado: <b>"+nombre+"</b>";

}

function gameOver(texto){

    document.getElementById("event").innerHTML=
    "<h2>💀 GAME OVER</h2><br>"+texto;

    document.getElementById("op1").style.display="none";
    document.getElementById("op2").style.display="none";

    document.getElementById("resultado").innerHTML=

    "<br><b>OVR:</b> "+jugador.ovr+
    "<br><b>Dinero:</b> "+jugador.dinero+
    "<br><b>Amigos:</b> "+jugador.amigos+
    "<br><b>Amor:</b> "+jugador.amor+
    "<br><b>Prestigio:</b> "+jugador.prestigio;

}

function finalPartida(){

    document.getElementById("event").innerHTML=
    "<h2>🏁 FIN DE LA CARRERA</h2>";

    document.getElementById("op1").style.display="none";
    document.getElementById("op2").style.display="none";

    let nota="Carrera normal";

    if(jugador.ovr>=90)
        nota="⭐ LEYENDA";

    else if(jugador.ovr>=80)
        nota="⭐ ÍDOLO";

    else if(jugador.ovr>=70)
        nota="⭐ MUY BUENA";

    document.getElementById("resultado").innerHTML=

    "<h3>"+nota+"</h3>"+

    "<br>OVR: "+jugador.ovr+
    "<br>Edad: "+jugador.edad+
    "<br>Dinero: "+jugador.dinero+
    "<br>Amigos: "+jugador.amigos+
    "<br>Amor: "+jugador.amor+
    "<br>Prestigio: "+jugador.prestigio+

    "<br><br>🏆 Logros: "+logros.length;

}
// ======================================
// MOTOR DE EVENTOS
// ======================================

function mostrarEvento(){

    if(indice>=eventos.length){

        finalPartida();
        return;

    }

    let evento=eventos[indice];

    document.getElementById("event").innerHTML=

    "<h2>"+evento.titulo+"</h2><br>"+evento.texto;

    document.getElementById("op1").style.display="block";
    document.getElementById("op2").style.display="block";

    document.getElementById("op1").innerHTML=

    evento.opciones[0].texto;

    document.getElementById("op2").innerHTML=

    evento.opciones[1].texto;

    document.getElementById("resultado").innerHTML=

    "Decisión "+(indice+1)+" de "+eventos.length;

    document.getElementById("op1").onclick=function(){

        ejecutarOpcion(0);

    };

    document.getElementById("op2").onclick=function(){

        ejecutarOpcion(1);

    };

}



function ejecutarOpcion(numero){

    let evento=eventos[indice];

    let opcion=evento.opciones[numero];

    let texto=opcion.accion();

    if(texto!==undefined){

        historial.push(texto);

        document.getElementById("resultado").innerHTML=

        texto;

    }

    indice++;

    if(indice%3===0){

        jugador.edad++;

    }

    actualizarHUD();

    setTimeout(function(){

        mostrarEvento();

    },1800);

}



function agregarEvento(

titulo,

texto,

opcion1,

accion1,

opcion2,

accion2

){

    eventos.push({

        titulo:titulo,

        texto:texto,

        opciones:[

            {

                texto:opcion1,

                accion:accion1

            },

            {

                texto:opcion2,

                accion:accion2

            }

        ]

    });

}



// ======================================
// EVENTO 1
// ======================================

agregarEvento(

"LA CAPITAL",

"Tu jefe te pide escribir un artículo desprestigiando a Newell's.",

"Escribirlo",

function(){

    modificar("ovr",5);

    modificar("prestigio",10);

    modificar("amigos",-15);

    return "El jefe quedó encantado. Felipe no quiere volver a hablarte.";

},

"Negarte",

function(){

    if(Math.random()<0.40){

        gameOver("Te echaron de La Capital.");

        return;

    }

    modificar("amigos",10);

    modificar("dignidad",5);

    return "Conservaste tus principios.";

}

);



// ======================================
// EVENTO 2
// ======================================

agregarEvento(

"INSTAGRAM",

"Victoria Lomello te invita a dormir a su casa.",

"Aceptar",

function(){

    modificar("amor",10);

    modificar("ovr",3);

    return "Tu rendimiento fue aceptable.";

},

"Rechazar",

function(){

    modificar("amor",-5);

    modificar("dignidad",5);

    return "Te quedaste viendo el Instagram de Clari.";

}

);



// ======================================
// INICIAR
// ======================================

actualizarHUD();

mostrarEvento();
// ======================================
// EVENTOS EXTRA (4-20)
// Pega esto DEBAJO de los dos primeros
// ======================================


// EVENTO 3

agregarEvento(

"FREEZER",

"Tus padres te piden sacar hielo del freezer pese a tu asma.",

"Aceptar",

function(){

    if(Math.random()<0.50){

        gameOver("Moriste congelado buscando hielo.");

        return;

    }

    modificar("ovr",2);

    return "Sobreviviste al frío.";

},

"Negarte",

function(){

    modificar("amigos",-5);

    return "Tus padres se enfadaron contigo.";

}

);


// EVENTO 4

agregarEvento(

"BOLICHE",

"Cobraste el sueldo. Tus amigos quieren salir.",

"Invitar los tragos",

function(){

    modificar("dinero",-50);

    modificar("amigos",20);

    return "Ahora eres el héroe del grupo.";

},

"Ahorrar",

function(){

    modificar("amigos",-15);

    return "Guido Piazza te llamó rata.";

}

);


// EVENTO 5

agregarEvento(

"PEUGEOT 208",

"Has bebido demasiado y una chica necesita volver a casa.",

"Llevarla",

function(){

    if(Math.random()<0.45){

        gameOver("Chocaste el Peugeot 208.");

        return;

    }

    modificar("ovr",4);

    return "Todo salió perfecto.";

},

"Pedir Uber",

function(){

    modificar("amor",-5);

    modificar("dignidad",5);

    return "Fue la decisión más responsable.";

}

);


// EVENTO 6

agregarEvento(

"PAULINA",

"Paulina Devigili subió una historia.",

"Responder",

function(){

    let r=Math.random();

    if(r<0.15){

        modificar("amor",30);

        desbloquear("Milagro");

        return "¡Te respondió!";

    }

    if(r<0.80){

        return "Te dejó en visto.";

    }

    modificar("amor",-10);

    return "Te bloqueó.";

},

"No responder",

function(){

    modificar("dignidad",5);

    return "Las calles dicen que fuiste un cagón.";

}

);


// EVENTO 7

agregarEvento(

"TRASPASO",

"La UCA de Buenos Aires quiere ficharte.",

"Aceptar",

function(){

    modificar("academia",25);

    modificar("amigos",-20);

    modificar("ovr",3);

    return "Duraste seis meses y volviste a Rosario cedido por burro.";

},

"Quedarte",

function(){

    modificar("amigos",15);

    modificar("dignidad",5);

    return "Rosario celebra tu permanencia.";

}

);


// EVENTO 8

agregarEvento(

"CITA PERONISTA",

"Una muchacha peronista de dudosa procedencia te invita a salir.",

"Aceptar",

function(){

    modificar("amor",15);

    modificar("ideologia",20);

    modificar("dignidad",-10);

    return "Ahora cantás la marcha sin saber por qué.";

},

"Rechazar",

function(){

    modificar("dignidad",5);

    return "Te mantuviste fiel a tus ideales.";

}

);


// EVENTO 9

agregarEvento(

"VAPER",

"Te ofrecen un vaper de marihuana.",

"Aceptar",

function(){

    modificar("alcohol",10);

    modificar("salud",-10);

    modificar("amigos",10);

    return "La noche se puso interesante.";

},

"Rechazar",

function(){

    modificar("salud",5);

    modificar("dignidad",5);

    return "Preferiste seguir sobrio.";

}

);


// EVENTO 10

agregarEvento(

"MIAMI",

"Migraciones de Estados Unidos revisa tus datos.",

"Responder lo preparado",

function(){

    modificar("prestigio",5);

    modificar("suerte",5);

    return "Bienvenido a Miami.";

},

"Contar toda la verdad",

function(){

    modificar("dinero",-100);

    return "Te deportaron antes de salir del aeropuerto.";

}

);


// EVENTO 11

agregarEvento(

"PAF",

"Tenés un picado y querés romperla.",

"Tomar el paf",

function(){

    modificar("ovr",5);

    modificar("dignidad",-20);

    if(Math.random()<0.35){

        modificar("amigos",-15);

        return "Te descubrieron. Vergüenza histórica.";

    }

    return "Parecías Messi.";

},

"Jugar limpio",

function(){

    modificar("ovr",1);

    modificar("amigos",5);

    return "Partido correcto.";

}

);


// EVENTO 12

agregarEvento(

"CABEZAZO",

"Minuto 90. La pelota queda abajo del arco.",

"Cabecear a la izquierda",

function(){

    if(Math.random()<0.33){

        modificar("ovr",5);

        return "¡¡GOOOL!!";

    }

    return "El arquero la atajó.";

},

"Cabecear a la derecha",

function(){

    if(Math.random()<0.33){

        modificar("ovr",5);

        return "¡¡GOOOL!!";

    }

    return "La tiraste afuera.";

}

);


// EVENTO 13

agregarEvento(

"FINAL UCA",

"Hay examen y no estudiaste nada.",

"Chamuyar",

function(){

    if(Math.random()<0.40){

        modificar("academia",10);

        return "Aprobaste de milagro.";

    }

    modificar("academia",-10);

    return "El profesor no compró el humo.";

},

"Estudiar",

function(){

    modificar("academia",15);

    modificar("dignidad",5);

    return "Aprobaste honestamente.";

}

);


// EVENTO 14

agregarEvento(

"ASADO",

"Tus amigos organizan un asado.",

"Llevar carne",

function(){

    modificar("dinero",-30);

    modificar("amigos",15);

    return "Todos te felicitan.";

},

"No llevar nada",

function(){

    modificar("amigos",-20);

    return "Caíste con las manos vacías.";

}

);


// EVENTO 15

agregarEvento(

"NEWELL'S",

"Hay clásico en el Coloso.",

"Ir a la cancha",

function(){

    modificar("felicidad",5);

    modificar("amigos",10);

    return "Viviste un partidazo.";

},

"Verlo por TV",

function(){

    modificar("dinero",10);

    return "Te ahorraste la entrada.";

}

);


// EVENTO 16

agregarEvento(

"GIMNASIO",

"Llevás semanas sin entrenar.",

"Volver",

function(){

    modificar("salud",15);

    modificar("ovr",2);

    return "Retomaste el entrenamiento.";

},

"Seguir durmiendo",

function(){

    modificar("salud",-10);

    return "Cinco minutitos más...";

}

);


// EVENTO 17

agregarEvento(

"VACACIONES",

"Surge un viaje con amigos.",

"Ir",

function(){

    modificar("dinero",-80);

    modificar("amigos",20);

    return "Valió cada peso.";

},

"No ir",

function(){

    modificar("dinero",20);

    return "Te quedaste mirando historias.";

}

);


// EVENTO 18

agregarEvento(

"STREAM",

"Te invitan a un streaming.",

"Aceptar",

function(){

    modificar("fama",15);

    modificar("prestigio",5);

    return "La gente se rió bastante.";

},

"Rechazar",

function(){

    modificar("dignidad",5);

    return "Preferiste no exponerte.";

}

);


// EVENTO 19

agregarEvento(

"ENTREVISTA",

"Te ofrecen una entrevista laboral.",

"Ir elegante",

function(){

    modificar("prestigio",10);

    return "Muy buena impresión.";

},

"Ir en ojotas",

function(){

    modificar("prestigio",-20);

    return "No hubo segunda entrevista.";

}

);


// EVENTO 20

agregarEvento(

"FELIPE",

"Felipe te invita a ver un partido de Newell's.",

"Ir con Felipe",

function(){

    modificar("amigos",15);

    modificar("prestigio",-5);

    return "Gran noche futbolera.";

},

"Quedarte trabajando",

function(){

    modificar("prestigio",10);

    modificar("amigos",-10);

    return "Cobraste horas extra, pero Felipe no lo olvidará.";

}

);
// ======================================
// EVENTOS 21-35
// ======================================


// EVENTO 21

agregarEvento(

"GUARDAESPALDAS",

"Felipe te pide ayuda para mover un mueble de 80 kilos.",

"Ayudar",

function(){

    modificar("amigos",15);
    modificar("salud",-10);

    return "Terminaste destruido pero Felipe quedó agradecido.";

},

"Hacerte el boludo",

function(){

    modificar("amigos",-20);

    return "Felipe jamás olvidará esta traición.";

}

);


// EVENTO 22

agregarEvento(

"WHATSAPP",

"Ves que Paulina está escribiendo...",


"Esperar",

function(){

    if(Math.random()<0.30){

        modificar("amor",15);

        return "Finalmente te contestó.";

    }

    return "Dejó de escribir.";

},

"Mandar otro mensaje",

function(){

    modificar("amor",-5);

    modificar("dignidad",-10);

    return "Quedaste bastante desesperado.";

}

);


// EVENTO 23

agregarEvento(

"EXAMEN ORAL",

"El profesor hace una pregunta que no sabés.",

"Inventar",

function(){

    if(Math.random()<0.35){

        modificar("academia",10);

        return "Sorprendentemente coló.";

    }

    modificar("academia",-10);

    return "El profesor se dio cuenta.";

},

"Reconocer que no sabés",

function(){

    modificar("dignidad",10);

    return "Perdiste puntos, pero fuiste honesto.";

}

);


// EVENTO 24

agregarEvento(

"PEUGEOT",

"Escuchás un ruido raro en el 208.",

"Seguir manejando",

function(){

    if(Math.random()<0.25){

        gameOver("El motor dijo basta en plena ruta.");

        return;

    }

    return "No era nada.";

},

"Llevarlo al mecánico",

function(){

    modificar("dinero",-40);

    return "Era una pavada.";

}

);


// EVENTO 25

agregarEvento(

"TIKTOK",

"Subís un vídeo haciendo el ridículo.",

"Publicarlo",

function(){

    if(Math.random()<0.20){

        modificar("fama",35);

        modificar("prestigio",10);

        desbloquear("Influencer");

        return "Se hizo viral.";

    }

    modificar("dignidad",-10);

    return "Solo lo vieron tus amigos.";

},

"Borrarlo",

function(){

    modificar("dignidad",5);

    return "Mejor no pasar vergüenza.";

}

);


// EVENTO 26

agregarEvento(

"MERCADO",

"Encontrás una billetera llena de dinero.",

"Devolverla",

function(){

    modificar("dignidad",15);

    modificar("prestigio",10);

    return "El dueño te agradeció.";

},

"Quedártela",

function(){

    modificar("dinero",100);

    modificar("dignidad",-30);

    return "Nadie te vio... aparentemente.";

}

);


// EVENTO 27

agregarEvento(

"FÚTBOL 5",

"Te hacen un caño humillante.",

"Romperlo de una patada",

function(){

    modificar("amigos",-10);

    modificar("ovr",-2);

    return "Te sacaron amarilla.";

},

"Aplaudir el caño",

function(){

    modificar("dignidad",10);

    return "Todos respetaron tu deportividad.";

}

);


// EVENTO 28

agregarEvento(

"LA CAPITAL",

"Te ofrecen un aumento a cambio de trabajar los domingos.",

"Aceptar",

function(){

    modificar("dinero",80);

    modificar("amigos",-10);

    return "Ahora ganás más.";

},

"Rechazar",

function(){

    modificar("amigos",10);

    return "Los domingos siguen siendo sagrados.";

}

);


// EVENTO 29

agregarEvento(

"INSTAGRAM",

"Clari subió una foto espectacular.",

"Dar like inmediatamente",

function(){

    modificar("amor",3);

    modificar("dignidad",-3);

    return "Fuiste el primero en darle like.";

},

"Hacerte el interesante",

function(){

    modificar("dignidad",5);

    return "Esperaste dos horas para parecer misterioso.";

}

);


// EVENTO 30

agregarEvento(

"BAR",

"Te invitan a un torneo de pool.",

"Jugar",

function(){

    if(Math.random()<0.50){

        modificar("dinero",40);

        return "Ganaste el torneo.";

    }

    modificar("dinero",-20);

    return "Perdiste hasta las ganas.";

},

"No jugar",

function(){

    modificar("dignidad",2);

    return "Preferiste mirar.";

}

);


// EVENTO 31

agregarEvento(

"MARTU KOMAR",

"Martu te propone hacer una nota juntos.",

"Aceptar",

function(){

    modificar("prestigio",15);

    modificar("amor",5);

    return "Gran trabajo en equipo.";

},

"Rechazar",

function(){

    modificar("prestigio",-10);

    return "Perdiste una buena oportunidad.";

}

);


// EVENTO 32

agregarEvento(

"PENALES",

"Te toca el penal decisivo.",

"Patear fuerte",

function(){

    if(Math.random()<0.45){

        modificar("ovr",6);

        return "¡¡GOL!!";

    }

    return "La tiraste a la tribuna.";

},

"Picarla",

function(){

    if(Math.random()<0.20){

        modificar("ovr",10);

        desbloquear("Loco hermoso");

        return "¡¡A LO PANENKA!!";

    }

    return "Quedaste como un boludo.";

}

);


// EVENTO 33

agregarEvento(

"FERNET",

"Te sirven un vaso demasiado cargado.",

"Tomarlo igual",

function(){

    modificar("alcohol",25);

    modificar("amigos",5);

    return "No recordás cómo terminó la noche.";

},

"Pasar",

function(){

    modificar("salud",5);

    return "Mañana agradecerás esta decisión.";

}

);


// EVENTO 34

agregarEvento(

"VACANTE",

"Te ofrecen un trabajo mejor pagado.",

"Cambiar",

function(){

    modificar("dinero",120);

    modificar("prestigio",10);

    return "Nuevo trabajo, nuevos desafíos.";

},

"Quedarte",

function(){

    modificar("dignidad",5);

    return "Elegiste la estabilidad.";

}

);


// EVENTO 35

agregarEvento(

"FINAL DEL CLÁSICO",

"Tenés la pelota en el minuto 94.",

"Pegarle de primera",

function(){

    if(Math.random()<0.40){

        modificar("ovr",8);

        desbloquear("Héroe leproso");

        return "¡¡GOL AGÓNICO!!";

    }

    return "La mandaste a la popular.";

},

"Pararla",

function(){

    modificar("ovr",-2);

    return "Te la robaron antes de definir.";

}

);
// ======================================
// EVENTOS 36-50
// ======================================


// EVENTO 36

agregarEvento(

"LIGA ROSARINA",

"Te convocan para jugar un torneo importante.",

"Aceptar",

function(){

modificar("ovr",5);
modificar("amigos",10);

return "Terminaste siendo figura del torneo.";

},

"Rechazar",

function(){

modificar("dignidad",-5);

return "Tus amigos todavía no lo entienden.";

}

);


// EVENTO 37

agregarEvento(

"MCDONALD'S",

"Son las 3 de la mañana y todos quieren ir a comer.",

"Ir",

function(){

modificar("dinero",-25);
modificar("amigos",8);

return "Las papas salvaron la noche.";

},

"Irte a dormir",

function(){

modificar("salud",5);

return "Dormiste como un campeón.";

}

);


// EVENTO 38

agregarEvento(

"EX",

"Una ex te vuelve a escribir.",

"Responder",

function(){

if(Math.random()<0.35){

modificar("amor",20);

return "Sorprendentemente salió bien.";

}

modificar("amor",-15);

return "Recordaste por qué era tu ex.";

},

"Bloquear",

function(){

modificar("dignidad",8);

return "Capítulo cerrado.";

}

);


// EVENTO 39

agregarEvento(

"CASINO",

"Tus amigos quieren entrar al casino.",

"Jugar",

function(){

if(Math.random()<0.20){

modificar("dinero",300);

desbloquear("Ludópata con suerte");

return "¡¡Jackpot!!";

}

modificar("dinero",-80);

return "Perdiste todo.";

},

"No entrar",

function(){

modificar("dignidad",5);

return "El autocontrol ganó.";

}

);


// EVENTO 40

agregarEvento(

"ENTREVISTA EN TV",

"Te invitan a un programa en vivo.",

"Ir",

function(){

modificar("prestigio",15);
modificar("fama",15);

return "Te hiciste bastante conocido.";

},

"Rechazar",

function(){

modificar("prestigio",-5);

return "Perdiste una oportunidad.";

}

);


// EVENTO 41

agregarEvento(

"COLECTIVO",

"El colectivo está lleno y una abuela sube.",

"Ceder el asiento",

function(){

modificar("dignidad",10);

return "La señora te bendijo.";

},

"Hacerte el dormido",

function(){

modificar("dignidad",-15);

return "Toda la gente te miró mal.";

}

);


// EVENTO 42

agregarEvento(

"PIZZA",

"Queda la última porción.",

"Comértela",

function(){

modificar("amigos",-8);

return "Tus amigos te odiaron.";

},

"Dejarla",

function(){

modificar("amigos",8);

return "Todos hablaron bien de vos.";

}

);


// EVENTO 43

agregarEvento(

"PARCIAL",

"Es un múltiple choice.",

"Copiarte",

function(){

if(Math.random()<0.40){

modificar("academia",10);

return "No te descubrieron.";

}

modificar("academia",-20);

return "Te engancharon copiándote.";

},

"Responder solo",

function(){

modificar("dignidad",10);

return "Aprobaste con lo justo.";

}

);


// EVENTO 44

agregarEvento(

"FERIA",

"Hay una camiseta de Newell's muy barata.",

"Comprarla",

function(){

modificar("dinero",-40);
modificar("ovr",2);

return "Qué hermosa compra.";

},

"No comprarla",

function(){

return "Después te arrepentiste.";

}

);


// EVENTO 45

agregarEvento(

"ASENSOR",

"Entrás con una chica muy linda.",

"Hablarle",

function(){

if(Math.random()<0.25){

modificar("amor",15);

return "Pegaron onda.";

}

return "Silencio incómodo.";

},

"Mirar el celular",

function(){

return "Nadie dijo nada.";

}

);


// EVENTO 46

agregarEvento(

"MUNDIAL",

"Argentina juega una final.",

"Verla con amigos",

function(){

modificar("amigos",15);

return "Qué noche inolvidable.";

},

"Verla solo",

function(){

modificar("salud",3);

return "Sufriste tranquilo.";

}

);


// EVENTO 47

agregarEvento(

"RESACA",

"Te levantás destruido.",

"Seguir durmiendo",

function(){

modificar("salud",10);

return "Recuperaste energía.";

},

"Ir igual a trabajar",

function(){

modificar("prestigio",5);
modificar("salud",-10);

return "Fue un día eterno.";

}

);


// EVENTO 48

agregarEvento(

"FÚTBOL 5",

"Te ofrecen patear el último penal.",

"Patearlo",

function(){

if(Math.random()<0.50){

modificar("ovr",6);

return "¡¡Gol!!";

}

return "La mandaste arriba.";

},

"Que patee otro",

function(){

modificar("dignidad",-5);

return "Todos te llamaron cagón.";

}

);


// EVENTO 49

agregarEvento(

"LUNES",

"No tenés ganas de hacer absolutamente nada.",

"Ser productivo",

function(){

modificar("prestigio",8);
modificar("academia",5);

return "Día muy aprovechado.";

},

"Mirar TikTok todo el día",

function(){

modificar("dignidad",-5);

return "Se fueron ocho horas sin darte cuenta.";

}

);


// EVENTO 50

agregarEvento(

"COPERO",

"Copero juega a 'La Vida de Gonzalo'.",

"Mirar cómo juega",

function(){

desbloquear("Meta");

modificar("fama",20);

return "Ahora Gonzalo es oficialmente un personaje.";

},

"Demandarlo",

function(){

modificar("prestigio",-10);

return "Nadie entendió el juicio.";

}

);
