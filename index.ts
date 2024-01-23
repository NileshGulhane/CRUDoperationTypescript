// const express = require('express');
// const mysql = require('mysql')
import * as express from 'express'
import {Request, Response} from 'express'
import * as mysql from 'mysql'
const app = express()
app.use(express.json())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    port: "3306",
    database: "whatsapp"
})

db.connect((error: string) => {
    if (error) {
        console.log("Error found....")
    } else {
        console.log("Connection SuccessFully..")
    }
})


app.post('/postdata', (req: Request, res: Response) => {
    const data = req.body;
    const sql = `INSERT INTO customer SET ?`
    db.query(sql, data, (err: string, result: string) => {
        if (err) {
            console.log({ err: "Data Not Post..." })
            // res.json(err)
        } else {
            console.log({ result: "Data Post SuccessFullly...." })
        }
    })

})

app.get('/getdata', (req: Request, res: Response) => {
    const sql = ` SELECT * FROM customer`
    db.query(sql, (err: string, result: string) => {
        if (err) {
            console.log({ err: "data Not Get..." })
        } else {
            console.log({ result: "data get SuccessFully..." })
        }
    })
})


app.put('/dataupdate/:cid', (req: Request, res: Response) => {
    const data = req.body;
    const sql = `UPDATE customer SET ? WHERE cid =?`
    db.query(sql, [data], (err: string, result: string) => {
        if (err) {
            console.log({ err: "Data Not Update" })
        } else {
            console.log({ result: "Data Update SuccessFully..." })
        }
    })
})

app.delete('/deletedata/:cid', (req: Request, res: Response) => {
    const id = req.params.id;
    const sqlQuery = "DELETE FROM customer WHERE cid =?"

    db.query(sqlQuery,id,(err, result) => {
        if (err) {
            console.log({err:"Data Not Delete"})
            res.json(err)
        }
        else {
            console.log({result:"Data Delete SuccessFully"})
            res.status(200).json(result)
        }
    })
})


const PORT: Number = 5500
app.listen(PORT, () => {
    console.log(`Server Started On ${PORT}`)
})