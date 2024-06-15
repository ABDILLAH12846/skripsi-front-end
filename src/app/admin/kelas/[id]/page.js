import KelasForm from '@/component/kelas-form'
import React from 'react'

export default function Edit({params}) {
  return (
    <div>
        <KelasForm id={params.id} />
    </div>
  )
}
