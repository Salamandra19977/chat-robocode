const fs = require("fs")
const dbFile = "./chat.db"
const exists = fs.existsSync(dbFile)
const sqlite3 = require("sqlite3").verbose()
const dbWrapper = require("sqlite")

let db

dbWrapper.open({
    filename: dbFile,
    driver: sqlite3.Database
}).then(async dBase => {
    db = dBase
    try {
        if(!exists) {
            await db.run(
                `CREATE TABLE user()`
            )
            await db.run(
                `INSERT INTO user()`
            )
            await db.run(
                `CREATE TABLE message()`
            )
        } else {
            console.log(await db.all(`SELECT * FROM user`))
        }

    } catch(dbError) {
        console.error(dbError)
    }
})