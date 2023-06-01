import express from 'express';
import router from "./router";
import morgan from "morgan";
import cors from "cors";

const app = express();

const customLogger = (message) => (req,res,next) => {
  console.log(`Hello from ${message}`)
  next();
}

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(customLogger("Logger"));

app.get('/', (req, res) => {
    console.log('Hello from Express')
    res.status(200)
    res.json({ message : 'Hello'})
})

app.use('/api',router)

export default app;