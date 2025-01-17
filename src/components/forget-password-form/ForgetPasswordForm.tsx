
'use client'
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/navigation'; 

import Button from "../button/Button";


interface FormValues {
    email?: string;
  }

export default function ForgetPasswordForm() {
  const router = useRouter();
  const [responseSucces , setResponse]= useState(null)
  const [apiEmail , setApiEmail]= useState("")
  const [apiError , setApiError]= useState(null)
  const [lodong , setLoding]= useState(false)

  
 

  const handleFormData = async(values : FormValues) => {
    try {
      setLoding(true)
          const { data } = await axios.post('https://exam.elevateegy.com/api/v1/auth/forgotPassword', { email: values.email });
          setApiEmail(values.email || '');
          setResponse(data.info);
          setLoding(false)
          router.push('/auth/verifycode');

      } catch (error) {
        if (axios.isAxiosError(error)) {
          setApiError(error.response?.data.message );
        }
      }
  };
    const getValidationSchema = () => {
         Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
        });
        
    };
const formik = useFormik<FormValues>({
    initialValues:{
        email: '',
       
    },
    validationSchema : getValidationSchema()
    ,onSubmit : handleFormData
})



  return (
    <div className="w-full">
      <h2 className="font-bold text-[24px] mb-[30px]">Forgot your password?</h2>
      
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[32px] ">
       
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
                <p className="text-red-500 mt-3 text-sm">{formik.errors.email}</p>
                )}
                {apiError && (
                <p className="text-red-500 mt-3 text-sm">{apiError}</p>
                )}
                {responseSucces && (
                <p className="text-green-500 mt-3 text-sm p-0">{responseSucces}</p>
                )}


        </div>
       
                                       
                      
    
  <button
      type="submit"
       className="w-full bg-[#4461F2] h-[55px] text-white rounded-[20px]"
    >
    { lodong ? 'Sending...' : 'Send '}
    </button>      
    <Button/>
      </form>
    </div>
  );
}

