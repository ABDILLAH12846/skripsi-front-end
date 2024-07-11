"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { DataTableRapor } from '@/component/raport';

export default function page() {
    const searchParams = useSearchParams();
    const nisn = searchParams.get("nisn")
    const semester = searchParams.get("semester")

    const [data, setData] = React.useState(null)

    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:8000/raport/${nisn}?semester=${semester}`);
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
                <DataTableRapor data={data}/>
                :
                null
            }
        </div>
    )
}
