const contactData = {
    users: [
        { id: "Efia Danso", name: "Astra", avatar: "/Perfiles/Astra.jpg", status: "Tu dices chale y yo digo shale", lastSeen: "Hace 5 minutos", phone: "+54 9 11 4053-1999" },
        { id: "Ollie Baird", name: "Clove", avatar: "/Perfiles/Clove.png", status: "No picking", lastSeen: "Hace 8 minutos", phone: "+54 9 11 5951-4053" },
        { id: "Amir El Amari", name: "Cypher", avatar: "/Perfiles/Cypher.png", status: "Por un momento, los vi", lastSeen: "En línea", phone: "+54 9 11 7105-6053" },
        { id: "Iselin Solem", name: "Deadlock", avatar: "/Perfiles/Deadlock.jpg", status: "Protenjase entre ustedes", lastSeen: "Hace 12 horas", phone: "+54 9 11 3057-0552" },
        { id: "Klara Böhringer", name: "Killjoy", avatar: "/Perfiles/Killjoy.png", status: "No soy servicio técnico", lastSeen: "En línea", phone: "+54 9 11 0550-3005" },
        { id: "DJ", name: "Miks", avatar: "/Perfiles/Miks.png", status: "Que comienze la fiesta", lastSeen: "En línea", phone: "+54 9 11 4605-5058" },
        { id: "Seguridad", name: "Veto", avatar: "/Perfiles/Veto.png", status: "Seguridad en camino", lastSeen: "Hace 17 horas", phone: "+54 9 11 0598-4459" },
        { id: "Ariya Saengkaew", name: "Waylay", avatar: "/Perfiles/Waylay.png", status: "Les hago la vida imposible para su bien", lastSeen: "Hace 1 día", phone: "+54 9 11 0599-0005" },
        { id: "Principal-group", name: "Operacion principal: VALORANT", avatar: "/Grupos/Operacion_principal.png", status: "Grupo · 16 participantes", lastSeen: "En línea", phone: "+54 9 11 7030-0906" },
        { id: "Homie-group", name: "Homies", avatar: "/Grupos/The_homies.png", status: "Grupo · 5 participantes", lastSeen: "En línea", phone: "+54 9 11 7030-0906" },
    ],


    chats: [
        { id: "chat-Homie-group", userId: "Homie-group", lastMessage: "[YO] Ja ¿queres intentarlo?.", lastTime: "Ahora", unread: 0 },
        { id: "chat-Principal-group", userId: "Principal-group", lastMessage: "[YO] Creo que han plantado una spike. Según Cypher fue cerca de Buenos Aires.", lastTime: "Ahora", unread: 0 },
        { id: "chat-Miks", userId: "DJ", lastMessage: "Tranquilo, vine para quedarme y ayudar a todos los posibles.", lastTime: "22:12", unread:1 },
        { id: "chat-Deadlock", userId: "Iselin Solem", lastMessage: "Ahg esa Killjoy ¿no puede hacer un robot funcional?.", lastTime: "21:14", unread: 1 },
        { id: "chat-Veto", userId: "Seguridad", lastMessage: "Genial entonces te espero en la cafetería con unos ricos pastelitos de batata.", lastTime: "20:24", unread: 1 },
        { id: "chat-Killjoy", userId: "Klara Böhringer", lastMessage: "Esta bien pero la proxima semana no tendran día libre.", lastTime: "19:21", unread: 0 },
        { id: "chat-Cypher", userId: "Amir El Amari", lastMessage: "La palabra es KAYO.", lastTime: "18:52", unread: 1 },
        { id: "chat-Waylay", userId: "Ariya Saengkaew", lastMessage: "Para probar que no miento, me ire a dormir ahora mismo.", lastTime: "17:33", unread: 1 },
        { id: "chat-Astra", userId: "Efia Danso", lastMessage: "Era, hermosa y ahora no queda nada.", lastTime: "08:27", unread: 1 },
        { id: "chat-Clove", userId: "Ollie Baird", lastMessage: "Yupiii, te esperamos en la salida principal en 30 minutos más o menos.", lastTime: "07:59", unread: 1 },
    ],


    messages: {
        "chat-Principal-group": [
            { id: "m1", fromMe: false, text: "[Vyze] Tengan cuidado, Fade a detectado a los de Legión en nuestra dimensión.", time: "12:50" },
            { id: "m2", fromMe: false, text: "[Sova] Usare mi dron para sacar informacion.", time: "12:52" },
            { id: "m3", fromMe: true, text: "[YO] Confirmo. Han plantado una spike. Según Cypher fue cerca del obelisco de Buenos Aires.", time: "13:30" },
            { id: "m4", fromMe: false, text: "[Yoru] Mantengamos un perfil bajo. Hay que estar preparados para defusar esa spike.", time: "13:36" },
            { id: "m5", fromMe: true, text: "[YO] Entendido, les informare a los demás agentes.", time: "13:40" },
            { id: "m6", fromMe: false, text: "[Vyze] Phoenix y Jett estan en su día libre, pero estan cerca de la ubicacion de la spike.", time: "13:41" },
            { id: "m7", fromMe: true, text: "[YO] Ahora mismo les aviso para que se preparen y se pona en marcha.", time: "13:42" },
        ],


        "chat-Veto": [
            { id: "m1", fromMe: false, text: "Hey. ¿Andas por el cuartel?", time: "07:15" },
            { id: "m2", fromMe: true, text: "Hola sisi justo estaba por ir a la sala de entrenamiento.", time: "07:17" },
            { id: "m3", fromMe: false, text: "Ah, genial.Yo pensaba en ir a tomar un café antes de empezar a entrenar.¿Te gustaria acompañarme?", time: "07:19" },
            { id: "m4", fromMe: true, text: "Mmmm no lo sé. Tengo que estar preparado por si hay una incursión.", time: "07:20" },
            { id: "m5", fromMe: false, text: "Vaaamos. Hae mucho tiempo que Legión no hace de las suyas por acá. Un descanso no te vendria mal", time: "07:20" },
            { id: "m6", fromMe: true, text: "Bueno, puede ser. Un día sin entrenar no puede ser tan malo.", time: "07:21" },
            { id: "m7", fromMe: false, text: "Genial entonces te espero en la cafetería con unos ricos pastelitos de batata.", time: "07:22" },
        ],


        "chat-Waylay": [
            { id: "m1", fromMe: false, text: "¿Que ondaa?. Tengo los informes que me pediste de los nuevos agentes", time: "05:45" },
            { id: "m2", fromMe: true, text: "Waylay ni son las 6 de la mañana. No me digas que ya estás despierta.", time: "05:50" },
            { id: "m3", fromMe: false, text: "Tecnicamente no dormi peeeeero no es nada, pude cumplir con todas mis tareas.", time: "05:53" },
            { id: "m4", fromMe: true, text: "Ya sabes lo que opino de eso. Tu rendimiento no es el mismo sino duermes lo suficiente.", time: "05:55" },
            { id: "m5", fromMe: false, text: "Lo sé, lo sé. Prometo que es la ultima vez.", time: "05:56" },
            { id: "m6", fromMe: true, text: "😒 Sé que me estas mintiendo.", time: "05:58" },
            { id: "m7", fromMe: false, text: "Para probar que no miento, me ire a dormir ahora mismo.", time: "05:59" },
        ],


        "chat-Miks": [
            { id: "m1", fromMe: false, text: "Hey buenas, soy el novato. Waylay me dijo que me presentara con todos.", time: "18:40" },
            { id: "m2", fromMe: true, text: "Buenas, es un placer tenerte acá con nosotros, es tan complicado conseguir otros radiantes que puedan curar.", time: "18:41" },
            { id: "m3", fromMe: false, text: "Jajaj si me lo comentaron y tambien pude notarlo.", time: "18:43" },
            { id: "m4", fromMe: true, text: "Ahh entonces ya conoces a Skye y Sage. ¿Verdad?.", time: "18:45" },
            { id: "m5", fromMe: false, text: "Sisi estaban muy emocionadas por conocerme.", time: "18:47" },
            { id: "m6", fromMe: true, text: "Oh si, ultimamente muchos estan dependiendo de ellas, espero que puedas darles una mano.", time: "18:49" },
            { id: "m7", fromMe: false, text: "Tranquilo, vine para quedarme y ayudar a todos los posibles.", time: "18:52" },
        ],


        "chat-Cypher": [
            { id: "m1", fromMe: false, text: "Hey, jefe, ultimamente he estado captando señales del portal que encontramos en Breeze.", time: "21:02" },
            { id: "m2", fromMe: true, text: "Hmmm, que interesante. ¿Qué pudiste captar?", time: "21:03" },
            { id: "m3", fromMe: false, text: "Es raro, son como señales de ayuda alguien en un futuro distante. Killjoy, Fade y yo trabajamos duro para descifrarlas pero lo unico que pude obtener fueron 4 letras al azar.", time: "21:05" },
            { id: "m4", fromMe: true, text: "¿4 letras?. ¿Qué significan?. ¿Pudieron formar alguna palabra?.", time: "21:07" },
            { id: "m5", fromMe: false, text: "Por ahora solo una, pero no creemos que sea significativa.", time: "21:09" },
            { id: "m6", fromMe: true, text: "Okey...¿Pero cual es la palabra?.", time: "21:11" },
            { id: "m7", fromMe: false, text: "La palabra es KAYO.", time: "21:14" },
        ],


        "chat-Astra": [
            { id: "m1", fromMe: false, text: "Hey jefe, ¿cómo va todo?. Ya estamos con Harbor en las ruinas de la Ciudad de las FLores", time: "Ahora" },
            { id: "m2", fromMe: true, text: "Con papeleo a full. Espero que puedan encontrar ese artefacto de los Guardianes", time: "Ahora" },
            { id: "m3", fromMe: false, text: "Por ahora no tiene mucha pinta, la ciudad esta destruia completamente.", time: "Ahora" },
            { id: "m4", fromMe: true, text: "¿Como así?.", time: "Ahora" },
            { id: "m5", fromMe: false, text: "Así como escuchaste, toda hecha polvo, sospechamos que fueron los de Atlas", time: "Ahora" },
            { id: "m6", fromMe: true, text: "Hmmm y ¿que necesitaria Atlas de ahi para dejarla hecha polvo?.", time: "Ahora" },
            { id: "m7", fromMe: false, text: "Suponemos que de alguna forma se enteraron de la existencia de los artefactos.", time: "Ahora" },
            { id: "m8", fromMe: false, text: "No quiero imaginar si uno de esos artefactos terminan en las manos de los enemigos. Menos mal que Harbor le pudo sacar una foto a la ciudad la ultima vez que vinimos", time: "Ahora" },
            { id: "m9", fromMe: false, text: "", image: "/Fotos/Lotus.jpg", time: "Ahora" },
            { id: "m10", fromMe: true, text: "Era, hermosa y ahora no queda nada.", time: "Ahora" },
        ],


        "chat-Deadlock": [
            { id: "m1", fromMe: false, text: "JEFÉ, ¿PUEDO SOLICITAR A CYPHER VER LAS CAMARAS DE SEGURIDAD?", time: "20:08" },
            { id: "m2", fromMe: true, text: "Ey Deadlock, calma, ¿que pasa?.", time: "20:10" },
            { id: "m3", fromMe: false, text: "PARECE QUE ALGUIEN SE INFILTRO A MI RECAMARA.", time: "20:12" },
            { id: "m4", fromMe: true, text: "Pero tranquila, ¿no te parece que estás exagerando un poco?", time: "20:14" },
            { id: "m5", fromMe: false, text: "NO, TENGO LA SOSPECHA DE QUE FUERON ESOS RADIVOROS DE GEKKO. ES MI RECAMARA. YO ELIJO QUIEN PASA Y QUIEN NO.", time: "20:16" },

            { id: "m6", fromMe: false, text: "", audio: "/Audios/deadlock_valorant_ulti.mp3", audioLabel: "Nota de voz:", time: "22:08" },

            { id: "m7", fromMe: true, text: "Okey, okey vere si Cypher tiene algo en sus camaras, pero por favor calmate.", time: "20:20" },
            { id: "m8", fromMe: true, text: "Ya pudimos, ver lo ocurrido y pasa que el robot de limpieza entro a tu recama por alguna razón.", time: "20:22" },
            { id: "m9", fromMe: false, text: "Ahg esa Killjoy ¿no puede hacer un robot funcional?.", time: "20:24" },
        ],


        "chat-Killjoy": [
            { id: "m1", fromMe: false, text: "Jefeeee, puedo pedirle un favor? :D", time: "19:04" },
            { id: "m2", fromMe: true, text: "Mmmm, depende, ya me haz pedido demasiados", time: "19:05" },
            { id: "m3", fromMe: false, text: "Este es especial, lo juro <|=D", time: "19:08" },
            { id: "m4", fromMe: true, text: "Okey, dime ¿de que se trata?.", time: "19:10" },
            { id: "m5", fromMe: false, text: "Mañana es mi aniversario con Raze. Y me preguntaba si me podrias adelantar nuestros dias libres :3.", time: "19:12" },
            { id: "m6", fromMe: false, text: "HEY NO ME DEJES EN VISTO >:(", time: "19:14" },
            { id: "m7", fromMe: true, text: "No lo sé, mañana es el día libre de Phoenix y Jett.", time: "19:16" },
            { id: "m8", fromMe: false, text: "Vamoooos. Hace tanto tiempo que no hay problemas. Solo esta vez ¿si?. T-T", time: "19:19" },
            { id: "m9", fromMe: true, text: "Esta bien pero la proxima semana no tendran día libre.", time: "19:21" },
        ],


        "chat-Clove": [
            { id: "m1", fromMe: false, text: "Haaloo.", time: "22:01" },
            { id: "m2", fromMe: true, text: "Hola Clove. ¿Que ocurre?.", time: "22:03" },
            { id: "m3", fromMe: false, text: "Algunos agentes y yo vamos a juntarnos a hacer karaoke más tarde. ¿Te gustaria unirte?", time: "22:05" },
            { id: "m4", fromMe: true, text: "Lo dudo, tengo mucho papeleo y no soy bueno cantando.", time: "22:06" },
            { id: "m5", fromMe: false, text: "Vaaaamos, nadies es bueno, ese es el punto. Y el papeleo lo puedes dejar para después.", time: "22:07" },
            { id: "m6", fromMe: false, text: "Porfiiiiiiii",  time: "22:08" },
            { id: "m7", fromMe: true, text: "Okey, pero solo una hora.", time: "22:10" },
            { id: "m8", fromMe: false, text: "Yupiii, te esperamos en la salida principal en 30 minutos más o menos.", time: "22:12" },
        ],


        "chat-Homie-group": [
            { id: "m1", fromMe: false, text: "[Killjoy]", audio: "/Audios/valorant_killjoy_2.mp3", audioLabel: "Nota de voz:", time: "22:08" },
            { id: "m2", fromMe: false, text: "[Miks] KJ calmate, es solo un juego.", time: "Ahora" },
            { id: "m3", fromMe: true, text: "[YO] Parece que llevas el estres de la vida real al juego jajaja.", time: "Ahora" },
            { id: "m4", fromMe: false, text: "[Clove] Tranquila, algun dia podras ganarme.", time: "Ahora" },
            { id: "m5", fromMe: true, text: "[YO] Juntos somos imparables Clove.", time: "Ahora" },
            { id: "m6", fromMe: false, text: "[Raze] ¿Se bancan un 3vs2?. Si tan buenos son no tienen problema. ¿No?", time: "Ahora" },
            { id: "m7", fromMe: true, text: "[YO] Ja ¿queres intentarlo?.", time: "Ahora" },
        ],
    },
};


export default contactData;


