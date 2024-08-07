"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
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
import { customAlphabet } from 'nanoid';
import { css } from '@/utils/stitches.config'
import ButtonSessionForm from './button-session-form'
import { DataTableDemo } from './table'
import SiswaSelect from './siswa-select'
import GuruSelect from './guru-select'
import { Select } from 'antd'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    namaOrangTua: z.string(),
    alamat: z.string(),
    noTelepon: z.string(),
    pekerjaan: z.string(),
    gaji: z.string(),
})

export default function OrangTuaForm({ data, dataSiswa }) {
    const { toast } = useToast() 
    const router = useRouter()

    const nanoid = customAlphabet('0123456789', 4);

    const notification = (status, title, description) => {
        toast({
            variant: status ? "outline" : "destructive",
            title,
            description,
        })
    }

    const [disable, setDisable] = React.useState(true)
    const [status, setStatus] = React.useState(data ? data.status : "ayah")
    const [final, setFinal] = React.useState(true);

    console.log({data})
    const defaultValues = React.useMemo(() => {
        if (data) {
            return {
                idOrangTua: data.id_orangtua,
                namaOrangTua: data?.nama_orangtua,
                alamat: data?.alamat,
                noTelepon: data?.no_telepon,
                pekerjaan: data?.pekerjaan,
                gaji: data?.gaji,
                status: data?.status,
                daftarSiswa: data?.daftar_siswa,
            }
        }
        return {
            idOrangTua: nanoid(),
            namaOrangTua: "",
            alamat: "",
            noTelepon: "",
            pekerjaan: "",
            gaji: "",
            status: "",
            daftarSiswa: [],
        }
    }, [data])
    const [chaval, setChaval] = React.useState(defaultValues?.daftarSiswa)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    const formValue = form.getValues()

    const body = (data) => (
        {
            nama: data?.namaOrangTua,
            alamat: data?.alamat,
            no_telepon: data?.noTelepon,
            pekerjaan: data?.pekerjaan,
            gaji: data?.gaji,
            status,
        }
    )
    const datas = defaultValues.daftarSiswa.map((val) => {
        const finde = chaval.find((cal) => val.nisn === cal.nisn)
        if (finde) {
            return { nisn: val.nisn, kelas: true }
        } else {
            return { nisn: val.nisn, kelas: false }
        }
    });

    const bodyDaftarSiswa = () => (
        {
            id_orangtua: defaultValues.idOrangTua,
            nisn_list: chaval.length < defaultValues.daftarSiswa.length ? datas : chaval.map((val) => ({ nisn: val.nisn, kelas: true })),
        }
    )

    const addOrangTua = async (data) => {
        try {
            const result = await fetch("http://localhost:8000/orangtua", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...body(data), id_orangtua: defaultValues?.idOrangTua,})
            })
            if (result.ok) {
                notification(result.ok, "sukses", result.statusText)
                setDisable(false)
                setFinal(true)
            } else {
                notification(result.ok, "gagal", result.statusText)
            }
        } catch (e) {
        } finally {

            // router.back()
        }
    }
    const editOrangTua = async (data) => {
        try {
            const result = await fetch(`http://localhost:8000/orangtua/${defaultValues?.idOrangTua}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body(data))
            })
            if (result.ok) {
                notification(result.ok, "sukses", result.statusText)
                setDisable(false)
                setFinal(true)
                router.back()
            } else {
                notification(result.ok, "gagal", result.statusText)
            }
        } catch (e) {
        } finally {

            // router.back()
        }
    }

    const checkStatus = final && status ? status : data ? data.status : "ayah"

    console.log({checkStatus})

    const addWali = async (data) => {
        try {
            const result = await fetch("http://localhost:8000/walisiswa", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyDaftarSiswa())
            })
            if (result.ok) {
                notification(result.ok, "sukses", result.statusText)
                setDisable(false)
            } else {
                notification(result.ok, "gagal", result.statusText)
            }
        } catch (e) {
        } finally {

            // router.back()
        }
    }
    const addAyah = async (data) => {
        try {
            const result = await fetch("http://localhost:8000/ayahsiswa", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyDaftarSiswa())
            })
            if (result.ok) {
                notification(result.ok, "sukses", result.statusText)
                setDisable(false)
            } else {
                notification(result.ok, "gagal", result.statusText)
            }
        } catch (e) {
        } finally {

            // router.back()
        }
    }
    const addIbu = async (data) => {
        try {
            const result = await fetch("http://localhost:8000/ibusiswa", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyDaftarSiswa())
            })
            if (result.ok) {
                notification(result.ok, "sukses", result.statusText)
                setDisable(false)
            } else {
                notification(result.ok, "gagal", result.statusText)
            }
        } catch (e) {
        } finally {

            // router.back()
        }
    }

    const ortuOptions = [
        {
            label: "Ayah",
            value: "ayah",
        },
        {
            label: "Ibu",
            value: "ibu",
        },
        {
            label: "Wali",
            value: "wali",
        },
    ]
    
    if (!dataSiswa) {
        return <p>Loading</p>
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={() => { }} className={styles.container()}>
                    {Object.keys(defaultValues).filter((val) => val !== "daftarSiswa" && val !== "idOrangTua").map((value) => (
                        <div className={styles[value] ? styles[value]() : null} style={{ marginBottom: 20 }}>
                            <FormField
                                control={form.control}
                                name={value}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{`${value[0].toUpperCase()}${value.slice(1)}`}</FormLabel>
                                        <FormControl>
                                            {
                                                value === "waliKelas"
                                                    ?
                                                    <GuruSelect onChange={(val) => field.onChange(val.value.toString())} />
                                                    :
                                                    value === "status"
                                                    ?
                                                    <Select options={ortuOptions} defaultValue={status} onChange={(val) => {
                                                        setStatus(val)
                                                        setFinal(false)
                                                    }} />
                                                    :
                                                    <Input type={value === "tanggalLahir" ? "date" : value === "email" ? "email" : "text"} placeholder={`masukkan ${value} anda di disini`} {...field} value={field.value} />
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
            <ButtonSessionForm onClick={form.handleSubmit(data ? editOrangTua : addOrangTua)} />
            <SiswaSelect isDisabled={!disable || data ? false : true} defaultValues={chaval} list={dataSiswa.map((val) => ({ nisn: val.nisn, nama: val.nama }))} formValue={formValue} chaval={chaval} setChaval={setChaval} />
            {
                chaval.length > 0
                    ?
                    // <p>{JSON.stringify(chaval)}</p>
                    <>
                        <DataTableDemo data={chaval} header={Object.keys(chaval[0])} />
                        <ButtonSessionForm onClick={checkStatus === "ayah" ? addAyah : checkStatus ===  "ibu" ? addIbu : addWali} />
                    </>
                    : null
            }
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
    nomorKelas: css({
        width: "calc(10% - 10px)",
    }),
    namaKelas: css({
        width: "calc(30% - 10px)",
    }),
    waliKelas: css({
        width: "calc(40% - 10px)",
    }),
    tahunAjaran: css({
        width: "calc(20% - 10px)",
    }),

}
