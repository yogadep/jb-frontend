import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LogOut, LayoutDashboard, Package, Users, UserPlus, FileText } from 'lucide-react';
import { handleLogout } from '../../utility/handleLogout'
import { useLogoutMutation } from '../../redux/features/auth/authApi';

const AdminSidebar = () => {
    const navItems = [
        { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { path: "/dashboard/post-manage", label: "Manage Posts", icon: <FileText size={20} /> },
        { path: "/dashboard/product-manage", label: "Manage Products", icon: <Package size={20} /> },
        { path: "/dashboard/manage-user", label: "Manage Users", icon: <Users size={20} /> },
        { path: "/dashboard/admin-register", label: "Register Admin", icon: <UserPlus size={20} /> },
    ];
    const dispatch = useDispatch();
    const [logoutMutation] = useLogoutMutation();
    const LogoutClick = () => {
        handleLogout(logoutMutation, dispatch);
    };
    const { admin } = useSelector((state) => state.auth);

    return (
        <div className="flex h-auto mt-2 bg-gray-400 border-r rounded-md shadow-md">
            <div className="flex flex-col w-64 p-4">
                {/* Admin Profile Section */}
                <div className="flex items-center gap-3 mb-7 p-2">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-600">A</span>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">{admin?.name || "Admin"}</h3>
                        <p className="text-sm text-gray-500">Administrator</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1">
                    <div className="space-y-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/dashboard"}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                        ? "bg-blue-50 text-gray-500"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`
                                }
                            >
                                {item.icon}
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                </nav>

                {/* Logout Section */}
                <div className="pt-10 border-t mb-0">
                    <button
                        onClick={LogoutClick}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;