'use strict'

let TV = {};

TV.albumGrid = function() {
    let container = $('.album-grid');
    container.isotope({
        // options
        itemSelector: '.album-grid-item',
        layoutMode: 'fitRows'
    });

    $('.filters-group').on('click', 'a', function() {
        let filterValue = $(this).attr('data-filter');
        container.isotope({filter: filterValue});
    });

    $('.filters-group').each(function(i, filterGroup) {
        let button = $(filterGroup);
        button.on('click', 'a', function() {
            button.find('.active').removeClass('active');
            $(this).addClass('active');
        })
    });
}

TV.albumGrid();