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
import Upload from './upload'

const formSchema = z.object({
    NIPD: z.string().min(1, { message: "NIPD harus diisi" }).regex(/^\d+$/, { message: "NIPD harus berupa angka" }),
    nisn: z.string().min(1, { message: "NISN harus diisi" }).regex(/^\d+$/, { message: "NISN harus berupa angka" }),
    nama: z.string().min(8, { message: "NIP harus memiliki 8 karakter" }),
    email: z.string().email({ message: "Email tidak valid" }),
    jenisKelamin: z.string().min(1, { message: "Jenis Kelamin harus diisi" }),
    tanggalLahir: z.string().transform((str) => new Date(str)),
    tempatLahir: z.string().min(1, { message: "Tempat Lahir harus diisi" }),
    alamat: z.string().min(8, { message: "Alamat harus 8 huruf" }),
    noTelepon: z.string().regex(/^\d+$/, { message: "Nomor Telepon harus berupa angka" }),
    password: z.string().min(8, { message: "Password harus minimal 8 karakter" })
        .regex(/[A-Z]/, { message: "Password harus mengandung huruf besar" })
        .regex(/[a-z]/, { message: "Password harus mengandung huruf kecil" })
        .regex(/[0-9]/, { message: "Password harus mengandung angka" }),
    NoKartuKeluarga: z.string().regex(/^\d+$/, { message: "No Kartu Keluarga harus berupa angka" }),
    NIK: z.string().length(16, { message: "NIK harus 16 karakter" }).regex(/^\d+$/, { message: "NIK harus berupa angka" }),
    status: z.string(),
    TerdaftarSebagai: z.string(),
    TanggalMasuk: z.string().transform((str) => new Date(str)),
})

export default function DataSiswaForm({ data, action }) {
    console.log({ data })
    const router = useRouter()
    const [status, setStatus] = React.useState(data && data.status ? data.status : "aktif")
    const [daftar, setDaftar] = React.useState(data && data.terdaftar_sebagai ? data.terdaftar_sebagai : "siswa baru")
    const [url, setUrl] = React.useState(data && data.url ? data.url : null)
    const [ijazah, setIjazah] = React.useState(data && data.ijazah ? data.ijazah : null)
    const [akta, setAkta] = React.useState(data && data.akta ? data.akta : null)
    const [kk, setKK] = React.useState(data && data.kartu_keluarga ? data.kartu_keluarga : null)
    const [agama, setAgama] = React.useState(data && data.agama ? data.agama : null)
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
                password: data?.password,
                agama: data?.agama,
                kip: data?.kip,
                "No Rek": data?.no_rek,
                "Berat Badan": data?.berat_badan,
                "Tinggi Badan": data?.tinggi_badan,
                "Lingkar Kepala": data?.lingkar_kepala,
                "Kebutuhan Khusus": data?.kebutuhan_khusus,
                "Asal Sekolah": data?.asal_sekolah,
                anak: data?.anak,
                ijazah: data?.ijazah,
                akta: data?.akta,
                "Kartu Keluarga": data?.kartu_keluarga,
                profil: data.url,
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
            password: "",
            agama: "",
            kip: "",
            "No Rek": "",
            "Berat Badan": "",
            "Tinggi Badan": "",
            "Lingkar Kepala": "",
            "Kebutuhan Khusus": "",
            "Asal Sekolah": "",
            anak: "",
            ijazah: "",
            akta: "",
            "Kartu Keluarga": "",
            profil: "",

        }
    }, [data])
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    const dataSync = form.watch()

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
            url,
            agama,
            kip: dataSync.kip,
            no_rek: dataSync['No Rek'],
            berat_badan: dataSync['Berat Badan'],
            tinggi_badan: dataSync['Tinggi Badan'],
            lingkar_kepala: dataSync['Lingkar Kepala'],
            kebutuhan_khusus: dataSync['Kebutuhan Khusus'],
            asal_sekolah: dataSync["Asal Sekolah"],
            anak: dataSync.anak,
            ijazah,
            akta,
            kartu_keluarga: kk,
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

    const agamaOption = [
        { label: "Islam", value: "islam" },
        { label: "Kristen Protestan", value: "kristen_protestan" },
        { label: "Katolik", value: "katolik" },
        { label: "Hindu", value: "hindu" },
        { label: "Buddha", value: "buddha" },
        { label: "Khonghucu", value: "khonghucu" },
        { label: "Konghucu", value: "konghucu" },
        { label: "Kepercayaan terhadap Tuhan Yang Maha Esa", value: "kepercayaan" },
        { label: "Agama Lainnya", value: "lainnya" }
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
                                                            value === "agama"
                                                            ?
                                                            <Select placeholder="Pilih Agama" style={{ width: "100%" }} size="large" options={agamaOption} onChange={(val) => setAgama(val)} defaultValue={agama} />
                                                            :
                                                            value === "profil"
                                                                ?
                                                                <Upload url={url} setUrl={setUrl} />
                                                                :
                                                                value === "ijazah"
                                                                    ?
                                                                    <Upload url={ijazah} setUrl={setIjazah} />
                                                                    :
                                                                    value === "akta"
                                                                        ?
                                                                        <Upload url={akta} setUrl={setAkta} />
                                                                        :
                                                                        value === "Kartu Keluarga"
                                                                            ?
                                                                            <Upload url={kk} setUrl={setKK} />
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
        width: "calc(50% - 10px)",
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
