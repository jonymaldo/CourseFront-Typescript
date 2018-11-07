import '../css/style.css'
var routes = [
    {
        "path": "/",
        "component": "list.html",
        "controller": function () {
            $.getJSON('./data/books.json').done(
                function (response) {
                    let items = response.items;
                    var ract = new Ractive({
                        target: "#books",
                        template: "#templateCards",
                        data: { items: items }
                    })
                }
            )
        }
    },
    {
        "path": "/details/:id",
        "component": "details.html",
        "controller": function (id) {
            $.getJSON('./data/books.json').done(
                function (response) {
                    let items = response.items;
                    let item = items.find(
                        function (elem) {
                            return elem.id === id;
                        }
                    );
                    let ract = new Ractive({
                        target: "#books",
                        template: "#templateBooks",
                        data: item.volumeInfo
                    });
                });
        }
    }
];

function getContent(url, callback, param) {
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'text',
        success: function (response) {
            $("#dynamicContent").html(response);
            if (param != undefined) {
                callback(param);
            } else {
                callback();
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
};

function router(ltn) {
    let loc = ltn;
    routes.map(
        function (data) {
            let url = loc.hash.slice(1) || '/';
            let parts, param;
            parts = url.substring(1).split('/');
            if (url == "/" && data.path === "/") {
                getContent(`./components/${data.component}`, data.controller);
            } else if (data.path.match(/:id/g)) {
                let mod = data.path.split('/:id')[0].slice(1);
                while (parts.length) {
                    if (parts.shift() == mod) {
                        param = parts.shift();
                        getContent(`./components/${data.component}`, data.controller, param);
                    } else {
                        parts.shift();
                    }
                }
            } else {
                let mod = data.path.slice(1);
                while (parts.length) {
                    if (parts.shift() == mod) {
                        getContent(`./components/${data.component}`, data.controller);
                    } else {
                        parts.shift();
                    }
                }
            }
        }
    )
};

$(document).ready(function () {
    $('.toggle-sidebar').click(function (event) {
        event.preventDefault();
        if (!$('.left-aside').hasClass('aside-close')) {
            $('.left-aside').toggleClass('aside-close');
            $('.left-aside').animate({
                flex: '0 0 50px'
            }, function () {
                $('.main-section').toggleClass('col-11');
            });
        } else {
            $('.main-section').toggleClass('col-11');
            $('.left-aside').animate({
                flex: '0 0 25%'
            }, function () {
                $(this).toggleClass('aside-close');
            });
        }
    });
});

$(window).on('load', function (e) {
    console.log("ENtro")
    let event = e.originalEvent;
    router(event.target['location']);
});


$(window).on('hashchange',function(e){
    let event =e.originalEvent;
    router(event.target['location']);
})
