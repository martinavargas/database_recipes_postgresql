import { Router } from 'express'
import { ingredientsController } from '../controllers/ingredientsController.js'

export const ingredientsRoutes = () => {
  const ingredientsRouter = Router()
  const {
    getIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
  } = ingredientsController()

  ingredientsRouter
    .route('/ingredients')
    .get(getIngredients)
    .post(createIngredient)

  ingredientsRouter
    .route('/ingredients/:id')
    .get(getIngredientById)
    .put(updateIngredient)
    .delete(deleteIngredient)

  return ingredientsRouter
}
