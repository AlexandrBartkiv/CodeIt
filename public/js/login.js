const lgin = document.querySelector('.login')
console.log(lgin)


lgin.addEventListener('click', ()=>{
    console.log('f')
    fetch('/login-user',{
        method: 'post',
        headers: new Headers({'Content-Type':'application/json'}),
        body: JSON.stringify({
            login: login.value,
            password: password.value
        })
    })
    .then(res => res.json())
    .then(data => {
        validateData(data); 
    })
})

 const validateData = (data)=>{
     if(!data.name){
         alertBox(data);
         console.log(data)
     }else{
         sessionStorage.name = data.name;
         sessionStorage.email = data.email;
         sessionStorage.birthdate = data.birthdate;
         sessionStorage.country = data.country
         location.href='/logged';
     }
 }

 const alertBox = (data) =>{
     const alertConteiner = document.querySelector('.alertBox')
     const alertMsg = document.querySelector('.alertBox')

     alertMsg.innerHTML = data;

     alertConteiner.style.top = '1rem';

     setTimeout(()=>{
         alertConteiner.style.top = '-10rem'
     }, 5000)
 }
