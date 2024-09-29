import React from 'react';
import BookCard from "./BookCard";
import {Box, Text, Icon, SimpleGrid} from "@chakra-ui/react";
import { MdSearchOff } from "react-icons/md";

const BookCardList = ({cards}) => {

    if (!cards.length) return (
        <Box
            textAlign="center"
            p={10}
            bg="gray.50"
            borderRadius="md"
            boxShadow="md"
            mt={5}
        >
            <Icon as={MdSearchOff} boxSize={12} color="gray.400" />
            <Text fontSize="xl" mt={3} fontWeight="bold" color="gray.600">
                Ничего не найдено
            </Text>
            <Text fontSize="md" color="gray.500">
                Попробуйте изменить фильтры или условия поиска
            </Text>
        </Box>
    );

    return (
        <SimpleGrid spacing={6} templateColumns='repeat(2, minmax(300px, 1fr))'  marginTop={5}>
            {cards.map(card =>
                <BookCard key={card.id} {...card} />
            )}
        </SimpleGrid>
    );
};

export default BookCardList;