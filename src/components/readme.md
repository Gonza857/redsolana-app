avance1:
    29/11/22: se subio el maquetado basico y se agrego el modal, falta trabajar este. Hasta las 10:30 se trabajaron 3 horas en total.
avance2: 
    29/11/22: se avanzo con el agregado y quitado de cajeros, tambien se llevo a la parte cajeros los cajeros creados. Se configuro los cajeros individuales para renderizar condicionalmente si es mujer u hombre. Se uso react bootstrap para tablas. Se agrega firestore basico.
    Se borro la carpeta data
avance3:
    29/11/22:
        - funcion de traer cajeros de la coleccion
        - funcion de enviar cajeros a la coleccion
        - se empezo apenas con el auth de usuarios
avance4:
    30/11/22:
        - se estilizo el login, ya esta funcional con 1 usuario.
        - alertas cuando hay errores como, correo equivocado, contraseña equivocado, muchos intentos. 
        - uso de LocalStorage para guardar sesión
        - formulario esponsive
    2/12/22:
        - se configuraron los toast
        - se configuro loader enn el login
        - se agrego barra de busquedad
        - se agrego la funcion de cerrar sesión
avance5:
    2/12/22: 
        - se avanzo con la busqueda de cajero por nombre
        - buscador implementado
        - se actualizaron las funciones de borrar y agregar a firestore
    3/12/22:
        - se avanzo con el diseño de la pagina inicial
avance6: 
    3/12/22: 
    - se solucionaron warning para deploy en netlify
    //FIXME: - se agrego un boton para ir al formulario de login
avance7:
    3/12/22:
        - saque unos bordes para subirlo a netlify y mostrar al cliente
avance8:
    3/12/22:
        - archivo redirects en public para redireccionar al actualizar la pagina.
avance9:
    4/12/22: 
        - se agrego libreria de animated.css porque aos es mala
        - se acomodo el formulario de login
        - se esta testeando los alertas porque se envian 2 teniendo 1 error al completar los campos.
avance10:
    4/12/22: 
        - se agregaron animaciones
        - se esta trabajando en el responsive de la table
avance11:
    4/12/22:
        - se trabajo en la responsive de la tabla de admin
avance12:
    6/11/22: 
        - se trabajo en el formulario para agregar cajeros, en diseño. Se agrego toast para avisar que se agrego correctamente.
corrección1:
    6/12/22: 
        - me tira un error al darle click a el link de un cajero y no vuelve. busque en internet solucion y agregue la etiqueta <base> al html de public.
avance13:
    6/12/22:
        - tabla responsive
avance14:
    6/12/22:
        - avance con el diseño.
        - se cambio el loader
        - se cambio el diseño del login, de los cajeros y de la parte admin
avance15:
    7/12/22
        - navbar responsive
avance16:
    9/12/22:
        - navbar responsive 2
avance17:
    9/12/22:
        - inicio responsive
        - optimización de componentes de inicio
avance18:
    11/12/22:
        - arreglo de navbar responsive
avance19:
    11/12/22:
        - correcion de funcionamiento navbar
        - se agrego que se suba al principio al cambiar de sección
        - se optimizo el apartado antiguo "tyc" por "cronograma" y se muestra la foto con el fondo
detalles1:
    11/12/22: correccion de navbar que no dejaba escribir en el login por el inset
avance20:
    13/12/22: se agrego TODO el funcionamiento CRUD de foto de el cajero usando storage de firebase
avance21: 
    14/12/22: se optimizo las vistas de informacion (modales) y se acomodo la foto de los cajeros.
avance22:
    23/12/22: no anote lo anterior, anoto mejoras
        - se agrego controlador de posiciones
        - se optimizaron y testearon sistemas de agregar/sacar imagenes y de actualiza info y posiciones
        - se agrego el distintivo de cajero conectado/desconectado
avance23:
    23/12/22:
        - se agrego iconos a los TH de la table de admin
detalles2:
    24/12/22:
        - se corrigio el sistema de busquedad porque no funcionaba bien
detalles3: 
    24/12/22: 
        - se modifico el readme
        - se agrego la verificación para tener que estar registrado para poder cambiar, porque si el que sabe cambiaba el estado de setIsAdmin, podia editar correctamente pero ahora necesita tener el auth para hacerlo sino no tiene permiso
detalles4:
    25/12/22: 
        - se modifico firebase para mantener la sesión abierta y que no tenga que iniciar cada rato
detalles5:
    25/12/22:
        - se borraron los console.log del punto anterior