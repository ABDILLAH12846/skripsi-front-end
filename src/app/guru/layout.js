"use client"

import Menu from '@/component/menu'
import { css } from '@/utils/stitches.config'
import React from 'react'
import { GlobalContext } from '@/app/layout';

export default function GuruLayout({ children }) {
  const { user } = React.useContext(GlobalContext)
  if (!user) {
    return <div>Loading...</div>;
  }
  console.log({user})
  const listMenuAdmin = React.useMemo(() => {
    if (user?.user?.jabatan === "guru wali kelas" ) {
      return [
        {
          title: "Profil",
          link: "/guru/profil"
        },
        {
          title: "Absensi Siswa",
          link: "/guru/absensi-siswa"
        },
        {
          title: "Nilai Siswa",
          link: "/guru/nilai-siswa"
        },
        {
          title: "Hafalan Siswa",
          link: "/guru/hafalan-siswa"
        },
        {
          title: "Rapor Siswa",
          link: "/guru/rapor-siswa"
        },
        {
          title: "Sikap Siswa",
          link: "/guru/sikap"
        },
      ]
    } else {
      return [
        {
          title: "Profil",
          link: "/guru/profil"
        },
        {
          title: "Nilai Siswa",
          link: "/guru/nilai-siswa"
        },
      ]
    }
  }, [])
  return (
    <div className={styles.container()}>
      <div>
        <Menu listLink={listMenuAdmin} />
      </div>
      <div className={styles.right()}>
        <h1 style={{margin: "20px 0",fontSize: 18}}>Selamat Datang Guru</h1>
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
