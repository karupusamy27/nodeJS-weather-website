fetch('https://puzzle.mead.io/puzzle').then(
    (response)=>{
        response.json().then(
            (data)=>{console.log(data)
        })
})

const weatherform=document.querySelector('form');
const searchTerm=document.querySelector('input');
const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');

messageOne.textContent='Loading...';
messageTwo.textContent='';

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = searchTerm.value;
    fetch(`/weather?address=${location}`).then(
        (response)=>{
            response.json().then(
                (data)=>{
                if(data.error){
                    messageOne.textContent=data.error;
                    messageTwo.textContent='';
                }else{
                    messageOne.textContent=data.location;
                    messageTwo.textContent=data.forecast;
                }
            })
    })
})
