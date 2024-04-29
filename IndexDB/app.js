
let db;
 
// Evento para hacer el llamado de la base de datos local
document.addEventListener('DOMContentLoaded',()=>{
// llamar una funcion para crear la base de datos
   crmDB();
   setTimeout(()=>{
    createCliente();
   },5000);
});


function crmDB(){
    //crear la base d datos con indexDB
    let crmDB = window.indexedDB.open('crmDB',1);


    // si hay un error al crear la base de datos

    crmDB.onerror = function(){
        console.log('hubo un error');

    }
    
    // no hay error al crear la base de datos
    crmDB.onsuccess = function(){
        console.log('Base de datos fue creada')
        db = crmDB.result;
    }

    
    //configurar la base de datos onupgradeneeded solo se va aejecutar una vez

    crmDB.onupgradeneeded = function(e){
        console.log('prueba');
        const db = e.target.result;
        const objetStore = db.createObjectStore('crmDB',{
            KeyPath:'crmDB',
            autoIncrement: true
        })
         //definir las columnas

        objetStore.createIndex('nombre','nombre',{unique:false});
        objetStore.createIndex('email','email',{unique:true});
        objetStore.createIndex('telefono','telefono',{unique:false});
    }

   

}

function createCliente(){
    let transaction = bd.transaction(['crmDB'],'readwhite');
    transaction.oncomplete = function(){
        console.log('la transaccion ha sido completada');

    }
    transaction.onerror = function(){
        console.log( 'ha ocurrido un error');
    }
    //crear un objeto
    const objectStore = transaction.objectStore('crmDB');
    const  nuevoCliente = {
        nombre:'NAY',
        telefono:1234,
        email:'yorannyhevia@gmail.com'

    }
    
    let peticion = objectStore.add(nuevoCliente);
    console.log(peticion)

}