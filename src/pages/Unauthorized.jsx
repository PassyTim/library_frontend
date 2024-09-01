import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Heading, VStack, Text, Box} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="90vh"
            padding={4}
        >
            <VStack spacing={6} alignItems="center">
                <WarningIcon boxSize="50px" color="red.500" />
                <Heading as="h1" size="2xl" textAlign="center" color="red.600">
                    Unauthorized
                </Heading>
                <Text fontSize="lg" textAlign="center" color="gray.700">
                    You do not have permission to view this page.
                </Text>
                <Button colorScheme="teal" onClick={goBack} size="lg">
                    Вернуться назад
                </Button>
            </VStack>
        </Box>
    );
};

export default Unauthorized;