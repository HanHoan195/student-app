import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Swal from 'sweetalert2'

const addStudentSchema = yup.object({
    name: yup
        .string()
        .required('Tên không được để trống')
        .min(8, 'Tên phải có ít nhất 8 ký tự')
        .max(40, 'Tên không được quá 40 ký tự'),
    mark: yup
        .number()
        .typeError('Điểm phải là một số')
        .required('Điểm không được để trống')
        .test("valid-mark", "Điểm không hợp lệ", (value) => {
            if (value === undefined || value === null) return false;
            const parsedValue = parseFloat(value);
            return !isNaN(parsedValue);
        })
        .min(0, "Điểm không là số âm")
        .max(10, 'Điểm không được quá 10'),
    age: yup
        .number("Tuổi là số")
        .typeError('Tuổi phải là một số')
        .required('Tuổi không được để trống')
        .min(16, 'Bạn phải đủ 16 tuổi')
        .max(24, 'Bạn đã quá tuổi học sinh'),
    gender: yup
        .string()
        .required('Giới tính không được để trống')
        .oneOf(['male', 'female'], 'Giới tính phải là "male" hoặc "female"'),
    city: yup
        .string()
        .required('Thành phố không được để trống')
        .oneOf(['hcm', 'hn', 'pt', 'dn'], 'Thành phố không hợp lệ'),
})

function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

const AddNewStudent = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(addStudentSchema) })

    const handleAddStudent = (data) => {

        setLoading(true)


        axios.post("https://js-post-api.herokuapp.com/api/students", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                setLoading(false)
                
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thêm thành công',
                    showConfirmButton: false,
                    timer: 1500
                })
                reset();
                navigate("/student/list")
            })
            .catch(function (error) {
                console.error(error);
            });


    }

    return (
        <div className="container d-flex fustify-content-center mt-2">
            <div className="row col-md-6">
                <div className="d-flex">
                    <h3 className="me-3">Add New Student</h3>
                    <NavLink className="btn btn-outline-primary" to={"/student/list"}>
                        <i className="fa fa-arrow-left me-2" />
                        Back To List Student
                    </NavLink>
                </div>
                {
                    loading ? <Spinner /> : (
                        <form onSubmit={handleSubmit(handleAddStudent)} >
                            <div>
                                <label className="form-label"> Name</label>
                                <input type="text" className="form-control" {...register("name")} />
                                <span className="text-danger">{errors?.name?.message}</span>

                            </div>
                            <div>
                                <label className="form-label"> Age</label>
                                <input type="text" className="form-control" {...register("age")} />
                                <span className="text-danger">{errors?.age?.message}</span>
                            </div>
                            <div>
                                <label className="form-label"> Mark</label>
                                <input type="text" className="form-control" {...register("mark")} />
                                <span className="text-danger">{errors?.mark?.message}</span>
                            </div>
                            <div>
                                <label className="form-lavel">City</label>
                                <select className="form-select" {...register("city")} >
                                    <option value="hn">hn</option>
                                    <option value="hcm">hcm</option>
                                    <option value="pt">pt</option>
                                    <option value="dn">dn</option>
                                </select>
                                <span className="text-danger" > {errors?.city?.message}</span>
                            </div>
                            <div className="mt-3">
                                <label className="me-3">Gender: </label>
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="male"
                                    {...register("gender")}
                                />
                                <label htmlFor="male" className="me-5">Male</label>
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="female"
                                    {...register("gender")}
                                />
                                <label htmlFor="female">Female</label>

                                <p className="text-danger">{errors?.gender?.message}</p>
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <button type="submit" className="btn btn-outline-success me-3">Add</button>
                                <button type="button" className="btn btn-outline-danger"
                                    onClick={() => reset()}
                                >Cancel</button>
                            </div>
                        </form>
                    )
                }


            </div>
        </div>
    )
}

export default AddNewStudent;
