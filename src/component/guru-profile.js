import { DataTableDemo } from '@/component/table'
import { Button } from '@/components/ui/button'
import { css } from '@/utils/stitches.config'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'

export default function GuruProfile({ data }) {
    return (
        <div className={styles.content()}>
            <div className={styles.leftProfile()}>
                <div>
                    <Image src={"https://images.unsplash.com/photo-1703853188877-ead118e71539?q=80&w=1554&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} width={100} height={100} />
                </div>
                <div className={styles.leftProfileContent()}>
                    <span style={{ fontSize: "14px" }}>{data?.nip}</span>
                    <span style={{ fontSize: "16px", fontWeight: "500" }}>{data?.nama}</span>
                </div>
            </div>
            <div className={styles.righContent()}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#124A4B", marginBottom: 10, display: "block"}}>Data Pribadi</h3>
                <div className={styles.valueBox()}>
                    {Object.keys(data).map((key) => (
                        <div className={styles.listValue()}>
                            <span style={{ fontWeight: "bold", fontSize: "16px" }}>{key}</span>
                            <span>{data[key] || "-"}</span>
                        </div>
                    ))}
                </div>
            </div>
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
        // flexWrap: "wrap",
        height: "70vh",
        width: "100%",
    }),
    valueBox: css({
        display: "flex",
        flexDirection: "column",
        // backgroundColor: "AliceBlue",
        width: "100%",
        flexWrap: "wrap",
        height: "100%",
        gap: 30,
    })
}
