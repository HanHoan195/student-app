import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import StudentService from "../../service/studentService";
import Swal from 'sweetalert2'


const editSchema = yup.object({
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

const EditStudent = () => {

    const [loading, setLoading] = useState(false)
    const [studentEdit, setStudentEdit] = useState({})
    const { studentId } = useParams();
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(editSchema), values: studentEdit })

    useEffect(() => {
        try {
            setLoading(true)
            async function getData() {
                let res = await StudentService.getStudentById(studentId)
                setStudentEdit(res.data)
                setLoading(false)
                console.log(res.data);
            }
            getData();
        } catch (error) {
            console.log(error);
        }
    }, [studentId])

    const handleEdit = async (studentEdit) => {
        try {
            setLoading(true)
            await StudentService.editStudent(studentId, studentEdit)
            setStudentEdit(studentEdit)
            setLoading(false)

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cập nhật thành công',
                showConfirmButton: false,
                timer: 1500
            })
            navigate(`/student/detail/${studentId}`);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container d-flex fustify-content-center mt-2">
            <div className="row col-md-6">
                <div className="d-flex">
                    <h3 className="me-3">Edit Student</h3>
                    <NavLink className="btn btn-outline-primary" to={`/student/detail/${studentId}`}>
                        <i className="fa fa-arrow-left me-2" />
                        Back To InFo
                    </NavLink>
                </div>
                {
                    loading ? <Spinner /> : (
                        <form onSubmit={handleSubmit(handleEdit)} >
                            <div>
                                <label className="form-label"> Name</label>
                                <input type="text" className="form-control" {...register("name")} defaultValue={studentEdit.name} />
                                <span className="text-danger">{errors?.name?.message}</span>

                            </div>
                            <div>
                                <label className="form-label"> Age</label>
                                <input type="text" className="form-control" {...register("age")} defaultValue={studentEdit.age} />
                                <span className="text-danger">{errors?.age?.message}</span>
                            </div>
                            <div>
                                <label className="form-label"> Mark</label>
                                <input type="text" className="form-control" {...register("mark")} defaultValue={studentEdit.mark} />
                                <span className="text-danger">{errors?.mark?.message}</span>
                            </div>
                            <div>
                                <label className="form-lavel">City</label>
                                <select className="form-select" {...register("city")} defaultValue={studentEdit.city}>
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
                                // defaultValue={studentEdit.gender}
                                />
                                <label htmlFor="male" className="me-5">Male</label>
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="female"
                                    {...register("gender")}
                                // defaultValue={studentEdit.gender}
                                />
                                <label htmlFor="female">Female</label>

                                <p className="text-danger">{errors?.gender?.message}</p>
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <button type="submit" className="btn btn-outline-success me-3">Save</button>
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

export default EditStudent;