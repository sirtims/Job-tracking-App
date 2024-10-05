import axios from "axios";


export const GetJobs = async (searchParams) => {
   const token = localStorage.getItem('token')
   let url = new URL('https://jobs-api-20oi.onrender.com/api/v1/jobs')
   Object.keys(searchParams).forEach(key => {
      if (searchParams[key]) {
         const formattedValue = searchParams[key].replace(/\s+/g, '-');
         url.searchParams.append(key, formattedValue)
      }
      console.log(url.toString());
   })

   try {
      const { data: { jobs } } = await axios.get(url, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      })

      return { jobs, error: '' };

   } catch (error) {
      let errorMsg = 'An error occurred';
      if (error.message === 'Network Error') {
         errorMsg = 'Network Error: Bad network connection';
      } else if (error.response && error.response.data.msg) {
         errorMsg = error.response.data.msg;
      }
      return { jobs: [], error: errorMsg };
   }
}