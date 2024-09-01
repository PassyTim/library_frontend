import React from 'react';
import {Button} from "@chakra-ui/react";
import {getPagesArray} from "../../../utils/pages";

const Pagination = ({totalPages, currentPage, changePage}) => {
    let pagesArray = getPagesArray(totalPages);

    return (
        <div style={{display: "flex", justifyContent: "center" }}>
            {pagesArray.map(p =>
                <Button
                    onClick={() => changePage(p)}
                    key={p}
                    variant={currentPage === p ? 'solid' : 'outline'}
                    colorScheme='teal'
                    marginX={1}>
                    {p}
                </Button>
            )}
        </div>
    );
};

export default Pagination;