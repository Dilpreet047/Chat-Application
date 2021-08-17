/* Username and password*/

const LoginButton = document.getElementById('login-form');
const alertMsg = document.getElementById('alert');


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
        .then(data => {
            if(data.msg == 200){
                window.location.href = './home.html';
            }
            else if(data.msg == 1001){
                alertMsg.style.display = "block"

            }
            else{
                console.log('some error')
            }
        });

    e.target.elements.username.value = '';
    e.target.elements.password.value = '';



})