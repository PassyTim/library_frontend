import React, {useContext, useState} from 'react';
import { useForm } from 'react-hook-form';
import {FormControl, FormLabel, Input, Button, VStack, FormErrorMessage, Box, Heading, Text} from '@chakra-ui/react';
import axios from 'axios';
import AuthContext from "../../context/AuthProvider";
import {Link, useNavigate} from "react-router-dom";

const Login= () => {
    const navigate = useNavigate();
    const [responseErrors, setResponseErrors] = useState([]);
    const {setAuth} = useContext(AuthContext);

    function getRole(token) {
        const arrayToken = token.split('.');
        const tokenPayload = JSON.parse(atob(arrayToken[1]));
        return tokenPayload.role;
    }

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log(data);
            const response = await axios.post('https://localhost:7212/api/auth/login', data, {
                withCredentials : true,
            });
            console.log(response);

            const accessToken = response?.headers['authorization'];
            console.log(response.data);
            const user = response?.data;
            const role = getRole(accessToken);

            setAuth({user, role, accessToken})

            navigate('/books');

            console.log('Пользователь успешно вошел в систему:', response.data);
        } catch (error) {
            if(error?.response) {
                setResponseErrors(error.response)};
            console.error('Ошибка:', error);
        }
    };

    return (
        <Box w='350px' mx="auto" mt="3" p="6" boxShadow="outline" borderRadius="md">
            <Heading as="h2" size="lg" fontWeight="bold">Войти в систему</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                {responseErrors &&
                    responseErrors.map(error => (
                        <Text key={error} color="red.500">{error}</Text>
                    ))}
                <VStack spacing={4}>
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
                        Войти
                    </Button>
                    <Text>Нет аккаунта? <Link style={{color:'teal'}} to={'/auth/register'}>Создать</Link></Text>
                </VStack>
            </form>
        </Box>
    );
};

export default Login;