import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function TakeBookService() {
    const axiosPrivate = useAxiosPrivate();

    const takeBook = async (userId, bookId, returnDate) => {
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
        return await axiosPrivate.delete(`/api/takeBookService/return/`, returnBookRequest)
    }

    const getAll = async (userId) => {
        return await axiosPrivate.get('/api/takeBookService/' + userId)
    }

    return {returnBook, takeBook, getAll};
}