// ======================================
// LA VIDA DE GONZALO
// SCRIPT.JS (ADAPTADO AL HTML FINAL)
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
    academia: 50,
    felicidad: 50 
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
    document.getElementById("edad").textContent=jugador.edad;
    
    // Actualizar barra de progreso
    if(eventos.length > 0) {
        let porcentaje = (indice / eventos.length) * 100;
        document.getElementById("barraEdad").style.width = porcentaje + "%";
    }
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
    jugador.felicidad=Math.max(0,Math.min(100,jugador.felicidad));
}

function modificar(stat,cantidad){
    jugador[stat]+=cantidad;
    limitarStats();
    actualizarHUD();
}

function desbloquear(nombre){
    if(logros.includes(nombre)) return;
    
    logros.push(nombre);
    let aviso = document.getElementById("logro");
    aviso.innerHTML = "🏆 Logro desbloqueado: <b>"+nombre+"</b>";
    
    // Animación de entrada y salida del logro
    aviso.style.right = "20px";
    setTimeout(function() {
        aviso.style.right = "-420px";
    }, 3500);
}

function gameOver(texto){
    // Mostramos la pantalla negra de Game Over que tienes en el HTML
    document.getElementById("gameover").style.display = "flex";
    document.getElementById("causaMuerte").innerHTML = texto + "<br><br><span style='font-size:20px; color:white;'>OVR Final: " + jugador.ovr + "</span>";
}

function finalPartida(){
    document.getElementById("tituloEvento").innerHTML = "🏁 FIN DE LA CARRERA";
    document.getElementById("textoEvento").innerHTML = "Has llegado al final del camino.";
    document.getElementById("op1").style.display = "none";
    document.getElementById("op2").style.display = "none";

    let nota="Carrera normal";
    if(jugador.ovr>=90) nota="⭐ LEYENDA";
    else if(jugador.ovr>=80) nota="⭐ ÍDOLO";
    else if(jugador.ovr>=70) nota="⭐ MUY BUENA";

    document.getElementById("mensaje").innerHTML = 
    "<br><b>Resultado: </b>" + nota +
    "<br><b>Logros desbloqueados: </b>" + logros.length + " de 5";
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
    
    // Conectado con los IDs correctos de tu HTML
    document.getElementById("tituloEvento").innerHTML = evento.titulo;
    document.getElementById("textoEvento").innerHTML = evento.texto;
    
    document.getElementById("op1").style.display="block";
    document.getElementById("op2").style.display="block";
    document.getElementById("op1").innerHTML=evento.opciones[0].texto;
    document.getElementById("op2").innerHTML=evento.opciones[1].texto;
    
    document.getElementById("mensaje").innerHTML = "Decisión "+(indice+1)+" de "+eventos.length;

    document.getElementById("op1").onclick = function(){ ejecutarOpcion(0); };
    document.getElementById("op2").onclick = function(){ ejecutarOpcion(1); };
}

function ejecutarOpcion(numero){
    let evento=eventos[indice];
    let opcion=evento.opciones[numero];
    let texto=opcion.accion();

    if(texto!==undefined){
        historial.push(texto);
        document.getElementById("mensaje").innerHTML=texto;
    }

    indice++;
    if(indice%3===0){
        jugador.edad++;
    }

    actualizarHUD();

    // Pequeña pausa antes de mostrar el siguiente evento
    document.getElementById("op1").style.display="none";
    document.getElementById("op2").style.display="none";
    
    setTimeout(function(){
        mostrarEvento();
    }, 1800);
}

function agregarEvento(titulo, texto, opcion1, accion1, opcion2, accion2){
    eventos.push({
        titulo:titulo,
        texto:texto,
        opciones:[
            {texto:opcion1, accion:accion1},
            {texto:opcion2, accion:accion2}
        ]
    });
}

// ======================================
// EVENTOS (1 al 46)
// ======================================

agregarEvento("LA CAPITAL", "Tu jefe te pide escribir un artículo desprestigiando a Newell's.", "Escribirlo", function(){ modificar("ovr",5); modificar("prestigio",10); modificar("amigos",-15); return "El jefe quedó encantado. Felipe no quiere volver a hablarte."; }, "Negarte", function(){ if(Math.random()<0.40){ gameOver("Te echaron de La Capital."); return; } modificar("amigos",10); modificar("dignidad",5); return "Conservaste tus principios."; });
agregarEvento("INSTAGRAM", "Victoria Lomello te invita a dormir a su casa.", "Aceptar", function(){ modificar("amor",10); modificar("ovr",3); return "Tu rendimiento fue aceptable."; }, "Rechazar", function(){ modificar("amor",-5); modificar("dignidad",5); return "Te quedaste viendo el Instagram de Clari."; });
agregarEvento("FREEZER", "Tus padres te piden sacar hielo del freezer pese a tu asma.", "Aceptar", function(){ if(Math.random()<0.50){ gameOver("Moriste congelado buscando hielo."); return; } modificar("ovr",2); return "Sobreviviste al frío."; }, "Negarte", function(){ modificar("amigos",-5); return "Tus padres se enfadaron contigo."; });
agregarEvento("BOLICHE", "Cobraste el sueldo. Tus amigos quieren salir.", "Invitar los tragos", function(){ modificar("dinero",-50); modificar("amigos",20); return "Ahora eres el héroe del grupo."; }, "Ahorrar", function(){ modificar("amigos",-15); return "Guido Eduardo Piazza te llamó rata hasta en arameo."; });
agregarEvento("PEUGEOT 208", "Has bebido demasiado y una chica necesita volver a casa.", "Llevarla", function(){ if(Math.random()<0.45){ gameOver("Chocaste el Peugeot 208."); return; } modificar("ovr",4); return "Todo salió perfecto."; }, "Pedir Uber", function(){ modificar("amor",-5); modificar("dignidad",5); return "Fue la decisión más responsable."; });
agregarEvento("PAULINA", "Paulina Devigili subió una historia.", "Responder", function(){ let r=Math.random(); if(r<0.15){ modificar("amor",30); desbloquear("Milagro"); return "¡Te respondió!"; } if(r<0.80){ return "Te dejó en visto."; } modificar("amor",-10); return "Te bloqueó."; }, "No responder", function(){ modificar("dignidad",5); return "Las calles dicen que fuiste un cagón."; });
agregarEvento("TRASPASO", "La UCA de Buenos Aires quiere ficharte.", "Aceptar", function(){ modificar("academia",25); modificar("amigos",-20); modificar("ovr",3); return "Duraste seis meses y volviste a Rosario por burro. No compraron tu pase."; }, "Quedarte", function(){ modificar("amigos",15); modificar("dignidad",5); return "Rosario celebra tu permanencia."; });
agregarEvento("CITA PERONISTA", "Una muchacha peronista de dudosa procedencia te invita a salir.", "Aceptar", function(){ modificar("amor",15); modificar("ideologia",20); modificar("dignidad",-10); return "Ahora cantás la marcha sin saber por qué."; }, "Rechazar", function(){ modificar("dignidad",5); return "Te mantuviste fiel a tus ideales."; });
agregarEvento("VAPER", "Te ofrecen un vaper de marihuana.", "Aceptar", function(){ modificar("alcohol",10); modificar("salud",-10); modificar("amigos",10); return "La noche se puso interesante."; }, "Rechazar", function(){ modificar("salud",5); modificar("dignidad",5); return "Preferiste seguir sobrio."; });
agregarEvento("MIAMI", "Migraciones de Estados Unidos revisa tus datos.", "Responder lo preparado", function(){ modificar("prestigio",5); modificar("suerte",5); return "Bienvenido a Miami."; }, "Contar toda la verdad", function(){ modificar("dinero",-100); return "Te deportaron antes de salir del aeropuerto."; });
agregarEvento("PAF", "Tenés un picado y querés romperla.", "Tomar el paf", function(){ modificar("ovr",5); modificar("dignidad",-20); if(Math.random()<0.35){ modificar("amigos",-15); return "Te descubrieron. Vergüenza histórica."; } return "Parecías Messi."; }, "Jugar limpio", function(){ modificar("ovr",1); modificar("amigos",5); return "Te asfixiaste."; });
agregarEvento("CABEZAZO", "Minuto 90. La pelota queda abajo del arco.", "Cabecear a la izquierda", function(){ if(Math.random()<0.33){ modificar("ovr",5); return "¡¡GOOOL!!"; } return "Pego en el palo, rebotó en tu cara y salió."; }, "Cabecear a la derecha", function(){ if(Math.random()<0.33){ modificar("ovr",5); return "¡¡GOOOL!!"; } return "Le erraste por burro y asmático."; });
agregarEvento("FINAL UCA", "Hay examen y no estudiaste nada.", "Chamuyar", function(){ if(Math.random()<0.40){ modificar("academia",10); return "Aprobaste de milagro."; } modificar("academia",-10); return "El profesor no compró el humo."; }, "Estudiar", function(){ modificar("academia",15); modificar("dignidad",5); return "Aprobaste honestamente."; });
agregarEvento("ASADO", "Tus amigos organizan un asado.", "Llevar carne", function(){ modificar("dinero",-30); modificar("amigos",15); return "Todos te felicitan."; }, "No llevar nada", function(){ modificar("amigos",-20); return "Caíste con las manos vacías."; });
agregarEvento("NEWELL'S", "Juega la Kudelneta vs Riestra.", "Ir a la cancha", function(){ modificar("felicidad",5); modificar("amigos",10); return "Viviste un partidazo."; }, "Verlo por TV", function(){ modificar("dinero",10); return "Cagón."; });
agregarEvento("GIMNASIO", "Llevás semanas sin entrenar.", "Volver", function(){ modificar("salud",15); modificar("ovr",2); return "Buena toro."; }, "Seguir durmiendo", function(){ modificar("salud",-10); return "Tenes el físico de Maxi Salas"; });
agregarEvento("STREAM", "Te invitan a un streaming.", "Aceptar", function(){ modificar("fama",15); modificar("prestigio",5); return "Te clipearon y sos la burla nacional."; }, "Rechazar", function(){ modificar("dignidad",5); return "Preferiste no exponerte."; });
agregarEvento("ENTREVISTA", "Te ofrecen una entrevista laboral.", "Ir elegante", function(){ modificar("prestigio",10); return "Muy buena impresión."; }, "Ir en ojotas", function(){ modificar("prestigio",-20); return "No hubo segunda entrevista."; });
agregarEvento("FELIPE", "Felipe te invita a ver un partido de Newell's.", "Ir con Felipe", function(){ modificar("amigos",15); modificar("prestigio",-5); return "Gran noche futbolera."; }, "Quedarte trabajando", function(){ modificar("prestigio",10); modificar("amigos",-10); return "Cobraste horas extra, pero Felipe no lo olvidará."; });
agregarEvento("WHATSAPP", "Ves que Candela Querede está escribiendo...", "Esperar", function(){ if(Math.random()<0.30){ modificar("amor",15); return "Finalmente te contestó."; } return "Dejó de escribir."; }, "Mandar otro mensaje", function(){ modificar("amor",-5); modificar("dignidad",-10); return "Quedaste bastante desesperado."; });
agregarEvento("EXAMEN ORAL", "El profesor hace una pregunta que no sabés.", "Inventar", function(){ if(Math.random()<0.35){ modificar("academia",10); return "Sorprendentemente coló."; } modificar("academia",-10); return "El profesor se dio cuenta."; }, "Reconocer que no sabés", function(){ modificar("dignidad",10); return "Perdiste puntos, pero fuiste honesto."; });
agregarEvento("FÚTBOL 5", "Guido Piazza te hace un caño humillante.", "Romperlo de una patada", function(){ modificar("amigos",-10); modificar("ovr",-2); return "Se fueron a las manos."; }, "Aplaudir el caño", function(){ modificar("dignidad",10); return "Todos respetaron tu deportividad."; });
agregarEvento("LA CAPITAL", "Te ofrecen un aumento a cambio de trabajar los domingos.", "Aceptar", function(){ modificar("dinero",80); modificar("amigos",-10); return "Ahora ganás más."; }, "Rechazar", function(){ modificar("amigos",10); return "Los domingos siguen siendo sagrados."; });
agregarEvento("INSTAGRAM", "Clari Cremaschi subió una foto espectacular.", "Dar like inmediatamente", function(){ modificar("amor",3); modificar("dignidad",-3); return "No podes ser tan pajero."; }, "Hacerte el interesante", function(){ modificar("dignidad",5); return "No likeaste pero la compartiste por whatsapp."; });
agregarEvento("BAR", "Te invitan a un torneo de pool.", "Jugar", function(){ if(Math.random()<0.50){ modificar("dinero",40); return "Diste la talla."; } modificar("dinero",-20); return "Perdiste hasta las ganas."; }, "No jugar", function(){ modificar("dignidad",2); return "Preferiste mirar."; });
agregarEvento("MARTU KOMAR", "Martu Komar te propone hacer una nota juntos.", "Aceptar", function(){ modificar("prestigio",15); modificar("amor",5); return "Cayó O'Connor y por dentro te querés matar, pero la nota quedó barbara."; }, "Rechazar", function(){ modificar("prestigio",-10); return "Al sinaliento ni un vaso de agua."; });
agregarEvento("PENALES", "Te toca el penal decisivo.", "Patear fuerte", function(){ if(Math.random()<0.45){ modificar("ovr",6); return "¡¡GOL!!"; } return "La tiraste a la mierda."; }, "Picarla", function(){ if(Math.random()<0.20){ modificar("ovr",10); desbloquear("Loco hermoso"); return "ESTÁS LOCO ÁNIMAL, GOLAZO"; } return "Te la atajaron y te fajaron por boludo."; });
agregarEvento("FERNET", "Te sirven un vaso demasiado cargado.", "Tomarlo igual", function(){ modificar("alcohol",25); modificar("amigos",5); return "No recordás cómo terminó la noche."; }, "Pasar", function(){ modificar("salud",5); return "Mañana agradecerás esta decisión."; });
agregarEvento("MCDONALD'S", "Son las 3 de la mañana y todos quieren ir a comer.", "Ir", function(){ modificar("dinero",-25); modificar("amigos",8); return "Las papas salvaron la noche."; }, "Irte a dormir", function(){ modificar("salud",5); return "Dormiste como un campeón."; });
agregarEvento("CASINO", "Tus amigos quieren entrar al casino.", "Jugar", function(){ if(Math.random()<0.20){ modificar("dinero",300); desbloquear("Ludópata con suerte"); return "¡¡Jackpot!!"; } modificar("dinero",-80); return "Perdiste todo."; }, "No entrar", function(){ modificar("dignidad",5); return "El autocontrol ganó."; });
agregarEvento("ENTREVISTA EN TV", "Te invitan a un programa en vivo.", "Ir", function(){ modificar("prestigio",15); modificar("fama",15); return "Te hiciste bastante conocido."; }, "Rechazar", function(){ modificar("prestigio",-5); return "Perdiste una oportunidad."; });
agregarEvento("COLECTIVO", "El colectivo está lleno y una abuela sube.", "Ceder el asiento", function(){ modificar("dignidad",10); return "La señora te bendijo."; }, "Hacerte el dormido", function(){ modificar("dignidad",-15); return "Toda la gente te miró mal."; });
agregarEvento("MUNDIAL", "Argentina juega una final.", "Verla con amigos", function(){ modificar("amigos",15); return "GOL DE FERRAN!! GOOOOL!!."; }, "Verla solo", function(){ modificar("salud",3); return "GOL DE FERRAN GOOOOOOOOL!!!!!!!!"; });

// ======================================
// INICIADOR CON BOTÓN
// ======================================

window.addEventListener('DOMContentLoaded', function() {
    
    // El juego espera a que toques "JUGAR"
    document.getElementById("start").addEventListener("click", function() {
        
        // Oculta el menú y muestra la pantalla del juego
        document.getElementById("menu").style.display = "none";
        document.getElementById("game").style.display = "block";
        
        limitarStats();
        actualizarHUD();
        mostrarEvento();
    });
});