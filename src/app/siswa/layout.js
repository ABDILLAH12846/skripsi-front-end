"use client"

import Menu from '@/component/menu'
import { css } from '@/utils/stitches.config'
import React from 'react'

export default function SiswaLayout({ children }) {
  const listMenuSiswa = React.useMemo(() => {
    return [
      {
        title: "Profil",
        link: "/siswa/profile"
      },
      {
        title: "Absensi",
        link: "/siswa/absensi"
      },
      {
        title: "Nilai",
        link: "/siswa/nilai"
      },
      {
        title: "Hafalan",
        link: "/siswa/hafalan"
      },
      {
        title: "Rapor",
        link: "/siswa/rapor"
      },
    ]
  }, [])
  return (
    <div className={styles.container()}>
      <div>
        <Menu listLink={listMenuSiswa} />
      </div>
      <div className={styles.right()}>
        <h1 style={{margin: "20px 0",fontSize: 18}}>Selamat Datang Siswa</h1>
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
