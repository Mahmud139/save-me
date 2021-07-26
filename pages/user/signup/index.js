import DarkMode from "@components/DarkMode"
import AppButton from "@components/others/AppButton"
import Link from "next/link"
import React, { useState } from "react"
import classes from "../login/login.module.css"

const index = () => {
  return (
    <div className={`bg-primary dark:bg-dark ${classes.login}`}>
      <DarkMode />
      <h1>Join Now</h1>
      <LogInForm />
      <small>
        <Link href="/user/login">Already have an account?</Link>
      </small>
    </div>
  )

  function LogInForm() {
    const initialState = {
      email: "",
      password: "",
      confirmPassword: "",
    }
    const [user, setUser] = useState(initialState)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleLogIn(e) {
      e.preventDefault()
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
    }

    return (
      <form onSubmit={handleLogIn} className={classes.loginForm}>
        {loading && (
          <div className="loading">
            <h1>Loading...</h1>
          </div>
        )}
        {error && <p className="error-text">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={user.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={user.password}
          pattern=".{6,}"
          onChange={handleChange}
          onInvalid={(e) => e.target.setCustomValidity("Do you tell that a password!?")}
          onInput={(e) => e.target.setCustomValidity("")}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={user.confirmPassword}
          onChange={handleChange}
        />
        <AppButton>Sign Up</AppButton>
      </form>
    )
  }
}

export default index
