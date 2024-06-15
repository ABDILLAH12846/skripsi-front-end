"use client"

import Menu from '@/component/menu'
import { css } from '@/utils/stitches.config'
import React from 'react'

export default function AdminLayout({ children }) {
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
