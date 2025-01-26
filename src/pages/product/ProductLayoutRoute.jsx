import React from 'react';
import { Outlet } from "react-router-dom";

const ProductLayoutRoute = () => {
    return (
        <div className="">
            <Outlet />
        </div>
    );
};

export default ProductLayoutRoute;