import { Button, Select, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, selectLoading } from '../redux/slices/movieSlice';

const MovieSearch = () => {
    const [query, setQuery] = useState('Pokemon');
    const [year, setYear] = useState('');
    const [type, setType] = useState('Hepsi');

    const isLoading = useSelector(selectLoading);
    const dispatch = useDispatch();

    const typeOptions = [
        { value: 'Hepsi', label: 'Hepsi' },
        { value: 'movie', label: 'Film' },
        { value: 'series', label: 'Dizi' },
        { value: 'episode', label: 'Bölüm' },
    ];

    const handleSearch = () => {
        const yearQuery = year !== null ? `&y=${year}` : null;
        const typeQuery = type !== 'Hepsi' ? `&type=${type}` : '';
        const searchQuery = `${query}${yearQuery}${typeQuery}`;

        const thunkAction = fetchMovies(searchQuery, 1);
        dispatch(thunkAction as any);
    };

    return (
        <tr>
            <td>
                <TextInput
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Aranacak film adını girin"
                    defaultValue=""
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && query !== '') {
                            handleSearch();
                        }
                    }}
                />
            </td>
            <td>
                <TextInput
                    id="year-filter"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Yayınlanma yılı"
                    defaultValue=""
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && query !== '') {
                            handleSearch();
                        }
                    }}
                />
            </td>
            <td>
                <Select
                    id="type-filter"
                    value={type}
                    onChange={(value) => setType(value || 'Hepsi')}
                    data={typeOptions}
                    placeholder="Hepsi"
                />
            </td>
            <td>
                <Button onClick={handleSearch} size="xs" disabled={isLoading}>
                    {isLoading ? 'Aranıyor...' : 'Film Ara'}
                </Button>
            </td>
        </tr>
    );
};

export default MovieSearch;
