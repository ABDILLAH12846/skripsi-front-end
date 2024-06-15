"use client"

import DataGuruForm from '@/component/data-guru-form'
import DeleteButton from '@/component/delete-button-dialog';
import GuruProfile from '@/component/guru-profile';
import { Button } from '@/components/ui/button'
import { css } from '@/utils/stitches.config'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function Edit({params}) {
  const { id } = params;
  const router = useRouter();
  const path = usePathname();
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:8000/guru/${id}`);
      const data = await res.json();
      setData(data);
    }

    fetchData();
  }, []);

  const handleDelete = async () => {
    try{

      const resp= await fetch(`http://localhost:8000/guru/${id}`, {
        method: 'DELETE'
      })
    } finally {
      router.back()
    }
  }

  return (
    <div>
      <div className={styles.header()}>
        <div className={styles.title()}>Data Guru : {data?.nama}</div>
        <div className={styles.btnBox()}>
          <DeleteButton handleDelete={handleDelete}/>
          <Button assChild className={styles.btn()} onClick={() => router.push(`${path}/${data?.nip}`)}>Edit</Button>
        </div>
      </div>
      {
        data ? <GuruProfile data={data} /> : <p>LOading</p>
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
    marginBottom: 20,
  }),
  title: css({
    width: "50%",
    borderBottom: "2px solid #FDD100",
    padding: "10px 0",
    fontWeight: "bold"
  }),
  btn: css({
    backgroundColor: "ActiveText"
  }),
  btnBox: css({
    display: "flex",
    gap: 10,
  })
}
