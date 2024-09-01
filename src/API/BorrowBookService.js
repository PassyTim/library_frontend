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
        return await axiosPrivate.post('/api/borrowService/borrow', borrowBookRequest);
    }

    const returnBook = async (id) => {
        return await axiosPrivate.delete(`/api/borrowService/return/${id}`)
    }

    const getAll = async (userId) => {
        return await axiosPrivate.get('/api/borrowService/' + userId)
    }

    return {returnBook, borrowBook, getAll};
}