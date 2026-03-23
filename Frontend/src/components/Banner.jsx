import React from 'react'
import banner from "../../public/Banner.jpg"

function Banner() {
  return (
    <>
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
        <div className="space-y-8">
        <h1 className="text-2xl md:text-4xl font-bold">
              Hello, welcomes here to learn something{" "}
              <span className="text-pink-500">new everyday!!!</span>
            </h1>
            <p className="text-sm md:text-xl">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Eligendi, expedita eius a, officiis earum deserunt laboriosam fugiat, corporis recusandae sapiente nisi architecto? 
            Sit, necessitatibus ipsa? Repudiandae nisi possimus reiciendis non.
            </p>
           <label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </g>
  </svg>
  <input type="email" placeholder="Enter email to login" required />
</label>
<div className="validator-hint hidden">Enter valid email address</div>
            </div>
            <button className="btn btn-soft btn-secondary">Get Started</button>
            </div>
         <div className=" order-1 w-full mt-20 md:w-1/2">
    <img
      src={banner}
      alt="Books"
      className="rounded-xl md:w-137.5 md:h-115 md:ml-12"
    />
        </div>
    </div>
    </>
  )
}

export default Banner
