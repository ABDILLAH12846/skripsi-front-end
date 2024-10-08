import { DataTableDemo } from '@/component/table';
import { css } from '@/utils/stitches.config';
import Image from 'next/image';
import React from 'react';
import dayjs from 'dayjs';
import GalleryImage from "../../public/svg/gallery.svg";

export default function SiswaProfile({ data }) {
    const header = React.useMemo(() => {
        return ["nama", "status", "alamat", "no_telepon", "pekerjaan", "gaji"];
    }, []);

    const formatDate = (dateString) => {
        return dateString ? dayjs(dateString).format('DD/MM/YYYY') : '-';
    };

    return (
        <div className={styles.content()}>
            <div className={styles.leftProfile()}>
                <div>
                    <Image src={data?.url ? data?.url : GalleryImage} width={100} height={100} />
                </div>
                <div className={styles.leftProfileContent()}>
                    <span style={{ fontSize: "14px" }}>{data?.nisn}</span>
                    <span style={{ fontSize: "16px", fontWeight: "500" }}>{data?.nama}</span>
                </div>
            </div>
            <div className={styles.righContent()}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#124A4B", marginBottom: 10, display: "block" }}>Data Pribadi</h3>
                <div className={styles.valueBox()}>
                    {Object.keys(data).filter((val) => val !== "orangtua" && val !== "url").map((key) => (
                        <div className={styles.listValue()}>
                            <span style={{ fontWeight: "bold", fontSize: "16px" }}>{key}</span>
                            <span>
                                {key === 'tanggal_lahir' || key === 'tanggal_masuk' ? formatDate(data[key]) : data[key] || '-'}
                            </span>
                        </div>
                    ))}
                </div>
                {data.orangtua && (
                    <>
                        <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#124A4B", marginBottom: 10, display: "block" }}>Data Orang Tua</h3>
                        <div style={{ marginBottom: 40 }}>
                            <DataTableDemo data={data.orangtua} header={header} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
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
