import React from 'react'
import { Button } from "@/components/ui/button"
import { css } from '@/utils/stitches.config'
import { useRouter } from 'next/navigation'

export default function ButtonSessionForm({onClick}) {
    const router = useRouter()
    return (
            <div className={styles.buttonSession()}>
                <Button onClick={() => router.back()} variant="outline">Cancel</Button>
                <Button type="submit" onClick={() => onClick()}>Submit</Button>
            </div>
    )
}
const styles = {
    buttonSession: css({
        width: "100%",
        display: "flex",
        // backgroundColor: "ActiveText",
        justifyContent: "flex-end",
        gap: "20px",
    })
}
