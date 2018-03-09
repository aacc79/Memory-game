/* 
NOTA: marcar bien los finales de funciones con anotaciones tras las llaves y corchetes, para evitar meter dentro lo que no corresponde
*/

window.onload= function(){
    document.onkeypress=chars;
//  document.onkeydown=chars
}

function chars(evento){
    if(window.event){evento = window.event; document.getElementById('string').innerHTML=String.fromCharCode(evento.charCode)}
}


/* 
VARIABLES
---------
*/


    var start = document.getElementById('start')
  var relojID = document.getElementById('relojID');
  var gameover = document.getElementById('game-over');
  var eliminados= 0;
    var segundos = 100;

var segConnect = 0;
var contaerrores =0;
var lifeFull = document.getElementById('lifeFull');
var lifeHalf = document.getElementById('lifeHalf');
var lifeLast = document.getElementById('lifeLast');

function foco(){document.getElementById("start").autofocus;}

document.onload= foco();

/* 
FUNCIÓN PARA BARAJAR LOS DIV CON CADA PERSONAJE
----------------------------------------------------------------
*/

        function baraja(){

        const personajesDoble = arrayPersonajes.concat(arrayPersonajes).sort(()=>0.5 - Math.random());

        //Ponemos tantos div como personajes hay en el array
        personajesDoble.forEach(personaje =>{
            /* como cada personaje tiene las propiedades nombre y ruta,
             quedamos una entidad con esas dos propiedades. Esto es, 
            almacenamos el nombre y ruta del personaje para usarlos más
             abajo en el código */
            const{nombre,ruta} = personaje;
            //para cada personaje crea un div ('tarjeta')
            const tarjeta = document.createElement('div');
            //a cada tarjeta le añadimos la clase css 'tarjeta'
            tarjeta.classList.add('tarjeta');
            //que cada tarjeta tenga un dataset con un nombre igual al
            //nombre del personaje
            tarjeta.dataset.name = nombre;

            const anverso = document.createElement('div');
            anverso.classList.add('anverso');

            const reverso = document.createElement('div');
            reverso.classList.add('reverso');
        
            reverso.style.backgroundImage = `url(${ruta})`;

            
            /* para personaje se crea un div, con la clase tarjeta, el
            atributo dataset con el nombre de cada personaje y de fondo
            la imagen de cada personaje, indicada su ruta */

            //ahora hacemos que esos div se pinten en el html
            rejilla.appendChild(tarjeta);
            tarjeta.appendChild(anverso);
            tarjeta.appendChild(reverso);
            fail.currentTime='0';



            if (contaerrores=0){
                lifeFull.classList.add('mostrar');
                lifeHalf.classList.add('ocultar');
                lifeLast.classList.add('ocultar')
            }
        });

        /* Quitamos la imagen de gameover */
        gameover.style.opacity='0';
        winner.classList.remove('open');
        rejilla.classList.remove('out');
        /* Que baje la rejilla */
        rejilla.classList.add('start');
        start.style.display='none';
        /* Añadimos el reloj */
        relojID.style.display='initial';
        song.play();
        eliminados=0;


     

}
// FIN de función baraja


/* 
FUNCIÓN DE INICIO DE JUEGO Y RELOJ CUENTA ATRÁS
--------------------------------------------------
*/

function reloj(){


    var s = parseInt(segundos % 60);
    var ss = ('0' + s).slice(-2);// slice -2 te muestra solo los 2 últimos caracteres, para que cuando hay más de 9 segundos no nos plante un 0 delante
    var m = parseInt(segundos /60);
    var mm = ('0' + m).slice(-2);

    document.getElementById('relojID').innerHTML = mm + ':' + ss;

    if (eliminados === 2){return;}//que salga del reloj
    if (segundos > 0 ){var t = setTimeout( function(){reloj()}, 1000 )}
    //if (segundos < 6 ){relojID.style.color='red'}
    else {gameOver()}
    
    //que se le reste un segundo a segundos;
    segundos--;
    }
    // Fin de función reloj()



/* 
FUNCIÓN PARA EJECUTAR LA LÓGICA DE PARTIDA PERDIDA
--------------------------------------------------
*/
    function gameOver(){
        console.log('Ejecutamos gameOver');
        console.log('Ponemos contaerrores a 0');
        contaerrores =0;
        segundos = 100;
        song.pause();
        song.currentTime = 0;
        fail.play();
        rejilla.classList.add('out');
        gameover.style.opacity='1';
        start.style.display= 'initial';
        relojID.style.display ='none'; 
         /* mientras rejilla tenga un 1er hijo, le quito el primer hijo
        quitará todos los hijos hasta llegar al último.
        Esto lo hacemos para que no se creen demasiadas rejillas al
        reiniciar.
        Con setTimeout 1000 ejecutaremos el borrado 1segundo después*/
       
        setTimeout( function(){
            while(rejilla.firstChild){
                        rejilla.removeChild(rejilla.firstChild);}
        }, 1000)
      
    }
/* 
--------------------------------------------------
fin de función gameOver
*/

    




//creamos un objeto para cada personaje dentro de 'arrayPersonajes'

const arrayPersonajes = [
    {
        nombre:'Anna',
        ruta:'img/Anna.png',
    },
    {
        nombre:'Campanilla',
        ruta:'img/Campanilla.png',
    },
    {
        nombre:'Cenicienta',
        ruta:'img/Cenicienta.png',
    },
    {
        nombre:'Elsa',
        ruta:'img/Elsa.png',
    },
    {
        nombre:'Flynn',
        ruta:'img/Flynn.png',
    },
    {
        nombre:'Genio',
        ruta:'img/Genio.png',
    },
    {
        nombre:'HadaMadrina',
        ruta:'img/HadaMadrina.png',
    },
    {
        nombre:'Kaa',
        ruta:'img/Kaa.png',
    },
    {
        nombre:'Mushu',
        ruta:'img/Mushu.png',
    },
    {
        nombre:'Pascal',
        ruta:'img/Pascal.png',
    },
    {
        nombre:'Pepito',
        ruta:'img/Pepito.png',
    },
    {
        nombre:'Primavera',
        ruta:'img/Primavera.png',
    },
]

//Traemos los elementos

const game = document.getElementById('game');

//creamos una rejilla para poner cada personaje

const rejilla = document.createElement('section');
//para duplicar las imágenes concatenamos arrayPersonajes a sí mismo
//usamos .sort para ordenar los arrays dependiendo de un número aleatorio
const winner = document.getElementById('winner');

//añadimos una clase 'rejilla' al elemento
rejilla.setAttribute('class','rejilla');
//dentro del div game pon un section con la clase rejilla
game.appendChild(rejilla);



const song = document.getElementById('song');
const clic = document.getElementById('clic');
const bounce = document.getElementById('bounce');
const win = document.getElementById('win');
const fail = document.getElementById('fail');

//hacemos que solo se puedan seleccionar 2
var contador=0;

//creamos una variable para cada seleccionado
//Estas variables debemos arrancarlas vacías
var primerSel='';
var segundoSel='';
//evitamos que se pueda pulsar dos veces el mismo div
var selPrevio = null;


/* 
EVENTO CLICK PARA SELECCIONAR CADA PERSONAJE
--------------------------------------------
*/

//addEventListener recibe como 1er parámetro un evento y como segundo una función
//entre paréntesis el parámetro 'evento' recogerá el objeto generado

//cuando haces click se crea un 'evento', que se almacena en la variable seleccionado
//y se nos dice el elemento pulsado
rejilla.addEventListener('click', function(evento){

    clic.currentTime = '0';
    clic.play();
    //la propiedad target nos dice el elemento que se ha pulsado
    var seleccionado = evento.target
console.log(contador);
        //hacemos que lo que seleccionamos tiene nombre de nodo 'section'
        // si pulsas en la rejilla || o si pulsas en seleccionado
        // si el padre de seleccionado es el mismo que seleccionado previo, nos "expulsa" para que 
        //no pulsemos dos veces el mismo
    if (seleccionado.nodeName ==="SECTION" || 
    seleccionado.parentNode ===selPrevio||
    // si el que estoy seleccionando tiene ya la clase seleccionado, sal de la función
    //para que no se pueda pulsar en los espacios de las ya eliminadas
    seleccionado.parentNode.classList.contains('eliminado')){return;}
    if (contador < 2){
        contador++;
        if (contador===1){primerSel = seleccionado.parentNode.dataset.name;
            seleccionado.parentNode.classList.add('seleccionado');
            //al fallar, puedes volver a seleccionar el mismo
            selPrevio = seleccionado.parentNode;}
        else{segundoSel = seleccionado.parentNode.dataset.name}
        seleccionado.parentNode.classList.add('seleccionado');

        
        //ponemos un if para comparar
        //si el primer y segundo seleccionados son distinto de vacío...
        if(primerSel!=='' && segundoSel !== ''){

            bounce.currentTime = 0;
            bounce.play();
        //y si el 1er seleccionado es igual que el 2o seleccionado...
        if(primerSel === segundoSel){
            fail.currentTim =0;
            fail.play();
            /* setTimeout recibe una función ANÓNIMA y un delay de milisegundos
            este retraso sirve para que al jugador le de tiempo a ver las cartas volteadas  */
            
            setTimeout(eliminar, 1200);
            //y que se reseetee los seleccionados en 1200ms
            setTimeout(resetSel, 1200);
            //que cuente los eliminados, para saber cuándo acaba el juego
            contEliminados();
        }

            else{ 
               
                console.log('nivel actual de contaerrores:  ' + contaerrores);
                contaerrores++;

                if (contaerrores=1){
                    lifeFull.classList.add('ocultar');
                    lifeHalf.classList.add('mostrar');
                    lifeLast.classList.add('ocultar')
                }
                else if(contaerrores>2){console.log('ejecutamos gameOver');gameOver()};
                setTimeout(resetSel, 1200);
                //al fallar, puedes volver a seleccionar el mismo
                selPrevio = null}
         }
         //que selPrevio sea el PADRE (parentNode) del objeto seleccionado
       
    }



})


/* 
FUNCIÓN PARA ELIMINAR LOS ELEMENTOS COINCIDENTES
------------------------------------------------
*/

    //definimos la función eliminar
    var eliminar= function(){
        //escogemos todos los que tengan la clase seleccionado (que solo serán 2)
        var seleccionados = document.querySelectorAll('.seleccionado');
        
        seleccionados.forEach(elemento =>{
            //a los 2 elementos seleccionados les añadimos la clase 'eliminado'
            elemento.classList.add('eliminado');
        });}

/* 
FUNCIÓN PARA CONTAR LOS ELIMINADOS Y, AL ALCANZAR DETERMINADO NÚMERO, 
EJECUTAR LA FUNCIÓN DE PARTIDA GANADA
----------------------------------------------------------------------

*/
//para ir contando los que vamos eliminando
var contEliminados = function (){
    //le sumamos 2 para que cuente los de la función anterior, porque ambas funciones se ejecutan a la vez y no le dará tiempo a esta contar las de aquella
     eliminados = document.querySelectorAll('.eliminado').length +2;
    //que cuando eliminemos 24 se añada la clase eliminado
    if (eliminados === 2){
        console.log('Ejecutamos winner');
        winner.classList.add('open');
        win.currentTime=0;
        win.play();
       
        //hacemos que se salga de la función reloj, de forma que el reloj se queda parado
        //reloj('break');
         segundos = 100;
        song.pause();
        song.currentTime = 0; 
     
        rejilla.classList.add('out');
        start.style.display= 'initial';
        relojID.style.display ='none';
       
        /* hacemos que se eliminen las tarjetas, para que no se acumulen a las 
        nuevas que se creen al reiniciar */
        setTimeout( function(){
            while(rejilla.firstChild){
                        rejilla.removeChild(rejilla.firstChild);}
        }, 1000)
      
     
     }
     //fin de condicional if
     
};


/* 
FUNCIÓN PARA RESETEAR LOS SELECCIONADOS TRAS 2 INTENTOS
-------------------------------------------------------
*/


var resetSel= function(){
            //que nos ponga el contador de seleccionados a 0
            contador=0;
            //Que el primer y segundo seleccionados se queden vacios
            //previo no hace falta vaciarlo, porque se vacía solo
            primerSel ='';
            segundoSel='';
            //quitamos la clase seleccionado a los que están seleccionados

            // elegimos todos los que tengan la clase 'seleccionado'
            var seleccionados = document.querySelectorAll('.seleccionado');
            //a cada uno de los elementos del array seleccionados se le quita la clase 'seleccionado'
            seleccionados.forEach(elemento =>{elemento.classList.remove('seleccionado')})
        }
    



    //al seleccionado le añadimos una clase css 'seleccionado'
    // seleccionado.classList.add('seleccionado')







    /* versión 1.0.2 */