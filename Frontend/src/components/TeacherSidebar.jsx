import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";

const sidebarNavItems = [
    {
        display: "Tiếp nhận học sinh",
        icon: <i className="bx bx-receipt"></i>,
        to: "/teacher/tiep-nhan",
        section: "tiep-nhan",
    },
    {
        display: "Lập danh sách lớp",
        icon: <i className="bx bx-receipt"></i>,
        to: "/teacher/lap-danh-sach",
        section: "lap-danh-sach",
    },
    {
        display: "Tra cứu học sinh",
        icon: <i className="bx bx-receipt"></i>,
        to: "/teacher/tra-cuu",
        section: "tra-cuu",
    },
    {
        display: "Cập nhật điểm số",
        icon: <i className="bx bx-receipt"></i>,
        to: "/teacher/cap-nhat-diem",
        section: "cap-nhat-diem",
    },
];

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            
            const sidebarItem = sidebarRef.current.querySelector(
                ".sidebar__menu__item",
            );
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }
        , 5);

    }, [location]);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split("/")[2];
        // console.log("Cur Path: ", curPath);
        const activeItem = sidebarNavItems.findIndex(
            (item) => item.section === curPath,
        );
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return (
        <div className="sidebar">
            <div ref={sidebarRef} className="sidebar__menu">
                <div
                    ref={indicatorRef}
                    className="sidebar__menu__indicator"
                    style={{
                        transform: `translateX(-50%) translateY(${
                            activeIndex * stepHeight
                        }px)`,
                    }}
                ></div>
                {sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div
                            className={`sidebar__menu__item ${
                                activeIndex === index ? "active" : ""
                            }`}
                        >
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
