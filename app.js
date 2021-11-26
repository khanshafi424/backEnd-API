const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

const TaskList = require('./database/models/taskList')
const Task = require('./database/models/task')


// Add headers before the routes are defined
app.use( (req, res, next)=> {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
// Example of middleware
app.use(express.json());


// Routes or REST API Endpointd or Restful webservices Endpoint
/*
  TaskList  - create , update , ReadTaskListById , ReadAllTaskList
  Task  - create , update , ReadTaskById , ReadAllTask
*/

// Routes or Api endpoints for TaskList model
// Get All Task lists
// http://localhost:3000/tasklist =>  [ {TaskList , tasklist}]


// respond with "task list" when a GET request is made to the homepage

app.get('/tasklists', (req, res) => {
    TaskList.find({})
    .then( lists=> {
        res.status(200)
        res.send(lists);
    })
    .catch(error=> { 
        console.log(error);
        res.status(500);
    })
  });

  //  get one tasklist by tasklistId 
app.get(
    '/tasklists/:tasklistId', (req, res) => {
      let tasklistId = req.params.tasklistId;
      TaskList.find({_id : tasklistId})
      .then( (taskList)=>{  
        res.status(200)
        res.send(taskList)
      })
      .catch(error=> { 
        console.log(error);
        res.status(500);
    })
 })




  app.post('/tasklists', (req,res) => {
    //   console.log("hello dear I am here")
    console.log(req.body)
    let taskListobj = { 'title': req.body.title};
     TaskList(taskListobj).save()
     .then( (taskList) => {
        res.status(201)
        res.send(taskList);
      })
     .catch(error=> { 
         console.log(error);
         res.status(500);
    })
  });
  
  // Update method full update 
  app.put( '/tasklists/:tasklistId',(req, res) =>{
    TaskList.findOneAndUpdate({_id: req.params.tasklistId} , {$set: req.body})
    .then( (taskList)=>{  
        res.status(200)
        res.send(taskList)
      })
      .catch(error=> { 
        console.log(error);
        res.status(500);
    })
  })

  // for one record update we use patch method
  app.patch( '/tasklists/:tasklistId',(req, res) =>{
    TaskList.findOneAndUpdate({_id: req.params.tasklistId} , {$set: req.body})
    .then( (taskList)=>{  
        res.status(200)
        res.send(taskList)
      })
      .catch(error=> { 
        console.log(error);
        res.status(500);
    })
  })

  // delete a tasklist by Id 
  app.delete( '/tasklists/:tasklistId',(req, res) =>{
    TaskList.findOneAndDelete(req.params.tasklistId)
    .then( (taskList)=>{  
        res.status(201)
        res.send(taskList)
      })
      .catch(error=> { 
        console.log(error);
        res.status(500);
    })
  })


  /* CRUD operation for Task, a task should always belong to Tasklist. */
  //Get all tasks for 1 TaskList , 

  app.get('/tasklists/:tasklistId/tasks', (req,res)=>{

    Task.find({_tasklistId: req.params.tasklistId})
    .then( tasks=> {
        res.status(200)
        res.send(tasks);
    })
    .catch(error=> { 
        console.log(error);
        res.status(500);
    })
  })


  // get One Task inside 1 tasklist
  
  app.get('/tasklists/:tasklistId/tasks/:taskId', (req,res)=>{

    Task.findOne({_tasklistId: req.params.tasklistId , _id: req.params.taskId })
    .then( tasks=> {
        res.status(200)
        res.send(tasks);
    })
    .catch(error=> { 
        console.log(error);
        res.status(500);
    })
  })

  // post Task within tasklist

  app.post('/tasklists/:tasklistId/tasks', (req,res) => {
    console.log(req.body);

    let taskobj = { 'title': req.body.title , '_tasklistId' : req.params.tasklistId};
     Task(taskobj).save()
     .then( (task) => {
        res.status(201)
        res.send(task);
      })
     .catch(error=> { 
         console.log(error);
         res.status(500);
    })
  });
 

  // update 1 task belonging to 1 Tasklist
  
  app.patch('/tasklists/:tasklistId/tasks/:taskId',(req, res) =>{
    Task.findOneAndUpdate({tasklistId: req.params.tasklistId, _id: req.params.taskId} , {$set: req.body})
    .then( (task)=>{  
        res.status(200)
        res.send(task)
      })
      .catch(error=> { 
        console.log(error);
        res.status(500);
    })
  })


  // Delete 1 task belonging to 1 Tasklist
  
  app.delete('/tasklists/:tasklistId/tasks/:taskId',(req, res) =>{
    Task.findOneAndDelete({tasklistId: req.params.tasklistId, _id: req.params.taskId})
    .then( (task)=>{  
        res.status(200)
        res.send(task)
      })
      .catch(error=> { 
        console.log(error);
        res.status(500);
    })
  })


app.listen(3000, ()=>{
    console.log("Server is listning 3000  port Number");
})