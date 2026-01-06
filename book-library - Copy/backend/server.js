import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import {connectDB} from "./config/database.js";
import userRoutes from "./routes/userRoute.js"
import bookRoutes from "./routes/bookRoute.js"

const app = express();
dotenv.config();

app.use(express.json())
app.use(cors())

connectDB();

app.use("/user",userRoutes);
app.use("/books",bookRoutes);

app.get("/", (req, res) => {
  res.send("Book Library API Running"); 
});

const port=process.env.PORT || 4000;
app.listen( port, ()=>{
    console.log(`Server is listening on ${port}`);
})