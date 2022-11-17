import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, googleLogin } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');

    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail)

    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }

    const handleSignUp = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(res => {
                setSignUpError('')
                const user = res.user;
                console.log(user);
                toast.success("New user created successfully.")
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email);
                    })
                    .catch(e => console.log(e.message))
            })
            .catch(error => {
                toast.error(error.message);
                setSignUpError(error.message)
            });
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                const user = res.user;
                console.log(user);
            })
            .catch(e => console.log(e.message))
    }

    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('save user:', data);
                setCreatedUserEmail(email);
            })
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