import React from 'react'
import { TextField as MaterialTextField } from '@material-ui/core'

const mapType = type => {
  if (type === 'positiveNumber' || type === 'numberBetween') {
    return 'number'
  }
  return type
}

const handleChange = (e, type, onChange) => {

  const value = e.target.value

  if (type) {

    const [parsedType, params] = type.split(':')

    if (parsedType === 'positiveNumber' && value) {
      e.target.value = Math.max(0, value)
    }

    if (parsedType === 'numberBetween') {

      const [min, max] = params.split('')

      if (value < min) {
        e.target.value = min
      }

      if (value > max) {
        e.target.value = max
      }
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