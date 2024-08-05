"use client"

import React from 'react'
import { customAlphabet } from 'nanoid';
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import SikapSelect from './sikap-select';
import { Textarea } from '@/components/ui/textarea';
import ButtonSessionForm from './button-session-form';
import { useToast } from "@/components/ui/use-toast"
import { css } from '@/utils/stitches.config';

export default function SosialForm({ data, no_kelas, semester, nisn }) {
    console.log({ data })
    const nanoid = customAlphabet('0123456789', 4);
    const { toast } = useToast()
    const notification = (status, title, description) => {
        toast({
            variant: status ? "outline" : "destructive",
            title,
            description,
        })
    }
    const defaultValues = React.useMemo(() => {
        if (data?.data?.id_sosial) {
            console.log(data)
            return {
                id_sosial: data.data.id_sosial,
                sabar: data.data.sabar,
                jujur: data.data.jujur,
                amanah: data.data.amanah,
                tawakkal: data.data.tawakkal,
                empati: data.data.empati,
                disiplin: data.data.disiplin,
                kerjasama: data.data.kerjasama,
                nilai_konklusi: data.data.nilai_konklusi,
                deskripsi: data.data.deskripsi,
                no_kelas: data.data.no_kelas,
                semester: data.data.semester,
            }
        } else {
            console.log("enggak")
            return {
                id_sosial: nanoid(),
                sabar: "B",
                jujur: "B",
                amanah: "B",
                tawakkal: "B",
                empati: "B",
                disiplin: "B",
                kerjasama: "B",
                nilai_konklusi: "B",
                deskripsi: "",
                no_kelas: no_kelas,
                semester: semester,
            }
        }
    }, [data])

    const form = useForm({ defaultValues })

    const addSpiritual = async (data) => {
        try {
            const result = await fetch("http://localhost:8000/sosial", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, nisn })
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
    const editSpiritual = async (data) => {
        try {
            const result = await fetch(`http://localhost:8000/sosial/${data?.id_sosial}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
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

    React.useEffect(() => {
        form.reset(defaultValues)
    }, [defaultValues])

    console.log({ defaultValues })
    return (
        <div>
            <Form {...form}>
                <form onSubmit={() => { }} >
                    <div className={styles.wrapper()}>


                        {Object.keys(defaultValues).filter((val) => val !== "id_sosial" && val !== "no_kelas" && val !== "semester").map((val) => (
                            <FormField
                                control={form.control}
                                name={val}
                                render={({ field }) => (
                                    <div className={val === "deskripsi" ? styles.deskripsi() : styles.select()} style={{ marginBottom: 20 }}>
                                        <FormItem>
                                            <FormLabel>{val.replace(/_/g, ' ')}</FormLabel>
                                            <FormControl>
                                                {
                                                    val === "deskripsi"
                                                        ?
                                                        <div style={{ width: "100%" }}>

                                                            <Textarea  {...field} value={field.value} onChange={(val) => field.onChange(val)} />
                                                        </div>
                                                        :
                                                        <div className={styles.container()}>
                                                            <SikapSelect value={field.value} onChange={(val) => field.onChange(val)} />
                                                        </div>
                                                }
                                            </FormControl>
                                        </FormItem>
                                    </div>

                                )}
                            />
                        ))}
                    </div>
                </form>
            </Form>
            <ButtonSessionForm onClick={form.handleSubmit(data?.data?.id_sosial ? editSpiritual : addSpiritual)} />
        </div>
    )
}
const styles = {
    container: css({
        width: "100%",
    }),
    wrapper: css({
        width: "100%",
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        justifyContent: "space-between",
    }),
    select: css({
        width: "calc(25% - 10px)",
    }),
    deskripsi: css({
        width: "100%"
    })
}
