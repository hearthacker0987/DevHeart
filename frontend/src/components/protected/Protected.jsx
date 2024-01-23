import { NavLink, useNavigate } from "react-router-dom";

function Protected({isAuth,children}) {
    const navigate = useNavigate();

    if(isAuth)
        return children;
    else
    {
        return <div className="text-center fw-bold fs-6">Login Required! <NavLink to="/login">Login</NavLink></div>;
    }
}

export default Protected
