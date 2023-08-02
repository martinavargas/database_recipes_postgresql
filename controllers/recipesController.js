import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import addSoftDelete from '../middlewares/softDelete.js'

export const recipesController = () => {
  const createRecipe = async (req, res, next) => {
    try {
      const { name, categoryID, preparationTime, cookingTime, instructions } =
        req.body
      const recipe = await prisma.recipe.create({
        data: {
          name,
          categoryID,
          preparationTime,
          cookingTime,
          instructions
        }
      })
      res.status(httpStatus.CREATED).json(recipe)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getRecipes = async (_req, res, next) => {
    try {
      const recipes = await prisma.recipe.findMany({
        include: {
          category: true,
          ingredients: true
        }
      })
      res.status(httpStatus.OK).json(recipes)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getRecipeById = async (req, res, next) => {
    try {
      const { id } = req.params
      const recipe = await prisma.recipe.findUnique({
        where: {
          id: Number(id)
        }
      })
      res.status(httpStatus.OK).json(recipe)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateRecipe = async (req, res, next) => {
    try {
      const { id } = req.params
      const {
        name,
        categoryID,
        preparationTime,
        cookingTime,
        instructions,
        ingredients
      } = req.body
      const updatedRecipe = await prisma.recipe.update({
        where: {
          id: Number(id)
        },
        data: {
          name,
          categoryID,
          preparationTime,
          cookingTime,
          instructions,
          ingredients
        }
      })
      res.status(httpStatus.OK).json(updatedRecipe)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteRecipe = async (req, res, next) => {
    try {
      const { id } = req.params
      prisma.$use(addSoftDelete)
      await prisma.recipe.delete({
        where: {
          id: Number(id)
        }
      })
      res
        .status(httpStatus.OK)
        .json({ success: true, message: 'Recipe deleted' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
  }
}
