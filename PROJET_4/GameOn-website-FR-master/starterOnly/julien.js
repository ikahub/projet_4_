const editNav = () => {
    var x = document.getElementById("myTopnav")
    x.className = x.className === "topnav" ? `${x.className} responsive` : 'topnav'
}

// DOM Elements
const modalbg = document.querySelector(".bground"),
    modalBtn = document.querySelectorAll(".modal-btn"),
    formData = document.querySelectorAll(".formData"),
    closeBtn = document.querySelector(".close")

// launch modal form
const launchModal = () => modalbg.style.display = "block"

// launch modal event
modalBtn.forEach(btn => btn.addEventListener("click", launchModal))

// launch modal form
const closeModal = () => modalbg.style.display = "none"

// launch modal event
closeBtn.addEventListener("click", closeModal);

const checkFormEl = (value, type, errorId) => {
    let isValid = true;
    switch (type) {
        case 'input':
            isValid = value && value.length && value.length >= 2
            break
        case 'email':
            const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            isValid = value && value.length && re.test(value.trim().toLowerCase())
            break
        case 'date':
            const date = new Date(value)
            isValid = value && value.length && date && date.getTime()
            break
        case 'integer':
            const nb = parseInt(value)
            isValid = value && nb !== NaN && Number.isInteger(nb)
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

// On form submit
document.getElementsByName("reserve")[0].addEventListener("submit", event => {
    event.preventDefault();

    const reserveForm = {
        firstName: document.querySelector("#first").value,
        lastName: document.querySelector("#last").value,
        mail: document.querySelector('#email').value,
        birthdate: document.querySelector('#birthdate').value,
        quantity: document.querySelector('#quantity').value,
        location: document.querySelector('input[name="location"]:checked') ? .value,
        checkbox1: document.querySelector('#checkbox1').checked,
        checkbox2: document.querySelector('#checkbox2').checked
    }

    let isFormValid = true
    isFormValid = checkFormEl(reserveForm.firstName, "input", "firstError") && isFormValid
    isFormValid = checkFormEl(reserveForm.lastName, "input", "lastError") && isFormValid
    isFormValid = checkFormEl(reserveForm.mail, "email", "emailError") && isFormValid
    isFormValid = checkFormEl(reserveForm.birthdate, "date", "birthdateError") && isFormValid
    isFormValid = checkFormEl(reserveForm.quantity, "integer", "quantityError") && isFormValid
    isFormValid = checkFormEl(reserveForm.location, "string", "locationError") && isFormValid
    isFormValid = checkFormEl(reserveForm.checkbox1, "boolean", "conditionsError") && isFormValid

    document.getElementById('reservationSuccess').style.display = isFormValid ? 'block' : 'none'
    document.getElementsByName("reserve")[0].reset()
});