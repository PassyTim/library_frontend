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

    return {getAllBooks,getById, deleteBook, updateBook, createBook}
}


// export default class BookService {
//     static axiosPrivate = useAxiosPrivate();
//
//     static async getAll(limit = 10, page = 1) {
//         return await BookService.axiosPrivate.get('https://localhost:7212/api/book', {
//             params : {
//                 pageSize: limit,
//                 pageNumber : page
//             }
//         })
//     }
//
//     static async getById(id) {
//         return await BookService.axiosPrivate.get('https://localhost:7212/api/book/' + id)
//     }
//
//     static async delete(id) {
//         return await BookService.axiosPrivate.delete('https://localhost:7212/api/book/' + id)
//     }
// }