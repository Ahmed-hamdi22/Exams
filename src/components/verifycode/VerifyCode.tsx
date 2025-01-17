'use client'

import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/navigation'; 
import Button from "../button/Button";


interface FormValues {
    resetCode?: string;
  }

export default function ForgetPasswordForm() {
  const router = useRouter();
  const [responseSucces , setResponse]= useState(null)
  const [apiError , setApiError]= useState(null)
  const [lodong , setLoding]= useState(false)

  const handleFormData = async(values : FormValues) => {
    try {
        setLoding(true)
          const { data } = await axios.post('https://exam.elevateegy.com/api/v1/auth/verifyResetCode', { resetCode: values.resetCode });
          setResponse(data.message);
          setLoding(false)
          window.location.href = '/auth/setpassword';
        }
       catch (error) {
        if (axios.isAxiosError(error)) {
            setApiError(error.response?.data.message );
        }
      }
  };

    const ResendCode = async()=>{
    try {
     await axios.post("https://exam.elevateegy.com/api/v1/auth/forgotPassword", {  email : apiEmail});

    } catch (error) {
            console.log(error,"error");
    }
  }
    const getValidationSchema = () => {
       Yup.object({
            resetCode: Yup.string()
            .matches(/^\d{6}$/, "Reset code must be exactly 6 digits")
            .required("Reset code is required"),
        });
        
    };
const formik = useFormik<FormValues>({
    initialValues:{
        resetCode: '',
    },
    validationSchema : getValidationSchema()
    ,onSubmit : handleFormData
})


  return (
    <div className="w-full">
       <h2 className="font-bold text-[24px] mb-[30px]">Verify code</h2>
      
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[32px] ">
    
        
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
                            <span  onClick={ResendCode} className="text-[#4461F2] cursor-pointer" > Resend</span>
                        </div>
            </div>
      
  <button
      type="submit"
       className="w-full bg-[#4461F2] h-[55px] text-white rounded-[20px]"
    >
      Verify
    </button>       
    <Button/>
      </form>
    </div>
  );
}
