import axios from "axios";

class StudentService {

    static getStudent(currentPage) {
        return axios.get(`https://js-post-api.herokuapp.com/api/students?_page=${currentPage}`)
    }

    static getStudentById(id) {
        return axios.get(`https://js-post-api.herokuapp.com/api/students/${id}`)
    }

    static deleteStudent(id){
        return axios.delete(`https://js-post-api.herokuapp.com/api/students/${id}`)
    }
    static editStudent (id, data){
        return axios.patch(`https://js-post-api.herokuapp.com/api/students/${id}`, data)
    }
}
export default StudentService;