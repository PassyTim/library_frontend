import React, {useEffect, useState} from "react";
import Pagination from "../../components/UI/pagination/Pagination";
import {Box, Button, Divider, Input, Select, VStack, Text} from "@chakra-ui/react";
import BookCardList from "../../components/BookCardList";
import Loader from "../../components/UI/loader/Loader";
import AuthorService from "../../API/AuthorService";
import {useFetching} from "../../useFetching";
import {getPagesCount} from "../../utils/pages";
import BookService from "../../API/BookService";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";


function Books() {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [filteredCards, setFilteredCards] = useState([]);
    const [filter, setFilter] = useState({ author: '', genre: '' });
    const [authors, setAuthors] = useState([]);
    const [debounceTimeout, setDebounceTimeout] = useState(null);
    const [searchTitle, setSearchTitle] = useState('');
    const [initialized, setInitialized] = useState(false);

    const {auth} = useAuth();

    const {getAllAuthors} = AuthorService();
    const {getAllBooks, getSearchBooks} = BookService();

    const [fetchCards, isCardsLoading, cardError] = useFetching(async (limit, currentPage, authorId, bookName) => {
        let response;

        if(authorId || bookName)
        {
            response = await getSearchBooks(limit, currentPage, authorId, bookName)
        } else {
            response = await getAllBooks(limit, currentPage);
        }

        setCards(response.data);
        setFilteredCards(response.data);
        const totalCardsCount = response.headers['x-count']
        setTotalPages(getPagesCount(totalCardsCount, limit))
    })

    const [fetchAuthors, isAuthorsLoading, authorError] = useFetching(async () => {
        const response = await getAllAuthors();
        setAuthors(response.data);
    })

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchCards(limit, pageNumber, filter.author, searchTitle);
    }

    useEffect(() => {
        if (!initialized) {
            fetchCards(limit, currentPage, filter.author, searchTitle);
            fetchAuthors();
            setInitialized(true);
        }
    }, [initialized]);

    useEffect(()=> {
        if (!isCardsLoading && !cardError && cards.length > 0) {
            fetchAuthors();
        }
    }, [isCardsLoading, cardError, cards ])

    useEffect(() => {
        if (initialized) {
            changePage(1);
        }
    }, [filter]);

    useEffect(() => {
        if (debounceTimeout) clearTimeout(debounceTimeout);

        const timeout = setTimeout(() => {
            if(initialized) {
                fetchCards(limit, currentPage, filter.author, searchTitle);
            }
        }, 1000);

        setDebounceTimeout(timeout);

        return () => clearTimeout(timeout);
    }, [searchTitle]);

    const handleAuthorChange = (e) => {
        setFilter(prevFilter => ({ ...prevFilter, author: e.target.value }));
    };

    return (
        <Box maxW="100%" mx="auto" p={4}>
            <Box display="flex" alignItems="flex-start" gap={5}>
                <Box width="300px" flexShrink={0} mt={5}>
                    <VStack spacing={4} align="stretch" mb={4}>
                        <Select
                            value={filter.author}
                            onChange={handleAuthorChange}
                            placeholder="По автору"
                            width="100%"
                        >
                            <option value="">Все</option>
                            {authors.map((author) => (
                                <option key={author.id} value={author.id}>
                                    {author.firstName} {author.lastName}
                                </option>
                            ))}
                        </Select>
                        <Input
                            type="text"
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            placeholder="Поиск по названию.."
                            width="100%"
                        />
                        {auth.role === "Admin" && (
                            <Button
                                onClick={() => navigate(`/books/add`)}
                                colorScheme="green"
                                variant="outline"
                                width="100%"
                            >
                                Добавить
                            </Button>
                        )}
                    </VStack>
                </Box>

                <Box flex="1">
                    {cardError && <Text color="red.500">Произошла ошибка</Text>}

                    <Box minH="400px">
                        {isCardsLoading ? (
                            <Loader />
                        ) : (
                            <BookCardList cards={filteredCards} />
                        )}
                    </Box>

                    <Divider my={5} />
                    <Pagination totalPages={totalPages} changePage={changePage} currentPage={currentPage} />
                </Box>
            </Box>
        </Box>
    );
}

export default Books;