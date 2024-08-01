import React from 'react'

function DashboardChatCard({Receiver ,Message,Avatar , id} ) {
  return (
    <div className="card bg-base-100 w-full m-1 shadow-xl">
                            
    <div className="card-body flex flex-row flex-nowrap items-center p-2  rounded border">
    <img
                            src={Avatar}
                            className="w-10 h-10 rounded-lg shadow-lg"
                            alt="Avatar" />
    <div className=''>
    <h2 className="card-title text-sm">
      
      {Receiver}</h2>
<p className='text-ellipsis text-sm'>{Message}</p>
    </div>  
    </div>
</div>
  )
}

export default DashboardChatCard