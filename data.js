// Portal público: las matrículas reales NO se almacenan en texto plano.
// Se usa un índice hash para localizar la tarea correspondiente sin publicar la lista.
const ASSIGNMENTS = [
 {code:'PNL-01-K7A',slot:1,case:1,title:'Mensaje escolar: separar, limpiar y normalizar',topic:'Tokenizacion + Stop Words + Stemming / Lematizacion',data:{text:'Manana entregaremos el proyecto de PNL en el salon de computacion.',stop:['el','de','en','del','la'],variants:['entregaremos','entregamos','entregado']}},
 {code:'PNL-02-M4Q',slot:2,case:2,title:'Buscador: que aviso se parece mas a la pregunta?',topic:'BoW + TF-IDF + Similitud Coseno',data:{query:'Cuando entrego el proyecto de inteligencia artificial?',docs:['Entrega del proyecto de inteligencia artificial el viernes.','Horario del laboratorio de programacion.','Lista de materiales para la practica de redes.']}},
 {code:'PNL-03-R8C',slot:3,case:3,title:'Boletin escolar: elegir la herramienta adecuada',topic:'Markov + TextRank + LDA + CNN/RNN + LLM',data:{items:['resumir una nota larga','agrupar noticias por tema','generar una continuacion de texto','detectar un patron local en una frase','trabajar con contexto amplio y conversar']}},
 {code:'PNL-04-T2L',slot:4,case:1,title:'Aviso de laboratorio: limpiar antes de comparar',topic:'Tokenizacion + Stop Words + Stemming / Lematizacion',data:{text:'Los alumnos trabajaran con datos y modelos de lenguaje natural.',stop:['los','con','y','de'],variants:['trabajaran','trabajando','trabajo']}},
 {code:'PNL-05-V9D',slot:5,case:2,title:'Preguntas frecuentes del curso',topic:'BoW + TF-IDF + Similitud Coseno',data:{query:'Donde realizaremos la practica de PNL?',docs:['La practica de PNL sera en el centro de computo.','La tarea se entrega el miercoles.','El examen incluye conceptos de algoritmos.']}},
 {code:'PNL-06-H5N',slot:6,case:3,title:'Noticias del plantel: detectar el tipo de tarea',topic:'Markov + TextRank + LDA + CNN/RNN + LLM',data:{items:['resumir tres parrafos','separar noticias por tema','predecir la siguiente palabra','reconocer un patron corto','responder preguntas con contexto']}},
 {code:'PNL-07-J3P',slot:7,case:1,title:'Invitacion: que palabras ayudan y cuales distraen?',topic:'Tokenizacion + Stop Words + Stemming / Lematizacion',data:{text:'Hoy el grupo esta invitado a la tematica de participacion en equipo para el quince de septiembre.',stop:['el','esta','a','la','de','en','para'],variants:['participacion','participando','participo']}},
 {code:'PNL-08-X6B',slot:8,case:2,title:'Buscador de recursos',topic:'BoW + TF-IDF + Similitud Coseno',data:{query:'Que material necesito para la practica de inteligencia artificial?',docs:['Material para la practica de inteligencia artificial: libreta y equipo.','Calendario de exposiciones del grupo.','Normas del centro de computo.']}},
 {code:'PNL-09-F1W',slot:9,case:3,title:'Ayudante escolar: seleccionar metodo',topic:'Markov + TextRank + LDA + CNN/RNN + LLM',data:{items:['encontrar palabras clave para un resumen','descubrir grupos de temas','continuar una oracion','detectar una senal local','mantener una conversacion con contexto']}},
 {code:'PNL-10-S8E',slot:10,case:1,title:'Reporte: de texto humano a datos',topic:'Tokenizacion + Stop Words + Stemming / Lematizacion',data:{text:'El procesamiento del lenguaje convierte palabras en representaciones que una computadora puede manejar.',stop:['el','del','en','que','una'],variants:['convierte','convirtiendo','convirtio']}},
 {code:'PNL-11-Q5Z',slot:11,case:2,title:'Clasificar una pregunta escolar',topic:'BoW + TF-IDF + Similitud Coseno',data:{query:'Cual documento habla de modelos de lenguaje?',docs:['Modelos de lenguaje y procesamiento de texto.','Fechas de examenes parciales.','Material de laboratorio de electronica.']}},
 {code:'PNL-12-N7U',slot:12,case:3,title:'Analizar textos de un mural escolar',topic:'Markov + TextRank + LDA + CNN/RNN + LLM',data:{items:['crear un resumen breve','encontrar temas repetidos','predecir una palabra siguiente','reconocer una expresion local','explicar y generar texto con contexto']}},
 {code:'PNL-13-C4Y',slot:13,case:1,title:'Mensaje de proyecto: tokenizar antes de decidir',topic:'Tokenizacion + Stop Words + Stemming / Lematizacion',data:{text:'Nuestro equipo presentara un ejemplo de inteligencia artificial aplicada a textos.',stop:['nuestro','un','de','a'],variants:['presentara','presentando','presento']}},
 {code:'PNL-14-P9G',slot:14,case:2,title:'Comparar respuestas del laboratorio',topic:'BoW + TF-IDF + Similitud Coseno',data:{query:'Que tecnica asigna mas peso a una palabra rara pero importante?',docs:['TF-IDF ayuda a destacar terminos importantes.','La tokenizacion divide el texto.','Los embeddings representan significado en vectores.']}},
 {code:'PNL-15-L2K',slot:15,case:3,title:'Sistema escolar: muchos metodos, un problema',topic:'Markov + TextRank + LDA + CNN/RNN + LLM',data:{items:['resumir automaticamente','descubrir temas','generar una secuencia','reconocer patrones de frases','usar informacion contextual amplia']}},
 {code:'PNL-16-D8R',slot:16,case:1,title:'Aviso de actividad: limpiar y despues contar',topic:'Tokenizacion + Stop Words + Stemming / Lematizacion',data:{text:'La actividad de PNL requiere identificar palabras, quitar ruido y reconocer formas de una misma palabra.',stop:['la','de','y','una'],variants:['identificar','identificando','identifico']}},
 {code:'PNL-17-W5M',slot:17,case:2,title:'Encontrar el texto mas cercano',topic:'BoW + TF-IDF + Similitud Coseno',data:{query:'Que significa similitud entre dos textos?',docs:['La similitud coseno compara la orientacion de dos vectores.','Stop Words elimina palabras muy comunes.','LDA busca temas dentro de documentos.']}},
 {code:'PNL-18-B3T',slot:18,case:3,title:'Biblioteca digital: escoger tecnologia',topic:'Markov + TextRank + LDA + CNN/RNN + LLM',data:{items:['sacar las ideas principales','separar documentos por temas','modelar el siguiente paso de una secuencia','detectar patrones locales en texto','trabajar con relaciones amplias entre palabras']}},
 {code:'PNL-19-G6V',slot:19,case:1,title:'Reflexion: como pasa el texto a un modelo?',topic:'Tokenizacion + Stop Words + Stemming / Lematizacion',data:{text:'Primero se analiza el texto, despues se transforma y finalmente se modela para obtener una respuesta.',stop:['se','el','despues','y','para','una'],variants:['transforma','transformando','transformo']}},
 {code:'PNL-20-Y1H',slot:20,case:2,title:'Recomendador escolar: medir relacion',topic:'BoW + TF-IDF + Similitud Coseno',data:{query:'Que representacion usa numeros para comparar textos?',docs:['BoW cuenta apariciones de palabras.','TF-IDF pondera la importancia de las palabras.','Los embeddings representan relaciones semanticas como vectores.']}}
];

const MATRICULA_SALT = 'PNL-CECYTE-2026';
const MATRICULA_INDEX = {
  "931a7989409c1831": "PNL-01-K7A",
  "931a7689409c1318": "PNL-02-M4Q",
  "931a7789409c14cb": "PNL-03-R8C",
  "855a9092568c0607": "PNL-04-T2L",
  "931a7589409c1165": "PNL-05-V9D",
  "93286c8940a83f76": "PNL-06-H5N",
  "931776894099dd41": "PNL-07-J3P",
  "931774894099d9db": "PNL-08-X6B",
  "931773894099d828": "PNL-09-F1W",
  "855a8d92568c00ee": "PNL-10-S8E",
  "93177a894099e40d": "PNL-11-Q5Z",
  "931779894099e25a": "PNL-12-N7U",
  "855dfd92568ef515": "PNL-13-C4Y",
  "93176e894099cfa9": "PNL-14-P9G",
  "85498e92567d8f6e": "PNL-15-L2K",
  "9313f2894096c71e": "PNL-16-D8R",
  "9313f1894096c56b": "PNL-17-W5M",
  "9313f3894096c8d1": "PNL-18-B3T",
  "9313f7894096cf9d": "PNL-19-G6V",
  "9313f5894096cc37": "PNL-20-Y1H"
};

const TEAMS = [
 {order:1,title:'Tokenizacion: palabra, caracter y subpalabra',guide:'Recuperen el equipo y el orden de exposicion tal como lo hicieron en M2S1. Expliquen que es un token, comparen Word, Char y Subword, hagan un ejemplo visible y comenten una ventaja y una dificultad de cada forma.'},
 {order:2,title:'Stemming y lematizacion: dos formas de normalizar',guide:'Recuperen el equipo y el orden de exposicion tal como lo hicieron en M2S1. Expliquen que significa reducir palabras, comparen Stemming (recorte mecanico) y Lematizacion (forma con significado), y trabajen al menos tres ejemplos.'},
 {order:3,title:'BoW y TF-IDF: contar no es medir importancia',guide:'Recuperen el equipo y el orden de exposicion tal como lo hicieron en M2S1. Expliquen Bag of Words, frecuencia de termino, frecuencia inversa de documento y por que una palabra comun puede perder peso.'},
 {order:4,title:'Similitud coseno y embeddings: comparar representaciones',guide:'Recuperen el equipo y el orden de exposicion tal como lo hicieron en M2S1. Expliquen que es un vector, dibujen dos vectores, muestren la idea del angulo y expliquen con palabras sencillas que intenta conservar un embedding.'}
];
window.PNL_DATA={ASSIGNMENTS,TEAMS,MATRICULA_SALT,MATRICULA_INDEX};
