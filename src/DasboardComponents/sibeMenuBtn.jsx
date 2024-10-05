import PropType from 'prop-types'

const SibeMenuBtn = ({ name, url, handleToggle, setISActiveSideBar }) => {
   const handleBtnClick = () => {
      handleToggle()
      setISActiveSideBar(false)
   }
   return (

      <button onClick={handleBtnClick} className="flex justify-center w-[100%] gap-3 hover:bg-gray-50 hover:pl-5 transition-all duration-200 py-5 bg-white">
         <img className="h-7" src={url} alt="" />
         <p className="font-[600] text-gray-700 text-md">{name}</p>
      </button>

   )
}
SibeMenuBtn.propTypes = {
   name: PropType.string,
   url: PropType.string,
   handleToggle: PropType.func,
   setISActiveSideBar: PropType.func
}
export default SibeMenuBtn
