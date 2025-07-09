import { useForm } from "react-hook-form";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../components/ErrorAlert";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {errorMsg, loginUser, forgetPassword} = useAuthContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isForgetPasswordOpen, setIsForgetPasswordOpen] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [email, setEmail] = useState("");

    const onSubmit = async (data) => {
        setLoading(true);
        try{
            await loginUser(data);
            navigate("/dashboard");
        } catch(error){
            console.log("Login Failed",error);
        } finally{ setLoading(false) };
    }
    

    const handleForget = async() => {
        try{
            if (!email) return;
            const res = await forgetPassword({ email: email });
            if(res.success){
                setSuccessMsg(res.message);
            }
        } catch(error){
            console.log(error);
        }
    };
    
    return (
        <div className="flex justify-center items-center py-15">
            
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4">
                <legend className="fieldset-legend text-xl">Sign In</legend>

                <div className="mb-2">{errorMsg && <ErrorAlert error={errorMsg} />}</div>
                {successMsg && <div role="alert" className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{successMsg}</span>
                </div>}

                <label className="label">Email</label>
                <input type="email" className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}  placeholder="Email"
                {...register("email", {required: "Email is required."})}
                />
                {errors.email && (
                    <span className="label-text-alt text-error py-1">{errors.email.message}</span>
                )}

                <label className="label">Password</label>
                <input type="password" className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`} placeholder="Password"
                {...register("password", {required: "Password is required."})}
                />

                {errors.password && (
                    <span className="label-text-alt text-error py-1">{errors.password.message}</span>
                )}
                
                <div className="mt-2">
                    <button
                        type="button"
                        className="btn btn-link p-0 justify-start text-primary font-semibold h-auto min-h-0"
                        onClick={() => setIsForgetPasswordOpen(!isForgetPasswordOpen)}>
                        Forget Password?
                    </button>
                </div>

                {isForgetPasswordOpen && (
                    <div className="mt-3 space-y-3 pl-2 border-l-2 border-base-300">
                        <div className="form-control">
                            <label className="label">Enter your email</label>
                            <div className="relative">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered bg-base-200 w-full pr-10"
                            />
                            </div>
                            <button type="button" onClick={handleForget} className="w-full p-3 bg-blue-500 text-white mt-2 rounded-sm shadow-lg text-sm">Submit</button>
                        </div>
                    </div>
                )}

                <button className="btn btn-neutral mt-4" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className="flex justify-center items-center mt-5">
                    <p>Not Registered? 
                    <Link className="font-bold text-blue-500" to="/register"> Sign Up</Link>
                    </p>
                </div>
            </fieldset>
            </form>
        </div>
    );
};

export default Login;