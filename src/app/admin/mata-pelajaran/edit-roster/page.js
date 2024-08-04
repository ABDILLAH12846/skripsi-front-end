"use client"

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { css } from '@/utils/stitches.config'
import { Button } from '@/components/ui/button'
import MataPelajaranForm from '@/component/new-mata-pelajaran-form'

export default function page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const idRoster = searchParams.get("idRoster")
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:8000/roster/${idRoster}`);
            const data = await res.json();
            setData(data[0]);
        }

        fetchData();
    }, [idRoster])

    const handleDelete = async () => {
        try {

            const resp = await fetch(`http://localhost:8000/roster/${idRoster}`, {
                method: 'DELETE'
            })
        } finally {
            router.back()
        }
    }

    return (
        <div>
            {
                data
                    ?
                    <>
                        <div className={styles.header()}>
                            <div className={styles.title()}>Daftar Mata Pelajaran SMA IT AL IZZAH</div>
                            <Button assChild variant="destructive" className={styles.btn()} onClick={handleDelete}>Hapus</Button>
                        </div>
                        <MataPelajaranForm data={data} action={"edit"} />
                    </>
                    :
                    null
            }
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
