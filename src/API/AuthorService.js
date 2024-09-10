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

    const getByIdWithBooks = async (id) => {
        return await axiosPrivate.get(`/api/author/${id}`)
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

    return {getAllAuthors, getByIdWithBooks, updateAuthor, createAuthor, deleteAuthor}
}