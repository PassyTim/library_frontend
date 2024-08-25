export const getPagesCount = (totalItemsCount, limit ) => {
    return Math.ceil(totalItemsCount / limit);
}

export const getPagesArray = (totalPages) => {
    let result = [];
    for(let i = 0; i < totalPages; i++) {
        result.push(i + 1);
    }
    return result;
}