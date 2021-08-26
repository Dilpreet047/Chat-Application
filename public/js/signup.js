//Getting data from the DOM
const button = document.getElementById('signup-form');
const msgBox = document.getElementById('alert');


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
    
    if(password === password2){
        fetch('data', requestOptions)
        .then(response => response.json())
        .then(data => {
            if(data.msg == 1001){
                msgBox.style.display = "block";
                msgBox.innerHTML = `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                                        Username already taken.`
            }

            else{
                window.location.href = './index.html'
            }
        }); 
    }

    else{
        msgBox.style.display = "block";
        msgBox.innerHTML = `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                                        Password does not match.`
    }
     

    e.target.elements.username.value = '';
    e.target.elements.password.value = '';
    e.target.elements.password2.value = '';

})



