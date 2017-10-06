import models from '../models';

/**
 * Class Definition for the user's favorite recipes
 * @class FavoriteRecipes
 */
export default class FavoriteRecipes {
    /**
     * Add a recipe to user's favorite table
     * @param {object} req
     * @param {object} res
     * @returns {object} Failure response messages or Success message with data persisted to the database
     */
    static addToFavorite(req, res) {
        const { userId } = req.decoded;
        const recipeId = req.params.recipeID;

        models.Users
            .findById(userId)
            .then((user) => {
                if (user) {
                    models.Favorites
                        .findOrCreate({ where: { userId, recipeId } })
                        .spread((recipeAdded, created) => {
                            if (created) {
                                return res.status(201).json({
                                    status: 'Success',
                                    message: 'Successfully added recipe to your favorites'
                                });
                            }
                            return res.status(400).json({
                                status: 'Failed',
                                message: `Recipe with id: ${recipeId} already added`
                            });
                        })
                        .catch((err) => {
                            if (err) {
                                res.status(500).json({
                                    status: 'Failed',
                                    message: 'Error adding recipe to your favorites'
                                });
                            }
                        });
                } else {
                    return res.status(400).json({
                        status: 'Failed',
                        message: `User with id: ${userId} does not exit`
                    });
                }
            });
    }

    /**
     * Get all user's favorite recipes
     * @param {object} req
     * @param {object} res
     * @returns {object} Failure response messages or Success message with persisted database data
     */
    static getFavoriteRecipes(req, res) {
        const userId = req.params.userID;

        models.Favorite
            .findAll({
                where: { userId },
                include: [
                    { model: models.Recipes },
                    { model: models.Users }
                ]
            })
            .then((favorites) => {
                if (favorites) {
                    return res.status(201).json({
                        status: 'Success',
                        message: 'Successfully retrieved user\'s favorite Recipe(s)',
                        favorites
                    });
                }
                return res.status(201).json({
                    status: 'Failed',
                    message: 'No available favorite recipe',
                });
            })
            .catch((err) => {
                if (err) {
                    res.status(500)
                        .json({
                            status: 'Failed',
                            message: 'Error retrieving user\'s favorite recipes'
                        });
                }
            });
    }
}