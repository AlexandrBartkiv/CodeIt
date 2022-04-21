const username = document.querySelector('#name') || null;
const login = document.querySelector('#login');
const email =document.querySelector('#email');
const password = document.querySelector('#password');
const country = document.querySelector('#country');
const date = document.querySelector('#date');
const sbmt = document.querySelector('.sub');
const check = document.querySelector('#check')

const form = document.querySelector('.regForm') 
const constrains = {
    password: {
        presence: true,
        length : {
            minimum: 6,
            message: 'must be at least 6 characters'
        }
    },
    login: {
        presence:true
    },
    email:{
        presence: true,
        email: true
    },
    name:{
        presence: true
    },
    country:{
        presence:true
    },
    date: {
        presence: true
    }
}

const picker = datepicker('.date', {
    formatter: (input, date, instance) => {
      const value = date.toLocaleDateString()
      input.value = value 
    }
})





sbmt.addEventListener('click', ()=>{
    console.log('click')
    var valid = validate(form,constrains)
    console.log(valid)
    if(!valid){
        fetch('/register-user',{
            method: 'post',
            headers: new Headers({'Content-Type':'application/json'}),
            body: JSON.stringify({
                username: username.value,
                email: email.value, 
                password: password.value,
                date: date.value,
                country: country.value,
                login: login.value
            })
        })
        .then(res => res.json())
        .then(data =>{
            if(data.email){
                alert('register')
            }
        })
    }else{
        if(valid.password){
            password.style.background = '#ff2626';
            password.nextElementSibling.innerHTML = valid.password
        }if(valid.login){
            login.style.background = '#ff2626';
            login.nextElementSibling.innerHTML = valid.login
        }if(valid.name){
            username.style.background = '#ff2626';
            username.nextElementSibling.innerHTML = valid.name
        }if(valid.email){
            email.style.background = '#ff2626';
            email.nextElementSibling.innerHTML = valid.email
        }if(valid.date){
            date.style.background = '#ff2626';
            date.nextElementSibling.innerHTML = valid.date
        }if(valid.country){
            country.style.background = '#ff2626';
            country.nextElementSibling.innerHTML = valid.country
        }
        if(!check.checked){
            console.log('nonchek')
            check.previousElementSibling.style.color='#ff2626';
        }
    }
    

    
})

inpts=document.querySelectorAll('input')
inpts.forEach(inp => {
inp.addEventListener('focus', (event)=>{
    console.log('focus')
    event.target.style.background='white'
    event.target.style.border='none'
    event.target.nextElementSibling.innerHTML = ''
})
})
check.addEventListener('focus',(event)=>{
    event.target.previousElementSibling.style.color = 'white'
})


const autoCompleteJS = new autoComplete({
    placeHolder: "Search for Food...",
    data: {
        src: ["Sauce - Thousand Island", "Wild Boar - Tenderloin", "Goat - Whole Cut"],
        cache: true,
    },
    resultItem: {
        highlight: true
    },
    events: {
        input: {
            selection: (event) => {
                const selection = event.detail.selection.value;
                autoCompleteJS.input.value = selection;
            }
        }
    }
});