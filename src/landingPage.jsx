import { useState } from "react";


const LandingPage = () => {
   const [token] = useState(localStorage.getItem('token'))
   return (
      <section className="bg-gray-100 min-h-[100vh] py-6 w-full">
         <div className="innerWrapper md:flex md:items-center gap-10 md:max-w-[1000px] w-[90%] mx-auto">
            {/* Left info section */}
            <div className="info">
               <div className="w-[90%] md:max-w-[1000px] font-[Sans-Serif] mx-auto logo_wrapper items-center space-x-2 flex">
                  {/* logo */}
                  <div className="rounded-md h-[3em] flex items-center justify-center w-[3em] bg-primary500">
                     <h1 className="text-white h-fit text-4xl p-0 m-0 font-bold">J</h1>
                  </div>
                  <h4 className="text-2xl text-primary500 font-bold tracking-[0.3em]">obster</h4>
               </div>
               <div className="my-28 md:max-w-[1000px] w-[90%] mx-auto">
                  <h1 className="uppercase font-[Sans-Serif] mb-8 font-[700] text-4xl">
                     job <span className="text-primary500">tracking</span> app
                  </h1>
                  <p className="text-gray-700 mb-8 md:w-[500px] font-[Sans-Serif] leading-relaxed">
                     Track your career journey seamlessly with intuitive tools, insightful analytics, and customizable features that adapt to your unique needs. Stay organized, prioritize tasks, and connect with opportunities effortlessly
                  </p>
                  <a
                     className="bg-primary500 text-white font-bold px-4 text-xl py-2 rounded-md hover:text-white hover:bg-primary700 transition"
                     href={token ? '/login' : '/register'}
                  >
                     Login/Register
                  </a>
               </div>
            </div>

            {/* Image */}
            <div className=" h-full">
               <img className="hidden h-fit w-[100%] md:block object-contain" src="/images/illustration.png" alt="Jobster illustration" />
            </div>
         </div>
      </section>
   );
};

export default LandingPage;
