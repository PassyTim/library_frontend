import React, {useEffect, useState} from 'react';
import {useFetching} from "../../useFetching";
import AuthorService from "../../API/AuthorService";
import Loader from "../../components/UI/loader/Loader";
import AuthorsList from "../../components/AuthorsList";
import {Button, Divider} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Authors = () => {
    const navigate = useNavigate();
    const [authors, setAuthors] = useState([]);
    const {auth} = useAuth();

    const {getAllAuthors} = AuthorService();

    const [fetchAuthors,isAuthorsLoading, authorError] = useFetching(async () => {
        const response = await getAllAuthors();
        setAuthors(response.data.data);
    })

    useEffect(() => {
        fetchAuthors();
    }, []);

    if(isAuthorsLoading)
        return (
            <Loader/>
        )

    return (
        <div>
            {auth.role === "Admin"
                ? <Button
                    onClick={()=> navigate(`/authors/add`)}
                    colorScheme='green'
                    variant='outline'
                    mt='4px'
                >
                    Добавить
                </Button>
                : <></>
            }
            <Divider my={5}/>
            <AuthorsList authors={authors}/>
        </div>
    );
};

export default Authors;