/* Username and password*/
const UsernameLogin = document.getElementById('username');
const PasswordLogin = document.getElementById('password');
const LoginButton = document.getElementById('login-btn');

LoginButton.addEventListener('click', (e) => {
    e.preventDefault();
    const un = UsernameLogin.value;
    const pd = PasswordLogin.value;
    if(un === 'asd' && pd === '123'){
        window.location.href = './home.html'
    }
})