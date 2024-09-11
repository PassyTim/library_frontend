import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Heading,
    Text,
    VStack,
    Divider,
    Flex, Alert, AlertIcon, AlertTitle, AlertDescription,
} from "@chakra-ui/react";
import {Link, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import TakeBookService from "../API/TakeBookService";
import {useFetching} from "../useFetching";
import Loader from "../components/UI/loader/Loader";

const UserInfo = () => {
    const [user, setUser] = useState({});
    const [borrowedBooks, setBorrowedBooks] = useState({});
    const navigate = useNavigate();

    const {auth} = useAuth();

    const {getAll} = TakeBookService();

    const [fetchBorrowedBooks,isLoading, error] = useFetching(async (userId) => {
        const response = await getAll(userId);
        setBorrowedBooks(response.data);
    })

    useEffect(() => {
        const storedUser = auth.user;
        console.log(storedUser)
        if (storedUser) {
            setUser(storedUser);
        }
    }, [auth]);

    useEffect(()=> {
        fetchBorrowedBooks(auth.user.id);
    }, [])

    if(isLoading) {
        return <Loader/>
    }

    if (error) {
        navigate('/error');
    }

    if (!user) {
        return <Text color="red.500">Ошибка: пользователь не найден.</Text>;
    }

    const checkDueDate = (returnDate) => {
        const today = new Date();
        const dueDate = new Date(returnDate);
        const timeDiff = dueDate - today;
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        return daysLeft;
    };

    return (

        <Box mx="auto" mt="5" p="6" boxShadow="lg" borderRadius="md" width="100%">
            <VStack spacing={4} align="start">
                <Heading as="h2" size="lg" fontWeight="bold">
                    Информация о пользователе
                </Heading>
                <Text fontSize="lg">
                    <strong>Имя пользователя:</strong> {user.userName}
                </Text>
                <Text fontSize="lg">
                    <strong>Email:</strong> {user.email}
                </Text>

                <Divider />

                <Heading as="h3" size="md" fontWeight="bold" mt="4">
                    Взятые книги
                </Heading>

                {borrowedBooks && borrowedBooks.length > 0 ? (
                    borrowedBooks.map((borrowedBook, index) => {
                        const daysLeft = checkDueDate(borrowedBook.returnDate);

                        return (
                            <Box key={index} p="4" borderWidth="1px" borderRadius="md" width="100%">
                                {daysLeft <= 3 && daysLeft > 0 && (
                                    <Alert status="warning">
                                        <AlertIcon />
                                        <AlertTitle mr={2}>Срок возврата книги скоро истечет!</AlertTitle>
                                        <AlertDescription>
                                            Осталось {daysLeft} {daysLeft === 1 ? 'день' : 'дня'} до возврата.
                                        </AlertDescription>
                                    </Alert>
                                )}
                                {daysLeft === 0 && (
                                    <Alert status="error">
                                        <AlertIcon />
                                        <AlertTitle mr={2}>Сегодня последний день возврата!</AlertTitle>
                                    </Alert>
                                )}
                                {daysLeft < 0 && (
                                    <Alert status="error">
                                        <AlertIcon />
                                        <AlertTitle mr={2}>Срок возврата книги истек!</AlertTitle>
                                    </Alert>
                                )}

                                <VStack align="start">
                                    <Text fontSize="md">
                                        <strong>Название:</strong> {borrowedBook.name}
                                    </Text>
                                    <Text fontSize="md">
                                        <strong>Дата
                                            взятия:</strong> {new Date(borrowedBook.takeDate).toLocaleDateString()}
                                    </Text>
                                    <Text fontSize="md">
                                        <strong>Дата
                                            возврата:</strong> {new Date(borrowedBook.returnDate).toLocaleDateString()}
                                    </Text>
                                </VStack>
                                <Flex justify="flex-end">

                                    <Button as={Link} to={`/books/${borrowedBook.id}`} colorScheme="teal" size="sm"
                                            mt="2">
                                        Подробнее о книге
                                    </Button>
                                </Flex>
                            </Box>
                        )
                    })
                    ) : (
                            <Text>Нет взятых книг.</Text>
                        )}
                    </VStack>
                    </Box>

    );
};

export default UserInfo;