// v0.1.1
'use-strict'

let TEMPLATE = {};
let properties = {
    gUrl: {
        'keys': {
            'albums': '1fXhBIb50Hj6Slo9hRgjdrhfyUXLItvMZX9u19nTEhRs',
            'category': '',
        },
        'urlPrev': {
            'v0': 'https://spreadsheets.google.com/feeds/list/',
        },
        'urlLast': {
            'getSheet': '/od6/public/values?alt=json',
            'setSheet': '',
        },
        makeUrl(key, typeQuery) {
            // key existence check
            if(!key || typeof key != 'string') {
                alert('key not set (#001)'); // temporary construction
                return;
            } else {
                let queryUrl;
                switch(typeQuery) {
                    case 'get':
                        queryUrl = this['urlPrev']['v0'] + key + this['urlLast']['getSheet'];
                        break;
                    case 'set':
                        key = '';
                        break
                    default:
                        alert('typeQuery not set (#002)'); // temporary construction
                }
                return queryUrl;
            }
        },
    },
    libUrl: {
        'css': {
            'bootstrap': 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
        },
        'js': {
            'jquery': 'https://code.jquery.com/jquery-3.5.1.slim.min.js',
            'popper': 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',
            'bootstrap': 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js',
            'isotop': 'https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js',
        },
    },
    errorMessages: {},
};

TEMPLATE.fetchAlbumsGrid = function() {
    let key = properties.gUrl['keys']['albums']; // get key for makeUrl function

    function getSheet(url) {
        if (!url) {
            alert('url was not received (#003)'); // temporary construction
            return
        }
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'json';
            xhr.onload = () => resolve(xhr.response);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    }

    getSheet(properties.gUrl.makeUrl(key, 'get')).then(result => {
        if(!result) {
            return false;
        }
        let data = result['feed']['entry'];
        fetchItems(data);
    }, error => console.log(error));

    function fetchItems(data) {
        let albumsItems = '';
        let category = new Set();
        let categoryItems = `<li><a class="filter-group active" data-filter="*" href="#filter">All Projects</a></li>`;
        for (let i = 0; i < data.length; i++) {
            if (data[i]['gsx$published']['$t'] != false) {
                albumsItems += `<li class="albums-grid-item col-md-4 ${data[i]['gsx$category']['$t']}">`;
                albumsItems += `<a class="hover-wrap fancybox" title="${data[i]['gsx$title']['$t']}" href="${data[i]['gsx$imgfull']['$t']}">`;
                albumsItems += `<span class="overlay-img">${data[i]['gsx$description']['$t']}</span>`;
                albumsItems += `<span class="overlay-img-thumb font-icon-plus"></span>`;
                albumsItems += `</a>`;
                albumsItems += `<img src="${data[i]['gsx$imgthumb']['$t']}" class="img-fluid" alt="${data[i]['gsx$title']['$t']}">`;
                albumsItems += `</li>`;
                category.add(data[i]['gsx$category']['$t']);
            }
        }
        for (let value of category){
            categoryItems += `<li><a class="filter-group" data-filter=".${value}" href="#filter">${value}</a></li>`;
        }
        document.querySelector('.albums-grid').insertAdjacentHTML('afterbegin', albumsItems);
        document.querySelector('.work-nav').insertAdjacentHTML('afterbegin', categoryItems);
    }
};

TEMPLATE.enableFilters = function() {
    let container = $('.albums-grid').isotope({
        // options
        itemSelector: '.albums-grid-item',
        layoutMode: 'fitRows'
    });

    $('.albums-filters-group').on('click', 'a', function() {
        let filterValue = $(this).attr('data-filter');
        container.isotope({filter: filterValue});
    });

    $('.work-nav').each(function(i, filterGroup) {
        let button = $(filterGroup);
        button.on('click', 'a', function() {
            button.find('.active').removeClass('active');
            $(this).addClass('active');
        });
    });
}

TEMPLATE.showErrorMessage = function() {}

TEMPLATE.fetchAlbumsGrid();
setTimeout(() => TEMPLATE.enableFilters(), 2000);