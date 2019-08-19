/**
 *  高德地图 api
 */

const key = 'a0efc19031fa4b7cac5ff1c73bdb0f95';
const url = 'https://restapi.amap.com/v3/config/district';

let keywords = '房山区';
let subdistrict = 3;

function getStreets(keywords, $streetField){
    $streetField.html('<option value="" selected>请选择「房山区」街道</option>');
    $.get(url, { key: key, keywords: keywords, subdistrict: subdistrict}, function(result, status){
        if(result.status === '1'){
            const streets = result.districts[0].districts;
            let streetsOption = '';
            streets.forEach(function(street){
                streetsOption += '<option value="' + street.name +'">' + street.name + '</option>'
            });
            $streetField.append(streetsOption);
        }else{
            console.log('something is wrong at ajax');
        }
    });
}
