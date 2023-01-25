const form = document.forms['form']
const pName = document.forms['form']['pName']
const phone = document.forms['form']['phone']
const email = document.forms['form']['email']
const submitButton = document.forms['form']['submitButton']

form.onsubmit = e => {
    e.preventDefault()
    let valid = true

    function validation () {
        if(pName.value.length === 0 || pName.value.length < 2) {
            insertError(pName)
            valid = false
        } else {
            validateInput(pName)
        } 
        
        if(email.value.length === 0 || email.classList.contains('invalid')) {
            insertError(email)
            valid = false
        } else {
            validateInput(email)
        }
    
        if(phone.value.length === 0 || phone.value.length < 14 || phone.value.length > 15) {
            insertError(phone)
            valid = false
        } else {
            validateInput(phone)
        }
    }

    validation()

    if(valid) {
        submitButton.value = 'Dados enviados com sucesso!'
        submitButton.classList.add('sendEmailSuccess')

        setTimeout(() => {
            submitButton.value = 'Enviar'
            submitButton.classList.remove('sendEmailSuccess')
        }, 3000)
    }

}

function validateName(name) {
    const regexName = /[0-9]/
    name.onkeyup = () => {
      if(regexName.test(name.value)) {
        name.value = ''
      }
    }
}

function validateEmail(email) {
    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  
    email.onkeyup = () => {
      if(regexEmail.test(email.value)) {
        email.classList.remove('invalid')
        return
      }
      email.classList.add('invalid')
    }
  }

function maskPhone(value) {
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
}

phone.onkeyup = () => {
    phone.value = maskPhone(phone.value)
}

function insertError(element) {
    element.classList.add('invalid')
}

function validateInput(element) {
    element.classList.remove('invalid')
}

validateEmail(email)
validateName(pName)
