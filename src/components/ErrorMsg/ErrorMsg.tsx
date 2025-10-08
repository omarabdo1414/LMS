import React from 'react'
type TErrorMsgProps ={
    msg:string
}
export default function ErrorMsg({msg}:TErrorMsgProps) {
  return (
    <div>
      <h6 className="text-error">{msg}</h6>
    </div>
  )
}
