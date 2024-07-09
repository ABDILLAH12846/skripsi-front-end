"use cient"

import React from 'react'
import { MenuSelect } from './select';
import { Select } from 'antd';

export default function NilaiKelasSelect({ onChange, defaultValue, data }) {
    return (
        <div>
            {
                data
                    ?
                    <Select defaultValue={defaultValue ? defaultValue : null} placeholder="Pilih Kelas" style={{width: "100%"}} labelInValue label="Pilih Kelas" options={data} onChange={onChange} size="large"/>
                    :
                    null
            }
        </div>
    )
}
