import React from 'react';
import { Select } from 'antd';

export default function NewKelasSelect({ onChange, value, id_tingkatan }) {
    const [data, setData] = React.useState(null);
    const [currentValue, setCurrentValue] = React.useState(value);

    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:8000/kelas${id_tingkatan ? `?id_tingkatan=${id_tingkatan}` : ''}`);
            const data = await res.json();
            console.log({ kelas: data });
            setData(data.map((val) => ({ value: `${val.id_kelas} ${val.id_tahunajaran}`, label: `${val.no_kelas} ${val.nama_kelas}` })));
        }
        fetchData();
    }, [id_tingkatan]);

    React.useEffect(() => {
        // Set initial value from prop
        setCurrentValue(value);
    }, [value]);

    React.useEffect(() => {
        // Clear the value only when id_tingkatan changes
        if (id_tingkatan) {
            setCurrentValue(null);
        }
    }, [id_tingkatan]);

    const handleChange = (newValue) => {
        setCurrentValue(newValue);
        onChange(newValue);
    }

    return (
        <div>
            {
                data
                    ? <Select 
                        value={currentValue} 
                        placeholder="Pilih Kelas" 
                        style={{ width: "100%" }} 
                        labelInValue 
                        options={data} 
                        onChange={handleChange} 
                        size="large"
                    />
                    : null
            }
        </div>
    );
}
