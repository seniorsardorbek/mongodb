
import express from 'express'
import usersRouter  from "./routes/users.js"
import categoryRouter  from "./routes/category.js"
import productRouter  from "./routes/product.js"
import {db} from "./db/index.js"

import dotenv from "dotenv"
dotenv.config()
const app = express()



app.use(express.json());
app.use(usersRouter)
app.use(categoryRouter)
app.use(productRouter)

db()
app.listen(process.env.PORT, () => {
  console.log(`Server is running ${3000}`);
});
  