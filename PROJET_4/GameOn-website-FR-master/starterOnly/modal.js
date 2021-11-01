function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const close = document.querySelector('.close');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

// close form
close.addEventListener('click', function() {
    modalbg.style.display = "none";
});

const first = document.querySelector("#first");

const firstChecker = (value, type, errorId) => {
    let isValid = true;
    switch (type) {
        case 'input':
            isValid = value && value.length && value.length >= 2;
            break
        case 'email':
            const regmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            isValid = value && value.length && regmail.test(value.trim().toLowerCase())
            break
        case 'date':
            let dateFormat = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
            isValid = value && value.length && dateFormat.test(value.trim())
            console.log(value)
            break
        case 'integer':
            const numberN = parseInt(value)
            isValid = value && numberN !== NaN && Number.isInteger(numberN)
            break
        case 'string':
            isValid = value && value.length
            break
        case 'boolean':
            isValid = value
            break
        default:
            break
    }
    document.getElementById(errorId).style.display = isValid ? 'none' : 'block'
    return isValid
}


document.getElementsByName("reserve")[0].addEventListener("submit", event => {
    event.preventDefault();

    const reserveForm = {
        first1: document.querySelector('#first').value,
        last2: document.querySelector('#last').value,
        emailregex: document.querySelector('#email').value,
        birthdate1: document.querySelector('#birthdate').value,
        tornamentquant: document.querySelector('#quantity').value,
        radiocity: document.querySelector('input[name="location"]:checked')?.value,
        conditioncheck: document.querySelector('#checkbox1').checked,
        checkbox2: document.querySelector('#checkbox2').checked
    }
    let isFormValid = true
    isFormValid = firstChecker(reserveForm.first1, "input", "errorTextFirst") && isFormValid
    isFormValid = firstChecker(reserveForm.last2, "input", "errorTextLast") && isFormValid
    isFormValid = firstChecker(reserveForm.emailregex, "email", "emailError") && isFormValid
    isFormValid = firstChecker(reserveForm.birthdate1, "date", "errorTextBirth") && isFormValid
    isFormValid = firstChecker(reserveForm.tornamentquant, "integer", "errorTextNombreTournoi") && isFormValid
    isFormValid = firstChecker(reserveForm.radiocity, "string", "errorTextRadio") && isFormValid
    isFormValid = firstChecker(reserveForm.conditioncheck, "boolean", "errorTextCondition") && isFormValid

    document.getElementById('reservation-ok').style.display = isFormValid ? 'block' : 'none'

    if (isFormValid) {
        document.getElementsByName("reserve")[0].reset()
    }
})