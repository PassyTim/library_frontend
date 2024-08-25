import React from 'react';
import BookCard from "./BookCard";
import {SimpleGrid} from "@chakra-ui/react";

const BookCardList = ({cards}) => {

    if (!cards.length) return (
        <div>
            <h1>No content found</h1>
        </div>
    )
    return (
        <SimpleGrid spacing={6} templateColumns='repeat(2, minmax(300px, 1fr))'  marginTop={5}>
            {cards.map(card =>
                <BookCard key={card.id} {...card} />
            )}
        </SimpleGrid>
    );
};

export default BookCardList;