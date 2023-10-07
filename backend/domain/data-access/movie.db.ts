import { Movie } from "../model/movie";
import { PrismaClient } from '@prisma/client'
import { mapToMovie, mapToMovies } from "./movie.mapper"
import axios from 'axios';
import { MoviePrisma } from "./data.types";

const database = new PrismaClient()

export class MovieDB {

    static async getAllMovies(): Promise<Movie[]> {
        try {
            const moviesPrisma = await database.movie.findMany()
            return mapToMovies(moviesPrisma)
        } catch (error) {
            console.error(error)
            throw new Error("Database error. See server log for details.")
        }
    }

    static async addMovie(id: number): Promise<Movie> {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzIwN2U0MTZlM2Y0MGVjZGI4YWI1ZWE1NDkwZjgwMiIsInN1YiI6IjY0MmMwZTRiOGRlMGFlMDBiNjU2NGM4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7QuoAI7yYYWB3X2wlwnr4x-OgiTnt_O1ajXtCZb-ZKk',
            },
        };
        const response = await axios.request(options);
        try {
            const moviePrisma = await database.movie.upsert({
                where: { id: id },
                create: {
                    id,
                    title: response.data.title ?? 'No title available',
                    overview: response.data.overview ?? 'No overview available',
                    releaseDate: new Date(response.data.release_date) ?? new Date(),
                    voteAverage: response.data.vote_average ?? 0,
                    voteCount: response.data.vote_count ?? 0,
                    posterPath: response.data.poster_path ?? '',
                    backdropPath: response.data.backdrop_path ?? '',
                },
                update: {},
            });
            return mapToMovie(moviePrisma);
        } catch (error) {
            console.error(error);
            throw new Error('Database error. See server log for details.');
        }
    }

    static async deleteMovie({
        id,
    }: { id: number }): Promise<Movie> {
        try {
            const deletedMovie = await database.movie.delete({
                where: {
                    id: id,
                },
            })
            return mapToMovie(deletedMovie);
        } catch (error) {
            console.error(error);
            throw new Error("Database error. See server log for details.")
        }
    }

    static async getMovieById(id: number): Promise<Movie> {
        try {
            const moviePrisma = await database.movie.findUnique({
                where: {
                    id: id,
                },
            })
            return mapToMovie(moviePrisma);
        } catch (error) {
            console.error(error);
            throw new Error("Database error. See server log for details.")
        }
    }
}

