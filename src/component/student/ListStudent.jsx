import React, { useEffect, useState } from "react";
import StudentService from "../../service/studentService";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'


const ListStudent = () => {

    const [student, setStudent] = useState([])
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [action, setAction] = useState('next')



    useEffect(() => {
        try {
            setLoading(true);

            getData();

        } catch (error) {

        }
    }, [currentPage])

    async function getData() {
        let studentRes = await StudentService.getStudent(currentPage);
        setStudent(studentRes.data.data)

        setLoading(false)

        setTotalPage(Math.ceil(Number(studentRes.data.pagination._totalRows) / Number(studentRes.data.pagination._limit)))
    }




    const handleFirstPage = () => {
        setCurrentPage(1)
        setAction('first')
    }
    const handleLastPage = () => {
        setCurrentPage(totalPage)
        setAction('last')
    }
    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1)
            setAction('next')
        }
    }
    const handlePrevPage = () => {
        if (currentPage <= totalPage) {
            setCurrentPage(currentPage - 1)
            setAction('prev')
        }
    }

    const handleDeleteStudent = async (studentRemove) => {
        let confirm = window.confirm("Xóa sinh viên này?");
        if (!confirm) return;

        try {
            await StudentService.deleteStudent(studentRemove.id)

            setStudent((prevStudentList) => prevStudentList.filter((item) => item !== studentRemove));
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Xóa thành công',
                showConfirmButton: false,
                timer: 1500
            })
            getData();
        } catch (error) {
            console.log(error);
        }
    }
    return (

        <div className="container mt-3">
            <section>
                <div className="d-flex align-items-center">
                    <h3 className="me-2">List Student</h3>
                    <Link to={"/student/add"}>
                        <button className="btn btn-outline-primary">
                            <i className="fa fa-plus me-2" />
                            Add Student
                        </button>
                    </Link>
                </div>
            </section>
            <section className="mt-2">
                <div className="row mt-3">
                    <nav className="navigation">
                        <ul className="pagination">
                            <li className={`${currentPage <= 1 ? 'page-item disabled' : 'page-item'}`}>
                                <a role="button" className="page-link" onClick={handleFirstPage}>
                                    <i class="fas fa-angle-double-left"></i>
                                </a>
                            </li>
                            <li className={`${currentPage <= 1 ? 'page-item disabled' : 'page-item'} ${action == 'prev' ? 'active' : ''}`}>
                                <a role="button" className="page-link"
                                    onClick={handlePrevPage}
                                >Prev</a>
                            </li>
                            <li className={`${currentPage >= totalPage ? 'page-item disabled' : 'page-item'} ${action == 'next' ? 'active' : ''}`}>
                                <a role="button" className="page-link"
                                    onClick={handleNextPage}
                                >Next</a>
                            </li>

                            <li className={`${currentPage >= totalPage ? 'page-item disabled' : 'page-item'}`}>
                                <a role="button" className="page-link" onClick={handleLastPage}>
                                    <i class="fas fa-angle-double-right" title="last"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div className="row">
                        {
                            loading ? <Spinner /> : (
                                student.length && student.map((str) => (
                                    <div className="card m-2" style={{ width: 240 }}>
                                        <img className="card-img-top" style={{ height: 380 }}
                                            src={str.gender == 'male' ? "https://toigingiuvedep.vn/wp-content/uploads/2022/03/hinh-nen-nguoi-nhen-chibi-cute-cho-dien-thoai.jpg" :
                                                "https://i.pinimg.com/474x/6a/a9/b9/6aa9b9a96388a5b13ad70eb69fbde34f.jpg"}
                                            alt="Card image" />
                                        <div className="card-body">
                                            <p className="card-text">ID: {str.id}</p>
                                            <h4 className="card-title">{str.name}</h4>
                                            <p className="card-text">Age: {str.age}.</p>
                                            <p className="card-text">Mark: {str.mark}.</p>
                                            <p className="card-text">Gender: {str.gender}.</p>
                                            <div className="d-flex justify-content-center ">
                                                <button className="btn btn-outline-primary me-2 mb-1 button1">
                                                    <Link to={`/student/detail/${str.id}`}>
                                                        <i class="fas fa-info-circle"></i>
                                                    </Link>
                                                </button>
                                                <button className="btn btn-outline-danger button1" style={{ height: 37 }}
                                                    onClick={() => handleDeleteStudent(str)}>
                                                    <i class="fas fa-times-circle"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>

                </div>
            </section>

        </div>
    )
}

export default ListStudent;