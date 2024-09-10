import React, {useEffect, useState} from 'react';
import {useFetching} from "../../useFetching";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, FormControl, FormLabel, Heading, Input, Select, VStack, Text, Textarea} from "@chakra-ui/react";
import BookService from "../../API/BookService";
import AuthorService from "../../API/AuthorService";

const BookRedact = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [isbn, setIsbn] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [image, setImage] = useState(null);
    const [book, setBook] = useState({});
    const [authors, setAuthors] = useState([]);
    const [userId, setUserId] = useState([]);
    const [returnDate, setReturnDate] = useState([]);
    const [takeDate, setTakeDate] = useState([]);
    const [errors, setErrors] = useState([]);


    const {getById, updateBook} = BookService();
    const {getAllAuthors} = AuthorService();

    const [fetchBookById, isLoading, error] = useFetching(async (id) => {
        const response = await getById(id);
        setBook(response.data);
        setName(response.data.name);
        setIsbn(response.data.isbn);
        setGenre(response.data.genre);
        setDescription(response.data.description);
        setAuthorId(response.data.authorId);
        setUserId(response.data.userId);
        setReturnDate(response.data.returnDate);
        setTakeDate(response.data.takeDate);
    });

    const [fetchAuthors,isAuthorsLoading, authorsError] = useFetching(async () => {
        const response = await getAllAuthors();
        setAuthors(response.data);
    })

    useEffect(() => {
        fetchBookById(params.id);
        fetchAuthors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('Id', params.id);
        formData.append('Name', name);
        formData.append('Isbn', isbn);
        formData.append('Genre', genre);
        formData.append('Description', description);
        formData.append('AuthorId', authorId);
        formData.append('UserId', userId);
        formData.append('ReturnDate', returnDate);
        formData.append('TakeDate', takeDate);

        if (image) {
            formData.append('Image', image);
        }

        try {
            await updateBook(book.id, formData);
            navigate(`/books`);
        } catch (error) {
            if(error.response) {
                setErrors(error.response.errors);
            } else {
                console.error('There was an error updating the book!', error);
            }
        }
    };

    return (
        <Box mx="auto" mt="3" p="6" boxShadow="outline" borderRadius="md">
            <VStack>
                <Heading as="h2" size="lg" fontWeight="bold">Редактирование книги</Heading>
                <form onSubmit={handleSubmit}>
                    {errors &&
                        errors.map(error => (
                            <Text color="red.500">{error}</Text>
                        ))}
                <FormControl isRequired>
                    <FormLabel >Название</FormLabel>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>ISBN номер </FormLabel>
                    <Input
                        type="text"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Жанр</FormLabel>
                    <Input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Описание</FormLabel>
                    <Textarea
                        value={description}
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
                    <Button onClick={()=> navigate(`/books/${params.id}`)} colorScheme='teal'  mt='4' mr='4'>Назад</Button>
                <Button  colorScheme='blue' type="submit" mt='4'>Обновить книгу</Button>
                </form>
            </VStack>
        </Box>
    );
};

export default BookRedact;