import React, {useEffect, useState} from 'react';
import {useParams, Link, useNavigate} from "react-router-dom";
import { useFetching } from "../../useFetching";
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
    BreadcrumbLink,
    useDisclosure,
    ButtonGroup,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody, FormControl, FormLabel, Input, ModalFooter
} from "@chakra-ui/react";
import DeleteAlert from "../../components/UI/deleteAlert/DeleteAlert";
import BookService from "../../API/BookService";
import AuthorService from "../../API/AuthorService";
import useAuth from "../../hooks/useAuth";
import BorrowBookService from "../../API/BorrowBookService";

const BookIdPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({});
    const [author, setAuthor] = useState({});
    const deleteDisclosure = useDisclosure();
    const borrowDisclosure = useDisclosure();
    const [returnDate, setReturnDate] = useState({});

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const {auth} = useAuth();

    const borrowBookHandle = async () => {
        try{
            const response = await borrowBook(auth.user.id, book.id, returnDate)
        } catch (e) {
            console.log(e);
        }
        borrowDisclosure.onClose()
    }

    const {borrowBook} = BorrowBookService();
    const {getById, deleteBook} = BookService();
    const {getByIdWithoutBooks} = AuthorService();

    const [fetchBookById, isLoading, error] = useFetching(async (id) => {
        const response = await getById(id);
        setBook(response.data.data);
    });

    const [fetchAuthor, isAuthorLoading, authorError] = useFetching(async (id) => {
        const response = await getByIdWithoutBooks(id);
        setAuthor(response.data.data);
    })

    const handleDeleteBook = async () => {
        await deleteBook(book.id);
        deleteDisclosure.onClose();
        navigate('/books')
    };

    useEffect(() => {
        fetchBookById(params.id);
    }, [params.id, borrowDisclosure.onClose]);

    useEffect(() => {
        if (!isLoading && !error && book.authorId) {
            fetchAuthor(book.authorId);
        }
    }, [book, isLoading, error]);

    const handleReturnDateChange = (event) => {
        setReturnDate(event.target.value);
    };

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);

    if (isLoading || isAuthorLoading) {
        return <Loader />;
    }

    if (error) {
        return <Text color="red.500">Error loading book details.</Text>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width:'100%'}}>
            <Box w='100%' maxW="1300px" mx="auto" mt="3" p="6" boxShadow="lg" borderRadius="md" >
            <Breadcrumb ml='12%' my='3' spacing='8px'>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to='/Books'>Books</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>{book.name}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>


            <DeleteAlert
                isOpen={deleteDisclosure.isOpen}
                onOpen={deleteDisclosure.onOpen}
                onClose={deleteDisclosure.onClose}
                itemType='книгу'
                itemName={book.name}
                deleteFunc={handleDeleteBook}
            />


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
                                <Button colorScheme='teal' variant='ghost'><Link to='/Books'>К книгам</Link></Button>
                                {book.availableCount === 0
                                    ? <Badge  ml={3} p={2} size='ml' variant='outline' colorScheme='gray' fontSize='0.8em' >Нет в наличии</Badge>
                                    : <Button onClick={borrowDisclosure.onOpen} colorScheme='green'>Взять книгу</Button>
                                }
                            </HStack>
                            {auth.role === "Admin"
                                ?
                                <ButtonGroup p={2}>
                                    <Button colorScheme='red' onClick={deleteDisclosure.onOpen}>Удалить книгу</Button>
                                    <Button onClick={()=> navigate(`/books/${book.id}/redact`)} colorScheme='blue'>Редактировать</Button>
                                </ButtonGroup>
                                : <></>
                            }
                        </VStack>
                    </HStack>
                ) : (
                    <Text>No book data found.</Text>
                )}
            </Box>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={borrowDisclosure.isOpen}
                onClose={borrowDisclosure.onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Выберите дату возврата книги</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Дата возврата</FormLabel>
                            <Input
                                type="date"
                                ref={initialRef}
                                value={returnDate}
                                onChange={handleReturnDateChange}
                                min={minDate.toISOString().split('T')[0]} // Изменено
                                max={maxDate.toISOString().split('T')[0]} // Изменено
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={borrowBookHandle}> {/* Изменено */}
                            Подтвердить
                        </Button>
                        <Button onClick={borrowDisclosure.onClose}>Отмена</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default BookIdPage;