"use client"

import ButtonSessionForm from '@/component/button-session-form'
import DeleteButton from '@/component/delete-button-dialog';
import TingkatanSelect from '@/component/tingkatan-select';
import { Input } from '@/components/ui/input'
import { data } from 'autoprefixer';
import { customAlphabet } from 'nanoid';
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function page() {
    const nanoid = customAlphabet('0123456789', 4);
    const searchParams = useSearchParams();
    const idMapel = searchParams.get("idMapel")
    const [data, setData] = React.useState(null);
    const [value, setValue] = React.useState("")
    const [tingkatan, setTingkatan] = React.useState(null);
    const router = useRouter()
    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:8000/matapelajaran/${idMapel}`);
            const data = await res.json();
            setData(data);
            setValue(data[0].nama)
            setTingkatan(data[0].id_tingkatan)
        }

        fetchData();
    }, [idMapel]);
    const handleDelete = async () => {
        try{
    
          await fetch(`http://localhost:8000/matapelajaran/${idMapel}`, {
            method: 'DELETE'
          })  
        } finally {
          router.back()
        }
      }
    console.log({dataNI: data})
    const edit = async () => {
        try {
            const result = await fetch(`http://localhost:8000/matapelajaran/${idMapel}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nama: value, id_tingkatan: tingkatan })
            })
            console.log({ result })
        } catch (e) {
            console.log(e)
        } finally {
            router.back()
        }
    }
    console.log({ value })
    return (
        <div>
            {
                data
                    ?
                    <>
                        <div className='flex justify-end'><DeleteButton  handleDelete={handleDelete}/></div>
                        <Input onChange={(val) => setValue(val.target.value)} value={value}/>
                        <TingkatanSelect value={tingkatan} onChange={(val) => setTingkatan(val.value)} />
                        <ButtonSessionForm onClick={edit} />
                    </>
                    :
                    null
            }
        </div>
    )
}
