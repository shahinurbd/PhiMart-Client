import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
    const [user, setUser] = useState(null);

    const getToken = () => {
        const token = localStorage.getItem("authTokens");
        return token ? JSON.parse(token) : null;

    };

    const [authTokens, setAuthTokens] = useState(getToken());

    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if(authTokens) fetchUserProfile();

    }, [authTokens]);

    const handleAPIError = (error, defaultMessage="Something went wrong! Try again.") => {
        if(error.response && error.response.data){
                const errormessage = Object.values(error.response.data).flat().join("\n");
                setErrorMsg(errormessage);
                return {success: false, message: errormessage}
            }
            setErrorMsg(defaultMessage);
            return{
                success: false,
                message:defaultMessage
            };
    }

    //Fetch user profile
    const fetchUserProfile = async () => {
        try{
            const response = await apiClient.get("/auth/users/me", {
                headers: {Authorization: `JWT ${authTokens?.access}`}
            });
            setUser(response.data);
        } catch(error){
            return handleAPIError(error);
        }
    }

    //UpdateUserProfile
    const updateUserProfile = async(data) => {
        setErrorMsg("")
        try{
           await apiClient.put("/auth/users/me", data, {headers: {Authorization: `JWT ${authTokens?.access}`}
            });
        } catch(error){
           handleAPIError(error);
        }
    }

    //change password
    const changePassword = async(data) => {
        setErrorMsg("")
        try{
           await apiClient.post("/auth/users/set_password/", data,{headers: {Authorization: `JWT ${authTokens?.access}`}
            });
            return {
                success: true,
                message: "Password Changed Successfully!"
            };
        } catch(error){
            return handleAPIError(error);
        }
    }

    //forget password
    const forgetPassword = async(email) => {
        setErrorMsg("")
        try{
            await apiClient.post("/auth/users/reset_password/", email);
            return{
                success: true,
                message: "Check your mail to change password."
            }
        } catch(error){
            return handleAPIError(error);
        }
    }

    //confirm password
    const resetPassword = async(data) => {
        setErrorMsg("")
        try{
            await apiClient.post("/auth/users/reset_password_confirm/", 
            data);
            return{
                success: true,
                message: "Password reset successfull. Please Login Again."
            }
        } catch(error){
            return handleAPIError(error);
        }
    }

    //login user
    const loginUser = async(userData) => {
        setErrorMsg("");
        try{
            const response = await apiClient.post("/auth/jwt/create/", userData);
            setAuthTokens(response.data);
            localStorage.setItem("authTokens", JSON.stringify(response.data));
        } catch(error){
            setErrorMsg(error.response.data?.detail);
        }
    };

    //register user

    const registerUser = async(userData) => {
        setErrorMsg("");
        try{
            await apiClient.post("/auth/users/", userData);
            return {
                success: true,
                message: "Registration Successfull. Check your mail to active your account."
                
            };
        } catch(error){
            return handleAPIError(error, "Registration Failed! Try again.");
        }
    }

    // resend activation

    const resendActivation = async(email) => {
        setErrorMsg("")
        try{
            await apiClient.post("/auth/users/resend_activation/", email);
            return {
                success: true,
                message: "Activation Resend Successfully. Check your mail to active your account."
                
            };

        } catch(error){
            return handleAPIError(error);
        }
    }

    //Logout user
    const logoutUser = () => {
        setUser(null);
        setAuthTokens(null);
        localStorage.removeItem("authTokens");

    }


    return {user,errorMsg,
            loginUser, 
            registerUser, 
            logoutUser, 
            updateUserProfile, 
            changePassword,
            resendActivation,
            forgetPassword,
            resetPassword,
        };
};

export default useAuth;