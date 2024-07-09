"use client"

import KelasForm from '@/component/kelas-form'
import OrangTuaForm from '@/component/orangtua-form';
import React from 'react'

export default function Add() {

  const [dataSiswa, setDataSiswa] = React.useState(null);

    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch('http://localhost:8000/siswa');
            const temp = await res.json();
            setDataSiswa(temp);
        }

        fetchData();
    }, []);

  return (
    <div>
        <OrangTuaForm dataSiswa={dataSiswa}/>
    </div>
  )
}
