import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import { Routes, Route } from "react-router-dom";
import ListStudent from './component/student/ListStudent';
import StudentDetail from './component/student/StudentDetail';
import AddNewStudent from './component/student/AddStudent';
import Navbar from './component/layout/Navbar';
import EditStudent from './component/student/EditStudent';



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<ListStudent />} />
        <Route path='/student/list' element={<ListStudent />} />
        <Route path='/student/detail/:studentId' element={<StudentDetail />} />
        <Route path='/student/add' element={<AddNewStudent />} />
        <Route path='/student/edit/:studentId' element={<EditStudent />} />
      </Routes>
    </>
  );
}

export default App;
