"use client"

import { Select } from 'antd'
import React from 'react'

export default function SikapSelect({defaultValue,value, onChange}) {
    const options = [
        {
            label: "Sangat Baik",
            value: "SB",
        },
        {
            label: "Baik",
            value: "B",
        },
        {
            label: "Cukup",
            value: "C",
        },
    ]
  return (
    <>
        <Select style={{width: "100%"}} options={options} size='large' defaultValue={defaultValue ? defaultValue : ""} onChange={onChange} value={value} />
    </>
  )
}
