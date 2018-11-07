import { IRoute } from "../../models/interfaces/route";

var routes: IRoute[];

routes = [
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