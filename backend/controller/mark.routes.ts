/**
 * @swagger
 *  components:
 *      schemas:
 *          MarkPrisma:
 *              type: object
 *              required:
 *                - id
 *                - userId
 *                - movieId
 *                - movieTitle
 *                - createdAt
 *                - updatedAt
 *                - rating
 *              properties:
 *                  id:
 *                    type: number
 *                  userId:
 *                    type: number
 *                  movieId:
 *                    type: number
 *                  movieTitle:
 *                    type: string
 *                  createdAt:
 *                    type: string
 *                    format: date
 *                  updatedAt:
 *                    type: string
 *                    format: date
 *                  rating:
 *                    type: number
 *                  comment:
 *                    type: string
 *          MarkProps:
 *             type: object
 *             required:
 *               - userId
 *               - movieId
 *               - movieTitle
 *               - rating
 *             properties:
 *               userId:
 *                 type: number
 *               movieId:
 *                 type: number
 *               movieTitle:
 *                 type: string
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 */


import express, { Request, Response } from "express";
import markService from "../service/mark.service";
import movieService from "../service/movie.service";
import { FollowInput, MarkProps, UpdateMarkProps } from "../domain/data-access/data.types";
import userService from "../service/user.service";

/**
 * @swagger
 * /marks/add:
 *  post:
 *      summary: Add a mark
 *      tags:
 *        - Marks
 *      requestBody:
 *          required: true
 *      responses:
 *          200:
 *              description: The created mark object
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/MarkPrisma'
 */

const postMarkRouter = express.Router();

postMarkRouter.post('/', async (request: Request, response: Response) => {
    const markInput = <MarkProps>request.body;
    try {
        const movie = await movieService.addMovieAsync(Number(request.body.movieId))
        const mark = await markService.addMarkAsync(markInput)
        response.status(200).json(mark);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
});

/**
 * @swagger
 * /marks/all:
 *  get:
 *      summary: Get all marks
 *      tags:
 *        - Marks
 *      responses:
 *          200:
 *              description: Returns all marks
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/MarkPrisma'
 *
 */

const getMarkRouter = express.Router();
getMarkRouter.get('/', async (request: Request, response: Response) => {
    try {
        const marks = await markService.getAllMarksAsync()
        response.status(200).json(marks);
    } catch (error) {
        console.log(error.message)
        response.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /marks/allforuser:
 *  get:
 *      summary: Get all marks for logged in user
 *      tags:
 *        - Marks
 *      responses:
 *          200:
 *              description: Returns all marks for logged in user
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/MarkPrisma'
 *
 */

const getforuserMarkRouter = express.Router();
getforuserMarkRouter.get('/', async (request: Request, response: Response) => {
    try {
        const userName = await userService.auth(request.header('Authorization')?.replace("Bearer ", ""), request.header('username'))
        const marks = await markService.getMarksForLoggedInUserAsync(userName)
        response.status(200).json(marks);
    } catch (error) {
        console.log(error.message)
        response.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /marks/update:
 *  put:
 *      summary: Update a mark
 *      tags:
 *        - Marks
 *      requestBody:
 *          required: true
 *      responses:
 *          200:
 *              description: The edited mark object
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/MarkPrisma'
 */

const putMarkRouter = express.Router();
putMarkRouter.put('/', async (request: Request, response: Response) => {
    const markInput = <UpdateMarkProps>request.body;
    try {
        const mark = await markService.updateMarkAsync(markInput)
        response.status(200).json(mark);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
});

/**
 * @swagger
 * /marks/delete/{id}:
 *  delete:
 *      summary: Delete a mark
 *      tags:
 *        - Marks
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *          description: Numeric ID of the mark to delete
 *      responses:
 *          200:
 *            description: Successful operation
 */

const deleteMarkRouter = express.Router();
deleteMarkRouter.delete('/:id', async (request: Request, response: Response) => {
    try {
        markService.deleteMarkAsync(Number(request.params.id))
        response.status(200).json({ status: 'success', message: 'Mark deleted' });
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
});

export { postMarkRouter, getMarkRouter, putMarkRouter, getforuserMarkRouter, deleteMarkRouter };