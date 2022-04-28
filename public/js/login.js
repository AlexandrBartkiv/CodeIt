const lgin = document.querySelector('.login')


//login button event
lgin.addEventListener('click', ()=>{
    fetch('/login',{
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

 const validateData = (data)=>{     // checking correct login data or not
     if(!data.name){
         alertBox(data);     //allert if not correct
         console.log(data)
     }else{    //save user info into storage
         sessionStorage.name = data.name;
         sessionStorage.email = data.email;
         sessionStorage.birthdate = data.birthdate;
         sessionStorage.country = data.country
         location.href='/logged';   //go user home
     }
 }
//alertBox logic
 const alertBox = (data) =>{   
     const alertConteiner = document.querySelector('.alertBox')
     const alertMsg = document.querySelector('.alertBox')

     alertMsg.innerHTML = data;

     alertConteiner.style.top = '1rem';

     setTimeout(()=>{
         alertConteiner.style.top = '-10rem'
     }, 3000)
 }
