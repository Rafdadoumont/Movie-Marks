/**
 * @swagger
 *  components:
 *      schemas:
 *          UserPrisma:
 *              type: object
 *              required:
 *                - id
 *                - username
 *                - password
 *                - role
 *              properties:
 *                  id:
 *                    type: number
 *                  username:
 *                    type: string
 *                  password:
 *                    type: string
 *                  role:
 *                    type: string
 *          UserInput:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 */

import express, { Request, Response } from "express";
import userService from "../service/user.service";
import { UserInput } from "../domain/data-access/data.types";

/**
* @swagger
* /auth/signup:
*  post:
*      summary: Register a new user
*      tags:
*        - Authentification
*      requestBody:
*          required: true
*          content:
*              application/json:
*                  schema:
*                      $ref: '#/components/schemas/UserInput'
*      responses:
*          200:
*              description: The created user object
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/UserPrisma'
*          400:
*              description: Sign up failed
* 
*/

const signUpRouter = express.Router();

signUpRouter.post('/', async (request: Request, response: Response) => {
    const userInput = <UserInput>request.body;

    if (!userInput.username || !userInput.password) {
        throw new Error('Username and password are required');
    }

    try {
        const user = await userService.addUser(userInput);
        response.status(200).json(user);
    } catch (error) {
        console.log(error);
        response.status(400).json({ message: 'Username is already taken.', errorMessage: error.message })
    }
});

/**
* @swagger
* /auth/signin:
*  post:
*      summary: Log user in with credentials
*      tags:
*       - Authentification
*      requestBody:
*          required: true
*          content:
*              application/json:
*                  schema:
*                      $ref: '#/components/schemas/UserInput'
*      responses:
*          200:
*              description: Log in successful
*          400:
*              description: Log in failed     
*/

const signInRouter = express.Router();
signInRouter.post('/', async (request: Request, response: Response) => {
    const userInput = <UserInput>request.body;
    try {
        const token = (await userService.authenticate(userInput)).token;
        const username = (await userService.authenticate(userInput)).username;
        const userId = (await userService.authenticate(userInput)).userId;
        response.status(200).json({ message: 'Login successful', token: token, username: username, userId: userId });
    } catch (error) {
        console.log(error);
        response.status(400).json({ message: 'Invalid username or password. Please try again.', errorMessage: error.message })
    }
});

export { signInRouter, signUpRouter };