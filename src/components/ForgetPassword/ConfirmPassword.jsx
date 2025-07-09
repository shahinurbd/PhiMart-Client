import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import useAuthContext from '../../hooks/useAuthContext';
import ErrorAlert from '../ErrorAlert';

const ConfirmPassword = () => {
  const { uid, token } = useParams();
  const {errorMsg, resetPassword} = useAuthContext();
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      uid,
      token,
      new_password: data.new_password,
    };
    

    try {
      const response = await resetPassword(payload); 
      if(response.success){
        setSuccessMsg(response.message);
        setTimeout(() => navigate("/login"), 8000);
      }
    } catch (error) {
      console.error("Reset failed:", error);
    }
  };

  return (


    <div className='flex items-center justify-center min-h-screen bg-base-200'>
            <div className='card bg-base-100 shadow-xl p-6'>
                <h2 className='text-2xl font-bold mb-3'>Password Reset</h2>
                {successMsg && <div role="alert" className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{successMsg}</span>
                </div>}

                {errorMsg && <ErrorAlert error={errorMsg} />}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
                    <div className='mt-3 space-y-3 pl-2 border-l-2 border-base-300'>
                        <label className='label'>New Password</label>
                        <input
                        type="password"
                        className="input input-bordered bg-base-200 w-full pr-10"
                        {...register("new_password", {
                            required: "New password is required",
                            minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                            },
                        })}
                        />
                        {errors.new_password && (
                        <span className="text-error">{errors.new_password.message}</span>
                        )}
                    </div>

                    <div className='mt-3 space-y-3 pl-2 border-l-2 border-base-300'>
                        <label>Confirm Password</label>
                        <input
                        type="password"
                        className="input input-bordered bg-base-200 w-full pr-10"
                        {...register("confirm_password", {
                            required: "Please confirm your password",
                            validate: (value) =>
                            value === watch("new_password") || "Passwords do not match",
                        })}
                        />
                        {errors.confirm_password && (
                        <span className="text-error">{errors.confirm_password.message}</span>
                        )}
                    </div>

                    <button className="btn btn-primary" type="submit">
                        Reset Password
                    </button>
                </form>

            </div>
            
        </div>
    
  );
};

export default ConfirmPassword;
