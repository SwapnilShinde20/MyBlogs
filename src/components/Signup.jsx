import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import {Link , useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {Button,Input,Logo } from './index'
import authService from '../appwrite/auth'
import { login as authLogin } from '../store/authSlice'

function Signup() {
    
    const dispatch = useDispatch()
    const [error,setError] = useState("")
    const {register,handleSubmit} = useForm()
    const navigate = useNavigate()

    const signup = async(data)=>{
        setError("")
        try {
            const session = await authService.createAccount(data)
            if(session){
                await authService.getCurrentUser().then((userData)=>{
                    if(userData) dispatch(authLogin(userData))
                    navigate("/")
                })
                
            }
        } catch (error) {
            setError(error.message)
        }
    }


  return (
    <div 
     className='flex items-center justify-center w-full'
    >
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border
        border-black/10`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width="100%"/>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>
                Sign up to create account
            </h2>
            <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account?&nbsp;
                    <Link 
                        to="/login"
                        className='font-medium text-primary transition-all duration-200
                        hover:underline'
                    >Login
                    </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

            <form action="" className='mt-8' onSubmit={handleSubmit(signup)}>
                <div className='space-y-5'>
                    <Input
                        label="Full Name: "
                        type="text"
                        placeholder="Full Name"
                        {...register("fullname",{
                            required:true,
                        })}
                    />

                    <Input
                        label="Email: "
                        type="email"
                        placeholder="Email Address"
                        {...register("email",{
                            required:true,
                            validate:{matchPattern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                            }
                        })}
                    />

                    <Input
                        label="Password:"
                        type="password"
                        placeholder="Password"
                        {...register("password",{
                            required:true,
                        })}
                    />

                    <Button
                        children="Create Account"
                        classname='w-full'
                        type='submit'
                        
                    />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup