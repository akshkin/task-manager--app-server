const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const taskRouter = require("../routes/task")
const userRouter = require("../routes/user")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()
dotenv.config()

const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(taskRouter)
app.use(userRouter)

//serve static assets in production
if(process.env.NODE_ENV === 'production'){
  app.use(express.static("/client/task-manager-client/build/static"))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "task-manager-client", "build", "static", "index.html"))
  })
}

const CONNECTION_URL = process.env.CONNECTION_URL
mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  }))
  .catch(error => console.log(error))


