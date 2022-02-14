import { AxiosHost } from './axiosGlobal';

// Get Boards
export const getBoards = () =>{
  const url =`/boards`
  return AxiosHost.get(url)
}

// Get Ticket
export const getOneTicket = (id) =>{
  const url =`/tickets/${id}`
  return AxiosHost.get(url)
}


// Create Ticket for Board and Ticket List
export const createTicket= (payload) =>{
  const  url =`/boards/1`
  return AxiosHost.put(url,payload)
}
export const createTicketList= (payload) =>{
  const  url =`/tickets`
  return AxiosHost.post(url,payload)
}


