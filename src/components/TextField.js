import React from 'react'
import { TextField as MaterialTextField } from '@material-ui/core'

const mapType = type => {
  if (type === 'positiveNumber') {
    return 'number'
  }
  return type
}

const handleChange = (e, type, onChange) => {
  if (type === 'positiveNumber') {
    const value = e.target.value
    if (value) {
      e.target.value = Math.max(0, value)
    }
  }
  onChange(e)
}

const TextField = ({ type, onChange, ...props }) =>
  <MaterialTextField {...props}
    type={mapType(type)}
    onChange={e => handleChange(e, type, onChange)}
  />

export default TextField