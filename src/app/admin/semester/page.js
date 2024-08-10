"use client"

import React from 'react'
import { DataTableDemo } from '@/component/table'
import { Button } from '@/components/ui/button'
import { css } from '@/utils/stitches.config'
import { useRouter, usePathname } from 'next/navigation'

export default function page() {
    const router = useRouter();
    const path = usePathname();
    const header = React.useMemo(() => {
        return ["No","Semester","NISN","Nama","Tahun Ajaran", "NO Kelas",]
      }, [])
    const [data, setData] = React.useState(null);
    
    React.useEffect((val) => {
        async function fetchData() {
            const res = await fetch('http://localhost:8000/semester');
            const data = await res.json();
            setData(data.map((val, idx) => ({
                ...val,
                No: idx + 1,
                Semester: val.semester,
                "NO Kelas": val.no_kelas,

            })));
          }
      
          fetchData();
    }, [])
    
  return (
    <div>
      <div className={styles.header()}>
        <div className={styles.title()}>Daftar Semester SMA IT AL IZZAH</div>
        <Button assChild className={styles.btn()} onClick={() => router.push(`${path}/add`)}>Tambah</Button>
      </div>
      <div>
        {
          data
            ?
            <DataTableDemo data={data} routing={() => console.log("hallo")} header={header} />
            :
            null
        }
      </div>
    </div>
  )
}

const styles = {
    header: css({
      width: "100%",
      // backgroundColor: "AliceBlue",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px"
    }),
    title: css({
      width: "50%",
      borderBottom: "2px solid #FDD100",
      padding: "10px 0",
      fontWeight: "bold"
    }),
    btn: css({
      backgroundColor: "ActiveText"
    })
  }
