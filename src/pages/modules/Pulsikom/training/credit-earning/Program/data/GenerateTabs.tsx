import FormInformation from '../component/form/information'
import { UseGetStatusProgram } from '../hooks/index'
import { TopicScheduleSection } from '../component/topic-schedule/index.tsx'
import { FormCondition } from '../component/form/formCondition.tsx'
import { RegisterPricing } from '../component/register-pricing/index.tsx'
import ListBankAccount from '../component/bankAccount/index.tsx'
import { FormContactAndMoreNoted } from '../component/form/formContactAndMoreNoted.tsx'

export const GenerateTabsData = (title: string) => {
  const id = window.localStorage.getItem('id_program')
  const { detail } = UseGetStatusProgram(id as string)
  const status = detail?.status_pengisian

  return [
    {
      value: 'is_informasi_pendaftaran',
      status: status?.is_informasi_pendaftaran ?? false,
      label: 'Informasi Program',
      element: (
        <FormInformation
          title={title}
          status={detail?.status}
          next_value={'is_topik_bahasan_jadwal'}
        />
      ),
    },
    {
      value: 'is_topik_bahasan_jadwal',
      status: status?.is_topik_bahasan_jadwal ?? false,
      label: 'Topik Bahasan & Jadwal',
      element: (
        <TopicScheduleSection
          title={title}
          prev_value={'is_informasi_pendaftaran'}
          next_value={'is_persyaratan'}
        />
      ),
    },
    {
      value: 'is_persyaratan',
      status: status?.is_persyaratan ?? false,
      label: 'Persyaratan',
      element: (
        <FormCondition
          title={title}
          next_value={'is_biaya_pendaftaran'}
          prev_value={'is_topik_bahasan_jadwal'}
        />
      ),
    },
    {
      value: 'is_biaya_pendaftaran',
      status: status?.is_biaya_pendaftaran ?? false,
      label: 'Biaya Pendaftaran',
      element: (
        <RegisterPricing
          title={title}
          prev_value={'is_persyaratan'}
          next_value={'is_rekening_penerimaan'}
        />
      ),
    },
    {
      value: 'is_rekening_penerimaan',
      status: status?.is_rekening_penerimaan ?? false,
      label: 'Rekening Penerimaan',
      element: (
        <ListBankAccount
          title={title}
          prev_value={'is_biaya_pendaftaran'}
          next_value={'is_kontak_catatan_tambahan'}
        />
      ),
    },
    {
      value: 'is_kontak_catatan_tambahan',
      status: status?.is_kontak_catatan_tambahan ?? false,
      label: 'Kontak & Catatan Tambahan',
      element: <FormContactAndMoreNoted title={title} prev_value={'is_rekening_penerimaan'} />,
    },
  ]
}
