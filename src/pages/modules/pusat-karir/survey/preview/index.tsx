import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetUUID } from '@/pages/modules/pusat-karir/survey/hooks'
import { useEffect, useState } from 'react'
import type { ISurveyDataPost } from '@/pages/modules/pusat-karir/survey/data/types.ts'
import { useForm } from 'react-hook-form'
import { clsx } from 'clsx'
import { Form } from '@/components/ui/form.tsx'
import { ContentType } from '@/pages/modules/pusat-karir/survey/component/contentType'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { FaSave } from 'react-icons/fa'

export const PreviewSurveyCreate = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  const id_uuid = window.localStorage.getItem('uuid')
  const { uuid } = UseGetUUID(id_uuid as string)

  const [data, setData] = useState<ISurveyDataPost>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const form = useForm()
  const ActiveSection = data?.bagian[activeIndex]

  useEffect(() => {
    if (uuid) {
      setData(uuid)
    }
  }, [uuid])

  const HandleSaveSurvey = async () => {
    setLoading(true)
    await AxiosClient.post('/pusat-karir/survei', data)
      .then((res) => {
        if (res.data.status) {
          navigate('/modules/pusat-karir/survey')
          toast.success(res.data.message || 'Success Pengajuan Survey')
          setLoading(false)
          window.localStorage.removeItem('uuid')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
        setLoading(false)
      })
  }

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Pratinjau Survei'}
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Survei',
              onClick: () => {
                if (id) {
                } else {
                  navigate('/modules/pusat-karir/survey/add')
                }
              },
            },
            {
              type: 'custom',
              element: (
                <Button onClick={HandleSaveSurvey} disabled={loading} className={'rounded'}>
                  <FaSave />
                  Simpan Survei
                </Button>
              ),
            },
          ]}
        />

        <p className={'font-semibold text-2xl'}>{data?.judul}</p>
        <p>{data?.deskripsi}</p>

        <div className="grid grid-cols-[250px_1fr] gap-5">
          <ul
            className={clsx(
              'border rounded p-2.5 text-sm font-semibold',
              'flex flex-col gap-2 bg-white shadow'
            )}
          >
            {data?.bagian.map((row, k) => (
              <li
                className={clsx('border p-1.5', k === activeIndex ? 'bg-green-100' : '')}
                key={k}
                onClick={() => setActiveIndex(k)}
              >
                {row?.judul}
              </li>
            ))}
          </ul>

          <div className={'space-y-5 bg-white'}>
            <p className="text-2xl font-semibold">{ActiveSection?.judul}</p>

            <Form {...form}>
              <form className={'space-y-4'}>
                {ActiveSection?.pertanyaan?.map((row, k) => (
                  <div key={k} className={'border p-2.5 rounded'}>
                    <ContentType item={row} form={form} index={k} />
                  </div>
                ))}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}
