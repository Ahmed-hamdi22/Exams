'use client'
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/navigation'; 
import Button from "../button/Button";


interface FormValues {
    email?: string;
    resetCode?: string;
    password?: string;
    rePassword?: string;
  }

export default function ForgetPasswordForm() {
  const router = useRouter();
  const [responseSucces , setResponse]= useState(null)
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [apiEmail , setApiEmail]= useState("")
  const [apiError , setApiError]= useState(null)
  const [isRetypeVisible, setRetypeVisible] = useState(false);
  const [steps , SetSteps]= useState("forgotPass")


  const ResendCode = async()=>{
    try {
     await axios.post("https://exam.elevateegy.com/api/v1/auth/forgotPassword", {  email : apiEmail});

    } catch (error) {
            console.log(error);
    }
  }
  const handleFormData = async(values : FormValues) => {
    try {
        if (steps === 'forgotPass') {
          const { data } = await axios.post('https://exam.elevateegy.com/api/v1/auth/forgotPassword', { email: values.email });
          setApiEmail(values.email || '');
          setResponse(data.info);
          SetSteps('verifycode');
        } else if (steps === 'verifycode') {
          const { data } = await axios.post('https://exam.elevateegy.com/api/v1/auth/verifyResetCode', { resetCode: values.resetCode });
          setResponse(data.message);
          SetSteps('setpass');
        } else if (steps === 'setpass') {
          await axios.put('https://exam.elevateegy.com/api/v1/auth/resetPassword', {
            email : apiEmail,
            newPassword: values.password,
          });
          router.push('/login');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setApiError(error.response?.data.message || 'An error occurred');
        }
      }
  };
    const getValidationSchema = () => {
        if (steps === 'forgotPass') {
        return Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
        });
        } else if (steps === 'verifycode') {
        return Yup.object({
            resetCode: Yup.string()
            .matches(/^\d{6}$/, "Reset code must be exactly 6 digits")
            .required("Reset code is required"),
        });
        } else if (steps === 'setpass') {
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
        }
    };
const formik = useFormik<FormValues>({
    initialValues:{
        email: '',
        resetCode: '',
        password: '',
        rePassword: '',
    },
    validationSchema : getValidationSchema()
    ,onSubmit : handleFormData
})



  return (
    <div className="w-full">
        {steps === "forgotPass" && <h2 className="font-bold text-[24px] mb-[30px]">Forgot your password?</h2>}
        {steps === "verifycode" && <h2 className="font-bold text-[24px] mb-[30px]">Verify code</h2>}
        {steps === "setpass" && <h2 className="font-bold text-[24px] mb-[30px]">Set a Password</h2>}
      
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[32px] ">
        {steps === "forgotPass" && 
        <div className="forget">

            <input
                type="email"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="w-full h-[40px] rounded-[10px] border-[1px] p-3"
                />
                {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 mt-3 text-sm p-0">{formik.errors.email}</p>
                )}
                {apiError && (
                <p className="text-red-500 mt-3 text-sm p-0">{apiError}</p>
                )}
                {responseSucces && (
                <p className="text-green-500 mt-3 text-sm p-0">{responseSucces}</p>
                )}


        </div>
        }
        {steps === "verifycode" &&
            <div className="verifyCode">
                      <input
                        type="text"
                        placeholder="Enter Code"
                        name="resetCode"
                        value={formik.values.resetCode}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="w-full h-[40px] rounded-[10px] border-[1px] p-3"
                        /> 
                       {formik.touched.resetCode && formik.errors.resetCode && (
                        <p className="text-red-500 mt-3 text-sm p-0">{formik.errors.resetCode}</p>
                        )}
                        {apiError && (
                        <p className="text-red-500 mt-3 text-sm p-0">{apiError}</p>
                        )}
                        {responseSucces && (
                        <p className="text-green-500 mt-3 text-sm p-0">{responseSucces}</p>
                        )}


                        <div className="text-end text-base font-normal mt-[10px]">
                            Didn’t receive a code?   
                            <span onClick={ResendCode} className="text-[#4461F2] cursor-pointer" > Resend</span>
                        </div>
            </div>
        }
        {steps === "setpass" && 
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
                                type={isRetypeVisible ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                name="rePassword"
                                value={formik.values.rePassword}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                className="w-full h-[40px] rounded-[10px] border-[1px] p-3"
                                />
                            <button
                                type="button"
                                onClick={() => setRetypeVisible(!isRetypeVisible)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                <Image src="/images/eye.png" alt="eye" height={15} width={15} />
                            </button>
                            </div>
                            {formik.touched.rePassword && formik.errors.rePassword && (
                            <p className="text-red-500 mt-3 text-sm p-0">{formik.errors.rePassword}</p>
                            )}
                        </div>
        }
      <button
       type="submit"
        className="w-full bg-[#4461F2] h-12 text-white rounded-xl"
    >
     { formik.isSubmitting ? 'Sending...' : 'Send '}
     </button> 
      <Button/>
      </form>
    </div>
  );
}
