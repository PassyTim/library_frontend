import React from 'react';
import {Box, SimpleGrid} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

const AuthorsList = ({authors}) => {
    const navigate = useNavigate();

    if (!authors.length) return (
        <div>
            <h1>No content found</h1>
        </div>
    )

    return (
        <div style={{width:"100%"}}>
            <SimpleGrid w="90%" columns={3} spacingX={20} spacingY={3}>
                {authors.map(author => (
                    <Box
                        as='button'
                        border='1px solid teal'
                        rounded='md'
                        w='450px'
                        height='50px'
                        justifyContent='center'
                        onClick={()=> navigate(`/authors/${author.id}`)}
                    >
                        {author.firstName} {author.lastName}
                    </Box>
                ))}
            </SimpleGrid>
        </div>
    );
};

export default AuthorsList;