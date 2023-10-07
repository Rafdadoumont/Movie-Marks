import { Movie } from "../model/movie"
import { MoviePrisma } from "./data.types";

export const mapToMovies = (moviesPrisma: MoviePrisma[]): Movie[] => moviesPrisma.map(mapToMovie)

export const mapToMovie = (moviePrisma: MoviePrisma): Movie => {
    return {
        id: moviePrisma.id,
        title: moviePrisma.title,
        overview: moviePrisma.overview,
        releaseDate: moviePrisma.releaseDate,
        voteAverage: moviePrisma.voteAverage,
        voteCount: moviePrisma.voteCount,
        posterPath: moviePrisma.posterPath,
        backdropPath: moviePrisma.backdropPath,
        createdAt: moviePrisma.createdAt,
        updatedAt: moviePrisma.updatedAt,
    }
}