import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";

// Images
import chronify_logo from "../../assets/chronify-icon-sm.png";

const SidebarContext = createContext();

export function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem("user");
        setUser(JSON.parse(user));
    }, []);

    return (
        <aside className="h-screen w-fit">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        src={chronify_logo}
                        className={`overflow-hidden h-14 transition-all ${expanded ? "w-14 p-2" : "w-0 p-0"
                            }`}
                        alt=""
                    />
                    <span
                        className={`overflow-hidden ml-0 text-3xl font-medium transition-all ${expanded ? "w-36" : "w-0"
                            }`}
                    >
                        hronify
                    </span>
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3">
                    {(user && !user.profile &&
                        <img
                            src={`https://ui-avatars.com/api/?name=${user.display_name}&background=c7d2fe&color=3730a3&bold=true`}
                            alt=""
                            className="w-10 h-10 rounded-md"
                        />)}
                    {(user && user.profile &&
                        <img
                            src={user.profile}
                            alt=""
                            className="w-10 h-10 rounded-md"
                        />)}
                    <div
                        className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-36 ml-3" : "w-0"
                            }`}
                    >
                        <div className="leading-4">
                            {user &&
                                <h4 className="font-semibold">{user.display_name}</h4>
                            }
                            {user &&
                                <span className="text-xs text-gray-600">{user.email}</span>
                            }
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div>
            </nav>
        </aside>
    );
}

export function SidebarItem({ icon, text, active, alert, to }) {
    const { expanded } = useContext(SidebarContext);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(to);
    }

    return (
        <li onClick={handleNavigate}
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group 
            ${active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-600"
                }`}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all ${expanded ? "w-36 ml-3" : "w-0"
                    }`}
            >
                {text}
            </span>
            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
                        }`}
                />
            )}

            {!expanded && (
                <div
                    className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                >
                    {text}
                </div>
            )}
        </li>
    );
}

export default Sidebar;
