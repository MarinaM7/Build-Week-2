var emailArray = [];
var passwordArray = [];
var email = [];
// var password = [] ;
var elenco = [];
// var register = document.getElementById('register');
var register = document.getElementById('register');





window.addEventListener('DOMContentLoaded', init);

function init() {
    email = document.getElementById('email');
    // password = document.getElementById('password');
    login = document.getElementById('login');
    printData();

}

class Utente {
    constructor(_nomeUtente, _password) {
        this.nomeUtente = _nomeUtente;
        this.password = _password;
    }

}

// function eventHandler() {
//     register.addEventListener('click', function () {
//         controlla();
//     });
// }

// function controlla() {
//     if (email.value != '' && password.value != '') {
//         var data = {
//             email: email.value,
//             password: password.value
//         }
        
//     }
// }


register.addEventListener('click', (e) => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let passwordRetype = document.getElementById("confirmPassword").value;



    if (email == "") {
        alert("Email richiesta.");
        return;
    }
    else if (password == "") {
        alert("Password richiesta.");
        return;
    }
    else if (passwordRetype == "") {
        alert("Password richiesta.");
        return;
    }
    else if (passwordRetype != password) {
        alert("Password non è corretta. Riprovare");
        return;
    }
    else if (emailArray.indexOf(email) == -1) {
        emailArray.push(email);
        passwordArray.push(password);
        
    }
    printData();
    let t = false;
    for(let i = 0 ; i<elenco.length;i++){
        if (email!=elenco[i].email || password!= elenco[i].password){
            t = true;
        }
    }
    console.log(t);
    if (t){
        nuovoUtente = new Utente(email, password);
        addData(nuovoUtente);
        // sessionStorage.setItem('email', JSON.stringify(nuovoUtente));
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
    } else{
        alert(email + " È già registrato.");
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
        return;
    }

    

    // sessionStorage.clear('email');
    
});

const signup = document.querySelector(".signup");
const termCond = document.querySelector("#accept");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const pwd_format = document.querySelector(".pwd-format");
// lets define a password format
// The password should contain around 8-15 alhpanumeric character

const passwordPattern = /^[a-zA-Z0-9]{8,15}$/

password.addEventListener('focusin', () => {
    pwd_format.style.display = 'block';

    // now lets check the password entered by the user
    password.addEventListener('keyup', () => {
        if (passwordPattern.test(password.value)) {
            password.style.borderColor = 'green' // if password pattern matches the border of password input will ne green
            pwd_format.style.color = 'green'
        } else {
            password.style.borderColor = 'red'
            pwd_format.style.color = 'red'
        }
    })
})

password.addEventListener('focusout', () => {
    pwd_format.style.display = 'none';
})

confirmPassword.addEventListener('focusin', () => {
    pwd_format.style.display = 'block';
    confirmPassword.addEventListener('keyup', () => {
        if (passwordPattern.test(confirmPassword.value) && password.value === confirmPassword.value) {
            confirmPassword.style.borderColor = 'green' // if password pattern matches the border of password input will ne green
            pwd_format.style.color = 'green'
        } else {
            confirmPassword.style.borderColor = 'red'
            pwd_format.style.color = 'red'
        }
    })
})

confirmPassword.addEventListener('focusout', () => {
    pwd_format.style.display = 'none';
})



// window.addEventListener('DOMContentLoaded', init);

// function init() {
//     email = document.getElementById('email');
//     // password = document.getElementById('password');
//     login = document.getElementById('login');
//     printData();
//     eventHandler();

// }






async function addData(data) {
    let response = await fetch('http://localhost:3000/elenco', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),

    });

}


function printData() {
    fetch('http://localhost:3000/elenco')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            elenco = data;

        });
}
function instantSearch() {
    document.querySelectorAll('.col-xl-3').forEach(item => item.querySelectorAll('h5')
    [0].innerText.toLowerCase().indexOf(document.querySelector('#input').value.toLowerCase()) > -1 ?
      item.style.display = 'block' : item.style.display = 'none');
  }