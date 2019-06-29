import {Table} from "./js/table"
import axios from "axios"
import GoldenLayout from "golden-layout"
import {Route} from "./js/route"
import {Router} from "./js/router"

(function() {
    function init() {
        const router = new Router([
            new Route('tablePage', 'tablePage.html', true),
            new Route('testPage', 'testPage.html', true)
        ])
    }
    init()

    const {search} = window.location
    const [page, pageNum] = search.split("=")
    const pageSize = 5
    const config = {
        content: [{
            type: 'row',
            content:[{
                type: 'component',
                componentName: 'testComponent',
                componentState: { label: 'A' }
            },{
                type: 'column',
                content:[{
                    type: 'component',
                    componentName: 'testComponent',
                    componentState: { label: 'B' }
                },{
                    type: 'component',
                    componentName: 'testComponent',
                    componentState: { label: 'C' }
                }]
            }]
        }]
    };
    const target = document.createElement("div")
    target.innerHTML = `<table class="table table-hover table-light">
            <thead class="thead-light">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Value</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul class="pagination"> </ul>
        </nav>`

    const myLayout = new GoldenLayout(config)
    myLayout.registerComponent('testComponent', function(container, componentState){
        if (componentState.label === "A") {
            axios.get("http://localhost:3000/", {
                params: {
                    "page": pageNum,
                    "pageSize": pageSize
                }
            })
            .then(res => {
                const {data} = res

                new Table(target, data, pageSize)
            })
            container.getElement().html(target)
        } else {
            container.getElement().html( '<h2 style="color:deepskyblue">' + componentState.label + '</h2>' )
        }
    });
    myLayout.init()
})()

