const greeting = document.querySelector('h1');
const usermail = document.querySelector('.useremail');
const userbirth = document.querySelector('.userbirth');
const usercountry = document.querySelector('.usercountry')
const logOut = document.querySelector('.logOut')
console.log(greeting)

window.onload = () =>{
    if(!sessionStorage.name){   // to login page if there is no data in storage
        location.href='/'
    }else{
        //put storage data into user info 
        greeting.innerHTML = `Hello ${sessionStorage.name}`;
        userbirth.innerHTML = `Born ${sessionStorage.birthdate}`;
        usercountry.innerHTML = `From ${sessionStorage.country}`;
        usermail.innerHTML = `Email: ${sessionStorage.email}`
    }
}
//log out button logics
logOut.addEventListener('click', () => {
    sessionStorage.clear();
    location.reload();
})  