import TabsFormalEducation from '../components/tabs/TabsFormalEducation'
import TabsFunctionalPosition from '../components/tabs/TabsFunctionalPosition'
import TabsRank from '../components/tabs/TabsRank'
import TabsResearch from '../components/tabs/TabsResearch'
import TabsHKI from '../components/tabs/TabsHKI'
import TabsDevotion from '../components/tabs/TabsDevotion'
import NewSectionPublication from '@/pages/modules/website-utama/lecturer-staff/detail/components/publication/newSectonPublication.tsx'
import type { IEmployee } from '@/pages/modules/website-utama/lecturer-staff/data/types.ts'

interface props {
  data?: IEmployee
}

const TabsData = (props: props) => {
  const { data } = props
  const show = data?.sumber_data === 'MANUAL' && !data?.id_sister
  const tabs = [
    {
      value: 'informasi-pribadi',
      label: 'Informasi Pribadi',
      element: <></>,
    },
    {
      value: 'pendidikan-formal',
      label: 'Pendidikan Formal',
      element: <TabsFormalEducation show={!show} />,
    },
    {
      value: 'jabatan-fungsional',
      label: 'Jabatan Fungsional',
      element: <TabsFunctionalPosition show={!show} />,
    },
    {
      value: 'kepangkatan',
      label: 'Kepangkatan',
      element: <TabsRank show={!show} />,
    },
    {
      value: 'penelitian',
      label: 'Penelitian',
      element: <TabsResearch show={!show} />,
    },
    {
      value: 'publikasi',
      label: 'Publikasi',
      // element: <TabsPublication/>,
      element: <NewSectionPublication show={!show} />,
    },
    {
      value: 'hki-paten',
      label: 'HKI/PATEN',
      element: <TabsHKI show={!show} />,
    },
    {
      value: 'pengabdian',
      label: 'Pengabdian',
      element: <TabsDevotion show={!show} />,
    },
  ]
  return { tabs }
}

export default TabsData
