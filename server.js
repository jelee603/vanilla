const express = require("express")
const cors = require("cors")
const app = express();

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/")
})
app.use(cors())

app.get("/", (req, res) => {

    const {page = null, pageSize} = req.query
    const list = []
    const totalCount = 50
    const _pageSize = pageSize || 10

    for (let ix = 1; ix < totalCount; ix++) {
        const obj = {
            index: ix,
            name: `item`,
            value: Math.floor(Math.random() * 1000),
            total: totalCount
        }
        list .push(obj)
    }

    if (page === null) {
        res.send(list)
        res.end()
    } else {

        const start = (page === 1) ? page : page * _pageSize
        const end = start + _pageSize

        const newList = list.filter(v => v.index >= start && v.index <= end)
        res.send(newList)
        res.end();
    }
});

