import React from 'react'
import { Drawer, Space, Checkbox, Divider, Alert } from 'antd';
import { Button } from "antd"
import { useController, useFormContext } from "react-hook-form";
import { css } from '@/utils/stitches.config';

export default function SiswaSelect({ isDisabled, list, chaval, setChaval }) {
    const [open, setOpen] = React.useState(false)
    const onClose = () => {
        setOpen(false);
    };

    const onChange = (act, val) => {
        act ? setChaval([...chaval, val]) : setChaval(chaval.filter((el) => el.nisn !== val.nisn))
    }

    return (
        <div>
            <Button size="large" disabled={isDisabled} onClick={() => setOpen(true)}>Pilih Siswa</Button>
            <Drawer placement="right" size="large" open={open} onClose={onClose}>
                <>
                    {/* <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                        Check all
                    </Checkbox>
                    <Divider /> */}
                    {/* <CheckboxGroup style={{display: "flex", flexDirection: "column"}}  onChange={onChange} value={checkedList}>
                        {plainOptions.map((val) => (
                            <Checkbox value={val}>{val.nama}</Checkbox>
                        ))}
                    </CheckboxGroup> */}
                    <div className={styles.container()}>
                        <div className={styles.wrapper()}>
                            <div className={styles.nisnJudul()}>nisn</div>
                            <div>nama</div>
                        </div>
                        {
                            list.map((val) => (
                                <Checkbox style={{ backgroundColor: val.tinggal_kelas === 1 ? "#ffb703" : "white" }} defaultChecked={chaval.find((el) => el.nisn === val.nisn)} onChange={(e) => onChange(e.target.checked, val)} className={styles.selectBox()}>
                                    <div className={styles.wrapper()} >
                                        <div className={styles.nisn()}>{val.nisn}</div>
                                        <div>{val.nama}</div>
                                    </div>
                                </Checkbox>
                            ))
                        }
                    </div>
                    <Alert
                    style={{marginTop: 30,}}
                        message="Perhatian"
                        description="Siswa yang berwarna kuning menandakan siswa tinggal kelas"
                        type="warning"
                        showIcon
                    />
                </>
            </Drawer>
        </div>
    )
}

const styles = {
    container: css({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        // backgroundColor: "Bisque",
    }),
    selectBox: css({
        display: "flex",
        width: "100%",
        // backgroundColor: "Azure",
    }),
    nisn: css({
        width: "100px",
        // backgroundColor: "Aqua",
        display: "flex",
    }),
    wrapper: css({
        width: "100%",
        // backgroundColor: "Brown",
        display: "flex",
    }),
    nisnJudul: css({
        width: 120,
        display: "flex",
        justifyContent: "center",
    })
}
