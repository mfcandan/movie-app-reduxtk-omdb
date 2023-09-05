import { Flex, LoadingOverlay, Pagination, Table } from '@mantine/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMovies, selectLoading, selectMovies, selectTotalResults } from '../redux/slices/movieSlice';
import MovieSearch from './MovieSearch';

const MovieList = () => {
    const dispatch = useDispatch();
    const movies = useSelector(selectMovies);
    const totalResults = useSelector(selectTotalResults);
    const isLoading = useSelector(selectLoading);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalResults / itemsPerPage);

    useEffect(() => {
        const thunkAction = fetchMovies('pokemon', 1);
        dispatch(thunkAction as any);
    }, [dispatch]);

    const rows = movies.map((movie, index) => (
        <tr key={index}>
            <td>
                <Link to={`/movie/${movie.imdbID}`}>{movie.Title}</Link>
            </td>
            <td>{movie.Year}</td>
            <td>{movie.Genre}</td>
            <td>{movie.imdbID}</td>
        </tr>
    ));

    const handlePageChange = (newPage: number) => {
        const thunkAction = fetchMovies('pokemon', newPage);
        dispatch(thunkAction as any);
    };

    return (
        <Flex direction="column" align="center" justify="center" gap="xl">
            <LoadingOverlay visible={isLoading} />
            <Table striped>
                <thead>
                    <tr>
                        <th>Film Adı</th>
                        <th>Yayınlandığı Yıl</th>
                        <th>Tür</th>
                        <th>IMDB ID</th>
                    </tr>
                </thead>
                <tbody>
                    <MovieSearch />
                    {rows}
                </tbody>
            </Table>
            <Pagination size="md" total={totalPages} siblings={1} onChange={handlePageChange} />
        </Flex>
    );
};

export default MovieList;
