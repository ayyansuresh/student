import Student_Home from "./student_home";
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import AddEdit from "./addedit";

function App() {
  return (
    <>
    <Router>
        <Routes>
            <Route path='/addedit/:id' element={<AddEdit/>}></Route>
            <Route path='/addedit' element={<AddEdit/>}></Route>
            <Route path='/' element={<Student_Home/>}></Route>
        </Routes>
    </Router>
    </>
  );
}

export default App;
