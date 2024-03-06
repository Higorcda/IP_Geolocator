
const request = require('request');

function geolocate(ip_address, callback) 
{

    request(`http://ip-api.com/json/${ip_address}`, (error, response, body) => 
    {

        if (error) 
        { 
            
            callback(false, 'system', `IP Address Geolocation Failure - Error Message: ${error}`, null); 
            
            return; 
        
        }

        const i = JSON.parse(body);

        if (i.status === 'fail') 
        { 
            
            callback(false, 'form', `IP Address Geolocation Failure - Error Message: ${i.message}`, null); 
            
            return; 
        
        } 

        const ip_infos = 
        {
            ip_address      :                      i.query,
            country         :                    i.country,
            city_and_region : `${i.city}, ${i.regionName}`,
            latitude        :                        i.lat,
            longitude       :                        i.lon,
            isp             :                        i.isp
        };

        callback(true, null, null, ip_infos);

    });

}

module.exports = geolocate;