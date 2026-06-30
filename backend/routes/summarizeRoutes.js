const express=require("express");

const router=express.Router();

const auth=require("../middleware/authMiddleware");

const {
summarize
}=require("../controllers/summarizeController");

router.post("/",auth,summarize);

module.exports=router;