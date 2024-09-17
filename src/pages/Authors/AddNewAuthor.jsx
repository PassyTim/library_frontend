import React, {useState} from 'react';
import {Box, Button, FormControl, FormLabel, Heading, Input, Text, VStack} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import AuthorService from "../../API/AuthorService";

const AddNewAuthor = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [author, setAuthor] = useState({
        firstName: '',
        lastName: '',
        country: '',
        birthDate: ''
    })
    const {createAuthor} = AuthorService();

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
            await createAuthor(author);
            navigate(`/authors`);
        } catch (error) {
            if(error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('There was an error updating the author!', error);
            }
        }
    };
    return (
        <Box mx="auto" mt="3" p="6" boxShadow="outline" borderRadius="md">
            <VStack>
                <Heading as="h2" size="lg" fontWeight="bold">
                    Редактирование автора
                </Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl isRequired>
                        <FormLabel>Имя</FormLabel>
                        <Input
                            type="text"
                            name="firstName"
                            value={author.firstName}
                            onChange={handleChange}
                        />
                        {errors.FirstName && errors.FirstName.map((err, index) => (
                            <Text color="red.500" key={index}>{err}</Text>
                        ))}
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel >Фамилия</FormLabel>
                        <Input
                            type="text"
                            name="lastName"
                            value={author.lastName}
                            onChange={handleChange}
                        />
                        {errors.LastName && errors.LastName.map((err, index) => (
                            <Text color="red.500" key={index}>{err}</Text>
                        ))}
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Страна</FormLabel>
                        <Input
                            type="text"
                            name="country"
                            value={author.country}
                            onChange={handleChange}
                        />
                        {errors.Country && errors.Country.map((err, index) => (
                            <Text color="red.500" key={index}>{err}</Text>
                        ))}
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
                    <Button onClick={()=> navigate(`/authors`)} colorScheme='teal'  mt='4' mr='4'>Назад</Button>
                    <Button  colorScheme='blue' type="submit" mt='4'>Создать автора</Button>
                </form>
            </VStack>
        </Box>
    );
};

export default AddNewAuthor;