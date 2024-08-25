import React from 'react';
import {Box, Button, ButtonGroup, Flex, Heading, Link, Spacer} from "@chakra-ui/react";

const Navbar = () => {
    return (
        <Flex minWidth='max-content' alignItems='center' gap='2' width="100%" paddingX='5px' py='2px' borderBottom='1px'>
            <Box p='2' display="flex" alignItems="center" justifyContent='space-between' gap='5'>
                <Heading size='md'>Library</Heading>
                <Link paddingTop='4px' fontWeight="bold">Books</Link>
                <Link paddingTop='4px' fontWeight="bold">Authors</Link>
            </Box>
            <Spacer />
            <ButtonGroup gap='2'>
                <Button colorScheme='teal'>Sign Up</Button>
                <Button colorScheme='teal'>Log in</Button>
            </ButtonGroup>
        </Flex>
    );
};

export default Navbar;