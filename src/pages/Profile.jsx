import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ProfileForm from '../components/Dashboard/Profile/ProfileForm';
import ProfileButton from '../components/Dashboard/Profile/ProfileButton';
import PasswordChangeForm from '../components/Dashboard/Profile/PasswordChangeForm';
import useAuthContext from '../hooks/useAuthContext';
import ErrorAlert from '../components/ErrorAlert';

const Profile = () => {

    const [isEditing, setIsEditing] = useState(false);
    const {user, updateUserProfile, changePassword, errorMsg} = useAuthContext();
    const {register,setValue,handleSubmit, watch, formState: {errors}, } =useForm();
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        Object.keys(user).forEach((key) => setValue(key, user[key]));
    }, [user, setValue])

    const onSubmit = async (data) => {
        try{
            //profile update
            const profilePayload = {
            first_name: data.first_name, 
            last_name: data.last_name,
            address: data.address,
            phone_number: data.phone_number
            };
            await updateUserProfile(profilePayload);
            
            //password change
            if(data.current_password && data.new_password){
                const response = await changePassword({
                    current_password: data.current_password,
                    new_password: data.new_password
                })
                if(response.success){
                setSuccessMsg(response.message);
            }
            }
        } catch(error){
            console.log(error);
        }
    }

    return (
        <div className='card w-full max-w-2xl mx-auto bg-base-100 shadow-xl'>
            <div className='card-body'>
                {errorMsg && <ErrorAlert error={errorMsg} />}
                {successMsg && <div role="alert" className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{successMsg}</span>
                        </div>}
                <h2 className="card-title text-2xl mb-4">
                Profile Information
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ProfileForm register={register}
                    errors={errors}
                    isEditing={isEditing} />

                    <PasswordChangeForm register={register}
                    errors={errors}
                    watch={watch}
                    isEditing={isEditing}
                     />

                    <ProfileButton isEditing={isEditing}
                    setIsEditing={setIsEditing} />
                </form>
            </div>
            
        </div>
    );
};

export default Profile;