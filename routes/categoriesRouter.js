import { Router } from 'express'
import { categoriesController } from '../controllers/categoriesController.js'

export const categoriesRoutes = () => {
  const categoriesRouter = Router()
  const {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
  } = categoriesController()

  categoriesRouter.route('/categories').get(getCategories).post(createCategory)

  categoriesRouter
    .route('/categories/:id')
    .get(getCategoryById)
    .put(updateCategory)
    .delete(deleteCategory)

  return categoriesRouter
}
