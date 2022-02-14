import { useRouter } from 'next/router'
import { useState,useEffect, useLayoutEffect } from 'react'
import { getOneTicket } from "../services/apiFactory";
import Layout from "../components/Layout";
import {
  ChatAlt2Icon,
  PaperClipIcon,
  XCircleIcon,
  ShareIcon
} from "@heroicons/react/outline";

const view = () => {
  const[ticketData, setTicketData] = useState(null)
  const[error, setError] = useState(null)
  const router = useRouter()
  const {id} = router.query

  async function getTicket(tId){
    await 
    getOneTicket(tId).then(res => {
      const result = res.data
      setTicketData(result)
      console.log(result)
      
    }).catch(error => {
      if(error){
        setError('Invalid ticket id')
      }
  });
  }
  // Load Ticket data for one Ticket
  useEffect(() => {
    if(id ){
      getTicket(id)
    }
    
}, [id]);

  return (
    <Layout>
      <div className=' w-full  bg-black bg-opacity-60 top-0 bottom-0 left-0 h-full fixed px-10'>
        <div className=' mt-40 mx-auto w-full md:w-6/12 lg:w-3/12 bg-white py-5 px-3 shadow-md rounded-md'>
        <h4 className=' font-semibold w-full text-center border-b pb-3 mb-3'>Ticket</h4>
        <span>
        {ticketData && <div
          className="bg-white rounded-md p-3 m-3 mt-0 last:mb-0"
        >
          <label
            className={`bg-gradient-to-r
              px-2 py-1 rounded text-white text-sm
              ${
                ticketData.priority === 0
                  ? "bg-blue-400"
                  : ticketData.priority === 1
                  ? " bg-green-400"
                  : "bg-red-400"
              }
              `}
          >
      

            {ticketData.priority === 0
              ? "Low Priority"
              : ticketData.priority === 1
              ? "Medium Priority"
              : "High Priority"}
          </label>
          <h5 className="text-md my-3 text-lg leading-6">{ticketData.title}</h5>
          <div className="flex justify-between">
            <div className="flex space-x-2 items-center">
              <span className="flex space-x-1 items-center">
                <ChatAlt2Icon className="w-4 h-4 text-gray-500" />
                <span>{ticketData.chat}</span>
              </span>
              <span className="flex space-x-1 items-center">
                <PaperClipIcon className="w-4 h-4 text-gray-500" />
                <span>{ticketData.attachment}</span>
              </span>
              <span className="flex space-x-1 items-center cursor-pointer font-medium text-sm">
              </span>
            </div>

          </div>
        </div>}
        </span>
        </div>
        
      </div>
    </Layout>
  )
}

export default view 