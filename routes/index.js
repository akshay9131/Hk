var express = require('express');
var router = express.Router();
var UserModel = require('./users');
var TaskModel = require('./task');
const EXCELJS = require('exceljs');
const xlsx = require('xlsx');
const json2xls = require('json2xls');
const fs = require('fs');


/* GET home page. */
router.get('/', async function(req, res, next) {
  const users = await UserModel.find({})
  res.render('index', {users});
});

router.get('/addUser', function(req, res) {
  res.render('adduser')
})

router.post('/addUser', async function(req,res) {
  const {name, mobile, email} =  req.body
  await UserModel.create ({
    name,
    email,
    mobile
  })
  res.redirect('/')
})

router.get('/addtask', async function(req, res, next) {
  const users = await UserModel.find({})
  res.render('addtask', {users});
});

router.post('/addtask', async function(req,res) {
  const {user,taskname, type} =  req.body
  await TaskModel.create({
    taskname,
    type,
    user
  })
  res.redirect('/')
})

router.get('/showtask/:id', async function(req, res) {
  const task = await TaskModel.find({user : req.params.id})
  console.log(task)
  res.render('showtask', {task})
})



router.get("/createsheet", async function (req, res) {
    var users = await UserModel.find()
    var tasks = await TaskModel.find().populate('user')
    var data = users.map((e) => {
      return{
        id : e._id.toString(),
        name : e.name,
        email : e.email,
        mobile : e.mobile
      }
    })
    var taskdata = tasks.map((e) => {
      return{
        user : e.user.name,
        taskname : e.taskname,
        type : e.type
      }
    })
    console.log(data)

    // json to excel file 
    const workbook =  xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);
    const worksheet2 = xlsx.utils.json_to_sheet(taskdata)
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    xlsx.utils.book_append_sheet(workbook, worksheet2, "Sheet2");
    xlsx.writeFile(workbook, 'ques.xlsx');
  res.send("Sheet Created");
});

module.exports = router;
