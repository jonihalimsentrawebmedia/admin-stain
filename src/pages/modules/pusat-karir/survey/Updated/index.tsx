import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailSurvey } from '@/pages/modules/pusat-karir/survey/hooks'
import { useEffect, useState } from 'react'
import { SideSection } from '@/pages/modules/pusat-karir/survey/component/sideSection.tsx'
import { Label } from '@/components/ui/label.tsx'
import { Input } from '@/components/ui/input.tsx'
import type { ISurveyDataPost } from '@/pages/modules/pusat-karir/survey/data/types.ts'
import { QuestionActive } from '@/pages/modules/pusat-karir/survey/component/questionActive.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaSave } from 'react-icons/fa'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

export const UpdatedSurveyData = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { detailSurvey } = UseGetDetailSurvey(id as string) ?? ''

  const [data, setData] = useState<ISurveyDataPost>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (detailSurvey) {
      setData(detailSurvey)
    }
  }, [detailSurvey])

  const HandleSaveSurvey = async () => {
    setLoading(true)
    await AxiosClient.put(`/pusat-karir/survei/${detailSurvey?.id_survei}`, data)
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
          label={'Buat Survey'}
          buttonGroup={[
            {
              type: 'cancel',
              label: 'Batal',
              onClick: () => {
                navigate(-1)
              },
            },
            {
              type: 'custom',
              element: (
                <Button className={'rounded'} onClick={HandleSaveSurvey} disabled={loading}>
                  <FaSave />
                  Simpan Survei
                </Button>
              ),
            },
          ]}
        />

        <div className="grid grid-cols-[280px_1fr] gap-5">
          <SideSection
            data={data}
            setActiveIndex={setActiveIndex}
            setData={setData}
            activeIndex={activeIndex}
          />

          <div className={'space-y-4'}>
            <div className="border w-full p-2.5 rounded bg-white space-y-2">
              <Label>Judul Survey *</Label>
              <Input
                value={data?.judul ?? ''}
                onChange={(e) => {
                  setData({
                    ...(data as ISurveyDataPost),
                    judul: e.target.value,
                  })
                }}
                className={'text-lg rounded'}
                placeholder={' Judul Survey'}
              />

              <Input
                value={data?.deskripsi ?? ''}
                className={'text-sm rounded'}
                placeholder={'Deskripsi Survey'}
                onChange={(e) => {
                  setData({
                    ...(data as ISurveyDataPost),
                    deskripsi: e.target.value,
                  })
                }}
              />
            </div>

            <QuestionActive
              actionSave={HandleSaveSurvey}
              activeIndex={activeIndex}
              data={data}
              setData={setData}
              isEdit={true}
            />
          </div>
        </div>
      </div>
    </>
  )
}
