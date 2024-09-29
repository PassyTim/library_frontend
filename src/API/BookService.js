import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function BookService() {
    const axiosPrivate = useAxiosPrivate();

    const getAllBooks = async (limit = 10, page = 1) => {
        return await axiosPrivate.get('/api/book', {
            params : {
                pageSize: limit,
                pageNumber : page
            }
        })
    };

    const getSearchBooks = async (limit = 10, page = 1, authorId, bookName) => {
        return await axiosPrivate.get('/api/book/search', {
            params : {
                pageSize: limit,
                pageNumber : page,
                authorId: authorId,
                bookName: bookName
            }
        })
    }

    const getById = async (id) => {
        return await axiosPrivate.get('/api/book/' + id)
    }

    const deleteBook = async (id) => {
        return await axiosPrivate.delete('/api/book/' + id)
    }

    const updateBook = async (id ,formData) => {
        return await axiosPrivate.put(`/api/book/${id}`, formData, {
            headers: {
                'content-Type': 'multipart/form-data'
            },
        })
    };

    const createBook = async (formData) => {
        return await axiosPrivate.post(`/api/book`, formData, {
            headers: {
                'content-Type': 'multipart/form-data'
            }
        });
    }

    return {getAllBooks,getById, deleteBook, updateBook, createBook, getSearchBooks}
}
