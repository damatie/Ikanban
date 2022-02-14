import Layout from "../components/Layout";
import { getBoards,createTicketList,createTicket } from "../services/apiFactory";
import {
  DotsVerticalIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import CardItem from "../components/CardItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";

// Function to genrate random unique id for new ticket
function createGuidId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function Home() {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);

  // Get data on page load
  useEffect(() => {
      getBoards().then(res => {
        const result = res.data
       
        setBoardData(result)
      })
      setReady(true);
  }, []);

  // Function to handle onDragEnd
  const onDragEnd = (re) => {
    if (!re.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    );
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    );
    setBoardData(newBoardData);
  };

// Function to handle form submited
  const onTextAreaKeyPress = (e) => {
    if(e.keyCode === 13) //Enter
    {
      const val = e.target.value;
      if(val.length === 0) {
        setShowForm(false);
      }
      else {
        let boardId = e.target.attributes['data-id'].value;
        // Get data from form input
        const item = {
          id: createGuidId(),
          title: val,
          priority: 0,
          chat:0,
          attachment: 0,
        }
        
        let newBoardData = boardData;
        newBoardData[boardId].items.push(item);
        setBoardData(boardData);
        const outCome = boardData.filter((data, index) => index === parseInt(boardId))
         const newOutcome = outCome[parseInt(boardId)].items.map((itemList) =>{
           const resultData = itemList
         return  resultData
        }
        )

        // Get data from item and set in to the Item data
        const itemData = {
          name: "Task  to do",
          "default": 1,
          items:newOutcome
        }  
        createTicket(itemData)
        createTicketList(item)
        setShowForm(false);
        e.target.value = '';
      }
    }
  }

  //Function to close textarea
  const handleCancle = ()=>{
    setShowForm(false)
  }

  return (
    <Layout>
      <div className=" p-3 xl:p-10 flex flex-col h-screen">
        {/* Board header */}
        <div className="flex flex-initial justify-between">
          <div className="flex items-center">
            <h4 className="text-2xl font-bold text-gray-600">Project Board</h4>
          </div>
        </div>

        {/* Board columns */}
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className=" w-full  overflow-x-auto overflow-y-hidden">
              <div className=" w-full min-w-max grid grid-cols-4 gap-5 my-5">
              {boardData && boardData.map((board, bIndex) => {
                return (
                  <div key={board.name}>
                    <Droppable droppableId={bIndex.toString()}>
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <div
                            className={` pb-6 bg-gray-100 rounded-md shadow-md
                            flex flex-col relative overflow-hidden
                            ${snapshot.isDraggingOver && "bg-blue-100"}`}
                          >
                            <span
                              className="w-full h-1 bg-blue-700
                          absolute inset-x-0 top-0"
                            ></span>
                            <h4 className=" p-3 flex justify-between items-center mb-2">
                              <span className="text-xl text-gray-600 font-semibold">
                                {board.name} 
                              </span>
                              <DotsVerticalIcon className="w-5 h-5 text-gray-500" />
                            </h4>
                             
                            <div className="overflow-y-auto overflow-x-hidden h-auto"
                            style={{maxHeight:'calc(100vh - 290px)'}}>
                              {board.items.length > 0 &&
                                board.items.map((item, iIndex) => {
                                  return (
                                    <CardItem
                                      key={item.id}
                                      data={item}
                                      index={iIndex}
                                      className="m-3"
                                    />
                                  );
                                })}
                              {provided.placeholder}
                            </div>
                            { board.default === 1?<div className=" flex justify-center text-center">
                            {
                              showForm && selectedBoard === bIndex ? (
                                <div className="p-3 w-full">
                                  <textarea className="border-gray-300 rounded focus:ring-purple-400 w-full" 
                                  rows={3} placeholder="Task info then press enter" 
                                  data-id={bIndex}
                                  onKeyDown={(e) => onTextAreaKeyPress(e,)}
                                  />
                                  <span>
                                    <button onClick={ handleCancle}>Cancel</button>
                                  </span>
                                </div>
                              ): (
                                <button
                                  className="flex justify-center items-center mt-4 space-x-2 text-lg"
                                  onClick={() => {setSelectedBoard(bIndex); setShowForm(true);}}
                                >
                                  <span>Add task</span>
                                  <PlusCircleIcon className="w-5 h-5 text-gray-500" />
                                </button>
                              )
                            }
                            </div> : ''}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
              </div>
            </div>
          </DragDropContext>
        )}
      </div>
    </Layout>
  );
}
