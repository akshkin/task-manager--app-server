const express = require("express")
const auth = require("../middleware/auth")
const { validation, signIn, signUp, signOut, getProfile, updateProfile, deleteProfile } = require("../controllers/user")

const router = new express.Router()

router.post("/users/signup", validation, signUp)
router.post("/users/signin", signIn)
router.post("/users/signout", auth, signOut)
router.get("/users/profile", auth, getProfile)
router.patch("/users/profile", auth, updateProfile)
router.delete("/users/profile", auth, deleteProfile)


module.exports = router
