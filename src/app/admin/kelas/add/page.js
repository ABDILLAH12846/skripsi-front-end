"use client"

import KelasForm from '@/component/kelas-form'
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
        <KelasForm dataSiswa={dataSiswa}/>
    </div>
  )
}
