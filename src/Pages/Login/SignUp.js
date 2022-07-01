import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init'
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [updateProfile, updating, updateeError] = useUpdateProfile(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

    const navigate = useNavigate()  
    let signInError;  

    if(loading || gLoading || updating){
        return <Loading></Loading>
    }

    if(error || gError || updateeError){
        signInError = <p className='text-red-500 mb-2'><small>{error?.message || gError?.message || updateeError.message}</small></p>
    }

    if(user){
        navigate('/')
    }

    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name});
        console.log('update name done', data);
    }

    return (
        <div className='flex items-center justify-center bg-blue-100 h-screen'>
            <div className="card w-80 lg:w-96 bg-white shadow-md" data-aos="zoom-in-up" data-aos-delay="100" data-aos-duration="800">
                <div className="card-body text-center">
                    <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input 
                                type="name" 
                                placeholder="Your Name" 
                                className="input input-bordered w-full max-w-xs" 
                                {...register("name", {
                                    required: {
                                    value: true,
                                    message: 'Name is required'  
                                    },
                                    minLength: {
                                    value: 3,
                                    message: 'Must be 3 characters longer'
                                    }
                                })}
                            />
                            <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            {errors.name?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Your Email" 
                                className="input input-bordered w-full max-w-xs" 
                                {...register("email", {
                                    required: {
                                    value: true,
                                    message: 'Email is required'  
                                    },
                                    pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'provide a valid email..'
                                    }
                                })}
                            />
                            <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Your Password" 
                                className="input input-bordered w-full max-w-xs" 
                                {...register("password", {
                                    required: {
                                    value: true,
                                    message: 'Password is required'  
                                    },
                                    minLength: {
                                    value: 6,
                                    message: 'Must be 6 characters longer'
                                    }
                                })}
                            />
                            <label className="label">
                            {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>
                        {signInError}
                        <input className='btn w-full uppercase font-bold max-w-xs' type="submit" value="Sign Up"  />
                    </form>
                    <p><small className='font-bold'>Already have an Account? <Link to='/login' className='text-secondary'>Please Login</Link></small></p>
                    <div className="divider">OR</div>
                    <button onClick={() => signInWithGoogle()} className="btn btn-dark btn-outline w-full max-w-xs">Sign in With Google</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;