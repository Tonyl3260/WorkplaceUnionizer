'use client'

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Login() { 
  const router = useRouter()

  // Boilerplate code from https://nextjs.org/docs/pages/building-your-application/authentication
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')

    const response = await fetch('/api/auth/login', { 
      method: 'POST',
      headers: { 'ContentTupe': 'application/json'},
      body: JSON.stringify({ username, password }),
    })

    if(response.ok) {
      // router.push(*INSERT PAGE HERE*)
    } else {
      // Retry Login
    }
  }

  return (
    <main>
      <div className="main">
        <div className="top-bar-container">
          {/* <img src="" alt="Logo"></img> */}
          <a href="">About us</a>
        </div>
        <div className="login-form-container">
          <h1>Log In</h1>
          <form className="login-form">
            <div className="username-form">
              <input id="login-username" name="username" type="username" placeholder="Username" required />
            </div>
            <div className="password-form">
              <input id="login-password" name="password" type="password" placeholder="Password" required />
            </div>
          </form>
          <button type="button" id="login-button">Log In</button>
        </div>
      </div>
      <div className="create-account-container">
        <h1>New User?</h1>
        <button type="button" id="create-account-button">Create Account</button>
      </div>
    </main>
  );
}