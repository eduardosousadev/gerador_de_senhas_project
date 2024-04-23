// Seleção de elementos
const generatePasswordButton = document.querySelector('#generate-password');
const generatedPasswordDiv = document.querySelector('#generated-password');

// Novas funcionalidades
const openCloseGeneratorButton = document.querySelector('#open-generate-password');
const generatePasswordContainer = document.querySelector('#generate-options');
const warningLabelP = document.querySelector('#warning');
const eyeI = document.querySelector('.bi.bi-eye-slash');
const passwordInput = document.querySelector('#password');
const lengthInput = document.querySelector('#length');
const lettersInput = document.querySelector('#letters');
const numbersInput = document.querySelector('#numbers');
const symbolsInput = document.querySelector('#symbols');
const copyPasswordButton = document.querySelector('#copy-password');

// Funções
// Letras, números e símbolos
const getLetterLowerCase = () => {
    return(String.fromCharCode(Math.floor(Math.random() * 26) + 97));
};

const getLetterUpperCase = () => {
    return(String.fromCharCode(Math.floor(Math.random() * 26) + 65));
};

const getNumber = () => {
    // return(String.fromCharCode(Math.floor(Math.random() * 10) + 48));
    return Math.floor(Math.random() *  10).toString();
};

const getSymbols = () => {
    // return(String.fromCharCode(Math.floor(Math.random() * 15) + 33));
    const symbols = '(){}[]=<>/,.!@#$%&*+-';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbols) => {
//     let password = '';
//     const passwordLength = 10;
//     const generators = [
//         getLetterLowerCase,
//         getLetterUpperCase,
//         getNumber,
//         getSymbols
//     ];

//     for(i = 0; i < passwordLength; i += 4) {
//         generators.forEach(() => {
//             const randomValue = generators[Math.floor(Math.random() * generators.length)]();
//             password += randomValue;
//         });
//     }

//     password = password.slice(0, passwordLength);

//     generatedPasswordDiv.style.display = 'block';
//     generatedPasswordDiv.querySelector('h4').innerText = password;

// }

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbols) => {
    let password = '';
    const passwordLength = lengthInput.value;
    const generators = [];

    if(lettersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase);
    };
    if(numbersInput.checked) {
        generators.push(getNumber);
    };
    if(symbolsInput.checked) {
        generators.push(getSymbols);
    };

    if(generators.length === 0 ) {
        return;
    }


    for(i = 0; i < passwordLength; i += generators.length) {
        generators.forEach(() => {
            const randomValue = generators[Math.floor(Math.random() * generators.length)]();
            password += randomValue;
        });
    }

    password = password.slice(0, passwordLength);

    generatedPasswordDiv.style.display = 'block';
    generatedPasswordDiv.querySelector('h4').innerText = password;

}


// Eventos
generatePasswordButton.addEventListener('click', (e) => {
    e.preventDefault();
    if(lengthInput.value > 15) {
        warningLabelP.style.color = 'red';
        lengthInput.style.color = 'red';
        return;
    }
    generatePassword(getLetterLowerCase, getLetterUpperCase, getNumber, getSymbols);
})

openCloseGeneratorButton.addEventListener('click', () => {
    generatePasswordContainer.classList.toggle('hide');3
    generatedPasswordDiv.classList.toggle('hide');
})

copyPasswordButton.addEventListener('click', (e) => {
    e.preventDefault();

    const password = generatedPasswordDiv.querySelector('h4').innerText;

    // Colocando o password no ctrl + c
    navigator.clipboard.writeText(password).then(() => {
        copyPasswordButton.innerText = 'Senha copiada com sucesso!';

        setTimeout(() => {
            copyPasswordButton.innerText = 'Copiar';
        }, 1000)
    });
});

lengthInput.addEventListener('click', () => {
    warningLabelP.style.color = '#aaa';
    lengthInput.style.color = '#000';
})

lengthInput.addEventListener('keydown', (e) => {
    // Permitir as teclas de controle Backspace, delete, setas, apenas números e até dois dígitos
    if( e.key === 'Backspace' || e.key === 'Delete' || 
        e.key === 'ArrowLeft' || e.key === 'ArrowRight' || 
        (e.key >= '0' && e.key <= '9' && lengthInput.value.length <= 1) 
    ) {
        return;
    } else {
        e.preventDefault();
    }

});

eyeI.addEventListener('click', () => {
    if(eyeI.classList.contains('bi-eye-slash')) {
        eyeI.classList.remove('bi-eye-slash');
        eyeI.classList.add('bi-eye-fill');
        passwordInput.type = 'text';
    }else if(eyeI.classList.contains('bi-eye-fill')) {
        eyeI.classList.remove('bi-eye-fill');
        eyeI.classList.add('bi-eye-slash');
        passwordInput.type = 'password';
    }
})