import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import addSoftDelete from '../middlewares/softDelete.js'

export const ingredientsController = () => {
  const createIngredient = async (req, res, next) => {
    try {
      const { name, quantityID } = req.body
      const ingredient = await prisma.ingredient.create({
        data: {
          name,
          quantityID
        }
      })
      res.status(httpStatus.CREATED).json(ingredient)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getIngredients = async (_req, res, next) => {
    try {
      const ingredients = await prisma.ingredient.findMany({
        where: {
          deletedAt: null
        }
      })
      res.status(httpStatus.OK).json(ingredients)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getIngredientById = async (req, res, next) => {
    try {
      const { id } = req.params
      const ingredient = await prisma.ingredient.findUnique({
        where: {
          id: Number(id)
        }
      })
      res.status(httpStatus.OK).json(ingredient)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateIngredient = async (req, res, next) => {
    try {
      const { id } = req.params
      const { name, quantity } = req.body
      const updatedIngredient = await prisma.ingredient.update({
        where: {
          id: Number(id)
        },
        data: {
          name,
          quantity
        }
      })
      res.status(httpStatus.OK).json(updatedIngredient)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteIngredient = async (req, res, next) => {
    try {
      const { id } = req.params
      prisma.$use(addSoftDelete)
      await prisma.ingredient.delete({
        where: {
          id: Number(id)
        }
      })
      res
        .status(httpStatus.OK)
        .json({ success: true, message: 'Ingredient deleted' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    getIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
  }
}
