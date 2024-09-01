import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function AuthorService() {
    const axiosPrivate = useAxiosPrivate();

    const getAllAuthors = async (limit = 0, page = 1) => {
        return await axiosPrivate.get('/api/author', {
            params: {
                pageSize: limit,
                pageNumber: page
            }
        });
    };

    const getByIdWithoutBooks = async (id) => {
        return await axiosPrivate.get(`/api/author/${id}/false`)
    }

    const getByIdWithBooks = async (id) => {
        return await axiosPrivate.get(`/api/author/${id}/true`)
    }

    const updateAuthor = async (id, author) => {
        return await axiosPrivate.put(`/api/author/${id}`, author)
    }

    const createAuthor = async (author) => {
        return await axiosPrivate.post(`/api/author`, author)
    }

    const deleteAuthor = async (id) => {
        return await axiosPrivate.delete(`https://localhost:7212/api/author/${id}`)
    }

    return {getAllAuthors, getByIdWithoutBooks, getByIdWithBooks, updateAuthor, createAuthor, deleteAuthor}
}


// export default class AuthorService {
//     static axiosPrivate = useAxiosPrivate();
//
//     static async getAll(limit = 0, page = 1) {
//         return await AuthorService.axiosPrivate.get('https://localhost:7212/api/author', {
//             params : {
//                 pageSize: limit,
//                 pageNumber : page
//             }
//         })
//     }
//     static async getByIdWithoutBooks(id) {
//         return await AuthorService.axiosPrivate.get(`https://localhost:7212/api/author/${id}/false`)
//     }
//
//     static async getByIdWithBooks(id) {
//         return await AuthorService.axiosPrivate.get(`https://localhost:7212/api/author/${id}/true`)
//     }
//
//     static async update(id, author) {
//         return await AuthorService.axiosPrivate.put(`https://localhost:7212/api/author/${id}`, author)
//     }
//
//     static async create(author) {
//         return await AuthorService.axiosPrivate.post(`https://localhost:7212/api/author`, author)
//     }
//
//     static async delete(id) {
//         return await AuthorService.axiosPrivate.delete(`https://localhost:7212/api/author/${id}`)
//     }
// }