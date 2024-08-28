import axios from "axios";

export default class BookService {
    static async getAll(limit = 10, page = 1) {
        return await axios.get('https://localhost:7212/api/book', {
            params : {
                pageSize: limit,
                pageNumber : page
            }
        })
    }

    static async getById(id) {
        return await axios.get('https://localhost:7212/api/book/' + id)
    }

    static async delete(id) {
        return await axios.delete('https://localhost:7212/api/book/' + id)
    }
}