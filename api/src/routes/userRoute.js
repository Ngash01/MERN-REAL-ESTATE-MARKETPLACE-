import express from "express"
import { deleteUser, getUser, updateUser } from "../controller/userController.js";

const router = express.Router()

router.get("/", (req, res)=>{
    res.status(200).send("The api page")
});

// update credentials
router.put('/update/:id', updateUser)

// delete account
router.delete("/delete/:id", deleteUser)

// user routes
router.get("/:id", getUser)

export default router;


