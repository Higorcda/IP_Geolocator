
const request_module = require('request');

global.router.post('/geolocate', (request, response) => 
{

    const ip_address = request.body.ip_address;

    if (!ip_address) 
    {

        response.render('index', { failure: 'Informe o Endereço IP que deseja geolocalizar' }); return;

    }

    request_module(`http://ip-api.com/json/${ip_address}`, (error, req_response, body) => 
    {

        if (error) 
        {

            response.render('index', { failure: 'Não foi possível geolocalizar o Endereço IP informado' }); return;

        }

        const i = JSON.parse(body);

        const ip_infos = 
        {
            ip_address     :                                        i.query,
            country        :                                      i.country,
            city_and_state :                   `${i.city}, ${i.regionName}`,
            latitude       :                                          i.lat,
            longitude      :                                          i.lon,
            isp            :                                          i.isp,
            proxy          : i.proxy == null ? 'Não detectada' : 'Detectada'
        };

        response.render('index', { ip_infos: ip_infos });

    });

});