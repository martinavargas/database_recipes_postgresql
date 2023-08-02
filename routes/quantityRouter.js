import { Router } from 'express'
import { quantityController } from '../controllers/quantityController.js'

export const quantityRoutes = () => {
  const quantityRouter = Router()
  const {
    getQuantity,
    getQuantityById,
    createQuantity,
    updateQuantity,
    deleteQuantity
  } = quantityController()

  quantityRouter.route('/quantity').get(getQuantity).post(createQuantity)

  quantityRouter
    .route('/quantity/:id')
    .get(getQuantityById)
    .put(updateQuantity)
    .delete(deleteQuantity)

  return quantityRouter
}
