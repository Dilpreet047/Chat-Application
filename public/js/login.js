/* Username and password*/

const LoginButton = document.getElementById('login-form');

LoginButton.addEventListener('submit', (e) => {
    e.preventDefault();
    const un = e.target.elements.username.value;
    const pd = e.target.elements.password.value;

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: un, password: pd})
    };

    fetch('http://localhost:5000/data/login', requestOptions)
        .then(response => response.json())
        .then(data => console.log('chala gaya'));

    e.target.elements.username.value = '';
    e.target.elements.password.value = '';


})