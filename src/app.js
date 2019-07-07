const path = require('path');
const express = require('express');
const hbs = require('hbs');
const cotacoes = require('./util/cotacao')

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

//DEFINIÇÃO DA ROTA DAS PÁGINAS HOME, SOBRE E AJUDA - INICIA COM A INDEX (HOME)
app.get('', (req, res) =>{
    res.render('index', {
        title: 'Sistema de Cotações',
        author: 'Rafael Blum'
    }); 
});

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'Sobre',
        author: 'Rafael Blum '
    })
});

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Ajuda',
        author: 'Rafael Blum'
    })
})


//DEFINIÇÃO DA ROTA COTAÇÕES - 
app.get('/cotacoes', (req, res) =>{

    if(!req.query.ativo){
        return res.status(400).json({
            error: {
                mensage: 'O ativo deve ser informado como query',
                code: 400
            }
        })
    }

    const symbol = req.query.ativo.toUpperCase();

    cotacoes(symbol, (err, body) =>{
        if(err){
            return res.status(err.code).json({error: {
                mensage: err.mensage,
                code: err.code
            }})
        }
        res.status(200).json(body)
    })

});

//DEFINIÇÃO DA ROTA 404 - PAGE NOT FOUND
app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found - A pagina não foi encontrada ou foi removida!'
    });
});

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found - O link que você digitou está incorreto!'
    });
});
const port = process.env.port || 4000

app.listen(port, ()=>{
    console.log('Server is up port in project cotacoes...')
});