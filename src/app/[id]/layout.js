"use client"

import Menu from '@/component/menu'
import { css } from '@/utils/stitches.config'
import React from 'react'

export default function GuruLayout({ children }) {
  const listMenuAdmin = React.useMemo(() => {
    return [
      {
        title: "Profil",
        link: "/123456/profil"
      },
      {
        title: "Absensi Siswa",
        link: "/123456/absensi-siswa"
      },
      {
        title: "Nilai Siswa",
        link: "/123456/nilai-siswa"
      },
      {
        title: "Hafalan Siswa",
        link: "/123456/mata-pelajaran"
      },
      {
        title: "Rapor Siswa",
        link: "/123456/kenaikan-kelas"
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
