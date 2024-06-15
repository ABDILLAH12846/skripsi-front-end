import React from 'react'
import { Button } from "@/components/ui/button"
import { Modal } from 'antd'
import { css } from '@/utils/stitches.config'


export default function DeleteButton({handleDelete}) {
    const [openModal, setOpenModal] = React.useState(false)
    const closeModal = () => {
        setOpenModal(false);
    }
    return (
        <div>
            <Button variant="outline" onClick={() => setOpenModal(true)}>Hapus</Button>
            <Modal open={openModal} onCancel={closeModal} width={400} title="Yakin ingin menghapus data ini?" footer={null} >
                <span>Data ini akan terhapus secara permanen</span>
                <div className={styles.btnBox()}>
                    <Button variant="outline" onClick={closeModal}>Batal</Button>
                    <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
                </div>
            </Modal>
        </div>

    )
}

const styles = {
    btnBox : css({
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        gap: 10,
        marginTop: 30,
    })
}
