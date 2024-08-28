import React, {useEffect, useState} from 'react';
import {useParams, Link, useNavigate} from "react-router-dom";
import { useFetching } from "../../useFetching";
import BookService from "../../API/BookService";
import Loader from "../../components/UI/loader/Loader";
import {
    Box,
    Image,
    Text,
    Heading,
    Badge,
    HStack,
    VStack,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink, useDisclosure
} from "@chakra-ui/react";
import AuthorService from "../../API/AuthorService";
import DeleteAlert from "../../components/UI/deleteAlert/DeleteAlert";

const BookIdPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({});
    const [author, setAuthor] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [fetchBookById, isLoading, error] = useFetching(async (id) => {
        const response = await BookService.getById(id);
        setBook(response.data.data);
    });

    const [fetchAuthor, isAuthorLoading, authorError] = useFetching(async (id) => {
        const response = await AuthorService.getByIdWithoutBooks(id);
        setAuthor(response.data.data);
    })

    const handleDeleteBook = async () => {
        await BookService.delete(book.id);
        onClose();
        navigate('/books')
    };

    useEffect(() => {
        fetchBookById(params.id);
    }, []);

    useEffect(() => {
        fetchAuthor(book.authorId);
    }, [book]);

    if (isLoading || isAuthorLoading) {
        return <Loader />;
    }

    if (error) {
        return <Text color="red.500">Error loading book details.</Text>;
    }

    return (
        <div style={{width:'80%'}}>
            <Breadcrumb ml='12%' mt='5' spacing='8px'>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to='/Books/Books'>Books</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>{book.name}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <DeleteAlert
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                itemType='книгу'
                itemName={book.name}
                deleteFunc={handleDeleteBook}
            />

            <Box w='80%' mx="auto" mt="3" p="6" boxShadow="lg" borderRadius="md" >
                {book ? (
                    <HStack spacing="8" alignItems="start">
                        <Image
                            src={book.imageUrl}
                            alt={book.name}
                            borderRadius="md"
                            width="350px"
                            height="450px"
                            objectFit="cover"
                        />

                        <VStack align="start" spacing="4" flex="1">
                            <Heading as="h2" size="lg" fontWeight="bold">
                                {book.name}
                            </Heading>
                            <Heading as="h2" size="md" fontWeight="bold">
                                {author.firstName} {author.lastName}
                            </Heading>
                            <Badge colorScheme="purple" fontSize="0.9em">
                                {book.genre}
                            </Badge>
                            <Text fontSize="md" color="gray.600">
                                {book.description}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                                ISBN: {book.isbn}
                            </Text>
                            <HStack>
                                <Button colorScheme='teal' variant='ghost'><Link to='/Books/Books'>К книгам</Link></Button>
                                <Button colorScheme='green'>Взять книгу</Button>
                            </HStack>
                                <Button colorScheme='red' onClick={onOpen}>Удалить книгу</Button>
                                <Button onClick={()=> navigate(`/books/${book.id}/redact`)} colorScheme='blue'>Редактировать</Button>
                        </VStack>
                    </HStack>
                ) : (
                    <Text>No book data found.</Text>
                )}
            </Box>
        </div>
    );
};

export default BookIdPage;