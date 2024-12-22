'use client'
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/navigation'; 
import Button from "../button/Button";
interface FormValues {
    password?: string;
    rePassword?: string;
  }

export default function ForgetPasswordForm() {
  const router = useRouter();
  const [apiEmail , setApiEmail]= useState("")
  const [apiError , setApiError]= useState(null)
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isReVisible, setReVisible] = useState(false);
  const [lodong , setLoding]= useState(false)

  const handleFormData = async(values : FormValues) => {
    try {
      setLoding(true)
    
          await axios.put('https://exam.elevateegy.com/api/v1/auth/resetPassword', {
            email : apiEmail,
            newPassword: values.password,
          });
          setLoding(false)
          router.push('/login')


        
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setApiError(error.response?.data.message );
        }
      }
  };
    const getValidationSchema = () => {
       
       return Yup.object({
            password: Yup.string()
            .matches(
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
              'Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number'
            )
            .matches(
              /^(?=.*?[#?!@$%^&*-])/,
              'Password must include at least one special character (#?!@$%^&*-)'
            )
            .required('Password is required'),
          rePassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm password is required'),
        });
        
    };
const formik = useFormik<FormValues>({
    initialValues:{
        password: '',
        rePassword: '',
    },
    validationSchema : getValidationSchema()
    ,onSubmit : handleFormData
})


  return (
    <div className="w-full">
       
       <h2 className="font-bold text-[24px] mb-[30px]">Set a Password</h2>
      
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[32px] ">
     
       
            <div className="set-password">
                        <div className="relative w-full">
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                placeholder="Password"
                                name="password"
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                className="w-full h-[40px] rounded-[10px] border-[1px] p-3"

                            />
                            <button
                                type="button"
                                onClick={() => setPasswordVisible(!isPasswordVisible)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                <Image src="/images/eye.png" alt="eye" height={15} width={15} />
                            </button>
                        </div>
                            {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 mt-3 text-sm p-0">{formik.errors.password}</p>
                            )}

                        <div className="relative w-full mt-8">
                            <input
                                type={isReVisible ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                name="rePassword"
                                value={formik.values.rePassword}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                className="w-full h-[40px] rounded-[10px] border-[1px] p-3"

                            />
                               <button
                                type="button"
                                onClick={() => setPasswordVisible(!isPasswordVisible)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                <Image src="/images/eye.png" alt="eye" height={15} width={15} />
                            </button>
                           
                            </div>
                            {formik.touched.rePassword && formik.errors.rePassword && (
                            <p className="text-red-500 mt-3 text-sm p-0">{formik.errors.rePassword}</p>
                            )}
                        </div>
  <button
      type="submit"
       className="w-full bg-[#4461F2] h-[55px] text-white rounded-[20px]"
    >
      {
        lodong ? 'SingIn ....' :' SingIn'
      }
      
    </button> 
       
        <Button/>
      </form>
    </div>
  );
}






























