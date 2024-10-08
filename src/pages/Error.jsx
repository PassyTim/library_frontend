import React from 'react';
import {useNavigate} from "react-router-dom";
import {Box, Heading, VStack, Text, Button} from "@chakra-ui/react";
import {WarningTwoIcon} from "@chakra-ui/icons";

const Error = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="90vh"
            padding={4}
        >
            <VStack spacing={6} alignItems="center">
                <WarningTwoIcon boxSize="60px" color="red.500" />
                <Heading as="h1" size="2xl" textAlign="center" color="red.600">
                    An Error Occurred!
                </Heading>
                <Text fontSize="lg" textAlign="center" color="gray.700">
                    Something went wrong. Please try again later or go back to the previous page.
                </Text>
                <Button colorScheme="teal" onClick={handleGoBack} size="lg">
                    Go Back
                </Button>
            </VStack>
        </Box>
    );
};

export default Error;