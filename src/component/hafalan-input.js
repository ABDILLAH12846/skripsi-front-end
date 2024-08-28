"use client"

import React from 'react'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { customAlphabet } from 'nanoid';
import ButtonSessionForm from './button-session-form';
import { InputNumber, Select } from 'antd';
import { surah } from '@/const/const';
import { css } from '@/utils/stitches.config';

export default function HafalanInput({ data, submit }) {
    console.log({ data })
    const dataSurah = data?.hafalan.split(" ayat ")
    console.log({ dataSurah })
    const nanoid = customAlphabet('0123456789', 4);
    const [suroh, setSuroh] = React.useState(dataSurah[0] ? dataSurah[0] : surah[0].surah)
    const [ayat, setAyat] = React.useState(dataSurah[1] ? dataSurah[1] : 1)
    const [status, setStatus] = React.useState(data?.status ? data?.status : "lanjut")
    const [keterangan, setKeterangan] = React.useState(data?.keterangan ? data?.keterangan : "Lancar")
    console.log(suroh.length, surah[2].surah.length)
    const statusOptions = [
        {
            label: "Lanjut",
            value: "lanjut",
        },
        {
            label: "Ulang",
            value: "ulang",
        }
    ];

    const add = async () => {
        try {
            const result = await fetch("http://localhost:8000/hafalan", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_hafalan: nanoid(),
                    nisn: data.nisn,
                    bulan: data.bulan,
                    minggu: data.minggu,
                    hafalan: `${suroh} ayat ${ayat}`,
                    no_kelas: data.no_kelas,
                    keterangan,
                    status,

                })
            })
        } catch (e) {
        }
    }

    const edit = async () => {
        try {
            await fetch(`http://localhost:8000/hafalan/${data?.id_hafalan}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nisn: data.nisn,
                    bulan: data.bulan,
                    minggu: data.minggu,
                    hafalan: `${suroh} ayat ${ayat}`,
                    keterangan,
                    status,

                })
            })
        } catch (e) {
            console.log({ e })
        }
    }

    React.useEffect(() => {
        if (submit) {
            if (data?.id_hafalan) {
                edit()
            } else {
                add()
            }
        }
    }, [submit])

    console.log({ suroh: `${suroh} ${ayat}` })

    return (
        <div>
            <Label>{data?.label}</Label>
            <div className={styles.container()}>
                <div className={styles.surah()}>
                    <span>Surah</span>
                    <Select style={{ width: "100%" }} size='large' defaultValue={suroh} options={surah.map((val) => ({ label: val.surah, value: val.surah }))} onChange={(val) => setSuroh(val)} />
                </div>
                <div className={styles.ayat()}>
                    <span>Ayat</span>
                    <InputNumber style={{ width: 200 }} size='large' min={1} max={suroh ? surah.find((val) => val.surah === suroh).ayat : 10} onChange={(val) => setAyat(val)} defaultValue={ayat} />
                </div>
                <div className={styles.ayat()}>
                    <span>Status</span>
                    <Select style={{ width: "100%" }} size='large' value={status} options={statusOptions} onChange={(val) => setStatus(val)} />
                </div>
            </div>
            <div className={styles.container()}>
                <div className={styles.surah()}>
                    <span>Keterangan</span>
                    <Input value={keterangan} onChange={(val) => setKeterangan(val.target.value)}/>
                </div>
            </div>
            {/* <ButtonSessionForm onClick={() => data?.id_hafalan ? edit() : add()} /> */}
        </div>
    )
}

const styles = {
    container: css({
        width: "100%",
        // backgroundColor: "ActiveText",
        display: "flex",
        gap: 10,
        marginBottom: 10,
    }),
    surah: css({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 10,
    }),
    ayat: css({
        width: 200,
        display: "flex",
        flexDirection: "column",
        gap: 10,
    })
}
