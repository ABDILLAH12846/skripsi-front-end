"use client"

import KelasForm from '@/component/kelas-form'
import { css } from '@/utils/stitches.config'
import DeleteButton from '@/component/delete-button-dialog';
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function Edit({ params }) {
  const router = useRouter();
  const [data, setData] = React.useState(null);
  const [dataSiswa, setDataSiswa] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:8000/kelas/${params.id}`);
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

      await fetch(`http://localhost:8000/kelas/${data.id_kelas}`, {
        method: 'DELETE'
      })

    //   await fetch("http://localhost:8000/siswa", {
    //     method: "PUT",
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       id_kelas: data.id_kelas,
    //       nisn_list: data.daftar_siswa.map((val) => ({ nisn: val.nisn, kelas: false }))
    //     })
    // })

    } finally {
      router.back()
    }
  }


  return (
    <div>
      {/* <KelasForm id={params.id} /> */}
      {/* <p>{params.id}</p> */}
      {
        data && dataSiswa
          ? <>
            <div className={styles.header()}>
              <div className={styles.title()}>Data Siswa : {data?.nama_kelas}</div>
              <div className={styles.btnBox()}>
                <DeleteButton handleDelete={handleDelete} />
              </div>
            </div>
            <KelasForm data={data} dataSiswa={dataSiswa} />
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
