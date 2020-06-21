'use-strict'
let TEMPLATE = {};
let properties = {
    gUrl: {
        'keys': {
            'portfolio': '1fXhBIb50Hj6Slo9hRgjdrhfyUXLItvMZX9u19nTEhRs',
            'category': '',
        },
        makeUrl(key) {
            // key existence check
            if(!key || typeof key != 'string') {
                alert('key not set'); // temporary construction
            } else {
                let urlPrev = 'https://spreadsheets.google.com/feeds/list/';
                let urlLast = '/od6/public/values?alt=json';
                key = urlPrev + key + urlLast;
            }
            return key;
        },
    },
};