import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import addSoftDelete from '../middlewares/softDelete.js'

export const categoriesController = () => {
  const createCategory = async (request, response, next) => {
    try {
      const { body } = request
      await prisma.category.create({
        data: body
      })
      response.status(httpStatus.CREATED).json({
        success: true,
        message: 'Category created successfully'
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getCategories = async (_request, response, next) => {
    try {
      const categories = await prisma.category.findMany({
        where: {
          deletedAt: null
        }
      })
      response.status(httpStatus.OK).json({
        success: true,
        data: categories
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getCategoryById = async (request, response, next) => {
    try {
      const { id } = request.params
      const category = await prisma.category.findFirst({
        where: {
          id: Number(id),
          deletedAt: null
        }
      })
      response.status(httpStatus.OK).json({
        success: true,
        data: category
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateCategory = async (request, response, next) => {
    try {
      const { id } = request.params
      const { body } = request
      const categoryUpdated = await prisma.category.update({
        where: {
          id: Number(id)
        },
        data: body
      })

      response.status(httpStatus.OK).json({
        success: true,
        data: categoryUpdated
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteCategory = async (request, response, next) => {
    try {
      prisma.$use(addSoftDelete)
      const { id } = request.params
      await prisma.category.delete({
        where: {
          id: Number(id)
        }
      })
      response.status(httpStatus.OK).json({
        success: true,
        message: 'Category deleted successfully'
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
  }
}
