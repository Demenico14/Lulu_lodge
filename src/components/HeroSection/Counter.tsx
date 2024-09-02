import React from 'react'
import CountUpNumber from '../CountUpNumber.tsx/CountUpNumber'

const Counter = () => {
  return (
    <div className=" flex justify-between items-center py-10 px-4 container mx-auto  ">
          <div className="flex gap-3 flex-col items-center justify-center  ">
          <p className="text-xs lg:text-xl text-center">Basic Suite</p>
          <CountUpNumber duration={8000} endValue={12} />
          </div>
          <div className="flex gap-3 flex-col items-center justify-center">
          <p className="text-xs lg:text-xl text-center">Luxury Suite</p>
          <CountUpNumber duration={8000} endValue={10} />
          </div>
          <div className="flex gap-3 flex-col items-center justify-center">
          <p className="text-xs lg:text-xl text-center">Family Suite</p>
          <CountUpNumber duration={8000} endValue={5} />
          </div>
        </div>
  )
}

export default Counter