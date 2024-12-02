//Aplicação da máscara para CPF
document.getElementById('cpf').addEventListener('input', function (event) {
    let cpf = event.target.value;

    //Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    //Aplica máscara de CPF: 000.000.000-00
    //Primeiro ponto
    if (cpf.length > 3) {
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    }

    //Segundo ponto
    if (cpf.length > 6) {
        cpf = cpf.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    }

    //Hífen
    if (cpf.length > 9) {
        cpf = cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    }

    //Limita o CPF formatado a 14 caracteres
    cpf = cpf.substring(0, 14);

    //Atualiza o valor do campo
    event.target.value = cpf;
});

//Função para validar o CPF
function validarCPF(cpf) {
    const cpfNumero = cpf.replace(/\D/g, '')
    return cpfNumero.length === 11; //valida se tem 11 NÚMEROS
}

//Modal de erro quando o CPF não tem a quantidade de caracteres necessária
function abrirModal(mensagem) {
    const modal = document.getElementById('cpfModal');
    const modalMessage = modal.querySelector('p');
    const closeBtn = modal.querySelector('.close');

    //Definir a mensagem de erro do modal
    modalMessage.textContent = mensagem;
    //Exibe a modal
    modal.style.display = 'block';

    //Fecha o modal ao clicar no "fechar/x"
    closeBtn.onClick = function () {
        modal.style.display = 'none';
    };
}
//Envio de informações
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault //Evita o envio do form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    //Validações
    if (!validarCPF(cpf)) {
        abrirModal('CPF não é válido. Deve conter 11 caracteres.')
        return;
    }

    if(password !== confirmPassword) { abrirModal('As senhas não conferem. Tente novamente!')
        return;
    };

//Verifica se o e-mail já está cadastrado
    const user = JSON.parse(localStorage.getItem('users')) || [];
    if (user.some(user =>user.email === email)){
        abrirModal('Esse e-mail já está sendo utilizado na plataforma.'); 
        return; 
    }
});
