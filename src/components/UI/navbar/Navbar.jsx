import React from 'react';
import {Box, Button, ButtonGroup, Flex, Heading, Spacer} from "@chakra-ui/react";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <Flex minWidth='max-content' alignItems='center' gap='2' width="100%" paddingX='5px' py='2px' borderBottom='1px'>
            <Box p='2' display="flex" alignItems="center" justifyContent='space-between' gap='5'>
                <Heading size='md'>Library</Heading>
                <Link style={{paddingTop:'4px', fontWeight:"bold"}}  to='books' >Books</Link>
                <Link style={{paddingTop:'4px', fontWeight:"bold"}} to='authors'>Authors</Link>
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