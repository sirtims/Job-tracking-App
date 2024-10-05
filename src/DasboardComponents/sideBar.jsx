import SibeMenuBtn from "./sibeMenuBtn"
import PropType from 'prop-types'

const SideBar = ({ fixed, handleToggle, isActiveSideBar, setISActiveSideBar }) => {
   return (
      <section className={` min-h-[100vh] transition-all bg-white ${!isActiveSideBar ? 'left-[-200px]' : 'left-0'}  md:w-[300px] md:${isActiveSideBar ? 'block' : 'hidden'} md:opacity-100 md:translate-x-0 py-5 top-0 left-0  w-[200px] ${fixed}`}>
         {/* logo */}
         <div className="font-[Sans-Serif] mx-auto w-fit logo_wrapper items-center space-x-2 flex">
            <div className="rounded-md h-[3em] flex items-center justify-center w-[3em] bg-primary500">
               <h1 className="text-white h-fit text-4xl p-0 m-0 font-bold">J</h1>
            </div>
            <h4 className="text-2xl text-primary500 font-bold tracking-[0.3em]">obster</h4>
         </div>
         {/* side-menu */}
         <div className="mt-10">
            <SibeMenuBtn setISActiveSideBar={setISActiveSideBar} handleToggle={() => handleToggle('Stats')} name={'Stats'} url={'/images/stats.svg'} />
            <SibeMenuBtn setISActiveSideBar={setISActiveSideBar} handleToggle={() => handleToggle('AllJobs')} name={'All Jobs'} url={'/images/search-jobs.svg'} />
            <SibeMenuBtn setISActiveSideBar={setISActiveSideBar} handleToggle={() => handleToggle('AddJob')} name={'Add Job'} url={'/images/add-job.svg'} />
            <SibeMenuBtn setISActiveSideBar={setISActiveSideBar} handleToggle={() => handleToggle('Profile')} name={'Profile'} url={'/images/profile-23.svg'} />
         </div>
      </section>
   )
}
SideBar.propTypes = {
   fixed: PropType.string,
   handleToggle: PropType.func,
   isActiveSideBar: PropType.bool,
   setISActiveSideBar: PropType.func

}
export default SideBar
