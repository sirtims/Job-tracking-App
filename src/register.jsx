import { useState } from "react"
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
const Register = () => {

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const navigate = useNavigate()
   const handleRegister = async (e) => {
      setIsLoading(true)
      e.preventDefault()
      try {
         const { data: { user, token } } = await axios.post('https://jobs-api-20oi.onrender.com/api/v1/auth/register', {
            name: name,
            email: email,
            password: password
         })
         localStorage.setItem('token', token)
         setIsLoading(false)
         Swal.fire({
            title: ' success',
            text: `Congratulation ${user.name}`,
            icon: 'success'
         }).then(() => {
            navigate('/login')
         })

      } catch (error) {
         setIsLoading(false)
         if (error.message === 'Network Error') {
            return Swal.fire({
               title: 'error',
               text: 'Network Error: Could not connect to the Server',
               icon: 'error'
            })
         }
         Swal.fire({
            title: 'Error',
            text: `${error.response.data.msg}`,
            icon: 'error'
         })
      }

   }
   return (
      <section className="bg-gray-100 min-h-[100vh] relative py-6 w-full">
         <form onSubmit={handleRegister} className="w-[300px] rounded-md border-t-[5px] border-t-primary500 py-8 mt-5 mx-auto bg-white">
            <div className="w-[90%] justify-center  md:max-w-[1000px] font-[Sans-Serif] mx-auto logo_wrapper items-center space-x-2 flex">
               {/* logo */}
               <div className="rounded-md h-[3em] flex items-center justify-center w-[3em] bg-primary500">
                  <h1 className="text-white h-fit text-4xl p-0 m-0 font-bold">J</h1>
               </div>
               <h4 className="text-2xl text-primary500 font-bold tracking-[0.3em]">obster</h4>
            </div>
            <h1 className="text-center my-8 font-semibold text-3xl">Register</h1>
            {/* inputs */}
            <div className="inputs  mx-auto w-[80%]">
               <label htmlFor="name">Name</label><br />
               <input value={name} onChange={(e) => setName(e.target.value)} className="border  bg-primary50 rounded-md px-3  outline-primary200 h-9 my-4 w-full" type="text" /><br />
               <label htmlFor="email">Email</label><br />
               <input value={email} onChange={(e) => setEmail(e.target.value)} className="border  bg-primary50 rounded-md px-3 outline-primary200 h-9 my-4 w-full" type="text" /><br />
               <label htmlFor="password">Password</label><br />
               <input value={password} onChange={(e) => setPassword(e.target.value)} className="border bg-primary50 rounded-md px-3 outline-primary200 h-9 my-4 w-full" type="password" />
               <button type="submit" className="bg-primary500 active:bg-primary500 w-full text-white h-9 my-4 hover:bg-primary700 transition rounded-md text-xl">submit</button>

               {isLoading && (
                  <div className="border-2 mx-auto border-grey300 animate-spin h-10 w-10 border-t-4 rounded-full border-t-red-500"></div>
               )}
               <p className="text-center">Already a member? <a className="text-primary500" href="/login">Login</a></p>
            </div>
         </form>
         <a className=" text-white hover:text-white text-sm font-[600] bg-primary300 top-2 right-3 absolute  h-7 hover:bg-redDark transition-all shadow-md hover:shadow-lg flex justify-center items-center px-1 rounded-md gap-2" href="/">Home Page</a>
      </section>
   )
}

export default Register
