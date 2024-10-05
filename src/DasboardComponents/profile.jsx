import axios from "axios"
import { useCallback, useState, useEffect } from "react"
// import Swal from 'sweetalert2'
// import { useNavigate } from 'react-router-dom'
const Profile = () => {
   const [error, setError] = useState('')
   const [success, setSuccess] = useState('')
   const [name, setName] = useState('')
   const [number, setNumber] = useState('')
   const [location, setLocation] = useState('')
   const [email, setEmail] = useState('')
   const [userId] = useState(localStorage.getItem('userId'))
   const token = localStorage.getItem('token')
   const renderUser = useCallback(async () => {

      try {
         const { data: { user } } = await axios.get(`https://jobs-api-20oi.onrender.com/api/v1/auth/user/${userId}`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
         console.log(user);
         setName(user.name)
         setLocation(user.location)
         setEmail(user.email)
         setNumber(user.number)

      } catch (error) {
         setSuccess('')
         if (error.message === "Network Error") {
            return setError('Bad Network')
         }
         setError(error.response.data.msg)

      }
   }, [userId, token])

   useEffect(() => {
      renderUser()
   }, [renderUser])



   const handleProfileUpdate = async (e) => {
      e.preventDefault()
      try {
         const { data: { user } } = await axios.patch(`https://jobs-api-20oi.onrender.com/api/v1/auth/user/${userId}`, {
            name: name,
            location: location,
            number: number
         }, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
         setSuccess('Success...')
         setError('')
         setName(user.name)
         setLocation(user.location)
         setEmail(user.email)
         setNumber(user.number)

      } catch (error) {
         setSuccess('')
         if (error.message === "Network Error") {
            return setError('Bad Network')
         }
         setError(error.response.data.msg)
      }
   }
   setTimeout(() => {
      setError('')
      setSuccess('')
   }, 3000)
   return (
      <section className="bg-gray-100  py-6 w-full">
         <form onSubmit={handleProfileUpdate} className="w-[80%] rounded-md border-t-[5px] border-t-primary500 pt-2 pb-4 mt-5 mx-auto bg-white">
            <h1 className=" ml-[10%] my-4 font-semibold text-3xl">User Profile</h1>
            {/* inputs */}
            <div className="inputs grid md:grid-cols-2 items-center  mx-auto w-[80%]">

               <div className="mx-2">
                  <label htmlFor="name">Name</label><br />
                  <input value={name} onChange={(e) => setName(e.target.value)} className="border bg-primary50 rounded-md px-3 outline-primary200 h-9 my-2 w-full" type="text" />
               </div>
               <div className="mx-2">
                  <label htmlFor="number">lastName</label><br />
                  <input value={number} onChange={(e) => setNumber(e.target.value)} className="border bg-primary50 rounded-md px-3 outline-primary200 h-9 my-2 w-full" type="text" />
               </div>
               <div className="mx-2">
                  <label htmlFor="email">Email</label><br />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} className="border bg-primary50 rounded-md px-3 outline-primary200 h-9 my-2 w-full" type="text" />
               </div>
               <div className="mx-2">
                  <label htmlFor="location">Location</label><br />
                  <input value={location} onChange={(e) => setLocation(e.target.value)} className="border bg-primary50 rounded-md px-3 outline-primary200 h-9 my-2 w-full" type="text" />
               </div>
               <div className="flex mx-2 p-0 gap-3">
                  <button type="submit" className="bg-primary500 mt-5 active:bg-primary500 w-full text-white h-9 hover:bg-redDark transition rounded-sm text-xl">Save Changes</button>
               </div>
               <p className="text-red-600 my-3">{error}</p>
               <p className="text-green-600 my-3">{success}</p>

            </div>
         </form>
      </section>
   )
}

export default Profile
