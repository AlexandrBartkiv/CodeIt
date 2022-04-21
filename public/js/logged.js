const greeting = document.querySelector('h1');
const usermail = document.querySelector('.useremail');
const userbirth = document.querySelector('.userbirth');
const usercountry = document.querySelector('.usercountry')
console.log(greeting)
window.onload = () =>{
    if(!sessionStorage.name){
        location.href='/'
    }else{
        greeting.innerHTML = `Hello ${sessionStorage.name}`;
        userbirth.innerHTML = `Born ${sessionStorage.birthdate}`;
        usercountry.innerHTML = `From ${sessionStorage.country}`;
        usermail.innerHTML = `Email: ${sessionStorage.email}`
    }
}

