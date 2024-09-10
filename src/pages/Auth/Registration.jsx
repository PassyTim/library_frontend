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

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues:{
            role: 'User',
        }});

    const onSubmit = async (data) => {
        try {
            console.log(data);
            await axios
            const response = await axios.post('https://localhost:7212/api/auth/register', data
            );
            console.log(response);
            if(response.isSuccess)
            {
                navigate('/auth/login');
            }

            console.log('Пользователь успешно зарегистрирован:');
        } catch (error) {
            if(error.response) {
                setResponseErrors(error.response)};
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
                                },
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