const http = require("http")
const path = require("path")
const fs = require("fs")

const indexHtmlFile = fs.readFileSync(path.join(__dirname, "static", "index.html"))
const scriptFile = fs.readFileSync(path.join(__dirname, "static", "script.js"))
const styleFile = fs.readFileSync(path.join(__dirname, "static", "style.css"))

const server = http.createServer((req, res) => {
    switch(req.url) {
        case "/": return res.end(indexHtmlFile)
        case "/script.js": return res.end(scriptFile)
        case "/style.css": return res.end(styleFile)
    }

    res.statusCode = 404
    return res.end("Error 404")
})

server.listen(3000)

const { Server } = require("socket.io")
const io = new Server(server)

io.on("connection", (socket) => {
    console.log("user connected. id - " + socket.id)
    let userNickName = "user"

    socket.on("set_nickname", (nickname) => {
        userNickName = nickname
    })

    socket.on("new_message", (message) => {
        console.log(`${socket.id} - ${message}`)
        io.emit("message", userNickName + ":" + message)
    })
})
