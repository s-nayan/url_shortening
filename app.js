import express from "express";
import connectDB from "./config/db";
import urlsRouter from "./routes/urls";
import indexRouter from "./routes/index";
const app = express();

const PORT = 3333;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/shorten",urlsRouter);
app.use("/",indexRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on Port ${PORT}`);
});