import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import addSoftDelete from '../middlewares/softDelete.js'

export const quantityController = () => {
  const createQuantity = async (req, res, next) => {
    try {
      const { grams, cup, spoon } = req.body
      const createQuantity = await prisma.quantity.create({
        data: {
          grams,
          cup,
          spoon
        }
      })
      res.status(httpStatus.CREATED).json(createQuantity)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getQuantity = async (_req, res, next) => {
    try {
      const quantity = await prisma.quantity.findMany({
        where: {
          deletedAt: null
        }
      })
      res.status(httpStatus.OK).json(quantity)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getQuantityById = async (req, res, next) => {
    try {
      const { id } = req.params
      const quantity = await prisma.quantity.findUnique({
        where: {
          id: Number(id)
        }
      })
      res.status(httpStatus.OK).json(quantity)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateQuantity = async (req, res, next) => {
    try {
      const { id } = req.params
      const { grams, cup, spoon } = req.body
      const updatedQuantity = await prisma.quantity.update({
        where: {
          id: Number(id)
        },
        data: {
          grams,
          cup,
          spoon
        }
      })
      res.status(httpStatus.OK).json(updatedQuantity)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteQuantity = async (req, res, next) => {
    try {
      const { id } = req.params
      prisma.$use(addSoftDelete)
      await prisma.quantity.delete({
        where: {
          id: Number(id)
        }
      })
      res
        .status(httpStatus.OK)
        .json({ success: true, message: 'Quantity deleted' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    getQuantity,
    getQuantityById,
    createQuantity,
    updateQuantity,
    deleteQuantity
  }
}
