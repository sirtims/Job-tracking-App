import StatsCard from "./statsCard"
import PropType from 'prop-types'
import { useState, useEffect } from 'react'
import { GetJobs } from "./getAllJobs"

const Stats = ({ searchParams }) => {
   let [pendingJobCount, setPendingJobCount] = useState(0)
   let [interviewJobCount, setInterviewJobCount] = useState(0)
   let [declinedJobCount, setDeclinedJobCount] = useState(0)

   useEffect(() => {
      const fetch = async () => {
         const { jobs } = await GetJobs(searchParams)
         console.log(searchParams);
         let pendingCount = 0;
         let interviewCount = 0;
         let declinedCount = 0;
         jobs.forEach(job => {
            if (job.status === 'pending') {
               pendingCount++
            }
            else if (job.status === 'interview') {
               interviewCount++
            }
            else {
               declinedCount++
            }
         })
         setPendingJobCount(pendingCount)
         setInterviewJobCount(interviewCount)
         setDeclinedJobCount(declinedCount)
      }
      fetch()
   }, [searchParams])


   return (
      <section className="w-[85%] md:w-[90%] justify-center flex flex-wrap mx-auto ">
         <StatsCard count={pendingJobCount} text={'PENDING APPLICATIONS'} url={'/images/pending.svg'} />
         <StatsCard count={interviewJobCount} text={'INTERVIEWS SCHEDULED'} url={'/images/interview.svg'} />
         <StatsCard count={declinedJobCount} text={'JOBS DECLINED'} url={'/images/declined.svg'} />
      </section>
   )
}

Stats.propTypes = {
   searchParams: PropType.object
}
export default Stats
