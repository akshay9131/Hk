var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    taskname : String,
    type : String,
    user : {

       type:  mongoose.Schema.Types.ObjectId,
       ref : 'user'
    }
})


module.exports = mongoose.model('task', taskSchema)