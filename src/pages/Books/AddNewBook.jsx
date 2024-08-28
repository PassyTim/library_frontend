import React, {useEffect, useState} from 'react';
import {Box, Button, FormControl, FormLabel, Heading, Input, Select, Text, Textarea, VStack} from "@chakra-ui/react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useFetching} from "../../useFetching";
import AuthorService from "../../API/AuthorService";
import Loader from "../../components/UI/loader/Loader";

const AddNewBook = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [isbn, setIsbn] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [image, setImage] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Isbn', isbn);
        formData.append('Genre', genre);
        formData.append('Description', description);
        formData.append('AuthorId', authorId);

        if (image) {
            formData.append('Image', image);
        }

        try {
            await axios.post(`https://localhost:7212/api/book`, formData, {
                headers: {
                    'content-Type': 'multipart/form-data'
                }
            });
            navigate(`/books`);
        } catch (error) {
            if(error.response && error.response.data) {
                setErrors(error.response.data.errors);
                console.error('There was an error creating the book!', error);
            } else {
                console.error('There was an error creating the book!', error);
            }
        }
    };

    const [fetchAuthors,isAuthorsLoading, authorsError] = useFetching(async () => {
        const response = await AuthorService.getAll();
        setAuthors(response.data.data);
    })

    useEffect(() => {
        fetchAuthors();
    }, []);

    if(isAuthorsLoading)
        return (
            <Loader/>
        )

    return (
        <Box mx="auto" mt="3" p="6" boxShadow="outline" borderRadius="md">
            <VStack>
                <Heading as="h2" size="lg" fontWeight="bold">Добавление книги</Heading>
                <form onSubmit={handleSubmit}>
                    {errors &&
                        errors.map(error => (
                            <Text color="red.500">{error}</Text>
                        ))}
                    <FormControl isRequired>
                        <FormLabel >Название</FormLabel>
                        <Input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>ISBN номер </FormLabel>
                        <Input
                            type="text"
                            onChange={(e) => setIsbn(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Жанр</FormLabel>
                        <Input
                            type="text"
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Описание</FormLabel>
                        <Textarea
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Автор</FormLabel>
                        <Select
                            value={authorId}
                            onChange={(e) => setAuthorId(e.target.value)}>
                            {authors.map(author => (
                                <option key={author.id} value={author.id}>
                                    {author.firstName} {author.lastName}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Фотография</FormLabel>
                        <Input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </FormControl>
                    <Button onClick={()=> navigate(`/books`)} colorScheme='teal'  mt='4' mr='4'>Назад</Button>
                    <Button  colorScheme='blue' type="submit" mt='4'>Добавить</Button>
                </form>
            </VStack>
        </Box>
    );
};

export default AddNewBook;