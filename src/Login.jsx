import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"

const Login = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const navigate = useNavigate()

   const handleLogin = async (e) => {
      e.preventDefault()
      setIsLoading(true)
      try {
         const { data: { user, token } } = await axios.post('https://jobs-api-20oi.onrender.com/api/v1/auth/login', {
            email: email,
            password: password
         })
         localStorage.setItem('token', token)
         localStorage.setItem('name', user.name)
         localStorage.setItem('userId', user.id)
         setIsLoading(false)
         Swal.fire({
            title: 'success',
            text: `Welcome back ${user.name}`,
            icon: 'success'
         }).then(() => {
            navigate('/dashboard')
         })

      } catch (error) {
         setIsLoading(false)
         if (error.message === 'Network Error') {
            return Swal.fire({
               title: 'error',
               text: error.message,
               icon: 'error'
            })
         }
         Swal.fire({
            title: 'error',
            text: error.response.data.msg,
            icon: 'error'
         })
      }
   }
   return (
      <section className="bg-gray-100 min-h-[100vh] py-6 w-full">
         <form onSubmit={handleLogin} className="w-[300px] rounded-md border-t-[5px] border-t-primary500 py-8 mt-5 mx-auto bg-white">
            <div className="w-[90%] justify-center  md:max-w-[1000px] font-[Sans-Serif] mx-auto logo_wrapper items-center space-x-2 flex">
               {/* logo */}
               <div className="rounded-md h-[3em] flex items-center justify-center w-[3em] bg-primary500">
                  <h1 className="text-white h-fit text-4xl p-0 m-0 font-bold">J</h1>
               </div>
               <h4 className="text-2xl text-primary500 font-bold tracking-[0.3em]">obster</h4>
            </div>
            <h1 className="text-center my-8 font-semibold text-3xl">Login</h1>
            {/* inputs */}
            <div className="inputs  mx-auto w-[80%]">
               <label htmlFor="email">Email</label><br />
               <input onChange={(e) => setEmail(e.target.value)} value={email} className="border   bg-primary50 rounded-md px-3 outline-primary200 h-9 my-4 w-full" type="text" /><br />
               <label htmlFor="password">Password</label><br />
               <input onChange={(e) => setPassword(e.target.value)} value={password} className="border bg-primary50 rounded-md px-3 outline-primary200 h-9 my-4 w-full" type="password" />
               <button type="submit" className="bg-primary500 active:bg-primary500 w-full text-white h-9 my-4 hover:bg-primary700 transition rounded-md text-xl">submit</button>

               {isLoading && (
                  <div className="border-2 mx-auto border-grey300 animate-spin h-10 w-10 border-t-4 rounded-full border-t-red-500"></div>
               )}
               <p className="text-center">Not a member? <a className="text-primary500" href="/register">Register</a></p>
            </div>
         </form>
      </section>
   )
}

export default Login