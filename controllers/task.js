const  mongoose = require("mongoose")
const Task = require("../models/task")

const getTasks = async(req, res)=> {
  try {
    await req.user.populate({
      path: "task"
    })
    res.status(200).json(req.user.task)
  }catch(error){
    console.log(error)
    res.status(400).json(error)
  }
}

const createTask = async(req, res) => {
  const task =  new Task({...req.body, owner: req.user._id})
  try{
    await task.save()
    res.status(201).json(task)
  }catch(error){
    console.log(error)
    res.status(400).json(error)
  }
}

const updateTask = async(req, res) => {
  const _id = req.params.id
  const task = req.body
  if(mongoose.Types.ObjectId.isValid(_id)){
    try{
      const updatedTask  = await Task.findByIdAndUpdate(_id, {...task, owner: req.user._id}, {new: true})
      if(!task){
        return res.status(404).json("No task by the id")
      }
      await updatedTask.save()
      res.json(updatedTask)
      }catch(error){
        console.log(error)
        res.status(500).json(error)
      }
    } else {
      res.status(404).json("No task by the selected id")
    }
}

const deleteTask = async(req, res) => {
  const _id = req.params.id

  if(mongoose.Types.ObjectId.isValid(_id)){
    try{
      const task = await Task.findByIdAndDelete({_id, owner: req.user._id })
      res.status(200).send(task)
    }catch(error){
      console.log(error)
      res.status(500).json(error)
    }
  }

}

module.exports = { getTasks, createTask, updateTask, deleteTask }