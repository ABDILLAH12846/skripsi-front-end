"use client"

import Menu from '@/component/menu'
import { css } from '@/utils/stitches.config'
import React from 'react'
import { GlobalContext } from '../layout'
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const {user} = React.useContext(GlobalContext)
  const router = useRouter();
  React.useEffect(() => {
    if (user) {
      if (user.role === "guru"){
        router.push("/guru/profil");
      } else if (user.role === "siswa"){
        router.push("/siswa/profil");
      }
    } 
  }, [])
  const listMenuAdmin = React.useMemo(() => {
    return [
      {
        title: "Data Guru",
        link: "/admin/data-guru"
      },
      {
        title: "Data Siswa",
        link: "/admin/data-siswa"
      },
      {
        title: "Orang Tua",
        link: "/admin/orang-tua"
      },
      {
        title: "Kelas",
        link: "/admin/kelas"
      },
      {
        title: "Mata Pelajaran",
        link: "/admin/mata-pelajaran"
      },
      {
        title: "Kenaikan Kelas",
        link: "/admin/kenaikan-kelas"
      },
      {
        title: "Alumni",
        link: "/admin/alumni"
      },
      {
        title: "Tahun Ajaran",
        link: "/admin/tahun-ajaran"
      },
      {
        title: "Tingkatan",
        link: "/admin/tingkatan"
      },
      {
        title: "Kurikulum",
        link: "/admin/kurikulum"
      },
      {
        title: "Semester",
        link: "/admin/semester"
      },
    ]
  }, [])
  return (
    <div className={styles.container()}>
      <div>
        <Menu listLink={listMenuAdmin} />
      </div>
      <div className={styles.right()}>
        <h1 style={{margin: "20px 0",fontSize: 18}}>Selamat Datang Admin</h1>
        <div className={styles.content()}>
        {children}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: css({
    width: "100%",
    display: "flex",
    height: "100vh",
  }),
  right: css({
    padding: 30,
    width: "100%",
    overflowY: "scroll",
  }),
  content: css({
    width: "100%",
  })
}
