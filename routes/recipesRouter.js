import { Router } from 'express'
import { recipesController } from '../controllers/recipesController.js'

export const recipesRoutes = () => {
  const recipesRouter = Router()
  const {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
  } = recipesController()

  recipesRouter.route('/recipes').get(getRecipes).post(createRecipe)

  recipesRouter
    .route('/recipes/:id')
    .get(getRecipeById)
    .put(updateRecipe)
    .delete(deleteRecipe)

  return recipesRouter
}
