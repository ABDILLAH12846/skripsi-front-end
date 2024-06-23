import React from 'react'
import { Drawer, Space, Checkbox, Divider } from 'antd';
import { Button } from "antd"
import { useController, useFormContext } from "react-hook-form";

export default function SiswaSelect({ isDisabled, list, chaval, setChaval}) {
    // console.log({defaultValues, list})
    const [open, setOpen] = React.useState(false)
    const onClose = () => {
        setOpen(false);
    };
    // const [chaval, setChaval] = React.useState(defaultValues)
    console.log({ chaval })

    const onChange = (act, val) => {
        console.log(act, chaval.map((el) => ({el: el.nisn === val.nisn})), chaval.filter((el) => el !== val))
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
                    {
                        list.map((val) => (
                            <Checkbox defaultChecked={chaval.find((el) => el.nisn === val.nisn)} onChange={(e) => onChange(e.target.checked, val)}>{val.nama}</Checkbox>
                        ))
                    }
                </>
            </Drawer>
        </div>
    )
}
