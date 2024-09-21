'use client'

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter()
  console.log("Form");

  // Boilerplate code from https://nextjs.org/docs/pages/building-your-application/authentication
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Form submitted!");

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        router.push(' /community');
      } else {
        alert(data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  }

  return (
    <main>
      <div className="main">
        <div className="top-bar-container">
          <img src="/favicon.ico" alt="Logo" id="logo" width={40} height={40} />
          <div className="about-us">
            <a href="/aboutus">About us</a>
          </div>
        </div>
        <div className="login-center-container">
          <div className="login-form-container">
            <h1>Log In</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="username-form">
                <input id="login-username" name="username" type="text" placeholder="Username" required />
              </div>
              <div className="password-form">
                <input id="login-password" name="password" type="password" placeholder="Password" required />
              </div>
              <button type="submit" id="login-button">Log in</button>
            </form>
          </div>  
          <div className="create-account-container">
            <h3 id="new-to-unionizer">New to Unionizer? <a href="/joinnow" id="join-now">Join now</a></h3>
          </div>
        </div>
      </div>
    </main>
  );
}