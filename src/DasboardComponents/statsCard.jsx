import PropTypes from 'prop-types'

const StatsCard = ({ count, text, url }) => {
   return (
      <section className="h-[200px] py-5 m-3 w-[400px] md:w-[300px] shadow-md rounded-md bg-white">
         <div className=" w-[85%] mx-auto">
            <div className="flex items-start justify-between">
               <h1 className={`${text === 'PENDING APPLICATIONS' ? 'text-orange-300' :
                  text === 'INTERVIEWS SCHEDULED' ? 'text-blue-600' :
                     text === 'JOBS DECLINED' ? 'text-red-600' : ''
                  } text-7xl md:text-6xl h-fit p-0 m-0 `}>{count}</h1>
               <div className={`mt-2 rounded-md w-20 flex items-center bg-yellow-200 justify-center h-20 ${text === 'PENDING APPLICATIONS' ? 'bg-yellow-200 ' :
                  text === 'INTERVIEWS SCHEDULED' ? 'bg-blue-100' :
                     text === 'JOBS DECLINED' ? 'bg-red-100' : ''
                  }`}>
                  <img className="w-10" src={url} alt="" />
               </div>
            </div>
            <h3 className="text-2xl md:text-xl text-grey400 mt-10">{text}</h3>
         </div>
      </section>
   )
}
StatsCard.propTypes = {
   url: PropTypes.string,
   text: PropTypes.string,
   count: PropTypes.number
}
export default StatsCard
