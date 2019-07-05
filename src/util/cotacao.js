const request = require('request');
const token = 'GpRXjCiMCrbYm0J3UvgSnWbRRsiP2Fkgb9IX8lAwWpyDO2exYRahi1eDgHJe';

const cotacao = (symbol, callback) =>{
    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${token}`;
    
    request({url: url, json: true}, (err, response) =>{
            if(err){
                callback({
                    mensage: `Algo deu errado na aplicação ${err}`,
                    code: 500
                }, undefined);
            }
            
            if(response.body === undefined || response.body.data === undefined){
                callback({
                    mensage: 'No data found',
                    code: 404
                }, undefined);
            }

            const dataJson = response.body.data[0];

            const {symbol, price_open, price, day_high, day_low} = dataJson;
            callback(undefined, {symbol, price_open, price, day_high, day_low}); 
        
    })
}

module.exports = cotacao