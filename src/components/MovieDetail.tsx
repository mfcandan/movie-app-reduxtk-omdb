import { Button, Flex, Group, Image, List, LoadingOverlay, Title, createStyles, rem } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Movie } from '../redux/slices/movieSlice';

const apiKey = process.env.REACT_APP_OMDB_API_KEY;

function MovieDetail() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [movieDetail, setMovieDetail] = useState<Movie>({} as Movie);

    useEffect(() => {
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
            .then((response) => response.json())
            .then((data) => setMovieDetail(data));
    }, [id]);

    useEffect(() => {
        movieDetail.Title && setIsLoading(false);
    }, [movieDetail]);

    const { classes } = useStyles();
    return (
        <Flex mih="100vh" align="center" justify="center">
            <LoadingOverlay visible={isLoading} />
            {!isLoading &&
                <Flex my="lg">
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            {movieDetail.Title} ({movieDetail.Year})
                        </Title>
                        <List
                            mt={30}
                            spacing="sm"
                            size="sm"
                        >
                            <List.Item>
                                <b>Tür:</b> {movieDetail.Genre}
                            </List.Item>
                            <List.Item>
                                <b>Süre:</b> {movieDetail.Runtime}
                            </List.Item>
                            <List.Item>
                                <b>IMDb Puanı:</b> {movieDetail.imdbRating}
                            </List.Item>
                            <List.Item>
                                <b>Yönetmen:</b> {movieDetail.Director}
                            </List.Item>
                            <List.Item>
                                <b>Aktörler:</b> {movieDetail.Actors}
                            </List.Item>
                        </List>

                        <Group mt={30}>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} >
                                <Button variant="default" radius="xl" size="md">
                                    🔙 Ana Sayfa </Button>
                            </Link>
                        </Group>
                    </div>
                    <Image src={movieDetail.Poster} className={classes.image} />
                </Flex>
            }
        </Flex>
    );
}

export default MovieDetail;

const useStyles = createStyles((theme) => ({
    content: {
        maxWidth: rem(480),
        marginRight: `calc(${theme.spacing.xl} * 3)`,
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: rem(34),
        lineHeight: 1.2,
        fontWeight: 900,
    },

    image: {
        flex: 1,
    },
}));