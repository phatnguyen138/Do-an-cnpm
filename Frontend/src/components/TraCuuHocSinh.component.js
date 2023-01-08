import React, { useState, Fragment, useNavigate } from "react";
import { useMemo, useEffect, useRef } from "react";
import MaterialReactTable from "material-react-table";
import Sidebar from "./TeacherSidebar";
import Teacher from "../services/teacher.service";
const data = JSON.parse(localStorage.getItem("student"));
const classData = JSON.parse(localStorage.getItem("class"));
const subjectData = JSON.parse(localStorage.getItem("subject"));
const Tracuu = JSON.parse(localStorage.getItem("TraCuu"));

const App = () => {
    // const navigate = useNavigate();
    // const refreshPage = () => {
    //     navigate(0);
    // }
    Teacher.TraCuuHs("10A1");

    const columns = useMemo(
        () => [
            {
                header: "Họ và tên",
                accessorKey: "name", //simple accessorKey pointing to flat data
            },
            {
                header: "TB học kì 1",
                accessorKey: "firstTerm", //simple accessorKey pointing to flat data
            },
            {
                header: "TB học kì 2",
                accessorKey: "secondTerm", //simple accessorKey pointing to flat data
            },
        ],
        [],
    );
    const [rowSelection, setRowSelection] = useState({});
    const [message, setMessage] = useState();
    const [nameClass, setClass] = useState();
    console.log(nameClass);
    useEffect(() => {
        //do something when the row selection changes...
        console.log({ rowSelection });
        console.log({ nameClass });
    }, [rowSelection, nameClass]);
    const reloadPage = () => {
        window.location.reload()
      }
    // console.log(data);
    const handleSubmit = (event) => {
        event.preventDefault();

        localStorage.removeItem("TraCuu");
        Teacher.TraCuuHs(nameClass);
        Tracuu = JSON.parse(localStorage.getItem("TraCuu"));
        // window.location.reload(false);

        setMessage("Tra cuu thành công!");
        console.log("message:", message);
        window.location.reload(true)
    };

    return (
        <div>
            <header className="jumbotron">
                <h3>Lập danh sách lớp</h3>
            </header>

            <div className="gridNav">
                <div>
                    <Sidebar />
                </div>
            </div>

            <div className="gridTiepNhanHs">
                <h6>Chọn lớp:</h6>
                <select
                    id="nameClass"
                    value={nameClass}
                    onChange={(e) => setClass(e.target.value)}
                >
                    {classData.map((name) => (
                        <option temp="a" value={name.nameClass}>
                            {name.nameClass}
                        </option>
                    ))}
                    {/* <option value="Apple">Apple</option>
                    <option value="Pear">Pear</option>
                    <option value="Pineapple">Pineapple</option> */}
                </select>

                <button
                    onClick={handleSubmit}
                    className="btn btn-primary btn-block withedit marginleft"
                >
                    Tra cứu
                </button>

                {/* <h1>Chọn lớp {fruit}</h1> */}
            </div>
            <br></br>

            <MaterialReactTable
                columns={columns}
                data={Tracuu}
                enableRowSelection
                getRowId={(row) => row._id} //give each row a more useful id
                onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
                state={{ rowSelection }} //pass our managed row selection state to the table to use
            />
            <br></br>

            <div className="form-group">
                <div role="alert">
                    <h1>{message}</h1>
                </div>
            </div>
        </div>
    );
};

export default App;
