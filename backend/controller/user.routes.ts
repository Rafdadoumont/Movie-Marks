import express, { Request, Response } from 'express';
import userService from "../service/user.service";

/**
 * @swagger
 * /users/all:
 *  get:
 *      summary: Get all users
 *      tags:
 *        - Users
 *      responses:
 *          200:
 *              description: Returns all users
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserPrisma'
 *
 */

const getAllusersRouter = express.Router();
getAllusersRouter.get('/', async (request: Request, response: Response) => {
    try {
        const users = await userService.getAllUsers();
        response.status(200).json(users);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
});

/**
 * @swagger
 * /users/following:
 *   get:
 *     summary: Get the list of users being followed by the current user.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: header
 *         name: currentUserId
 *         required: true
 *         description: The ID of the current user.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: List of users being followed by the current user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserPrisma'
 *       '500':
 *         description: Database error or other internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 errorMessage:
 *                   type: string
 */

const getFollowingusersRouter = express.Router();
getFollowingusersRouter.get('/', async (request: Request, response: Response) => {
    try {
        const currentUserId = Number(request.header('currentUserId'))
        const users = await userService.getFollowingList(currentUserId)
        response.status(200).json(users)
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

/**
 * @swagger
 * /users/followers:
 *   get:
 *     summary: Get the list of users being followed by the current user.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: header
 *         name: currentUserId
 *         required: true
 *         description: The ID of the current user.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: List of users being followed by the current user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserPrisma'
 *       '500':
 *         description: Database error or other internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 errorMessage:
 *                   type: string
 */

const getFollowersusersRouter = express.Router();
getFollowersusersRouter.get('/', async (request: Request, response: Response) => {
    try {
        const currentUserId = Number(request.header('currentUserId'))
        const users = await userService.getFollowersList(currentUserId)
        response.status(200).json(users)
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: Get user by id
 *      tags:
 *        - Users
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: string id of user
 *      responses:
 *          200:
 *              description: The user object
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserPrisma'
 */

const getUserByIdusersRouter = express.Router();
getUserByIdusersRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const user = await userService.getUserById(Number(request.params.id));
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
});

/**
 * @swagger
 * /users/search/{searchTerm}:
 *  get:
 *      summary: Get users by search term
 *      tags:
 *        - Users
 *      parameters:
 *          - in: path
 *            name: searchTerm
 *            schema:
 *              type: string
 *            description: search term
 *      responses:
 *          200:
 *              description: Returns all users found by search term
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserPrisma'
 */

const getUsersBySearchTermusersRouter = express.Router();
getUsersBySearchTermusersRouter.get('/:searchTerm', async (request: Request, response: Response) => {
    try {
        const users = await userService.getUsersBySearchTerm(request.params.searchTerm);
        response.status(200).json(users);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
});

export { getAllusersRouter, getUserByIdusersRouter, getUsersBySearchTermusersRouter, getFollowingusersRouter, getFollowersusersRouter };
