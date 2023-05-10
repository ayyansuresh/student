const express = require('express')
const app = express();

const mysql = require('mysql');
const cors = require('cors')
const bodyparser = require('body-parser')

app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))

const con = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'student'
})

con.getConnection((err,resu)=>{
    if(err) throw err;
    console.log("connected");
})

app.get('/get_details',(req,res)=>{
    const sql = "select * from users"
    con.query(sql,(err,resu)=>{
        if (err) throw err
        res.send(resu);
    })
})

app.post('/insert_details',(req,res)=>{
    const {firstname,lastname,location,email,dob,education,about} = req.body;
    const sql = "insert into users(firstname,lastname,location,email,dob,education,about) values(?,?,?,?,?,?,?)"
    con.query(sql,[firstname,lastname,location,email,dob,education,about],(err,resu)=>{
        if (err) throw err
        res.send("New Student inserted");
    })
})

app.delete('/delete_user/:id',(req,res)=>{
    const { id } = req.params
    const sql = "delete from users where id=?"
    con.query(sql,[id],(err,result)=>{
        if(err) throw err
        res.send("Selected user deleted")
    })
})

app.put('/update_details/:id',(req,res)=>{
    const {firstname,lastname,location,email,dob,education,about} = req.body;
    const { id } = req.params;
    const sql = "update users set firstname=?,lastname=?,location=?,email=?,dob=?,education=?,about=? where id=?"
    con.query(sql,[firstname,lastname,location,email,dob,education,about,id],(err,resu)=>{
        if (err) throw err
        res.send("Student details updated");
    })
})

app.get('/anyone_details/:id',(req,res)=>{
    const { id } = req.params
    const sql = "select * from users where id=?"
    con.query(sql,[id],(err,result)=>{
        if(err) throw err
        res.send(result)
    })
})

app.get('/',(req,res)=>{
    res.send("Hai I Am sureshkumar")
})

app.listen(5002,()=>{
    console.log('Port is working')
})