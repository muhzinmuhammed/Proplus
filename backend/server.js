import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import "dotenv/config";
//  mongodb connection
import connectToDb from './Connection/config.js';

/*import user router*/
import userRouter from "./routes/userRouter.js";





const app=express();
const PORT = process.env.PORT

app.use(express.json());



connectToDb()
app.use(cors());
app.use(morgan('tiny'));



/*user route*/
app.use("/api/auth", userRouter);
/*user route*/






app.listen(PORT||8080)