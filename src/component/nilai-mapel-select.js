"use cient"

import React from 'react'
import { MenuSelect } from './select';
import { Select } from 'antd';

export default function NilaiMapelSelect({ onChange, defaultValue, data }) {
    return (
        <div>
            {
                data
                    ?
                    <Select defaultValue={defaultValue ? defaultValue : null} placeholder="Pilih Mata Pelajaran" style={{width: "100%"}} labelInValue label="Pilih Mata Pelajaran" options={data} onChange={onChange} size="large" />
                    :
                    null
            }
        </div>
    )
}
