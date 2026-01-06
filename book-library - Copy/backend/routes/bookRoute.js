import express from "express";
import {getAllBooks,getBookById,createBook,updateBook,deleteBook} from "../controllers/bookController.js";
import verifyToken from "../middlewares/userMiddlewares.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);

router.post("/", verifyToken, createBook); //addnew book
router.put("/:id", verifyToken, updateBook); //update book
router.delete("/:id", verifyToken, deleteBook); //delete book

export default router;
