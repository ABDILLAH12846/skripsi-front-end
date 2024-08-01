"use client"

import React from 'react'
import { useSearchParams , useRouter } from 'next/navigation'
import OrangTuaForm from '@/component/orangtua-form';
import DeleteButton from '@/component/delete-button-dialog';

export default function page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const idOrtu = searchParams.get("idOrtu")
    const statusOrtu = searchParams.get("status")

    const [data, setData] = React.useState(null);
    const [dataSiswa, setDataSiswa] = React.useState(null);
  
    React.useEffect(() => {
      async function fetchData() {
        const res = await fetch(`http://localhost:8000/orangtua/${idOrtu}?status=${statusOrtu}`);
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

    const handleDelete = async () => {
      try{
  
        await fetch(`http://localhost:8000/orangtua/${idOrtu}?status=${statusOrtu}`, {
          method: 'DELETE'
        })  
      } finally {
        router.back()
      }
    }
  return (
    <div>
        {
            data && dataSiswa
            ?
            <>
            <div className='flex justify-end'><DeleteButton  handleDelete={handleDelete}/></div>
            <OrangTuaForm data={data} dataSiswa={dataSiswa} />
            </>
            :
            null
        }
    </div>
  )
}
