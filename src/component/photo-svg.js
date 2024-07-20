import React from 'react'
import GalleryImage from "../../public/svg/gallery.svg"
import Image from 'next/image'
import { css } from '@/utils/stitches.config'

export default function Gallery() {
  return (
    <div className={styles.container()}>
        <Image src={GalleryImage} width={400} height={400}/>
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
