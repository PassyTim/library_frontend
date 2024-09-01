import React, {useEffect} from 'react';
import {Box, Button, ButtonGroup, Flex, Heading, Spacer} from "@chakra-ui/react";
import {Link, useNavigate} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
    const {auth, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    };

    return (
        <Flex minWidth='max-content' alignItems='center' gap='2' width="100%" paddingX='5px' py='2px' borderBottom='1px'>
            <Box p='2' display="flex" alignItems="center" justifyContent='space-between' gap='5'>
                <Heading size='md'>Library</Heading>
                <Link style={{paddingTop:'4px', fontWeight:"bold"}}  to='books' >Books</Link>
                <Link style={{paddingTop:'4px', fontWeight:"bold"}} to='authors'>Authors</Link>
            </Box>
            <Spacer />
            {auth.user
                ? <ButtonGroup gap='2'>
                    <Button onClick={handleLogout} colorScheme='red' variant='outline'>Log out</Button>
                    <Button onClick={()=> navigate(`/user`)} colorScheme='teal'>Account</Button>
                </ButtonGroup>
                : <ButtonGroup gap='2'>
                    <Button onClick={()=> navigate(`/auth/register`)} colorScheme='teal'>Sign Up</Button>
                    <Button onClick={()=> navigate(`/auth/login`)} colorScheme='teal'>Log in</Button>
                </ButtonGroup>
            }
        </Flex>
    );
};

export default Navbar;