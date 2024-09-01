import React, {useEffect, useState} from "react";
import Pagination from "../../components/UI/pagination/Pagination";
import {Button, Divider, Input, Select} from "@chakra-ui/react";
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

    const {auth} = useAuth();

    const {getAllAuthors} = AuthorService();
    const {getAllBooks} = BookService();

    const [fetchCards, isCardsLoading, cardError] = useFetching(async (limit, currentPage) => {
        const response = await getAllBooks(limit, currentPage);
        setCards(response.data.data);
        setFilteredCards(response.data.data);
        const totalCardsCount = response.headers['x-count']
        setTotalPages(getPagesCount(totalCardsCount, limit))
    })

    const [fetchAuthors,isAuthorsLoading, authorError] = useFetching(async () => {
        const response = await getAllAuthors();
        setAuthors(response.data.data);
    })

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchCards(limit, pageNumber);
    }

    useEffect(() => {
        fetchCards(limit, currentPage);
    }, []);

    useEffect(()=> {
        if (!isCardsLoading && !cardError && cards.length > 0) {
            fetchAuthors();
        }
    }, [isCardsLoading, cardError, cards ])

    const filterCards = () => {
        let filtered = cards;

        if (filter.author) {
            filtered = filtered.filter(card => card.authorId === parseInt(filter.author));
        }

        if (filter.genre) {
            filtered = filtered.filter(card => card.genre.toLowerCase().includes(filter.genre.toLowerCase()));
        }

        setFilteredCards(filtered);
    };

    const handleAuthorChange = (e) => {
        setFilter(prevFilter => ({ ...prevFilter, author: e.target.value }));
    };

    const handleGenreChange = (e) => {
        setFilter(prevFilter => ({ ...prevFilter, genre: e.target.value }));
    };

    useEffect(() => {
        filterCards();
    }, [filter, cards]);

    return (
        <div style={{marginTop:"5px"}}>
            <div style={{display:"flex", direction:"row", justifyContent:"space-between", width:"50%"}}>
                <Select value={filter.author} onChange={handleAuthorChange} placeholder="По автору">
                    <option value=''>Все</option>
                    {authors.map(author => (
                        <option key={author.id} value={author.id}>
                            {author.firstName} {author.lastName}
                        </option>
                    ))}
                </Select>
                <Input
                    type='text'
                    value={filter.genre}
                    onChange={handleGenreChange}
                    placeholder='Поиск по жанру..'
                />
            </div>
            {auth.role === "Admin"
                ? <Button
                    onClick={()=> navigate(`/books/add`)}
                    colorScheme='green'
                    variant='outline'
                    mt='4px'
                >
                    Добавить
                </Button>
                : <></>
            }


            {cardError &&
                <h1>Произошла ошибка: {cardError}</h1>
            }
            {isCardsLoading
                ? <Loader/>
                : <BookCardList cards={filteredCards}/>
            }
            <Divider my={5}/>

            <Pagination totalPages={totalPages} changePage={changePage} currentPage={currentPage}/>

            <div style={{marginBottom:30}}></div>
        </div>

    );
}

export default Books;