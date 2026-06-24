import FormInformation from '@/pages/modules/Pulsikom/training/list-training/component/form/information.tsx'
import { UseGetStatusTraining } from '@/pages/modules/Pulsikom/training/list-training/hooks'
import { TopicScheduleSection } from '@/pages/modules/Pulsikom/training/list-training/component/topic-schedule'
import { FormCondition } from '@/pages/modules/Pulsikom/training/list-training/component/form/formCondition.tsx'
import { RegisterPricing } from '@/pages/modules/Pulsikom/training/list-training/component/register-pricing'
import ListBankAccount from '@/pages/modules/Pulsikom/training/list-training/component/bankAccount'
import { FormContactAndMoreNoted } from '@/pages/modules/Pulsikom/training/list-training/component/form/formContactAndMoreNoted.tsx'

export const GenerateTabsData = (title: string) => {
  const id = window.localStorage.getItem('id_training')
  const { detail } = UseGetStatusTraining(id as string)
  const status = detail?.status_pengisian

  return [
    {
      value: 'is_informasi_pendaftaran',
      status: status?.is_informasi_pendaftaran ?? false,
      label: 'Informasi Training',
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
          prev_value={'is_topik_bahasan_jadwal'}
          next_value={'is_biaya_pendaftaran'}
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
