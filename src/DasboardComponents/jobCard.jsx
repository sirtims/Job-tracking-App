
import PropType from 'prop-types'


const JobCard = ({ company, handleClick, status, updatedAt, location, jobType, position, userLogo, handleDelete }) => {
   const newDate = updatedAt.split(':')[0]


   return (
      <section className="border w-[350px] m-5 p-5 bg-white">
         <div className="flex border-b pb-2 gap-2">
            <div className="rounded-md h-[3em] flex items-center justify-center w-[3em] bg-primary500">
               <h1 className="text-white text-2xl pb-2 flex items-center font-bold">{userLogo}</h1>
            </div>
            <div>
               <h1 className="font-semibold text-xl">{position}</h1>
               <p>{company}</p>
            </div>
         </div>
         <div>
            <div className="flex items-center justify-between">
               <div className="flex my-4 items-center gap-2">
                  <img className="h-4" src="/images/location-28.svg" alt="" />
                  <p>{location}</p>
               </div>
               <div className="flex my-4 items-center gap-2">
                  <img className="h-4" src="/images/date-14.svg" alt="" />
                  <p>{newDate}</p>
               </div>
            </div>
            <div className="flex items-center justify-between">
               <div className="flex my-4 items-center gap-2">
                  <img className="h-4" src="/images/case-84.svg" alt="" />
                  <p>{jobType}</p>
               </div>
               <p className={`px-2 py-1 rounded-md font-mono w-fit ${status === 'pending' ? 'bg-yellow-200 text-orange-700' :
                  status === 'declined' ? 'bg-red-200 text-red-700' :
                     status === 'interview' ? 'bg-blue-200 text-blue-700' :
                        ''
                  }`}>
                  {status}
               </p>

            </div>
            <div className="flex my-4 items-center gap-2">
               <button onClick={handleClick} className="px-2 font-bold text-grey500 transition-all rounded-md hover:text-white hover:bg-blue-500 py-1 bg-blue-200">Edit</button>
               <button onClick={handleDelete} className="px-2 font-bold text-red-800 transition-all rounded-md hover:text-white hover:bg-red-500 py-1 bg-red-200">Delete</button>
            </div>
         </div>
         <div></div>
      </section>
   )
}
JobCard.propTypes = {
   company: PropType.string,
   status: PropType.string,
   updatedAt: PropType.string,
   location: PropType.string,
   jobType: PropType.string,
   position: PropType.string,
   userLogo: PropType.string,
   handleDelete: PropType.func,
   handleClick: PropType.func,
}

export default JobCard
