import { Outlet } from "react-router";
import Menu from "../Menu/Menu";



const Root = () => {
    return (
        <div>
            <Menu></Menu>
            <Outlet />
        </div>
    );
};

export default Root;