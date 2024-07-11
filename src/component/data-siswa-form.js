"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { css } from '@/utils/stitches.config'
import { useRouter } from 'next/navigation'
import ButtonSessionForm from './button-session-form'
import { Select } from 'antd'

const formSchema = z.object({
    NIPD: z.string(),
    nisn: z.string(),
    nama: z.string().min(8, {
        message: "NIP harus memiliki 8 karakter"
    }),
    email: z.string(),
    jenisKelamin: z.string(),
    tanggalLahir: z.string().transform((str) => new Date(str)),
    tempatLahir: z.string(),
    alamat: z.string().min(8, {
        message: "Alamat harus 8 huruf"
    }),
    noTelepon: z.string(),
    password: z.string(),
    NoKartuKeluarga: z.string(),
    NIK: z.string(),
    status: z.string(),
    TerdaftarSebagai: z.string(),
    TanggalMasuk: z.string().transform((str) => new Date(str)),
})

export default function DataSiswaForm({ data, action }) {
    console.log({data})
    const router = useRouter()
    const [status, setStatus] = React.useState(data && data.status ? data.status : "aktif")
    const [daftar, setDaftar] = React.useState(data && data.terdaftar_sebagai ? data.terdaftar_sebagai : "siswa baru")
    const [valid, setValid] = React.useState(data && data.valid ? data.valid : "valid")
    const defaultValues = React.useMemo(() => {
        if (data) {
            return {
                nisn: data?.nisn.toString(),
                nama: data?.nama,
                NIPD: data?.NIPD.toString(),
                email: data?.email,
                jenisKelamin: data?.jenis_kelamin,
                tanggalLahir: new Date(data?.tanggal_lahir).toISOString().split('T')[0],
                tempatLahir: data?.tempat_lahir,
                alamat: data?.alamat,
                noTelepon: data?.no_telepon,
                NoKartuKeluarga: data?.No_KK,
                NIK: data?.NIK,
                status: data?.status,
                TerdaftarSebagai: data?.terdaftar_sebagai,
                TanggalMasuk: data?.tanggal_masuk ? new Date(data?.tanggal_masuk).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                valid: data?.valid,
                password: data?.password,
            }
        }
        return {
            nisn: "",
            nama: "",
            NIPD: "",
            email: "",
            jenisKelamin: "",
            tanggalLahir: new Date().toISOString().split('T')[0],
            tempatLahir: "",
            alamat: "",
            noTelepon: "",
            NoKartuKeluarga: "",
            NIK: "",
            status,
            TerdaftarSebagai: daftar,
            TanggalMasuk: new Date().toISOString().split('T')[0],
            valid: valid,
            password: "",

        }
    }, [data])
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    const body = (data) => (
        {
            nisn: data?.nisn,
            NIPD: data?.NIPD,
            nama: data?.nama,
            email: data?.email,
            jenis_kelamin: data?.jenisKelamin,
            tanggal_lahir: new Date(data?.tanggalLahir).toISOString().split('T')[0],
            tempat_lahir: data?.tempatLahir,
            alamat: data?.alamat,
            no_telepon: data?.noTelepon,
            password: data?.password,
            No_KK: data?.NoKartuKeluarga,
            NIK: data?.NIK,
            status,
            terdaftar_sebagai: daftar,
            tanggal_masuk: new Date(data?.TanggalMasuk).toISOString().split('T')[0],
            valid: valid
        }
    )

    const edit = async (data) => {
        console.log(body(data))
        try {
            await fetch(`http://localhost:8000/siswa/${data?.nisn}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body(data))
            })
        } catch (e) {
        } router.back()
    }

    const add = async (data) => {
        console.log(body(data))
        try {
            const result = await fetch("http://localhost:8000/siswa", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body(data))
            })
        } catch (e) {
        } finally {
            router.back()
        }
    }

    const genderOptions = [
        {
            label: "Perempuan",
            value: "perempuan",
        },
        {
            label: "Laki-laki",
            value: "laki-laki",
        },
    ]

    const statusOptions = [
        {
            label: "Aktif",
            value: "aktif",
        },
        {
            label: "Non Aktif",
            value: "non aktif"
        },
    ]

    const daftarOptions = [
        {
            label: "Siswa Baru",
            value: "siswa baru",
        },
        {
            label: "Pindahan",
            value: "pindahan"
        },
    ]

    const validOptions = [
        {
            label: "Valid",
            value: "valid",
        },
        {
            label: "Tidak Valid",
            value: "tidak valid"
        },
    ]



    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => console.log(data))} className={styles.container()}>
                    {Object.keys(defaultValues).map((value) => (
                        <div className={styles[value] ? styles[value]() : null} style={{ marginBottom: 20 }}>
                            <FormField
                                control={form.control}
                                name={value}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{`${value[0].toUpperCase()}${value.slice(1)}`}</FormLabel>
                                        <FormControl>
                                            {
                                                value === "jenisKelamin"
                                                    ?
                                                    <div>
                                                        <Select placeholder="Jenis Kelamin" style={{ width: "100%" }} size="large" options={genderOptions} onChange={(val) => field.onChange(val)} defaultValue={field.value ? field.value : null} />
                                                    </div>
                                                    :
                                                    value === "status"
                                                        ?
                                                        <Select placeholder="Status" style={{ width: "100%" }} size="large" options={statusOptions} onChange={(val) => setStatus(val)} defaultValue={status} />
                                                        :
                                                        value === "TerdaftarSebagai"
                                                            ?
                                                            <Select placeholder="Terdaftar Sebagai" style={{ width: "100%" }} size="large" options={daftarOptions} onChange={(val) => setDaftar(val)} defaultValue={daftar} />
                                                            :
                                                            value === "valid"
                                                                ?
                                                                <Select placeholder="valid" style={{ width: "100%" }} size="large" options={validOptions} onChange={(val) => setValid(val)} defaultValue={valid} />
                                                                :
                                                                <Input type={value === "tanggalLahir" || value === "TanggalMasuk" ? "date" : value === "email" ? "email" : "text"} placeholder="shadcn" {...field} value={field.value} />
                                            }
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}
                </form>
            </Form>
            <ButtonSessionForm onClick={form.handleSubmit((data) => action === "add" ? add(data) : edit(data))} />
        </div>
    )
}
const styles = {
    container: css({
        // width: "100%",
        display: "flex",
        flexWrap: "wrap",
        // gap: 20,
        // backgroundColor: "ActiveText",
        justifyContent: "space-between"
    }),
    nisn: css({
        width: "calc(50% - 10px)",
    }),
    NIPD: css({
        width: "calc(50% - 10px)",
    }),
    nama: css({
        width: "calc(50% - 10px)",
    }),
    email: css({
        width: "calc(50% - 10px)",
    }),
    jenisKelamin: css({
        width: "calc(20% - 10px)",
    }),
    tanggalLahir: css({
        width: "calc(30% - 20px)",
    }),
    tempatLahir: css({
        width: "calc(50% - 10px)",
    }),
    alamat: css({
        width: "calc(50% - 10px)",
    }),
    noTelepon: css({
        width: "calc(50% - 10px)",
    }),
    namaOrangTua: css({
        width: "calc(50% - 10px)",
    }),
    noTeleponOrangTua: css({
        width: "calc(50% - 10px)",
    }),
    NoKartuKeluarga: css({
        width: "calc(25% - 10px)",
    }),
    NIK: css({
        width: "calc(25% - 10px)",
    }),
    status: css({
        width: "calc(25% - 10px)",
    }),
    TerdaftarSebagai: css({
        width: "calc(25% - 10px)",
    }),
    TanggalMasuk: css({
        width: "calc(25% - 10px)",
    }),
    valid: css({
        width: "calc(25% - 10px)",
    }),
    password: css({
        width: "calc(50% - 10px)",
    }),
    buttonSession: css({
        width: "100%",
        display: "flex",
        // backgroundColor: "ActiveText",
        justifyContent: "flex-end",
        gap: "20px",
    })
}
