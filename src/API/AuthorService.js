import axios from "axios";

export default class AuthorService {
    static async getAll(limit = 0, page = 1) {
        return await axios.get('https://localhost:7212/api/author', {
            params : {
                pageSize: limit,
                pageNumber : page
            }
        })
    }
    static async getByIdWithoutBooks(id) {
        return await axios.get(`https://localhost:7212/api/author/${id}/false`)
    }

    static async getByIdWithBooks(id) {
        return await axios.get(`https://localhost:7212/api/author/${id}/true`)
    }

    static async update(id, author) {
        return await axios.put(`https://localhost:7212/api/author/${id}`, author)
    }

    static async create(author) {
        return await axios.post(`https://localhost:7212/api/author`, author)
    }

    static async delete(id) {
        return await axios.delete(`https://localhost:7212/api/author/${id}`)
    }
}