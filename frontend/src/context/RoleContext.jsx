import React, { createContext, useContext, useState } from "react";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
    // Default role is 'customer'
    const [role, setRole] = useState("customer"); // 'customer' | 'admin'

    const switchRole = (newRole) => {
        if (newRole === "customer" || newRole === "admin") {
            setRole(newRole);
        }
    };

    const isAdmin = role === "admin";
    const isCustomer = role === "customer";

    return (
        <RoleContext.Provider
            value={{
                role,
                setRole: switchRole,
                isAdmin,
                isCustomer,
            }}
        >
            {children}
        </RoleContext.Provider>
    );
};

export const useRole = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error("useRole must be used within a RoleProvider");
    }
    return context;
};
