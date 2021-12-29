const tools = require("./mint");
// get the client
const mysql = require('mysql2/promise');

// get the promise implementation, we will use bluebird
const bluebird = require('bluebird');
let connection;

const createconn = () => mysql.createConnection({
        host: "104.131.177.215",
        user: "admin_default",
        database: "admin_default",
        password: "Efln025E7e",
        Promise: bluebird
    });

async function runWatcher() {
    connection = createconn()
    try {
        const [result] = await (await connection).execute("SELECT id, address  FROM cards WHERE status=0 AND tokenId=0 ORDER BY id ASC LIMIT 1")
        await (await connection).end()
        if (result.length) {
            let tokenId = await tools.mint();
            //after mint should call gift.js
            connection = createconn()
            await (await connection).execute(`UPDATE cards SET status=?, tokenId=? WHERE id=${result[0].id}`, [1, tokenId])
            console.log("SUCCESSFULLY UPDATED");
            await (await connection).end()
            await runWatcher();
        } else {
            console.log("NOT UPDATED");
            await (await connection).end()
            setTimeout(async () => {
                await runWatcher();
            }, 5000)
        }
    } catch(e) {
        console.log("NOT UPDATED", e.message);
        await (await connection).end()
        setTimeout(async () => {
            await runWatcher();
        }, 5000)
    }
}

runWatcher();

