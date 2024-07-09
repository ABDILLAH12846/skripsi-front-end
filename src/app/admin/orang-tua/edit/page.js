"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'
import OrangTuaForm from '@/component/orangtua-form';

export default function page() {
    const searchParams = useSearchParams();
    const idOrtu = searchParams.get("idOrtu")

    const [data, setData] = React.useState(null);
    const [dataSiswa, setDataSiswa] = React.useState(null);
  
    React.useEffect(() => {
      async function fetchData() {
        const res = await fetch(`http://localhost:8000/orangtua/${idOrtu}`);
        const data = await res.json();
        setData(data);
      }
      async function fetchDataSiswa() {
        const res = await fetch('http://localhost:8000/siswa');
        const temp = await res.json();
        setDataSiswa(temp);
      }
  
  
      fetchData();
      fetchDataSiswa();
    }, []);
  return (
    <div>
        {
            data && dataSiswa
            ?
            <OrangTuaForm data={data} dataSiswa={dataSiswa} />
            :
            null
        }
    </div>
  )
}
