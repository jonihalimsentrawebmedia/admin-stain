import { useForm } from 'react-hook-form'
import ObjectionsPublicDetailViewModel from '../detail/ObjectionsPublicDetailViewModel'
import { useGetObjectionsPublicLog } from '../hooks'
import { useEffect } from 'react'

const ObjectionInformationLogViewModel = () => {
  const { form, objectionPublic, id } = ObjectionsPublicDetailViewModel()

  const { objectionPublicLog,loading } = useGetObjectionsPublicLog(id!)
  const formLog = useForm()
  const fieldLog = [
    {
      name: 'nama_lengkap',
      label: 'Nama Lengkap (Sesuai KTP)*',
    },
    {
      name: 'no_hp',
      label: 'No. Handphone*',
    },
    {
      name: 'email',
      label: 'Email*',
    },
    {
      name: 'alasan_keberatan',
      label: 'Alasan Keberatan',
      component: (
        <ul className="list-disc list-outside ml-2 pl-2">
          {objectionPublic?.alasan_keberatan?.map((item, index) => (
            <li key={item + index} className="break-all">
              {item}
            </li>
          ))}{' '}
        </ul>
      ),
    },
    {
      name: 'kasus_posisi',
      label: 'Kasus Posisi',
    },
  ]
  useEffect(() => {
    if (objectionPublicLog) {
      formLog.reset({
        ...objectionPublicLog,
      })
    }
  }, [objectionPublicLog])

  return {
    fieldLog,
    objectionPublicLog,
    formLog,
    form,loading,objectionPublic,id
  }
}

export default ObjectionInformationLogViewModel
