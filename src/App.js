import React, {useEffect, useState} from "react";
import Navbar from "./components/UI/navbar/Navbar";
import './styles/App.css';
import {ChakraProvider, Divider} from "@chakra-ui/react";
import BookCardList from "./components/BookCardList";
import BookService from "./API/BookService";
import Loader from "./components/UI/loader/Loader";
import {useFetching} from "./useFetching";
import {getPagesCount} from "./utils/pages";
import Pagination from "./components/UI/pagination/Pagination";

function App() {
    const [cards, setCards] = useState([]);
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [fetchCards,isCardsLoading, cardError] = useFetching(async (limit, currentPage) => {
        const response = await BookService.getAll(limit, currentPage);
        setCards(response.data.data);
        const totalCardsCount = response.headers['x-count']
        setTotalPages(getPagesCount(totalCardsCount, limit))
    })

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchCards(limit, pageNumber);
    }

    useEffect(() => {
        fetchCards(limit, currentPage);
    }, []);

    return (
        <ChakraProvider>
            <Navbar/>
            {cardError &&
                <h1>Произошла ошибка: {cardError}</h1>
            }
            {isCardsLoading
                ? <Loader/>
                : <BookCardList cards={cards}/>
            }
            <Divider my={5}/>

            <Pagination totalPages={totalPages} changePage={changePage} currentPage={currentPage}/>

            <div style={{marginBottom:30}}></div>
        </ChakraProvider>

    );
}

export default App;
