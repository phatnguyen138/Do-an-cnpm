import React, { useState, Fragment, useNavigate } from "react";
import { useMemo, useEffect, useRef } from "react";
import MaterialReactTable from "material-react-table";
import Sidebar from "./TeacherSidebar";
import Teacher from "../services/teacher.service";

const data = JSON.parse(localStorage.getItem("student"));
const classData = JSON.parse(localStorage.getItem("class"));
const subjectData = JSON.parse(localStorage.getItem("subject"));
const initiate = JSON.parse(localStorage.getItem("class"))[0].nameClass;
Teacher.TraCuuHs(initiate);
var Tracuu = JSON.parse(localStorage.getItem("TraCuu"));
const TraCuuHs = () => {
    // const navigate = useNavigate();
    // const refreshPage = () => {
    //     navigate(0);
    // }

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
    console.log("initiate", initiate)
    const [getData, setGetData] = useState(Tracuu);
    const [rowSelection, setRowSelection] = useState({});
    const [message, setMessage] = useState();
    const [nameClass, setClass] = useState();
    console.log(nameClass);

    useEffect(() => {
        //do something when the row selection changes...
        console.log({ rowSelection });
        console.log({ nameClass });
    }, [rowSelection, nameClass]);
    // console.log(data);
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(nameClass)
        // // localStorage.removeItem("TraCuu");
        Teacher.TraCuuHs(nameClass);
        Tracuu = JSON.parse(localStorage.getItem("TraCuu"));
        // getData = {}
        setGetData([...Tracuu]);
        // window.location.reload(false);
        // // window.location.reload(true);
        // setMessage("Tra cuu thành công!");
        // console.log("message:", message);
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
                data={getData}
                // onChange={getData}
                // enableRowSelection
                //getRowId={(row) => row.name} //give each row a more useful id
                // onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
                // state={{ rowSelection }} //pass our managed row selection state to the table to use
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

export default TraCuuHs;
