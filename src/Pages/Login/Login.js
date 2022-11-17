import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, googleLogin } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');

    const [loginUserEmail, setLoginUerEmail] = useState('');
    const [token] = useToken(loginUserEmail)
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = (data) => {
        console.log(data)
        setLoginError('');
        signIn(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user);
                setLoginUerEmail(data.email);

            })
            .catch(error => {
                console.log(error);
                setLoginError(error.message)
            })
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
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type='email' {...register("email", { required: "Email Address is required" })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='label-text text-red-500' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type='password' {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be 6 characters or longer" } })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='label-text text-red-500' role="alert">{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text-alt">Forget password?  </span>
                        </label>
                    </div>
                    <input className='btn w-full max-w-xs' value="Login" type="submit" />
                    <label className="label">
                        <span className="label-text-alt">New to doctors portal? <Link to='/signup' className="text-secondary">Create new account</Link> </span>
                    </label>
                    <div>
                        {
                            loginError && <p className='label-text text-red-500'>{loginError}</p>
                        }
                    </div>
                    <div className="divider">OR</div>
                    <button onClick={handleGoogleLogin} className='btn btn-outline w-full max-w-xs'>Continue with google</button>
                </form>
            </div>
        </div>
    );
};

export default Login;