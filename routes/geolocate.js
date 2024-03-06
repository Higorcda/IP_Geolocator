
const geolocate = require('./../models/geolocate_model.js');

global.router.post('/geolocate', (request, response) => 
{

    const ip_address = request.body.ip_address;

    if (!ip_address) 
    {

        response.render('index', { form_error: 'Empty IP Address Field' });

        return;

    }

    geolocate(ip_address, (status, error_type, error, ip_infos) => 
    {

        if ((status == false) && (error_type != null) && (error != null) && (ip_infos == null)) 
        {

            if (error_type == 'system') 
            {

                request.flash('failure', error); response.redirect('/'); return;

            }

            response.render('index', { form_error: error }); return;

        }

        success(ip_infos);

    });

    function success(ip_infos) 
    {

        ip_infos['geolocated'] = true;

        response.render('index', ip_infos);

    }

});