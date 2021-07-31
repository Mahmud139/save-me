import DarkMode from "@components/DarkMode"
import AppButton from "@components/others/AppButton"
import AppSwitch from "@components/others/AppSwitch"
import FormInput from "@components/others/FormInput"
import Link from "next/link"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai/"
import classes from "../login/login.module.css"

const Signup = () => {
  return (
    <div className="bg-light dark:bg-dark text-center">
      <DarkMode />
      <h1>Join Now</h1>
      <SignupForm />
      <small className="text-blue-400">
        <Link href="/user/login">Already have an account?</Link>
      </small>
    </div>
  )

  function SignupForm() {
    const {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm()

    // const initialState = {
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    //   isDonor: false,
    // }
    // const [user, setUser] = useState(initialState)

    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSignup(data) {
      // e.preventDefault()
      // setLoading(true)

      // try {
      //   const { data } = await signUp(user)

      //   if (!data.user) {
      //     setError(data.message)
      //     setLoading(false)
      //     return
      //   }
      //   // history.push("/login")
      // } catch (err) {
      //   setError(err.message)
      //   setLoading(false)
      // }
      console.log(data)
    }

    return (
      <form onSubmit={handleSubmit(handleSignup)} className={classes.loginForm}>
        {loading && (
          <div className="loading">
            <h1>Loading...</h1>
          </div>
        )}
        {error && <p className="error-text">{error}</p>}

        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          register={register}
          errors={errors}
          className="my-2"
        />
        <div className="relative">
          <FormInput
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="Password"
            register={register}
            errors={errors}
            className="my-2"
          />
          <span onClick={() => setShowPass(!showPass)}>
            {showPass ? (
              <AiOutlineEyeInvisible className="absolute right-3 top-5" />
            ) : (
              <AiOutlineEye className="absolute right-3 top-5" />
            )}
          </span>
        </div>

        <FormInput
          name="confirmPassword"
          type={showPass ? "text" : "password"}
          placeholder="Confirm Password"
          register={register}
          errors={errors}
          className="my-2"
        />

        <AppSwitch label="I am a donor" />
        {/* <span className="my-3 flex items-center">
          <input
            name="isDonor"
            type="checkbox"
            {...register("isDonor")}
            className="mr-2 rounded"
          />
          <span>I am a Donor</span>
        </span> */}

        <AppButton className="m-auto">Sign Up</AppButton>
      </form>
    )
  }
}

export default Signup
