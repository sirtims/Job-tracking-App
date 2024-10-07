import { useState, useCallback, useEffect } from "react"
import axios from 'axios'
import PropType from 'prop-types'
const UpdateJob = ({ jobId }) => {
   const [position, setPosition] = useState('')
   const [company, setCompany] = useState('')
   const [status, setStatus] = useState('')
   const [jobType, setJobType] = useState('')
   const [location, setLocation] = useState('')
   const token = localStorage.getItem('token')

   const [error, setError] = useState('')

   // getjob info
   const fetchJobs = useCallback(async () => {
      try {
         const { data: { job } } = await axios.get(`https://jobs-api-20oi.onrender.com/api/v1/jobs/${jobId}`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
         console.log(job);

         setCompany(job.company)
         setStatus(job.status)
         setJobType(job.jobType)
         setLocation(job.location)
         setPosition(job.position)
      } catch (error) {
         setError(error.response.data.msg)

      }
   }, [token, jobId])

   useEffect(() => {
      fetchJobs()
   }, [fetchJobs])

   const handleUpdateJob = async (e) => {
      e.preventDefault()

      console.log(token);
      try {
         await axios.patch(`https://jobs-api-20oi.onrender.com/api/v1/jobs/${jobId}`, {
            position: position,
            company: company,
            status: status,
            jobType: jobType,
            location: location

         }, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
         setError('Success')
      } catch (error) {
         setError(error.response.data.msg)
      }
   }

   setTimeout(() => {
      setError('')
   }, 3000)
   // handleClear btn

   const handleClear = () => {
      setPosition('')
      setCompany('')
      setStatus('')
      setJobType('')
      setLocation('')
      setError('')
   }
   return (
      <section className="bg-gray-100 py-6 w-full">
         <form onSubmit={handleUpdateJob} className="w-[80%] rounded-md border-t-[5px] border-t-primary500 pt-2 pb-4 mt-5 mx-auto bg-white">
            <h1 className=" ml-[10%] my-4 font-semibold text-3xl">Update Job</h1>
            {/* inputs */}
            <div className="inputs grid md:grid-cols-2 items-center  mx-auto w-[80%]">
               <div className="mx-2">
                  <label htmlFor="position">Position</label><br />
                  <input value={position} onChange={(e) => setPosition(e.target.value)} className="border  bg-primary50 rounded-md px-3  outline-primary200 h-9 my-2 w-full" type="text" /><br />
               </div>
               <div className="mx-2">
                  <label htmlFor="company">Company</label><br />
                  <input value={company} onChange={(e) => setCompany(e.target.value)} className="border  bg-primary50 rounded-md px-3 outline-primary200 h-9 my-2 w-full" type="text" /><br />
               </div>
               <div className="mx-2">
                  <label htmlFor="location">Location</label><br />
                  <input value={location} onChange={(e) => setLocation(e.target.value)} className="border bg-primary50 rounded-md px-3 outline-primary200 h-9 my-2 w-full" type="text" />
               </div>
               <div className="mx-2">
                  <label htmlFor="status">Status</label><br />
                  <select value={status} onChange={(e) => setStatus(e.target.value)} name="status" className="w-full border px-3 my-2  bg-primary50 rounded-md  outline-primary200 h-9" id="status">
                     <option value='pending'>Pending</option>
                     <option value='interview'>Interview</option>
                     <option value='declined'>Decline</option>
                  </select>
               </div>
               <div className="mx-2">
                  <label htmlFor="job_type">Job-Type</label><br />
                  <select value={jobType} onChange={(e) => setJobType(e.target.value)} name="jobType" className="w-full border my-2 px-3 bg-primary50 rounded-md  outline-primary200 h-9" id="status">
                     <option value='full-time'>Full-Time</option>
                     <option value='per-time'>Per-Time</option>
                     <option value='intern'>Intern</option>
                     <option value='remote'>Remote</option>
                  </select>
               </div>
               <div className="flex mx-2 p-0 gap-3">
                  <button onClick={handleClear} type="button" className="bg-primary500 mt-5 active:bg-primary500 w-full text-white h-9  hover:bg-redDark transition rounded-sm md:text-xl text-sm">clear</button>
                  <button type="submit" className="bg-primary500 mt-5 active:bg-primary500 w-full text-white h-9 hover:bg-redDark transition rounded-sm md:text-xl text-sm">save changes</button>
               </div>
               <p className={`${error !== 'Success' ? "text-red-600" : 'text-green-600'} my-3`}>{error}</p>

            </div>
         </form>
      </section>
   )
}
UpdateJob.propTypes = {
   jobId: PropType.string
}
export default UpdateJob
