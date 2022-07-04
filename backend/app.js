const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Todo = require('./models/todoSchema')

const PORT = process.env.PORT || 4000;

const app=express();

app.use(cors());
app.use(express.json());

//set up mongoose
const dbURI = `mongodb+srv://testuser:testuser123@todo-app.ahmt2yk.mongodb.net/todo-app?retryWrites=true&w=majority`
mongoose.connect(dbURI).
then(res=>{
    console.log('connected to database')
    app.listen(PORT , err =>{
        if(err){
            console.log(err);
        }
        else{
            console.log(`listening on port ${PORT}`)
        }
    })
})

app.get('/', (req, res) => {
    res.status(200)
    res.send('Todo app backend is running')
})

app.get('/todos', (req, res) => {
    Todo.find()
    .then(result=>{
        res.status(200)
        res.send(result)
    })
    .catch(err=>{
        res.status(404)
        res.send(`cannot get todos successfully`)
    })
})

app.post('/add-todo' , (req, res)=>{
    const myTodo = new Todo(req.body)
    myTodo.save()
    .then(result=>{
        res.status(201)
        res.send(result)
    })
    .catch(err=>{
        res.status(404)
        res.send(err)
    })
})

app.delete('/todo/:id', (req, res) =>{
    const id = req.params.id;
    Todo.findByIdAndDelete(id)
    .then(result=>{
        res.status(200)
        res.send(`Todo deleted successfully`)
    })
    .catch(err=>{
        res.status(404)
        res.send(`Error in deleting todo`)
    })
})

app.put('/todo/:id', (req, res) =>{
    const id = req.params.id;
    const myTodo = req.body;
    
    Todo.findByIdAndUpdate(id , myTodo)
    .then(result=>{
        res.status(201)
        res.send(`Todo updated successfully`)
    })
    .catch(err=>{
        res.status(404)
        res.send(`Error in updating todo`)
    })
})