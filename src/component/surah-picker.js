import { surah } from '@/const/const'
import { Select } from 'antd'
import React from 'react'

export default function SurahPicker() {
  return (
    <div>
        <Select options={surah.map((val) => ({label: val.surah, value: val.surah}))} />
    </div>
  )
}
