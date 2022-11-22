// Capire su che pagina si è e fare il print dei prodotti di quella categoria

// PRINT SU CATEGORIA MOTO

var listino = [];

window.addEventListener('DOMContentLoaded', init);
function init() {
  printListino();
}

function printListino() {
  fetch('http://localhost:3000/moto').then((response) => {
    return response.json();
  }).then((data) => {
    listino = data;
    let dynamic = document.querySelector('.productCards');
      for (let i = 0; i < listino.length; i++) {
        let fetch = document.querySelector('.productCards').innerHTML;
        dynamic.innerHTML =fetch + `<div class="col-sm-6 col-lg-4 col-xl-3 mb-3">
        <div class="hoverCards card w-100 bg-dark text-white" style="width: 18rem;">
        <a href="#" onclick="stampaDettaglio('${i}')">
        <div class="imgProdotto">
        <img src="${listino[i].imgUno}" class="d-block w-100" alt="...">
        </div>
        </a>
        <div class="card-body">
          <h5 class="titoliProdotto card-title ">${listino[i].nome}</h5>
          <p class="card-text prezziProdotto">${listino[i].prezzo}</p>
          <button type="button" class="btn btn-warning btn-sm shadow" onclick="spostaInStorage(${i})">Aggiungi al carrello <i class="bi bi-cart-plus-fill"></i></button>
      </div>
    </div>
    </div>`;
      }
    console.log(listino);
  })
}

// PRINT DATI DETTAGLIO PRODOTTO DAL JSON

var elenco = [];

function stampaDettaglio(numero) {

  fetch('http://localhost:3000/moto').then((response) => {
    return response.json();
  }).then((data) => {
    elenco = data;
    let dynamic = document.querySelector('.productCards');

      
      dynamic.innerHTML = `<div class="container contenuto">
      <div class="row">
        <div class="col-md-6 d-flex justify-content-center">
          <div id="piccolo">
            <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active"
                  aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                  aria-label="Slide 2"></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active" id="immagine1">
                <img src="${elenco[numero].imgUno}" class="d-block w-100"
                //       alt="...">
                </div>
                <div class="carousel-item" id="immagine2">
                <img src="${elenco[numero].imgDue}" class="d-block w-100"
                //       alt="...">
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-6 pt-md-4 pt-3">
          <h3 id="titoloProdotto" class="fw-normal">${elenco[numero].nomeIntero}</h3>
          <h2 id="prezzoProdotto">${elenco[numero].prezzo}</h2>
          <hr>
          <div class="d-flex align-content-center ">
            <select class="form-select w-25 me-2" aria-label="Default select example">
              <option selected>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
  
            <button type="button" class="btn btn-warning me-2" onclick="spostaInStorage(${numero})">Aggiungi al carrello <i
                class="bi bi-cart-plus-fill"></i></button>
            <button type="button" class="btn btn-success"><i class="bi bi-bag-check-fill"></i></button>
          </div>
          <p class="minibox mt-3 p-2 d-inline-block">
            <i class="bi bi-shop-window"></i> Il prodotto selezionato presenta disponibilità nei nostri negozi.
          </p>
        </div>
      </div>
      <div class="row mb-3 mt-md-5">
        <h3>Descrizione</h3>
        <p id="descrizioneProdotto">${elenco[numero].descrizione}</p>
      </div>
      <div class="row mb-3">
        <h3>Specifiche</h3>
        <div class="container">
          <table class="table table-bordered border-warning">
            <tbody>
              <tr>
                <th scope="row">Codice prodotto</th>
                <td id="codiceProdotto">${elenco[numero].id * 3 + 1300}</td>
              </tr>
              <tr>
                <th scope="row">Spedizione in 48h</th>
                <td>Si</td>
              <tr>
                <th scope="row">Divisione</th>
                <td id="divisioneProdotto">${elenco[numero].nome}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>`
  })
}

// CARRELLO MOTO

var moto = [];

printMoto();

function printMoto() {
  fetch('http://localhost:3000/moto').then((response) => {
    return response.json();
  }).then((data) => {
    moto = data;
  })
};

function spostaInStorage(i) {
    cartNumbers(moto[i]);
    totalCost(moto[i])
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;

  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
  }

  setItem(product);

}

function setItem(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.nomeIntero] == undefined) {
      cartItems = {
        ...cartItems,
        [product.nomeIntero]: product
      }
    }
    cartItems[product.nomeIntero].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.nomeIntero]: product
    }
  }

  localStorage.setItem('productsInCart', JSON.stringify
    (cartItems));
}

function totalCost(product1) {

  let cartCost = localStorage.getItem('totalCost');

  if (cartCost != null) {
    cartCost = parseFloat(cartCost);
    var somma = parseFloat(cartCost)+ parseFloat(product1.prezzo);
    localStorage.setItem('totalCost', somma);
  } else {
    localStorage.setItem('totalCost', product1.prezzo);

  }

}

// Display carrello adesso funziona piu o meno, vanno sistemate alcune cose tipo il tasto rimuovi prodotto, funzione usata sull'HTML di auto
function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  let cartItems1 = JSON.parse(cartItems);
  let productContainer = document.querySelector
    (".products");
  let cartCost = localStorage.getItem('totalCost');
  let cartCost1 = JSON.parse(cartCost)
  // console.log(cartItems);
  // console.log(cartItems1);
  if (cartItems1 && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems1).map(item => {
      console.log(item.id);
      productContainer.innerHTML += `
        <tbody>
          <tr>
            <td><img src="${item.imgUno}" alt=""
              style="width:8em;">
            </td>
            <td class="align-middle">${item.nomeIntero} <br><span class="text-warning">&euro;${item.prezzo}</span> <br> <span class="text-sm fw-light">Quantità: ${item.inCart} </span> <br> <button type="button" class="btn btn-danger btn-sm mt-1" onclick="removeItem(${item.id})">Rimuovi</button>
            </td>
          </tr>
        </tbody>`  
    });
    // aggiunge il totale in fondo al carrello, va inserito dopo se no viene stampato dopo ogni prodotto
    productContainer.innerHTML += `  <tfoot>
    <tr>
        <td colspan="2"><h5 class="text-end me-2">Totale: <span class="text-warning"> &euro;${Math.round((cartCost1*1000)/1000)}</span></h5></td>
    </tr>
</tfoot>`;
  }
}

function removeItem(id) {
  let cartItems = localStorage.getItem("productsInCart");
  let cartItems1 = JSON.parse(cartItems);
  let arrValues = Object.values(cartItems1);
  console.log(arrValues);
  let prodotto = arrValues.find(arrValue => arrValue.id === id);
  console.log(prodotto);
  arrValues.splice(arrValues.indexOf(prodotto), 1);
  console.log(arrValues);
  localStorage.setItem('productsInCart', JSON.stringify
    (arrValues));
  displayCart();
  localStorage.setItem('cartNumbers', arrValues.length);
  aggiornaCarrello();
  function aggiornaCarrello() {
    document.querySelector('.cart span').textContent = arrValues.length;
  }
  modificaPrezzo();
  function modificaPrezzo() {
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseFloat(cartCost);
    let sottrazione = parseFloat(cartCost) - parseFloat(prodotto.prezzo);
    localStorage.setItem('totalCost', sottrazione);
  }
}
onLoadCartNumbers();
function instantSearch() {
  document.querySelectorAll('.col-xl-3').forEach(item => item.querySelectorAll('h5')
  [0].innerText.toLowerCase().indexOf(document.querySelector('#input').value.toLowerCase()) > -1 ?
    item.style.display = 'block' : item.style.display = 'none');
}
