


import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { loginUser, checkAuthStatus, signupUser } from "../helpers/api-communicator";

// User type for authentication context
type User = {
    name: string;
    email: string;
};

// UserAuth type defines authentication state and actions
type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;

    //functions for login logout and promise for void will not return anything 
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    //logout once we move logout we need to remove cookies 
    logout: () => Promise<void>;

};

// Create authentication context
const AuthContext = createContext<UserAuth | null>(null);

// AuthProvider wraps children with authentication state
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // State for current user
    const [user, setUser] = useState<User | null>(null);

    // State for login status
    const [isLoggedIn, setIsLoggedIn] = useState(false);



    useEffect(() => {
        // Checks authentication status on mount
        async function checkStatus() {
            try {
                const data = await checkAuthStatus();

                if (data) {
                    setUser({ email: data.email, name: data.name });
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.log("Auth check failed:", error);
                // Clear any invalid tokens
                localStorage.removeItem('token');
                setUser(null);
                setIsLoggedIn(false);
            }
        }
        checkStatus();
    }, []);


    // Handles user login
    const login = async (email: string, password: string) => {
        try {
            const data = await loginUser(email, password);
            if (data) {
                localStorage.setItem('token', data.token);
                setUser({ email: data.email, name: data.name });
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error; // Re-throw to be caught by the component
        }
    };

    // Handles user signup
    const signup = async (name: string, email: string, password: string) => {
        try {
            const data = await signupUser(name, email, password);
            if (data) {
                localStorage.setItem('token', data.token);
                setUser({ email: data.email, name: data.name });
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error("Signup failed:", error);
            throw error; // Re-throw to be caught by the component
        }
    };
    // Handles user logout
    const logout = async () => {
        // await logoutUser();
        localStorage.clear();
        setIsLoggedIn(false);
        setUser(null);
        // window.location.reload();
    };

    //define the values

    // Context value for authentication
    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>


};

// Hook to access authentication context
export const useAuth = () => useContext(AuthContext);