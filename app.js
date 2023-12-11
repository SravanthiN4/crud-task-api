const express = require('express');
const app = express();

const mongoose = require('./database/mongoose');

const TaskList = require('./database/models/tasklist');
const Task = require('./database/models/task')


app.use(
    (request,response,next) => {
        //website you allow to connect
        response.setHeader('Access-Control-Allow-Origin','*');

        //request methods you wish to allow
        response.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE');

        //request headers you wish to allow
        response.setHeader('Access-Control-Allow-Headers','Origin','X-Requested-With,content-type, Accept');

        //pass to next layer of middleware
        next();

    }
);

app.use(express.json());

//routes or rest api endpoints or restful webservices
//Get All Task List

app.get('/tasklists',(req,res) => {
    TaskList.find({})
    .then((lists) => {
        res.status(200);
        res.send(lists);
        
    })
    .catch((error) => {
        console.log(error);
        res.status(500);
    });
});

app.get(
    '/tasklists/:tasklistId',(req,res) => {
        let taskListId = req.params.tasklistId;
        TaskList.find({_id:taskListId})
        .then((taskList) => {
            res.status(200)
            res.send(taskList)
        })
        .catch((error) => {
            console.log(error)
        })
    }
);

//endpoint for creating task list
app.post('/tasklists',(req,res) => {
    console.log(req.body);
    let taskListObj = {'title': req.body.title};
    TaskList(taskListObj).save()
    .then((taskList) => {
        res.status(201);
        res.send(taskList);
        
    })
    .catch((error) => {
        console.log(error);
        res.status(500);
    });
})

//endpoint to get one task
app.put('/tasklists/:tasklistId',(req,res) => {
    TaskList.findOneAndUpdate({ _id: req.params.tasklistId},{$set: req.body})
    .then((taskList) => {
        res.status(200)
        res.send(taskList)
    })
    .catch((error) => {
        console.log(error)
    })
})

app.patch('/tasklists/:tasklistId',(req,res) => {
    TaskList.findOneAndUpdate({ _id: req.params.tasklistId},{$set: req.body})
    .then((taskList) => {
        res.status(200)
        res.send(taskList)
    })
    .catch((error) => {
        console.log(error)
    })
})

app.delete('/tasklists/:tasklistId',(req,res) => {
    TaskList.findByIdAndDelete({ _id: req.params.tasklistId})
    .then((taskList) => {
        res.status(201)
        res.send(taskList)
    })
    .catch((error) => {
        console.log(error)
    })
})


app.listen(3000,() => {
    console.log("server started on port 3000");
})