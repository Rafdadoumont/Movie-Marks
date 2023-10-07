import express, { Request, Response } from "express";
import followService from "../service/follow.service";
import { FollowInput } from "../domain/data-access/data.types";
import userService from "../service/user.service";


const followRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     FollowInput:
 *       type: object
 *       properties:
 *         currentUserId:
 *           type: number
 *         otherUserId:
 *           type: number
 *         username:
 *           type: string
 *       required:
 *         - currentUserId
 *         - otherUserId
 *         - username
 */

/**
 * @swagger
 * /follow/add:
 *   post:
 *     summary: Add user to following list
 *     tags:
 *      - Follow
 *     description: Add a user to the following list of another user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FollowInput'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPrisma'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 */


followRouter.post('/add', async (request: Request, response: Response) => {
    try {
        <FollowInput>request.body
        await userService.auth(request.header('Authorization')?.replace("Bearer ", ""), request.body.username)
        const user = await followService.addToFollowing(Number(request.body.currentUserId), Number(request.body.otherUserId))
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
});

/**
 * @swagger
 * /follow/remove:
 *   post:
 *     summary: Remove a user from the following list.
 *     tags:
 *       - Follow
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FollowInput'
 *     responses:
 *       '200':
 *         description: User successfully removed from the following list.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DomainUser'
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

followRouter.post('/remove', async (request: Request, response: Response) => {
    try {
        <FollowInput>request.body
        await userService.auth(request.header('Authorization')?.replace("Bearer ", ""), request.body.username)
        const user = await followService.removeFromFollowing(Number(request.body.currentUserId), Number(request.body.otherUserId))
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
});

export { followRouter }