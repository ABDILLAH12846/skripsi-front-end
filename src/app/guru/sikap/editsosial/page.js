"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'
import SosialForm from '@/component/sosial-form';

export default function page() {
    const searchParams = useSearchParams();
    const nisn = searchParams.get("nisn")
    const semester = searchParams.get("semester")
    const kelas = searchParams.get("kelas")

    const [data, setData] = React.useState(null)

    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:8000/sosial?nisn=${nisn}&semester=${semester}&no_kelas=${kelas}`);
            const data = await res.json();
            setData(data);
        }

        fetchData();
    }, [nisn, semester])

    console.log({ nisn, semester, data })
    return (
        <div>
            {
                data
                ?
                <SosialForm data={data} no_kelas={kelas} semester={semester} nisn={nisn}/>
                :
                null
            }
        </div>
    )
}
