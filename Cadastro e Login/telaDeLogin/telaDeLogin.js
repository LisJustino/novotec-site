document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
   
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    if (usuario === 'teste' && password === '1234567890') {
        errorMessage.textContent = '';
        alert('Bem-vindo :)');
    } else {
        alert('Usuário ou senha incorretos :(');
    }
});