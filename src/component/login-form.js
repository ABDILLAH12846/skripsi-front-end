"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { GlobalContext } from "@/app/layout";

// Perbarui skema validasi untuk memasukkan validasi password
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string(),
});

export function LoginForm() {
    const { user, setUser } = React.useContext(GlobalContext);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: ''
        },
    });
    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            if (data.username === "admin" && data.password === "admin") {
                const userTemp = { role: "admin" };
                setUser(userTemp);
                Cookies.set("user", JSON.stringify(userTemp), { expires: 1 });
                router.push("/admin/data-guru");
            } else {
                const res = await fetch("http://localhost:8000/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: data.username,
                        password: data.password,
                    }),
                });
                const userTemp = await res.json();

                if (res.ok && userTemp) {
                    setUser(userTemp);
                    Cookies.set("user", JSON.stringify(userTemp), { expires: 1 });
                    if (userTemp.role === "guru") {
                        router.push("/guru/profil");
                    } else {
                        router.push("/siswa/profil");
                    }
                } else {
                    setUser(null);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ID Pengguna</FormLabel>
                            <FormControl>
                                <Input placeholder="0123456" {...field} />
                            </FormControl>
                            <FormDescription>
                                masukkan NISN/NIP anda
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sandi</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="masukkan kata sandi" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
