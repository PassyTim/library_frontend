import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function BorrowBookService() {
    const axiosPrivate = useAxiosPrivate();

    const borrowBook = async (userId, bookId, returnDate) => {
        const borrowBookRequest = {
            userId : userId,
            bookId : bookId,
            returnDate: new Date(returnDate).toISOString()
        };

        console.log(borrowBookRequest)
        return await axiosPrivate.post('/api/takeBookService/take', borrowBookRequest);
    }

    const returnBook = async (userId, bookId) => {
        const returnBookRequest ={
            userId : userId,
            bookId : bookId
        }
        return await axiosPrivate.delete(`/api/borrowService/return/`, returnBookRequest)
    }

    // const getAll = async (userId) => {
    //     return await axiosPrivate.get('/api/borrowService/' + userId)
    // }

    return {returnBook, borrowBook};
}