import {getProducts} from './firebase.js';

const producto = []
let imgSelected = " ";
let imgSelected2 = " ";
let idProduct = 0;
const carts = []
let carritos = []





window.addEventListener('DOMContentLoaded', async () => {
  if(countP <=0){
    // countProduct.style.display="none"
    // containerProduct.style.display="none"
  }

  getProducts((querySnapshot)=> {
    querySnapshot.forEach((doc)=>{
      producto.push(doc.data())
      createCards(doc.data())
    })
  })
});

// const producto = JSON.parse(localStorage.getItem("products"))




const main = document.getElementById('container__card');
const conte = document.getElementById('table-shop')
const countProduct = document.getElementById('count-product')
const containerProduct = document.getElementById('container-product')

let countP = 0
// const selectProducts = document.getElementById("select-products");
// const boton1 = document.getElementsByClassName("button-buy");



// filtros.
const filterXPrice = document.getElementById('filterXPrice');
const filterXCategories = document.getElementById('filterXCategorie');

filterXPrice.addEventListener('change', filterProducts);
filterXCategories.addEventListener('change', filterCategories);

const contenedorCarrito = document.getElementById('carrito-contenedor')

const cantidadCart = document.getElementById('cantidad');
const botonVaciar = document.getElementById('vaciar-carrito')

// Agregar nuevo elemento.

const btnCreate = document.getElementById('btn-create')




const cart = [];




const modal = document.querySelector('.modal');
const closeModal = document.getElementById('close-modal');
const newProduct = document.getElementById('new-product');
const newPrice = document.getElementById('new-price');
const newImage = document.getElementById('new-image');
const newImage2 = document.getElementById('new-image2');
const newCategorie = document.getElementById('new-categorie');
const newInfo = document.getElementById('new-info')
const btnNewProduct = document.getElementById('btn-new-create');


// window.addEventListener('load', listSelect);

// selectProducts.addEventListener('change', renderCards);


// boton de crear nuevo elemento
btnCreate.addEventListener('click', showModal);
btnNewProduct.addEventListener('click', createNewProduct);
closeModal.addEventListener('click', CloseModal)

function CloseModal() {
  newProduct.value=""
  newInfo.value=""
  newPrice.value=""
  newCategorie.value=""
  newImage.value="Insertar Portada Curso"
  newImage2.value="Insertar logo curso"
  modal.style.display = 'none';
  
}


newImage.addEventListener('click', () => {
  widget_cloudinary.open();
}, false);
newImage2.addEventListener('click', () => {
  widget_cloudinarys.open();
}, false);

// newImage2.addEventListener('change', widget_cloudinary);

// funcion para entregarme la imagen para el nuevo elemento.

  let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'b9',
    uploadPreset: 'Prueba Cloud'
}, (err, result) => {
    if (!err && result && result.event  === 'success') {
        console.log('Imagen subida con éxito', result.info);
        newImage.src = result.info.secure_url ;
        imgSelected = result.info.secure_url
       
        
    }
});


let widget_cloudinarys = cloudinary.createUploadWidget({
  cloudName: 'b9',
  uploadPreset: 'Prueba Cloud'
}, (err, result) => {
  if (!err && result && result.event  === 'success') {
      console.log('Imagen subida con éxito', result.info);
      newImage2.src = result.info.secure_url ;

  //   const resultado = result.info.secure_ur
      imgSelected2 = result.info.secure_url
  }
});



// funcion para entregarme la imagen para el nuevo elemento.

//   let widget_cloudinary = cloudinary.createUploadWidget({
//     cloudName: 'b9',
//     uploadPreset: 'Prueba Cloud'
// }, (err, result) => {
//     if (!err && result && result.event  === 'success') {
//         console.log('Imagen subida con éxito', result.info);
//         imagen.src = result.info.secure_url ;
//     //   const resultado = result.info.secure_ur
//         imgSelected2 = result.info.secure_url
//         console.log(imgSelected);
//         comprobar()
//     }
// });







// funcion al boton, para mis nuevos productos.
function createNewProduct () {

  

  const titleProduct = newProduct.value;
  const priceProducts = Number(newPrice.value);
  const categories = String(newCategorie.value);
  const information = String(newInfo.value);
  const id = 31;
  

  const productNew = {id: id, name: titleProduct, price: priceProducts, img:imgSelected, logoProduct: imgSelected2 , categorie:categories, info:information, quantity:1};

  if (newProduct.value === '' && newPrice.value === '' && newImage.value === '' && newCategorie.value === ''&& newInfo.value === '') {
    alert('Campos vacios');
  }

  else if(newProduct.value === '') {
    alert('Falta nombre producto');
  }

  else if (newPrice.value === ''){
    alert('Falta precio');
  }

  else if (newCategorie.value === '') {
    alert('Agregue una categoria');
  }

  else if (newCategorie.value != 'Principiante' && newCategorie.value != 'Intermedio' && newCategorie.value != 'Avanzado'){
    alert('Esta mal escrito')
    alert('Las categorias son: Principiante, Intermedio y Avanzado')  
  }

  else if (newImage.value === '') {
    alert('Agregue una imagen');
  } 
  else if (newImage2.value === '') {
    alert('Agregue una imagen');
  } 

  else if (newInfo.value === '') {
    alert('Ingrese info')
  }

// esto me va agregar el arreglo a mis productos.
  else{
    producto.push(productNew);
    console.log(producto);
    
    modal.style.display = 'none';
  }
  CloseModal()
  listSelect();

}




// hacer aparecer mi div para agregar elementos ya que se encuentra oculto.
function showModal() {
  modal.style.display = 'flex';
}


function filterCategories(categorie){
 
  const responser = categorie.target.value === 'Principiante'
  ? producto.filter (Pcrdt => Pcrdt.categorie === 'Principiante')

  : categorie.target.value === 'Intermedio'
  ? producto.filter( Prcdt => Prcdt.categorie === 'Intermedio')

  : categorie.target.value === 'Avanzado'
  ? producto.filter( Pcrdt => Pcrdt.categorie === 'Avanzado')
  : null;
  
  main.innerHTML = '';
  responser.map( Prcdt => createCards(Prcdt));

}


function filterProducts(event) {

  
  const responseFilter = event.target.value === 'Menos de 100'
  ? producto.filter (Pcrdt => Pcrdt.price < 100)

  : event.target.value === 'Entre 100 y 300'
  ? producto.filter( Pcrdt => Pcrdt.price >= 100 &&  Pcrdt.price <= 300)

  : event.target.value === 'Entre 400 y 900'
  ? producto.filter( Pcrdt => Pcrdt.price >= 400 && Pcrdt.price <= 900)
 
  : event.target.value === 'Entre 1.000 y 1.200'
  ? producto.filter( Pcrdt => Pcrdt.price >= 1000 &&  Pcrdt.price <= 1200)
  : null;
  
  main.innerHTML = '';
  responseFilter.map( Prcdt => createCards(Prcdt));

}


// function renderCards() {
//   products.map( Prcdt => { Prcdt.name === selectProducts.value ? createCards(Prcdt) : null } );
 
// }




function listSelect() {
  
  // selectProducts.innerHTML = '';  
  const anyOption = document.createElement('option');
  // selectProducts.appendChild(anyOption);
  anyOption.textContent = 'Selecciona Un Curso';
  producto.map( Prcdt => {
    const option = document.createElement('option');
    option.value = Prcdt.name;
    option.textContent = Prcdt.name;

    // selectProducts.appendChild(option);
    createCards(Prcdt)
    // document.getElementById('tabla').style.display = "none"
    
    
  });
  
  
}

// ----------------------------------------------------------------
// SECCION DE CREACION DE CARTAS Y MODIFICACION DE DATOS
function  createCards(Prcdt) {

 const {name, img, info, id, price, quantity,logoProduct} = Prcdt
 
  const card = document.createElement('div');
  card.classList.add("card");
  card.classList.add("c1");

  



  const conteCard = document.createElement('div');
  conteCard.classList.add("icon")
  const imgCard = document.createElement('img');
  // imgCard.classList.add("imgCard")
  const titleCard = document.createElement('p')
  titleCard.textContent = name;
  titleCard.classList.add("nameCard")

  imgCard.setAttribute('src',img);
  imgCard.setAttribute('alt',`${name}`);
  // imgCard.setAttribute('draggable', false);

  const infoCard = document.createElement('div')
  infoCard.classList.add("info__description")

  const infoP = document.createElement('p')
  infoP.classList.add('infoP')
  infoP.textContent = Prcdt.info

  
  
  const btnAdd = document.createElement('button')
  btnAdd.setAttribute('id', name)
  btnAdd.classList.add(`btn-add${id}`)
  btnAdd.classList.add('añadirProducto')
  btnAdd.classList.add("button-buy")
  btnAdd.setAttribute('id',`agregar${Prcdt.id}`)
  btnAdd.textContent ="Añadir Al Carrito"
  const infoPrecio = document.createElement('p')
  infoPrecio.textContent = `Price: $${Prcdt.price}`
  infoPrecio.classList.add('infoPrecio')
 
  card.appendChild(conteCard)
  conteCard.appendChild(imgCard);
  conteCard.appendChild(titleCard);
  infoCard.appendChild(infoP)
  infoCard.appendChild(infoPrecio)
  infoCard.appendChild(btnAdd)
  card.appendChild(infoCard);
  main.appendChild(card);
  // card.appendChild(boton)
  
  carts.push(titleCard.textContent)
 
// SECCION DEL CARRO DE COMPRAS

 // ACA EMPIEZA LA MODAL DE COMPRAS

 const boton = document.getElementById(`agregar${Prcdt.id}`)
 // seccion modal
  boton.addEventListener('click', () => {
    
    //esta funcion ejecuta el agregar el carrito con la id del producto
    agregarAlCarrito(Prcdt.id)
    agregadoAlCarrito()
    //
})


function agregadoAlCarrito() {
  btnAdd.textContent = "Añadido"

  setTimeout( function() {
    btnAdd.textContent = "Añadir Al Carrito"
    
  },5000)
}




const agregarAlCarrito = (prodId) => {

  //PARA AUMENTAR LA CANTIDAD Y QUE NO SE REPITA
  const existe = carritos.some (prod => prod.id === prodId) //comprobar si el elemento ya existe en el carro
console.log(existe);
  if (existe){ //SI YA ESTÁ EN EL carritos, ACTUALIZAMOS LA CANTIDAD
      const prod = carritos.map (prod => { 
      //creamos un nuevo arreglo e iteramos sobre cada curso y cuando
          // map encuentre cual es el q igual al que está agregado, le suma la cantidad
          if (prod.id === prodId){
              prod.quantity++
              

              
              
          }
      })
  } else { 
    countP++
              console.log(countP);
              countProduct.textContent= countP//EN CASO DE QUE NO ESTÉ, AGREGAMOS EL CURSO AL CARRITO
      const item =producto.find((prod) => prod.id === prodId)//Trabajamos con las ID
      //Una vez obtenida la ID, lo que haremos es hacerle un push para agregarlo al carrito
      carritos.push(item)
  }
  //Va a buscar el item, agregarlo al carritos y llama a la funcion actualizarCarrito, que recorre
  //el carrito y se ve.
  actualizarCarrito() //LLAMAMOS A LA FUNCION QUE CREAMOS EN EL TERCER PASO. CADA VEZ Q SE 
  //MODIFICA EL CARRITO
}


botonVaciar.addEventListener('click', () => {
  carritos.length = 0
  actualizarCarrito()
})

const actualizarCarrito = () => {

  
  contenedorCarrito.innerHTML = ""
  carritos.forEach((prod) => {
    const divConteCart = document.createElement('div')
    divConteCart.classList.add('productoEnCarrito')

    const divImg = document.createElement('div')
    divImg.setAttribute('id', 'imgConte')

    const imgCart = document.createElement('img')
    imgCart.classList.add('imgCart')
    imgCart.setAttribute('src',prod.logoProduct)

    const namePcart = document.createElement('p')
    namePcart.setAttribute('id', 'name')
    namePcart.textContent= prod.name
    const pricePcart = document.createElement('p')
    pricePcart.setAttribute('id', 'price')
    pricePcart.textContent= `$ ${prod.price}`


    const divQuantityPrice = document.createElement('div')

    const Quantity = document.createElement('p')
    Quantity.setAttribute('id', 'cantidad')
    Quantity.textContent= prod.quantity

    const agg = document.createElement('button')
    agg.textContent= '+'
    agg.classList.add('button-agg')
    const rm = document.createElement('button')
    rm.textContent= '-'

    rm.classList.add('button-rm')

    Quantity.setAttribute('id', 'cantidad')


    const removeCartP = document.createElement('button')
    removeCartP.classList.add('boton-eliminar')
    

    

    const logRemoveCartP = document.createElement('img')
    logRemoveCartP.classList.add('eliminar')
    logRemoveCartP.setAttribute('src','./images/trash.svg')
  
    
   

    
    

 
 contenedorCarrito.appendChild(divConteCart)
 
  divConteCart.appendChild(divImg);

  divImg.appendChild(imgCart);
  divConteCart.appendChild(divImg);
  
  // card.appendChild(boton)
  divConteCart.appendChild(namePcart);
  divConteCart.appendChild(pricePcart)
  divConteCart.appendChild(divQuantityPrice);
 
  
  divQuantityPrice.appendChild(Quantity)
  divQuantityPrice.appendChild(rm)
  divQuantityPrice.appendChild(agg)
  divConteCart.appendChild(removeCartP);
  removeCartP.appendChild(logRemoveCartP)


  

  removeCartP.addEventListener('click', (prodId) => {
    const items = carritos.find((prods) => prods.id === prodId)
    const indice = carritos.indexOf(items)
   
    countP--
       console.log(countP);
       countProduct.textContent= countP
    carritos.splice(indice,1)
    console.log(carritos)
    console.log(indice);
    console.log(items);
    
    actualizarCarrito()
  })
  

  agg.addEventListener('click',()=> {
    prod.quantity++
    Quantity.textContent=  prod.quantity;
    
    precioTotal.innerText = `$${carritos.reduce((acc, prod) => acc + prod.quantity * prod.price, 0)}`
    // console.log(cantidadP);
     })


     rm.addEventListener('click',()=> {
      
      if (prod.quantity <= 0) {
        Quantity.textContent = 0;
        precioTotal.innerText = `$${carritos.reduce((acc, prod) => acc + prod.quantity * prod.price, 0)}`
        contenedorCarrito.removeChild(divConteCart)

      } else {
        
       
        prod.quantity--;
        Quantity.textContent=  prod.quantity;
        precioTotal.innerText = `$${carritos.reduce((acc, prod) => acc + prod.quantity * prod.price, 0)}`

      }
      
       })
      
       

  })
  
  
  // console.log(carritos)
  precioTotal.innerText = `$${carritos.reduce((acc, prod) => acc + prod.quantity * prod.price, 0)}`



  






    
           

  }

}

console.log("Bienvenido A Mi Consola -__-");
