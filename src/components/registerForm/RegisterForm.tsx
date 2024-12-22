'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useRouter } from 'next/navigation'; 
import Button from "../button/Button";

interface FormValues {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
  }

export default function RegisterForm() {
    const router = useRouter();
    const [apiUserError , setApiUserError]= useState(null)
    const [apiEmailError , setApiEmailError]= useState(null)
    const [PasswordVisible, setPasswordVisible] = useState(false);
    const [ReVisible, setReVisible] = useState(false);

    const handleFormData = async(values : FormValues) => {
        try {
          const { data } = await axios.post("https://exam.elevateegy.com/api/v1/auth/signup", values);
          console.log(data);
          if (data.message === "success") {
            router.push('/login');
          }
        } catch (error) {
            if(axios.isAxiosError(error)){
                if(error.response?.data.message === "username already exists"){
                    setApiUserError(error.response?.data.message)
                }
                if(error.response?.data.message === "email already exists"){
                    setApiEmailError(error.response?.data.message)
                }
            }
        }
      };
    const validSchema = Yup.object({
        username: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Username must contain only characters")
        .min(4, "Username must be at least 4 characters")
        .max(25, "Username cannot exceed 25 characters")
        .required("Username is required"),
      firstName: Yup.string()
        .matches(/^[a-zA-Z]+$/, "First name must contain only letters")
        .required("First name is required"),
      lastName: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Last name must contain only letters")
        .required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number"
      )
      .matches(
        /^(?=.*?[#?!@$%^&*-])/,
        "Password must include at least one special character (#?!@$%^&*-)"
      )
        .required("Password is required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
        phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
        .matches(/^[0-9]+$/, 'Phone number must contain only digits')
        .required('Phone number is required'),
      })
    const formik = useFormik<FormValues>({
        initialValues:{
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        },
        validationSchema : validSchema
        ,onSubmit : handleFormData
    })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "username" && apiUserError) {
          setApiUserError(null); 
        }
        if (e.target.name === "email" && apiEmailError) {
          setApiEmailError(null);
        }
        formik.handleChange(e); 
      };
   
    return (
    <div className="w-full">
      <h2 className="font-bold text-[24px] mb-[30px]">Sign up</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[25px] ">
        <input
          type="text"
          placeholder="UserName"
          name="username"
          value={formik.values.username}
          onBlur={formik.handleBlur}
          onChange={handleInputChange}
         className="w-full h-[40px] rounded-[10px] border-[1px] p-3"
        />
        {formik.touched.username && formik.errors.username && (
          <p className="text-red-500 text-sm p-0">{formik.errors.username}</p>
        )}
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formik.values.firstName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className="w-full h-[40px] rounded-[10px] border-[1px] p-3"
          />
        {formik.touched.firstName && formik.errors.firstName && (
          <p className="text-red-500 text-sm p-0">{formik.errors.firstName}</p>
        )}
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={formik.values.lastName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className="w-full h-[40px] rounded-[10px] border-[1px] p-3"
          />
        {formik.touched.lastName && formik.errors.lastName && (
          <p className="text-red-500 text-sm p-0">{formik.errors.lastName}</p>
        )}
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={formik.values.phone}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className="w-full h-[40px] rounded-[10px] border-[1px] p-3"
/>
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-500 text-sm p-0">{formik.errors.phone}</p>
        )}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={handleInputChange}
          className="w-full h-[40px] rounded-[10px] border-[1px] p-3"
          />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm p-0">{formik.errors.email}</p>
        )}
       
        <div className="relative w-full">
            <input
                type={PasswordVisible ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="w-full h-[40px] rounded-[10px] border-[1px] p-3"
                />
            <button
                type="button"
                onClick={() => setPasswordVisible(!PasswordVisible)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
                <Image src={"/images/eye.png"} alt="eye" height={15}  width={15}  />
            </button>
        </div>
            {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm p-0">{formik.errors.password}</p>
            )}
        <div className="relative w-full">
            <input
                type={ReVisible ? 'text' : 'password'}
                placeholder="Confirm Password"
                name="rePassword"
                value={formik.values.rePassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="w-full h-[40px] rounded-[10px] border-[1px] p-3"
                />
            <button
                type="button"
                onClick={() => setReVisible(!ReVisible)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
                <Image src={"/images/eye.png"} alt="eye" height={15} width={15} />
            </button>
        </div>
            {formik.touched.rePassword && formik.errors.rePassword && (
                  <p className="text-red-500 text-sm p-0">{formik.errors.password}</p>
             )}
        <p className="text-center text-base font-normal mb-[30px]">
          Already have an account?
          <Link className="text-[#4461F2]" href={"/login"}>
            Login
          </Link>
        </p>
        <button
      type="submit"
       className="w-full bg-[#4461F2] h-[55px] text-white rounded-[20px]"
    >
    
Create Account    </button>
        <Button/>
      </form>
    </div>
  );
}
