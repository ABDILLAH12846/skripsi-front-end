"use client"

import ButtonSessionForm from '@/component/button-session-form'
import TingkatanSelect from '@/component/tingkatan-select';
import { Input } from '@/components/ui/input'
import { customAlphabet } from 'nanoid';
import { useRouter } from 'next/navigation'
import React from 'react'

export default function page() {
    const nanoid = customAlphabet('0123456789', 4);
    const [value, setValue] = React.useState("")
    const [tingkatan, setTingkatan] = React.useState(null)
    const router = useRouter()
    const add = async () => {
        try {
            const result = await fetch("http://localhost:8000/matapelajaran", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id_matapelajaran: nanoid(), nama: value, id_tingkatan: tingkatan})
            })
            console.log({result})
        } catch (e) {
            console.log(e)
        } finally {
            router.back()
        }
    }
    console.log({ value })
  return (
    <div>
        <Input onChange={(val) => setValue(val.target.value)}/>
        <TingkatanSelect  value={tingkatan} onChange={(val) => setTingkatan(val.value)}/>
        <ButtonSessionForm onClick={add}/>
    </div>
  )
}
