import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import useAuthContext from '../hooks/useAuthContext';
import ErrorAlert from '../components/ErrorAlert';

const Register = () => {
    const {register, handleSubmit,watch, formState: {errors}} = useForm();
    const {registerUser, errorMsg,resendActivation} = useAuthContext();
    const [successMsg, setSuccessMsg] = useState("");
    const [email, setEmail] = useState("");
    //const navigate = useNavigate();


    const onSubmit = async (data) => {
        delete data.confirm_password
        try{
            const response = await registerUser(data);
            if(response.success){
                setSuccessMsg(response.message);
                setEmail(data.email);
                //setTimeout(() => navigate("/login"), 3000);
            }
        } catch(error){
            console.log(error);
        }
    }

    const handleResend = async(email) => {
        try{
            const response = await resendActivation({email});
            if(response.success){
                setSuccessMsg(response.message);
            }
        } catch(error){
            console.log(error);
        }
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className='flex justify-center items-center py-15'>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-md border p-4">
                    <legend className="fieldset-legend text-xl">Sign Up</legend>

                    <div className="mb-2">{errorMsg && <ErrorAlert
                    error={errorMsg} />}</div>

                    {successMsg && <div role="alert" className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{successMsg}</span>
                        </div>}

                    {email && <div>
                        <span className='text-sm'>Didn't Get Email? <button className='text-sm text-blue-600' type='button' onClick={() => handleResend(email)}>Resend Activation</button></span>
                    </div>}

                    <label className="label">Email</label>
                    <input type="email" className="input w-full" placeholder="Email"
                    {...register("email", {required: "Email is required."})}
                    />
                    {errors.email && (
                    <span className="label-text-alt text-error py-1">{errors.email.message}</span>
                    )}

                    <label className="label">First Name</label>
                    <input type="text" className="input w-full" placeholder="First Name" 
                    {...register("first_name", {required: "First Name is required."})}
                    />

                    {errors.first_name && (
                    <span className="label-text-alt text-error py-1">{errors.first_name.message}</span>
                    )}

                    <label className="label">Last Name</label>
                    <input type="text" className="input w-full" placeholder="Last Name" 
                    {...register("last_name", {required: "Last Name is required."})}
                    />

                    {errors.last_name && (
                    <span className="label-text-alt text-error py-1">{errors.last_name.message}</span>
                    )}

                    <label className="label">Address</label>
                    <input type="text" className="input w-full" placeholder="Address" 
                    {...register("address")}
                    />

                    {errors.address && (
                    <span className="label-text-alt text-error py-1">{errors.address.message}</span>
                    )}

                    <label className="label">Phone Number</label>
                    <input type="text" className="input w-full" placeholder="Phone Number" 
                    {...register("phone_number")}
                    />

                    {errors.phone_number && (
                    <span className="label-text-alt text-error py-1">{errors.phone_number.message}</span>
                    )}

                    <label className="label">Password</label>
                    <input type="password" className="input w-full" placeholder="Password" 
                    {...register("password", {required: "Password is required.", minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                    }})}
                    />

                    {errors.password && (
                    <span className="label-text-alt text-error py-1">{errors.password.message}</span>
                    )}

                    <label className="label">Confirm Password</label>
                    <input type="password" className="input w-full" placeholder="Confirm Password" 
                    {...register("confirm_password", {required: "Confirm Password is required.", validate: (value) => value === watch("password") || "Password do not match"})}
                    />
                    {errors.confirm_password && (
                    <span className="label-text-alt text-error py-1">{errors.confirm_password.message}</span>
                    )}


                    <button className="btn btn-neutral mt-4">Sign Up</button>

                    <div className='flex justify-center items-center mt-5'>
                        <p>Already Registered? <Link className='font-bold text-blue-500' to="/login">Sign In</Link></p>
                    </div>
                    </fieldset>
                </div>
            </form>
        </div>
    );
};

export default Register;