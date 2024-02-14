import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.ORIGIN_PATH,
    credentials: true,
}));

import userroutes from "./routes/user.routes.js";

const books = [
    { id: 1, title: 'Alice in Wonderland', author: 'Lewis Carrol' },
    { id: 2, title: 'Around the World in eighty days', author: 'Jules Verne' },
    { id: 3, title: 'Utopia', author: 'Sir Thomas Moor' },
]

app.get('/api/books', (req, res) => {
    res.json(books)
});

app.get("/", (req, res) => {
    res.status(200).json({ message: "ok" });
});

app.use("/api/v1/user", userroutes);


export default app;