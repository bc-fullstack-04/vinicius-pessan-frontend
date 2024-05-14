import React from 'react'
import "./style.css"

interface Props {
  children: React.ReactNode,
  type: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input2({ children, type, onChange } : Props) {
  return (
    <>
      <label htmlFor={type} className="text-sm font-normal label">{children}</label>
      <input type={type} onChange={onChange} className="input bg-zinc-50 p-2 rounded-md ring-1 ring-zinc-900/20 mb-3" />
    </>
  )
}
