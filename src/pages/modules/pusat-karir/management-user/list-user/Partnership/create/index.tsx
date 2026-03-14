import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { MdInfo } from 'react-icons/md'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { clsx } from 'clsx'
import { FormCompanyInformation } from '../component/formInformation.tsx'
import { useEffect, useMemo, useState } from 'react'
import { UseGetDetailStatusForm } from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/hooks'
import { FormContactInformation } from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/component/formContact.tsx'

export const CreatePartnership = () => {
  const navigate = useNavigate()
  const [temp_id, setTemp_id] = useState('')
  const [tabsActive, setTabsActive] = useState('step_1')

  useEffect(() => {
    const temp_id = window.localStorage.getItem('temp_id')
    if (temp_id) {
      setTemp_id(temp_id)
    }
  }, [])

  const { detail, status } = UseGetDetailStatusForm(temp_id)

  const TabsData = [
    {
      value: 'step_1',
      label: 'Informasi Perusahaan',
      status: status?.informasi_perusahaan ?? false,
      element: (
        <FormCompanyInformation
          detail={detail}
          id_tmp={temp_id}
          setTabActive={setTabsActive}
          setTemp_id={setTemp_id}
        />
      ),
    },
    {
      value: 'step_2',
      label: 'Informasi Kontak',
      status: status?.informasi_kontak ?? false,
      element: <FormContactInformation setValue={setTabsActive} detail={detail} />,
    },
  ]

  const lastCompletedIndex = useMemo(() => {
    for (let i = TabsData.length - 1; i >= 0; i--) {
      if (TabsData[i].status) return i
    }
    return -1
  }, [TabsData])
  return (
    <>
      <div className="w-full h-full bg-white p-5">
        <ButtonTitleGroup
          label={'Tambah User - Mitra Kerja'}
          buttonGroup={[
            {
              type: 'cancel',
              label: 'Batal',
              onClick: () => navigate(-1),
            },
            {
              type: 'save',
              label: 'Simpan',
            },
          ]}
        />

        <div className="w-fit rounded-full mt-4 p-2 px-5 border border-blue-700 flex items-center gap-2">
          <MdInfo className={'size-6 text-blue-700'} />
          <ul className={'list-disc pl-5 text-sm text-blue-700'}>
            <li>Pasitkan data yang anda isi benar.</li>
            <li>
              Pengguna akan tetap melakukan verifikasi email saat login pertama lalu diminta untuk
              melengkapi datanya.
            </li>
          </ul>
        </div>

        <Tabs className={'mt-5'} value={tabsActive} onValueChange={(e) => setTabsActive(e)}>
          <TabsList className={'bg-white rounded w-fit h-full! flex gap-x-4'}>
            {TabsData?.map((row, k) => {
              const isLocked = k > lastCompletedIndex + 1

              return (
                <TabsTrigger
                  key={k}
                  disabled={isLocked}
                  value={row?.value}
                  className={clsx(
                    'shadow-none! border! border-primary rounded-full text-gray-400 p-1.5 px-3',
                    'group data-[state=active]:text-primary',
                    row?.status ? 'text-primary' : ''
                  )}
                >
                  <div
                    className={clsx(
                      'rounded-full p-1.5 text-xs size-7 text-primary bg-muted',
                      'flex items-center justify-center group-data-[state=active]:bg-primary',
                      'group-data-[state=active]:text-white',
                      row?.status ? 'bg-primary text-white' : ''
                    )}
                  >
                    {k + 1}.
                  </div>{' '}
                  {row?.label}
                </TabsTrigger>
              )
            })}
          </TabsList>
          {TabsData?.map((row, k) => (
            <TabsContent key={k} value={row?.value}>
              {row?.element}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
