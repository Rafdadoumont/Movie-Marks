import { Movie } from '../domain/model/movie';
import { MovieDB } from '../domain/data-access/movie.db';


const getAllMoviesAsync = async (): Promise<Movie[]> => {
    return await MovieDB.getAllMovies();
}

const getMovieByIdAsync = async (id: number): Promise<Movie> => {
    return await MovieDB.getMovieById(id);
}

const addMovieAsync = async (id: number): Promise<Movie> => {
    return await MovieDB.addMovie(id);    
}

const deleteMovieAsync = async (id: number): Promise<Movie> => {
    return await MovieDB.deleteMovie({ id });
}

export default { getAllMoviesAsync, getMovieByIdAsync, addMovieAsync, deleteMovieAsync }