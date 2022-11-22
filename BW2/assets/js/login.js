
var elenco = [];
var login = document.getElementById('login');
var stato = true;

window.addEventListener('DOMContentLoaded', init);

function init() {
    email = document.getElementById('email');
    // password = document.getElementById('password');
    login = document.getElementById('login');
    printData();
    welcome();
}

function welcome(){
    if (stato){
        let loggedUser = sessionStorage.getItem('user');
        loggedUser = JSON.parse(loggedUser);
        let acc = document.getElementById('log');
        let reg = document.getElementById('sig');
        
        reg.innerHTML = `<a href="" style="color:rgb(255, 193, 7);"> Benvenuto ${loggedUser.nomeUtente}</a>`;
        
        acc.innerHTML = `<button
        class="btn btn-outline-danger" onclick="logout()" type="submit">Log out</button>`;
    }
}
function logout(){
    sessionStorage.clear();
    stato = false;
    
}

login.addEventListener('click', (e) => {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // var i = emailArray.indexOf(email);
    printData();
    console.log(elenco);
    if (email == "") {
        alert("Email richiesta.");
    }
    else if (password == "") {
        alert("Password richiesta.");
    } else {
        for (let i = 0; i < elenco.length; i++) {
            if (email == elenco[i].nomeUtente && password == elenco[i].password) {
                alert(email + " You are logged in now \n Welcome to our website!");
                location.href = 'index.html';
                nuovoUtente = new Utente(email, password);
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                stato = true;
                sessionStorage.setItem('user', JSON.stringify(nuovoUtente));
            } else if (email != elenco[i].nomeUtente || password != elenco[i].password){
                let error = document.getElementById('error');
                error.innerHTML = 'Hai sbagliato qualcosa!<br>Oppure non sei registrato'

            }
        }

    }
   
    // if (emailArray.indexOf(email) == -1) {
    //     if (email == "") {
    //         ("Email required.");
    //         return;
    //     }
    //     ("Email does not exist.");
    //     return;
    // }
    // else if (passwordArray[i] != password) {
    //     if (password == "") {
    //         ("Password required.");
    //         return;
    //     }
    //     ("Password does not match.");
    //     return;
    // }
    // else {
    //     alert(email + " You are logged in now \n Welcome to our website!");
    //     location.href = 'index.html';

    //     document.getElementById("email").value = "";
    //     document.getElementById("password").value = "";
    //     controlla();
    //     return;


    // }

});

function printData() {
    fetch('http://localhost:3000/elenco')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            elenco = data;

        });
}


class Utente {
    constructor(_nomeUtente, _password) {
        this.nomeUtente = _nomeUtente;
        this.password = _password;
    }

}

function instantSearch() {
    document.querySelectorAll('.col-xl-3').forEach(item => item.querySelectorAll('h5')
    [0].innerText.toLowerCase().indexOf(document.querySelector('#input').value.toLowerCase()) > -1 ?
      item.style.display = 'block' : item.style.display = 'none');
  }