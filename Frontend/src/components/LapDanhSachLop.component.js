import React, { useState, Fragment } from "react";
import { useMemo, useEffect, useRef } from "react";
import MaterialReactTable from "material-react-table";
import Sidebar from "./TeacherSidebar";
import Teacher from "../services/teacher.service";

const data = JSON.parse(localStorage.getItem("student"));
const classData = JSON.parse(localStorage.getItem("class"));

const App = () => {
    const columns = useMemo(
        () => [
            {
                header: "Họ và tên",
                accessorKey: "name", //simple accessorKey pointing to flat data
            },
            {
                header: "Giới tính",
                accessorKey: "gender", //simple accessorKey pointing to flat data
            },
            {
                header: "Ngày sinh",
                accessorKey: "birthDay", //simple accessorKey pointing to flat data
            },

            {
                header: "Địa chỉ",
                accessorKey: "address", //simple accessorKey pointing to flat data
            },
            {
                header: "Email",
                accessorKey: "email", //simple accessorKey pointing to flat data
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

    // console.log(data);
    const handleSubmit = (event) => {
        event.preventDefault();
        const idlist = Object.keys(rowSelection);
        const sendData = {
            idList: idlist,
            className: nameClass,
        };
        console.log("Send data:", sendData);
        Teacher.LapDanhSach(idlist, nameClass);
        setMessage("Lập danh sách thành công!");
        console.log("message:", message);
        Teacher.availableStudent();
        data = JSON.parse(localStorage.getItem("student"));
        classData = JSON.parse(localStorage.getItem("class"));
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
                {/* <h1>Chọn lớp {fruit}</h1> */}
            </div>
            <br></br>

            <MaterialReactTable
                columns={columns}
                data={data}
                enableRowSelection
                getRowId={(row) => row._id} //give each row a more useful id
                onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
                state={{ rowSelection }} //pass our managed row selection state to the table to use
            />
            <br></br>
            <div className="form-group">
                <button
                    onClick={handleSubmit}
                    className="btn btn-primary btn-block withedit"
                >
                    Lập danh sách
                </button>
            </div>

            <div className="form-group">
                <div role="alert">
                    <h1>{message}</h1>
                </div>
            </div>
        </div>
    );
};

export default App;
