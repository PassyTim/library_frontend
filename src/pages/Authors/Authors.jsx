import React, {useEffect, useState} from 'react';
import {useFetching} from "../../useFetching";
import AuthorService from "../../API/AuthorService";
import Loader from "../../components/UI/loader/Loader";
import AuthorsList from "../../components/AuthorsList";
import {Button, Divider} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

const Authors = () => {
    const navigate = useNavigate();
    const [authors, setAuthors] = useState([]);

    const [fetchAuthors,isAuthorsLoading, authorError] = useFetching(async () => {
        const response = await AuthorService.getAll();
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
            <Button
                onClick={()=> navigate(`/authors/add`)}
                colorScheme='green'
                variant='outline'
                mt='4px'
            >
                Добавить
            </Button>
            <Divider my={5}/>
            <AuthorsList authors={authors}/>
        </div>
    );
};

export default Authors;