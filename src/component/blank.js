import React from 'react'
import BlankImage from "../../public/svg/blank.svg"
import Image from 'next/image'
import { css } from '@/utils/stitches.config'

export default function Blank() {
  return (
    <div className={styles.container()}>
        <Image src={BlankImage} width={400} height={400}/>
        <h1 style={{fontSize: 24, fontWeight: 600, color: "GrayText"}}>Data tidak ada</h1>
    </div>
  )
}

const styles = {
    container: css({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    })
}
