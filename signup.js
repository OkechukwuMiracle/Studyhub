const login = document.getElementById('logBtn');
const signBtn  = document.getElementById('signBtn');
const signup_container  = document.getElementById('signup');
const log_container = document.getElementById('signIn');

login.addEventListener('click', ()=> {
    log_container.style.display = 'block'
    signup_container.style.display = 'none';
})

signBtn.addEventListener('click', ()=> {
    signup_container.style.display = 'block'
    log_container.style.display = 'none';
})