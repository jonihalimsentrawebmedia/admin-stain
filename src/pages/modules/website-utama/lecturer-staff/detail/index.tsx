import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import {useNavigate, useParams} from 'react-router-dom'
import {UseGetEmployeeById} from '@/pages/modules/website-utama/lecturer-staff/hooks'
import {format} from 'date-fns'
import TabsData from './data/tabs'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import CardPersonal from './components/CardPersonal'
import {useForm} from 'react-hook-form'
import {useEffect} from 'react'
import TabsPersonalInformation from './components/tabs/TabsPersonalInformation'
import {Button} from '@/components/ui/button.tsx'
import {ArrowLeft, ArrowRight} from 'lucide-react'

const DetailEmployee = () => {
  const {id} = useParams()
  const form = useForm()
  const {employee, nextPrevId} = UseGetEmployeeById(id as string)
  const navigate = useNavigate()
  const {tabs} = TabsData()
  useEffect(() => {
    if (employee) {
      form.reset({
        ...employee,
        tanggal_lahir: employee?.tanggal_lahir ? format(employee?.tanggal_lahir, 'dd-MM-yyy') : '',
      })
    }
  }, [employee])

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          isBack
          link={'/modules/website-utama/staff-lecturer/data'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <>
                  {nextPrevId?.previous && (
                    <Button
                      onClick={() =>
                        navigate(
                          `/modules/website-utama/staff-lecturer/data/detail/${nextPrevId?.previous?.id_sdm}`
                        )
                      }
                      variant={'outline'}
                      className={'border-primary text-primary hover:text-primary'}
                    >
                      <ArrowLeft/>
                      {nextPrevId?.previous?.nama}
                    </Button>
                  )}
                </>
              ),
            },
            {
              type: 'custom',
              element: (
                <>
                  {nextPrevId?.next && (
                    <Button
                      onClick={() =>
                        navigate(
                          `/modules/website-utama/staff-lecturer/data/detail/${nextPrevId?.next?.id_sdm}`
                        )
                      }
                      variant={'outline'}
                      className={'border-primary text-primary hover:text-primary'}
                    >
                      {nextPrevId?.next?.nama}
                      <ArrowRight/>
                    </Button>
                  )}
                </>
              ),
            },
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () => navigate(`/modules/website-utama/staff-lecturer/data/edit/${id}`),
            },
          ]}
          label="Detail Data Dosen & Staff"
        />

        <Tabs defaultValue="informasi-pribadi" className="w-full mt-5">
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
            <CardPersonal form={form}/>
            <TabsPersonalInformation form={form}/>
          </TabsContent>

          {tabs.map((item, index) => (
            <TabsContent key={item.label + index} value={item.value} className="mt-6 space-y-4">
              {item.value !== 'informasi-pribadi' && <CardPersonal form={form}/>}
              {item.element}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}

export default DetailEmployee
