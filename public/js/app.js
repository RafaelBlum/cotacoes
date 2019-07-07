console.log('Javascrip no frontEnd')

const cotacoesForm = document.querySelector('form');
const mainMensage = document.querySelector('p');

const symbol = document.querySelector('#symbol');
const price_open = document.querySelector('#price_open');
const price = document.querySelector('#price');
const day_high = document.querySelector('#day_high');
const day_low = document.querySelector('#day_low');

cotacoesForm.addEventListener('submit', (event) => {
    mainMensage.innerText = '';
    price_open.innerHTML = '';
    price.innerHTML = '';
    day_high.innerHTML = '';
    day_low.innerHTML = '';

    mainMensage.innerText = 'Buscando...';
    event.preventDefault()
    const ativo = document.querySelector('input').value

    if(!ativo){
        mainMensage.innerText = 'O ativo deve ser retornado';
        return;
    }
    
    fetch(`/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) =>{
            if(data.error){
                mainMensage.innerText = `Alguma coisa ocorreu de errado! -> ${data.error.mensage} [error ${data.error.code}]`;
            }else{
                mainMensage.innerText = `Bolsa: ${data.symbol}`;
                price_open.innerHTML = `Valor de abertura ${data.price_open}`;
                price.innerHTML = `Valor atual ${data.price}`;
                day_high.innerHTML = `Maior alta ${data.day_high}`;
                day_low.innerHTML = `Maior baixa ${data.day_low}`;
            }
        })
    })
})
