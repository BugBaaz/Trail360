import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import bookRouter from "./routes/books.routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use("/api/v1/users", userRouter)
app.use("/api/v1/books", bookRouter)

export {app}