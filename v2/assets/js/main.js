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
};

TEMPLATE.fetchAlbumsGrid = function() {
    // get gSheet object
    // query
    let prepareOuery = function(url, calback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            let status = xhr.status;
            (status == 200) ? calback(null, xhr.response) : calback(status, xhr.response);
        };
        xhr.send();
    }

    let key = properties.gUrl['keys']['portfolio']; // get key for makeUrl function
    
    prepareOuery(properties.gUrl.makeUrl(key), function(err, data) {
        if (err != null) {
            alert(err); // temporary construction
            console.log(err);
        } else {
            data = data['feed']['entry'];
            // console.log(data);
            document.querySelector('.albums-grid').innerHTML = fetchAlbumsItems(data);
            document.querySelector('.work-nav').innerHTML = fetchAlbumsFilters(data);

            // TEMPLATE.albumsGridFilter();
        }
    });

    function fetchAlbumsItems(data) {
        let albumsItems = '';
        for (let i = 0; i < data.length; i++) {
            if (data[i]['gsx$published']['$t'] != false) {
                albumsItems += `<li class="albums-grid-item col-md-4 ${data[i]['gsx$category']['$t']}">`;
                albumsItems += `<a class="hover-wrap fancybox" title="${data[i]['gsx$title']['$t']}" href="${data[i]['gsx$imgfull']['$t']}">`;
                albumsItems += `<span class="overlay-img">${data[i]['gsx$description']['$t']}</span>`;
                albumsItems += `<span class="overlay-img-thumb font-icon-plus"></span>`;
                albumsItems += `</a>`;
                albumsItems += `<img src="${data[i]['gsx$imgthumb']['$t']}" class="img-fluid" alt="${data[i]['gsx$title']['$t']}">`;
                albumsItems += `</li>`;
            }
        }
        return albumsItems;
    }

    function fetchAlbumsFilters(data) {
        let category = new Set();
        let categoryItems = `<li><a class="filter-group active" data-filter="*" href="#filter">All Projects</a></li>`;

        for (let i = 0; i < data.length; i++) {
            if (data[i]['gsx$published']['$t'] != false) {
                let item = data[i];
                category.add(data[i]['gsx$category']['$t']);
            }
        }

        for (let value of  category){
            categoryItems += `<li><a class="filter-group" data-filter=".${value}" href="#filter">work 1</a></li>`;
        }

        return categoryItems;
    }
};

TEMPLATE.albumsGridFilter = function() {
    let container = $('.albums-grid');
    container.isotope({
        // options
        itemSelector: '.albums-grid-item',
        layoutMode: 'fitRows'
    });

    $('.albums-filters-group').on('click', 'a', function() {
        let filterValue = $(this).attr('data-filter');
        container.isotope({filter: filterValue});
    });

    $('.albums-filters-group').each(function(i, filterGroup) {
        let button = $(filterGroup);
        button.on('click', 'a', function() {
            button.find('.active').removeClass('active');
            $(this).addClass('active');
        })
    });
}

TEMPLATE.showErrorMessage = function() {
    
}

TEMPLATE.fetchAlbumsGrid();