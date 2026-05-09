import TabsFormalEducation from '../components/tabs/TabsFormalEducation'
import TabsFunctionalPosition from '../components/tabs/TabsFunctionalPosition'
import TabsRank from '../components/tabs/TabsRank'
import TabsResearch from '../components/tabs/TabsResearch'
import TabsPublication from '../components/tabs/TabsPublication'
import TabsHKI from '../components/tabs/TabsHKI'
import TabsDevotion from '../components/tabs/TabsDevotion'

const TabsData = () => {
   const tabs = [
    {
      value: 'informasi-pribadi',
      label: 'Informasi Pribadi',
      element: <></>,
    },
    {
      value: 'pendidikan-formal',
      label: 'Pendidikan Formal',
      element: <TabsFormalEducation />,
    },
    {
      value: 'jabatan-fungsional',
      label: 'Jabatan Fungsional',
      element: <TabsFunctionalPosition/>,
    },
    {
      value: 'kepangkatan',
      label: 'Kepangkatan',
      element: <TabsRank/>,
    },
    {
      value: 'penelitian',
      label: 'Penelitian',
      element: <TabsResearch/>,
    },
    {
      value: 'publikasi',
      label: 'Publikasi',
      element: <TabsPublication/>,
    },
    {
      value: 'hki-paten',
      label: 'HKI/PATEN',
      element: <TabsHKI/>,
    },
    {
      value: 'pengabdian',
      label: 'Pengabdian',
      element: <TabsDevotion/>,
    },
  ]
  return { tabs }
}

export default TabsData
