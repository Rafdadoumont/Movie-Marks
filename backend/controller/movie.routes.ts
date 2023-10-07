/**
 * @swagger
 *  components:
 *      schemas:
 *          MoviePrisma:
 *              type: object
 *              required:
 *                 - id
 *                 - title
 *                 - overview
 *                 - releaseDate
 *                 - voteAverage
 *                 - voteCount
 *                 - posterPath
 *                 - backdropPath
 *                 - createdAt
 *                 - updatedAt
 *              properties:
 *                  id:
 *                   type: number
 *                  title:
 *                   type: string
 *                  overview:
 *                   type: string
 *                  releaseDate:
 *                   type: string
 *                   format: date
 *                  voteAverage:
 *                   type: number
 *                  voteCount:
 *                   type: number
 *                  posterPath:
 *                   type: string
 *                  backdropPath:
 *                   type: string
 *                  createdAt:
 *                   type: string
 *                   format: date
 *                  updatedAt:
 *                   type: string
 *                   format: date
 *          MovieProps:
 *              type: object
 *              required:
  *               - id
 *              properties:
 *                  id:
 *                   type: number
 *      
 */

import express, { Request, Response } from "express";
import movieService from "../service/movie.service";
import { Movie } from "../domain/model/movie";

/**
 * @swagger
 * /movies/all:
 *  get:
 *      summary: Get all movies
 *      tags:
 *        - Movies
 *      responses:
 *          200:
 *              description: Returns all movies
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/MoviePrisma'
 *
 */

const getAllMoviesRouter = express.Router();
getAllMoviesRouter.get('/', async (request: Request, response: Response) => {
    try {
        const movies = await movieService.getAllMoviesAsync()
        response.status(200).json(movies);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /movies/{id}:
 *  get:
 *      summary: Get movie by id
 *      tags:
 *        - Movies
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: string id of movie
 *      responses:
 *          200:
 *              description: The movie object
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/MoviePrisma'
 */

const getMovieByIdRouter = express.Router();
getMovieByIdRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const movie = await movieService.getMovieByIdAsync(Number(request.params.id))
        response.status(200).json(movie);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
});


/**
 * @swagger
 * /movies/add:
 *  post:
 *      summary: Add a movie
 *      tags:
 *        - Movies
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                   type: object
 *                   properties:
 *                    id:
 *                     type: number
 *      responses:
 *          200:
 *              description: The created movie object
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/MoviePrisma'
 */

const postMovieRouter = express.Router();
postMovieRouter.post('/', async (request: Request, response: Response) => {
    const movieId = Number(request.body.movieId);
    try {
        const movie = await movieService.addMovieAsync(movieId)
        response.status(200).json(movie);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
});

export { getAllMoviesRouter, getMovieByIdRouter ,postMovieRouter };