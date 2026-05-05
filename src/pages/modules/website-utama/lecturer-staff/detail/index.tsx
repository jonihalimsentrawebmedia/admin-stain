import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetEmployeeById } from '@/pages/modules/website-utama/lecturer-staff/hooks'
import { format } from 'date-fns'
import TabsData from './data/tabs'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CardPersonal from './components/CardPersonal'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import TabsPersonalInformation from './components/tabs/TabsPersonalInformation'

const DetailEmployee = () => {
  const { id } = useParams()
  const form = useForm()
  const { employee } = UseGetEmployeeById(id as string)
  const navigate = useNavigate()
  const { tabs } = TabsData()
  useEffect(() => {
    if (employee) {
      form.reset({
        ...employee,
      })
    }
  }, [employee])
  return (
    <>
      <div className={'space-y-4'}>
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () => navigate(`/modules/website-utama/staff-lecturer/data/edit/${id}`),
            },
          ]}
          label="Detail Data Dosen & Staff"
        />
        {/* 
        <p className="text-primary text-xl font-semibold">Informasi Pribadi</p>

        <div className="flex items-start gap-x-8">
          <img
            src={employee?.gambar_url}
            alt="gambar"
            className="w-[220px] h-[300px] rounded-md object-cover"
          />

          <div className={'grid grid-cols-2 gap-4'}>
            <p className="text-gray-500">Nama</p>
            <p>{employee?.nama}</p>
            <p className="text-gray-500">NIK</p>
            <p>{employee?.nik}</p>
            <p className="text-gray-500">Tempat Lahir</p>
            <p>{employee?.tempat_lahir}</p>
            <p className="text-gray-500">Tanggal Lahir</p>
            <p>{employee?.tanggal_lahir ? format(employee?.tanggal_lahir, 'dd-MM-yyy') : ''}</p>
            <p className="text-gray-500">No. HP</p>
            <p>{employee?.no_hp}</p>
            <p className="text-gray-500">Email</p>
            <p>{employee?.email}</p>
          </div>
        </div>

        <p className="text-primary text-xl font-semibold mt-5">Informasi Kepegawaian</p>
        <div className={'grid grid-cols-2 gap-4'}>
          <p className="text-gray-500">Status</p>
          <p>{employee?.nama_status}</p>
          <p className="text-gray-500">NIP</p>
          <p>{employee?.nip}</p>
          <p className="text-gray-500">NIDN</p>
          <p>{employee?.nidn}</p>
          <p className="text-gray-500">Unit Kerja</p>
          <p>{employee?.nama_unit_kerja}</p>
          <p className="text-gray-500">Golongan</p>
          <p>{employee?.golongan}</p>
          <p className="text-gray-500">Jabatan Struktural</p>
          <p>{employee?.jabatan_struktural}</p>
        </div> */}

        <Tabs defaultValue="informasi-pribadi" className="w-full">
          <TabsList className="h-auto bg-transparent p-0 flex flex-wrap justify-start gap-2">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="
                rounded-md
                px-4
                py-2
                text-sm
                text-primary
                bg-transparent
                hover:bg-green-50
                data-[state=active]:bg-primary
                data-[state=active]:text-white
                data-[state=active]:shadow-none
              "
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={'informasi-pribadi'} className="mt-6 space-y-4">
            <CardPersonal form={form} />
            <TabsPersonalInformation form={form} />
          </TabsContent>

          {tabs.map((item, index) => (
            <TabsContent key={item.label + index} value={item.value} className="mt-6 space-y-4">
              {item.value !== 'informasi-pribadi' && <CardPersonal form={form} />}
              {item.element}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}

export default DetailEmployee
