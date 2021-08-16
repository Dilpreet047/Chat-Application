//Getting data from the DOM
const button = document.getElementById('signup-form');


button.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const password2 = e.target.elements.password2.value;
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: username, password: password})
    };

    fetch('http://localhost:5000/data', requestOptions)
        .then(response => response.json())
        .then(data => console.log('chala gaya'));  

    e.target.elements.username.value = '';
    e.target.elements.password.value = '';
    e.target.elements.password2.value = '';

})



