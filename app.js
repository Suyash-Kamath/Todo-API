const express = require('express');

const dotenv = require('dotenv');
const todoRouter = require('./routers/todoRouter')
dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());

app.use('/todo',todoRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`);
    
})
