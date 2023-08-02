import express from 'express'
import dotenv from 'dotenv'
import { recipesRoutes } from './routes/recipesRouter.js'
import { ingredientsRoutes } from './routes/ingredientsRouter.js'
import { categoriesRoutes } from './routes/categoriesRouter.js'
import { quantityRoutes } from './routes/quantityRouter.js'
import errorHandler from './middlewares/errorHandler.js'
dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use('/api', recipesRoutes(), ingredientsRoutes(), categoriesRoutes(), quantityRoutes())

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})
