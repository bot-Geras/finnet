import express from "express";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req,res) => {
    res.send("Hello World!");
})

app.listen(PORT, () => {
    console.log(`Listening to server on port http://localhost:${PORT}`);
}   
)