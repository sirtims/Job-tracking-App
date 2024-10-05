
import PropType from 'prop-types'

const AllJob = ({ handleChange, searchParams, handleClearFilters, error }) => {


   return (
      <section className="bg-gray-100  w-full">
         <form className="w-[80%] rounded-md border-t-[5px] border-t-primary500 pt-2 pb-4 mt-5 mx-auto bg-white">
            <h1 className=" ml-[10%] my-4 font-semibold text-3xl">Search Form</h1>
            {/* inputs */}
            <div className="inputs grid md:grid-cols-2 items-center  mx-auto w-[80%]">

               <div className="mx-2">
                  <label htmlFor="location">Search</label><br />
                  <input name="company" placeholder='search company...' value={searchParams.company} onChange={handleChange} className="border bg-primary50 rounded-md px-3 outline-primary200 h-9 my-2 w-full" type="text" />
               </div>
               <div className="mx-2">
                  <label htmlFor="status">Status</label><br />
                  <select name="status" value={searchParams.status} onChange={handleChange} className="w-full border px-3 my-2  bg-primary50 rounded-md  outline-primary200 h-9" id="status">
                     <option value="all">All</option>
                     <option value='pending'>Pending</option>
                     <option value="interview">Interview</option>
                     <option value="decline">Decline</option>
                  </select>
               </div>
               <div className="mx-2">
                  <label htmlFor="job-type">Job-Type</label><br />
                  <select name="jobType" onChange={handleChange} className="w-full border my-2 px-3 bg-primary50 rounded-md  outline-primary200 h-9" id="status">
                     <option value="all">All</option>
                     <option value='full-time'>Full-Time</option>
                     <option value='per-time'>Per-Time</option>
                     <option value='intern'>Intern</option>
                     <option value='remote'>Remote</option>
                  </select>
               </div>
               <div className="mx-2">
                  <label htmlFor="sort">Sort</label><br />
                  <select name="sort" className="w-full border my-2 px-3 bg-primary50 rounded-md  outline-primary200 h-9" id="status">
                     <option value="lates">latest</option>
                     <option value="oldest">oldest</option>
                     <option value="a-z">a-z</option>
                     <option value="z-a">z-a</option>
                  </select>
               </div>
               <div className="flex mx-2 p-0 gap-3">
                  <button onClick={handleClearFilters} type="submit" className="bg-primary500 mt-5 active:bg-primary500 w-full text-white h-9 hover:bg-redDark transition rounded-sm text-xl">Clear Filters</button>
               </div>
               <p className="text-red-600 my-3">{error}</p>

            </div>
         </form>
      </section>
   )
}
AllJob.propTypes = {
   handleChange: PropType.func,
   searchParams: PropType.object,
   handleClearFilters: PropType.func,
   error: PropType.string
}
export default AllJob
