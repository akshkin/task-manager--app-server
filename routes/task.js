const express  = require("express")
const router = new express.Router()
const auth = require("../middleware/auth")
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/task")


router.get("/tasks", auth, getTasks)
router.post("/tasks", auth, createTask)
router.patch("/tasks/:id", auth, updateTask)
router.delete("/tasks/:id", auth, deleteTask)

module.exports = router
