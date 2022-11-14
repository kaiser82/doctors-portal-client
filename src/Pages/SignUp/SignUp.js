import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../contexts/AuthProvider';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, googleLogin } = useContext(AuthContext);

    const handleSignUp = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user);
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then((() => { }))
                    .catch(e => console.log(e))
            })
            .catch(error => console.log(error));
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                const user = res.user;
                console.log(user);
            })
            .catch(e => console.log(e.message))
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input type='text' {...register("name", { required: "Name field cannot be empty!" })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <span className='label-text text-red-500'>{errors.name?.message}</span>}

                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type='email' {...register("email", { required: "Email field cannot be empty!" })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <span className='label-text text-red-500'>{errors.email?.message}</span>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type='password'
                            {...register("password",
                                {
                                    required: "Password field cannot be empty!",
                                    pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, message: "Password must contain Minimum eight characters, at least one letter, one number and one special character" }
                                })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <span className='label-text text-red-500'>{errors.password?.message}</span>}
                    </div>
                    <input className='btn w-full max-w-xs mt-4' value="Signup" type="submit" />
                    <label className="label">
                        <span className="label-text-alt">Already have an account? <Link to='/login' className="text-secondary">Please Login</Link> </span>
                    </label>
                    <div className="divider">OR</div>
                    <button onClick={handleGoogleLogin} className='btn btn-outline w-full max-w-xs'>Continue with google</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;