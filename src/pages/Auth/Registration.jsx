import React, {useState} from 'react';
import { useForm } from 'react-hook-form';

import {
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
    FormErrorMessage, Box, Heading, Text,
} from '@chakra-ui/react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Registration = () => {
    const navigate = useNavigate();
    const [responseErrors, setResponseErrors] = useState([]);
    const BASE_URL = fetchBaseUrl();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues:{
            role: 'User',
        }});

    function fetchBaseUrl () {
        if(process.env.NODE_ENV === 'production') {
            return "http://localhost:5000"
        }
        else {
            return "https://localhost:7212"
        }
    }

    const onSubmit = async (data) => {
        try {
            console.log(data);
            await axios
            const response = await axios.post(BASE_URL + '/api/auth/register', data, {
                withCredentials : true,
                headers : {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"},
                }
            );
            console.log(response);
            if(response.status === 204)
            {
                navigate('/auth/login');
            }

            console.log('Пользователь успешно зарегистрирован:');
        } catch (error) {
            if(error.response) {
                const errorData = error.response.data;

                const formattedErrors = [];

                if (errorData.Detail) {
                    formattedErrors.push(errorData.Detail);
                }

                setResponseErrors(formattedErrors);
            }
            console.error('Ошибка:', error);
        }
    };

    return (
        <Box w='350px' mx="auto" mt="3" p="6" boxShadow="outline" borderRadius="md">
            <Heading as="h2" size="lg" fontWeight="bold">Регистрация</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                {responseErrors &&
                    responseErrors.map(error => (
                        <Text color="red.500">{error}</Text>
                    ))}
                <VStack spacing={4}>
                    <FormControl isInvalid={errors.userName}>
                        <FormLabel htmlFor='userName'>Имя пользователя</FormLabel>
                        <Input
                            id='userName'
                            placeholder='Введите имя пользователя'
                            {...register('userName', {
                                required: 'Имя пользователя обязательно',
                            })}
                        />
                        <FormErrorMessage>{errors.userName && errors.userName.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.email}>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input
                            id='email'
                            type='email'
                            placeholder='Введите ваш email'
                            {...register('email', {
                                required: 'Email обязателен',
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: 'Неверный формат email',
                                },
                            })}
                        />
                        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.password}>
                        <FormLabel htmlFor='password'>Пароль</FormLabel>
                        <Input
                            id='password'
                            type='password'
                            placeholder='Введите пароль'
                            {...register('password', {
                                required: 'Пароль обязателен',
                                minLength: {
                                    value: 8,
                                    message: 'Пароль должен содержать не менее 8 символов',
                                }
                            })}
                        />
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    </FormControl>
                    <Button
                        mt={4}
                        colorScheme='teal'
                        isLoading={isSubmitting}
                        type='submit'
                    >
                        Зарегистрироваться
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default Registration;