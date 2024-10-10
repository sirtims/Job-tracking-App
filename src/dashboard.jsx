import SideBar from "./DasboardComponents/sideBar"
import AddJob from "./DasboardComponents/addJob"
import AllJob from "./DasboardComponents/allJob"
import UpdateJob from './DasboardComponents/updateJob'
import Profile from "./DasboardComponents/profile"
import { useState, useEffect, useCallback, useRef } from "react"
import { useNavigate } from "react-router-dom"
import JobCard from "./DasboardComponents/jobCard"
import axios from "axios"
import { GetJobs } from './DasboardComponents/getAllJobs'
import Stats from "./DasboardComponents/stats"

const Dashboard = () => {
   const [isActive, setIsActive] = useState('AllJobs')
   const [isActiveSideBar, setISActiveSideBar] = useState(false)
   const [isLoading, setIsLoading] = useState(true)
   const [getJobs, setGetJobs] = useState([])
   const [error, setError] = useState('')
   const [getUser] = useState(localStorage.getItem('name'))
   const [toggleLogOut, setToggleLogOut] = useState(true)
   const [selectJobId, setSelectJobId] = useState(null)
   const [jobSize, setJobSize] = useState('')

   const [searchParams, setSearchParams] = useState({
      company: '',
      status: '',
      jobType: '',
      sort: ''
   })
   const navigate = useNavigate()
   const userLogo = getUser.charAt(0)

   const INACTIVITY_LIMIT = 20 * 60 * 1000;
   let inactivityTimer = useRef(null)


   // clear localStorage
   const handleClearStorage = useCallback(() => {
      setToggleLogOut(true)
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      localStorage.removeItem('userId')
      navigate('/login')

   }, [navigate])

   // handle Inactivity of user
   const handleUserInactivity = useCallback(() => {
      clearTimeout(inactivityTimer.current)
      inactivityTimer.current = setTimeout(() => {
         handleClearStorage();
      }, INACTIVITY_LIMIT)
   }, [INACTIVITY_LIMIT, handleClearStorage])




   const handleChange = (e) => {
      setSearchParams({
         ...searchParams,
         [e.target.name]: e.target.value
      })
   }
   // this section for geting and searching all 

   const handleClearFilters = () => {
      setSearchParams({
         company: "",
         status: "",
         jobType: "",
         sort: ""
      });
   };

   // render jops functon/get all jobs function
   const renderJobs = useCallback(async () => {
      setIsLoading(true)
      const { jobs, error } = await GetJobs(searchParams)
      setIsLoading(false)


      if (jobs.length < 1) {
         setGetJobs([])
         setJobSize('No jobs on your lists...!!!')
      }
      else {
         setGetJobs(jobs)
         setError(error)
         setJobSize('')
      }
   }, [searchParams])

   useEffect(() => {
      // get all jobs
      renderJobs()
      window.addEventListener('mousemove', handleUserInactivity)
      window.addEventListener('keydown', handleUserInactivity)

      inactivityTimer.current = setTimeout(() => {
         handleClearStorage()
      }, INACTIVITY_LIMIT)

      return () => {
         window.removeEventListener('mousemove', handleUserInactivity)
         window.removeEventListener('keydown', handleUserInactivity)
         clearTimeout(inactivityTimer)
      }
   }, [INACTIVITY_LIMIT, handleClearStorage, handleUserInactivity, renderJobs])




   // handle toggle between all components
   const handleToggle = (component) => {
      if (isActive === 'AllJobs' || isActive === 'AddJob' || isActive === 'UpdateJob') {
         renderJobs()
      }
      setIsActive(component)
   }
   const handleUserToggle = () => {
      setToggleLogOut(!toggleLogOut)

   }


   // handle delete job
   const handleDelete = async (id) => {
      const token = localStorage.getItem('token')
      try {
         const response = await axios.delete(`https://jobs-api-20oi.onrender.com/api/v1/jobs/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
         // get all jobs
         if (response.status === 200) {
            // Remove the deleted job from the current state
            setGetJobs((prevJobs) => prevJobs.filter(job => job._id !== id))
            if (getJobs.length < 1) {

               setJobSize('No jobs on your lists...!!!')
            }
         } else {
            console.error('Failed to delete the job')
         }
      } catch (error) {
         console.log(error);

      }
   }

   const handleJobId = (jobId) => {
      setSelectJobId(jobId)
      setIsActive('UpdateJob')
   }

   const handleSideBarAction = () => {
      setISActiveSideBar(!isActiveSideBar)
   }
   return (
      <section className=" relative">
         <SideBar setISActiveSideBar={setISActiveSideBar} isActiveSideBar={isActiveSideBar} handleToggle={handleToggle} fixed={'fixed'} />
         <div className={` transition-all ${!isActiveSideBar ? 'md:ml-[0px]' : 'md:ml-[300px]'}`}>
            <div className={` flex justify-between border-b fixed bg-white top-0 transition-all ${!isActiveSideBar ? 'md:ml-[0px]' : 'md:left-[300px]'} left-0 right-0 px-5 items-center  h-20`}>
               {/* menue */}
               <div onClick={handleSideBarAction} className="menu">
                  <img className="h-7 transition-all hover:shadow-md cursor-pointer " src="/images/menu-33.svg" alt="" />
               </div>
               {/* logo */}
               <div className="w-fit justify-center md:hidden  md:max-w-[1000px] font-[Sans-Serif]  logo_wrapper items-center space-x-2 flex">
                  <div className="rounded-md h-7 flex items-center justify-center w-7 bg-primary500">
                     <h1 className="text-white h-fit text-md p-0 m-0 font-bold">J</h1>
                  </div>
                  <h4 className="text-sm text-primary500 font-bold tracking-[0.3em]">obster</h4>
               </div>
               <h1 className="text-2xl hidden md:block font-sans font-[400]">Dashboard</h1>

               {/* user */}
               <div className="user relative">
                  <button onClick={handleUserToggle} className="bg-primary500 h-7 hover:bg-redDark transition-all shadow-md hover:shadow-lg flex items-center px-1 rounded-md gap-2">
                     <img className="h-5" src="/images/user-135.svg" alt="" />
                     <h5 className="text-white text-sm font-[600]">{getUser}</h5>
                     <img className="h-5" src="/images/arrow-down-77.svg" alt="drop down arrow" />
                  </button>
                  <button onClick={handleClearStorage} className={`${toggleLogOut ? 'hidden' : 'block'} bg-primary300 bottom-[-2em] absolute w-full h-7 hover:bg-redDark transition-all shadow-md hover:shadow-lg flex justify-center items-center px-1 rounded-md gap-2`}>

                     <h5 className="text-white text-sm font-[600]">Logout</h5>

                  </button>
               </div>
            </div>
            {/* display content */}
            <div className={`bg-grey50  ${isActiveSideBar === false ? 'md:w-full' : ''} py-20 min-h-[100vh] border-2 `}>
               {isActive === 'Stats' && <Stats searchParams={searchParams} />}
               {isActive === 'AddJob' && <AddJob />}
               {isActive === 'AllJobs' && <AllJob searchParams={searchParams} handleChange={handleChange} handleClearFilters={handleClearFilters} error={error} />}
               {isActive === 'Profile' && <Profile />}
               {isActive === 'UpdateJob' && <UpdateJob jobId={selectJobId} />}
               {
                  isActive === 'AllJobs' && <div className="mt-5 w-[80%] flex flex-wrap mx-auto">
                     {isLoading && (
                        <div className="border-2 border-grey300 animate-spin h-10 w-10 border-t-4 rounded-full border-t-red-500"></div>
                     )}

                     {!isLoading && getJobs.map(el => (
                        <JobCard key={el._id} company={el.company} jobType={el.jobType} position={el.position} status={el.status} updatedAt={el.updatedAt} location={el.location} userLogo={userLogo} handleClick={() => handleJobId(el._id)} handleDelete={() => handleDelete(el._id)} />
                     ))}
                     <div className={`text-2xl`}>{jobSize}</div>
                  </div>
               }

               {/* display jobs */}

            </div>
         </div>

      </section>
   )
}

export default Dashboard
