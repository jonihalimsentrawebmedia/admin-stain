import { UseGetDetailJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/hoooks'
import { useParams, useSearchParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { format } from 'date-fns'
import { useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { clsx } from 'clsx'
import { Button } from '@/components/ui/button.tsx'
import SetLimitList from '@/components/common/table/SetLimitList.tsx'
import Search from '@/components/common/table/Search.tsx'
import type { IApplicant } from '@/pages/modules/pusat-karir/service/job-vacancy/Applicant-user/data/types.tsx'
import { StepStatus } from '@/pages/modules/pusat-karir/service/job-vacancy/Applicant-user/component/step-status.tsx'

export const ApplicantInternshipVacancy = () => {
  const { id } = useParams()
  const { jobVacancy } = UseGetDetailJobVacancy(id as string)

  const [selectedId, setSelectedId] = useState<IApplicant[]>([])
  const tabData = StepStatus({
    setSelectedApplicants: setSelectedId,
  })

  const [searchParams, setSearchParams] = useSearchParams()
  const status = searchParams.get('status') ?? 'MASUK'

  const HandleStatus = (status: string) => {
    const ParamsSearch = new URLSearchParams()
    ParamsSearch.set('status', status)
    setSearchParams(ParamsSearch)
  }

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup label={'Lihat Pelamar'} isBack buttonGroup={[]} />

        <div className="grid grid-cols-[12rem_1fr] gap-5">
          <p className="text-gray-500">Pembuka Lowongan</p>
          <p>{jobVacancy?.nama_mitra_kerja}</p>
          <p className="text-gray-500">Jabatan</p>
          <p>{jobVacancy?.nama_pekerjaan}</p>
          <p className="text-gray-500">Spesialisasi</p>
          <ul className={'flex gap-2 items-center'}>
            {jobVacancy?.list_data_spesialisasi?.map((item, k) => (
              <li key={k}>{item?.nama_spesialisasi}</li>
            ))}
          </ul>
          <p className="text-gray-500">Kouta</p>
          <p>{jobVacancy?.kouta_pekerjaan}</p>
          <p className="text-gray-500">Periode Pendaftaran</p>
          <p>
            {jobVacancy?.tgl_buka_pekerjaan
              ? format(jobVacancy?.tgl_buka_pekerjaan, 'dd-MM-yyyy')
              : ''}{' '}
            s.d{' '}
            {jobVacancy?.tgl_tutup_pekerjaan
              ? format(jobVacancy.tgl_tutup_pekerjaan, 'dd-MM-yyyy')
              : ''}
          </p>
        </div>

        <Tabs value={status} onValueChange={HandleStatus} className={'h-full'}>
          <TabsList className={'w-full flex gap-4 items-center bg-white h-full'}>
            {tabData.map((item, index) => (
              <TabsTrigger
                className={clsx(
                  'shadow-none! drop-shadow-none! data-[state=active]:bg-primary rounded!',
                  'data-[state=active]:text-white border border-primary text-primary p-2'
                )}
                key={index}
                value={item?.value}
              >
                {item?.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabData.map((item, index) => (
            <TabsContent value={item?.value} key={index}>
              {jobVacancy?.lowongan_internal && (
                <div
                  className={
                    'bg-green-100 border-primary border p-2.5 rounded flex items-center justify-between'
                  }
                >
                  <p className="text-primary font-semibold">Proses Pelamar</p>
                  <div className="flex items-center gap-1.5">
                    <p>{selectedId.length} Dipilih</p>
                    <Button
                      size={'sm'}
                      variant={'outline'}
                      className={'border-red-500 text-red-500 hover:text-red-500'}
                    >
                      Ditolak
                    </Button>
                    <Button size={'sm'}>Sedang Diproses</Button>
                  </div>
                </div>
              )}
              <div className="flex items-center w-full my-4 gap-2.5">
                <SetLimitList />
                <Search
                  className={'w-full'}
                  innerClassName={'p-1.5'}
                  position={'end'}
                  placeholder={'Cari Pelamar'}
                />
              </div>

              {item?.element}

              {jobVacancy?.lowongan_internal && (
                <div
                  className={
                    'bg-green-100 border-primary border p-2.5 rounded flex items-center justify-between'
                  }
                >
                  <p className="text-primary font-semibold">Proses Pelamar</p>
                  <div className="flex items-center gap-1.5">
                    <p>{selectedId.length} Dipilih</p>
                    <Button
                      size={'sm'}
                      variant={'outline'}
                      className={'border-red-500 text-red-500 hover:text-red-500'}
                    >
                      Ditolak
                    </Button>
                    <Button size={'sm'}>Sedang Diproses</Button>
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
