import React, {useEffect, useState} from 'react';
import {Box, Button, FormControl, FormLabel, Heading, Input, Text, VStack} from "@chakra-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../useFetching";
import AuthorService from "../../API/AuthorService";
import Loader from "../../components/UI/loader/Loader";

const AuthorRedact = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [author, setAuthor] = useState({
        id: params.id,
        firstName: '',
        lastName: '',
        country: '',
        birthDate: ''
    });
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        fetchAuthor(params.id);
    }, [params.id]);

    const [fetchAuthor, isAuthorLoading, authorError] = useFetching(async (id) => {
        const response = await AuthorService.getByIdWithoutBooks(id);
        setAuthor(response.data.data);
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthor(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AuthorService.update(params.id, author);
            navigate(`/authors`);
        } catch (error) {
            if(error.response && error.response.data) {
                setErrors(error.response.data.errors);
            } else {
                console.error('There was an error updating the author!', error);
            }
        }
    };

    if (isAuthorLoading) {
        return (
            <Loader/>
        );
    }

    return (
        <Box mx="auto" mt="3" p="6" boxShadow="outline" borderRadius="md">
            <VStack>
                <Heading as="h2" size="lg" fontWeight="bold">
                    Редактирование автора
                </Heading>
                <form onSubmit={handleSubmit}>
                    {errors &&
                        errors.map(error => (
                            <Text color="red.500">{error}</Text>
                        ))}
                    <FormControl isRequired>
                        <FormLabel>Имя</FormLabel>
                        <Input
                            type="text"
                            name="firstName"
                            value={author.firstName}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel >Фамилия</FormLabel>
                        <Input
                            type="text"
                            name="lastName"
                            value={author.lastName}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Страна</FormLabel>
                        <Input
                            type="text"
                            name="country"
                            value={author.country}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Дата рождения</FormLabel>
                        <Input
                            type="date"
                            name="birthDate"
                            value={author.birthDate ? new Date(author.birthDate).toISOString().split('T')[0] : ''}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <Button onClick={()=> navigate(`/authors/${params.id}`)} colorScheme='teal'  mt='4' mr='4'>Назад</Button>
                    <Button  colorScheme='blue' type="submit" mt='4'>Обновить автора</Button>
                </form>
            </VStack>
        </Box>
    );
};

export default AuthorRedact;