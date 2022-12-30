import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";

const sidebarNavItems = [
    {
        display: "Thêm môn học",
        icon: <i className="bx bx-receipt"></i>,
        to: "/admin/them-mon",
        section: "them-mon",
    },
    {
        display: "Cập nhật môn học",
        icon: <i className="bx bx-receipt"></i>,
        to: "/admin/cap-nhat-mon",
        section: "cap-nhat-mon",
    },
    {
        display: "Xoá môn học",
        icon: <i className="bx bx-receipt"></i>,
        to: "/admin/xoa-mon",
        section: "xoa-mon",
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
