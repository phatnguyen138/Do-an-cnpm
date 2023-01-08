// import React, { useEffect, useMemo, useState } from "react";
// import { useGlobalFilter, useSortBy, useTable } from "react-table";
// import Sidebar from "./StudentSideBar";
// import userService from "../services/user.service";
// import StudentTable from "./StudentTable";

// const subjectData = JSON.parse(localStorage.getItem("subject"));
// var subjectList = [];
// // subjectData.forEach((element) => {
// //     subjectList.push(element.name);
// // });
// const classData = JSON.parse(localStorage.getItem("class"));
// var classList = [];

// var termList = [1, 2];
// var ky = true;
// var data = [];

// const App = () => {
//     userService.getClass();
//     userService.getSubject();

//     const columns = useMemo(() => [
//         {
//             Header: "Họ tên",
//             accessor: "name",
//         },
//         {
//             Header: "Điểm 15 phút",
//             accessor: "fifteen",
//         },
//         {
//             Header: "Điểm giữa kì",
//             accessor: "midterm",
//         },
//         {
//             Header: "Điểm cuối kỳ",
//             accessor: "lastterm",
//         },
//     ]);

//     const change = () => {
//         if (term === 1) {
//             let ky = true;
//         } else {
//             let ky = false;
//         }
//         userService.search(classes, subject, ky);
//         data = JSON.parse(localStorage.getItem("list"));
//     };

//     const [subject, setSubject] = useState(subjectData[0].name);
//     const [classes, setClasses] = useState(classData[0].nameClass);
//     const [term, setTerm] = useState(1);

//     const tableIn = useTable({ columns, data });

//     const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//         tableIn;

//     return (
//         <div className="gridNav">
//             <div>
//                 <Sidebar />
//             </div>
//             {/* <div>
//                 <select
//                     onChange={(e) => setClasses(e.target.value)}
//                     defaultValue={classes}
//                 >
//                     {classData.map((name,idx) => (
//                         <option key={idx}>{name.nameClass}</option>
//                     ))}
//                 </select>
//             </div> */}
//             {/* <div>
//                 <select
//                     onChange={(e) => setSubject(e.target.value)}
//                     defaultValue={subject}
//                     className
//                 >
//                     {subjectList.map((option, idx) => (
//                         <option key={idx}>{option}</option>
//                     ))}
//                 </select>
//             </div>
//             <div>
//                 <select
//                     onChange={(e) => setTerm(e.target.value)}
//                     defaultValue={term}
//                 >
//                     {termList.map((option, idx) => (
//                         <option key={idx}>{option}</option>
//                     ))}
//                 </select>
//             </div> */}
//             <button onClick={change}>Tra cứu</button>
//             <table {...getTableProps()}>
//                 <thead>
//                     {headerGroups.map((headerGroup) => (
//                         <tr {...headerGroup.getHeaderGroupProps()}>
//                             {headerGroup.headers.map((column) => (
//                                 <th {...column.getHeaderProps()}>
//                                     {column.render("Header")}
//                                 </th>
//                             ))}
//                         </tr>
//                     ))}
//                 </thead>
//                 <tbody {...getTableBodyProps()}>
//                     {rows.map((row, i) => {
//                         prepareRow(row);
//                         return (
//                             <tr {...row.getRowProps()}>
//                                 {row.cells.map((cell) => {
//                                     return (
//                                         <td {...cell.getCellProps()}>
//                                             {cell.render("Cell")}
//                                         </td>
//                                     );
//                                 })}
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default App;
