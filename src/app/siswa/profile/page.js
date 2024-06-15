"use client"

import SiswaProfile from '@/component/siswa-profile'
import { DataTableDemo } from '@/component/table'
import { Button } from '@/components/ui/button'
import { css } from '@/utils/stitches.config'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'

export default function Profile() {
    const data = {
        NIK:
            "1219011011020005",
        nisn:
            "201111217",
        nama:
            "Abdillah Zikri Alhusni",
        "Tempat Tanggal Lahir":
            "Pematang Cengkering, 10 November 2002",
        Agama:
            "Islam",
        "Jenis Kelamin":
            "Laki- laki",
        Alamat:
            "Dusun Jaya desa Pematang Cengkering, MEDANG DERAS, KAB.BATU BARA",
        "Nomor Handphone":
            "089620123823",
        "Email Mikroskil":
            "201111217@students.mikroskil.ac.id"
    }
    return (
        <div>
            <div className={styles.header()}>
                <div className={styles.title()}>Profil</div>
            </div>
            <SiswaProfile data={data} />
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
    }),
    content: css({
        display: "flex",
        gap: 30,
    }),
    leftProfile: css({
        border: "1.5px solid #124A4B",
        display: "flex",
        flexDirection: "column",
        padding: 20,
        borderRadius: 20,
        gap: 20,
        width: "20%"
    }),
    leftProfileContent: css({
        display: "flex",
        flexDirection: "column",
        gap: 10,
    }),
    listValue: css({
        display: "flex",
        flexDirection: "column"
    }),
    righContent: css({
        display: "flex",
        flexDirection: "column",
        gap: 10,
    })
}
