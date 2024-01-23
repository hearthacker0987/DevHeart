import React from 'react'
import { TailSpin } from 'react-loader-spinner'
function Loader({text}) {
  return (
    <div className='d-flex flex-column align-items-center w-100' style={{marginTop:"80px"}}>
        <TailSpin 
            width={80}
            height={80}
            radius={1}
            color="rgba(255, 0, 0, 0.922)"
        />
        <h4 className='mt-3'>Loading {text}...</h4>
    </div>
  )
}

export default Loader
