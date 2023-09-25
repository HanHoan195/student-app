import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import StudentService from "../../service/studentService";
import Spinner from "../layout/Spinner";

const StudentDetail = () => {
    const { studentId } = useParams();
    const [studentDetail, setStudentDetail] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        try {
            setLoading(true)
            async function getData() {
                let studentRes = await StudentService.getStudentById(studentId)
                setStudentDetail(studentRes.data)
                setLoading(false)
            }
            getData();

        } catch (error) {

        }

    }, [studentId])

    const { id, name, age, gender, mark, city } = studentDetail
    return (
        <div className="container">
            <section>
                <div className="d-flex align-items-center">
                    <h3 className="text-primary me-3">Student Detail</h3>
                    <Link className="btn btn-outline-primary" to={"/student/list"}>
                        <i className="fa fa-arrow-left me-2" />
                        Back To List Student
                    </Link>
                </div>
            </section>
            <section>
                {
                    loading ? <Spinner /> : (
                        <div className="d-flex mt-5">
                            <div className="card m-2" style={{ width: 240 }}>
                                <img className="card-img-top" style={{ height: 380 }}
                                    src={gender == 'male' ? "https://toigingiuvedep.vn/wp-content/uploads/2022/03/hinh-nen-nguoi-nhen-chibi-cute-cho-dien-thoai.jpg" :
                                        "https://i.pinimg.com/474x/6a/a9/b9/6aa9b9a96388a5b13ad70eb69fbde34f.jpg"}
                                    alt="Card image" />
                            </div>
                            <div className="card-body">
                                <p className="card-text">ID: {id}</p>
                                <h4 className="card-title">{name}</h4>
                                <p className="card-text">Age: {age}.</p>
                                <p className="card-text">Mark: {mark}.</p>
                                <p className="card-text">Gender: {gender}.</p>
                                <p className="card-text">City: {city}</p>
                                <div style={{ marginTop: 130 }}>
                                    <Link to={`/student/edit/${studentId}`}>
                                        <button className="btn btn-outline-primary">
                                            Update
                                        </button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    )
                }
            </section>
        </div>
    )
}

export default StudentDetail;