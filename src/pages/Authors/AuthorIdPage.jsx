import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../useFetching";
import Loader from "../../components/UI/loader/Loader";
import {
    Badge,
    Box, Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button, ButtonGroup,
    Heading,
    List,
    ListItem,
    Text, useDisclosure
} from "@chakra-ui/react";
import DeleteAlert from "../../components/UI/deleteAlert/DeleteAlert";
import AuthorService from "../../API/AuthorService";
import useAuth from "../../hooks/useAuth";

const AuthorIdPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [author, setAuthor] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {auth} = useAuth();

    const {getByIdWithBooks, deleteAuthor} = AuthorService();

    const [fetchAuthor, isAuthorLoading, authorError] = useFetching(async (id) => {
        const response = await getByIdWithBooks(id);
        setAuthor(response.data);
    })

    const handleDeleteAuthor = async () => {
        await deleteAuthor(author.id);
        onClose();
        navigate('/authors')
    };

    useEffect(() => {
        fetchAuthor(params.id);
    }, [])

    if(isAuthorLoading)
        return (
            <Loader/>
        )

    return (
        <div>
            <Breadcrumb ml='12%' mt='5' spacing='8px'>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to='/authors'>Authors</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>{author.firstName} {author.lastName}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <DeleteAlert
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                itemType='автора'
                itemName={author.firstName + ' ' + author.lastName}
                deleteFunc={handleDeleteAuthor}
            />

            <Box maxWidth="800px" mx="auto" mt={10} p={5} boxShadow="md" borderRadius="md">
                <Heading as="h1" size="lg" mb={4}>
                    {author.firstName} {author.lastName}
                </Heading>
                <Text fontSize="lg" mb={2}>
                    Страна: {author.country}
                </Text>
                <Text fontSize="lg" mb={4}>
                    Дата рождения: {author.birthDate ? new Date(author.birthDate).toLocaleDateString() : 'Неизвестно'}
                </Text>

                <Button mr={2} mb={1} colorScheme='teal' onClick={()=> navigate(`/authors`)}>К авторам</Button>

                {auth.role === "Admin"
                    ? <ButtonGroup mr={2} mb={4}>
                        <Button colorScheme='red' onClick={onOpen} >Удалить</Button>
                        <Button  onClick={()=> navigate(`/authors/${author.id}/redact`)} colorScheme='blue'>Редактировать</Button>
                    </ButtonGroup>
                    : <></>
                }

                <Heading as="h2" size="md" mb={4}>
                    Книги:
                </Heading>
                <List spacing={3}>
                    {author.books && author.books.length > 0 ? (
                        author.books.map((book) => (
                            <ListItem key={book.id}>
                                <Box p={3} shadow="sm" borderWidth="1px" borderRadius="md">
                                    <Link to={`/books/${book.id}`}>
                                        <Heading as="h3" size="sm" color="teal.500">
                                            {book.name}
                                        </Heading>
                                    </Link>
                                    <Badge colorScheme="purple" ml={2}>
                                        {book.genre}
                                    </Badge>
                                </Box>
                            </ListItem>
                        ))
                    ) : (
                        <Text>У этого автора пока нет книг.</Text>
                    )}
                </List>
            </Box>
        </div>

    );
};

export default AuthorIdPage;