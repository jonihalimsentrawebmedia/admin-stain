import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { FaCirclePlus } from 'react-icons/fa6'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { UseGetHumanResource } from '@/pages/modules/E-Office/reference/human-resource/hooks.tsx'
import TableSelectSdm from '@/pages/modules/E-Office/official-travel/Letter-Assigment/component/tableSelectSdm.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { UseFormReturn } from 'react-hook-form'
import type { TEmployeeSchema } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/data/resolver.tsx'
import FormAssignmentManual from '@/pages/modules/E-Office/official-travel/Letter-Assigment/component/formAssignment.tsx'

interface props {
  form: UseFormReturn<any>
  name: string
}

const ButtonUserAssignment = (props: props) => {
  const { form, name } = props
  const data = form.watch(name)

  console.log(data)

  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState<BasicProps>({
    search: '',
    page: '1',
    limit: '10',
  })
  const [listUser, setListUser] = useState<TEmployeeSchema[]>([])

  const { humanResource, meta } = UseGetHumanResource({
    page: filter.page,
    limit: filter.limit,
    search: filter.search,
  })

  const Methods = [
    {
      value: 'DOSEN_STAFF',
      label: 'Pilih Pegawai',
      elements: (
        <TableSelectSdm
          data={humanResource}
          meta={meta}
          filter={filter}
          setFilter={setFilter}
          listUser={listUser}
          setListUser={setListUser}
          form={form}
          name={name}
          open={open}
          setOpen={setOpen}
        />
      ),
    },
    {
      value: 'MANUAL',
      label: 'Input Manual',
      elements: (
        <FormAssignmentManual
          HandleSave={(e) => {
            const temp = data ? [...data, ...e] : [...e]
            form.setValue(name, temp)
            setOpen(!open)
          }}
        />
      ),
    },
  ]

  return (
    <>
      <Button
        className={'border-primary text-primary rounded-full'}
        variant={'outline'}
        onClick={(e) => {
          e.preventDefault()
          setOpen(true)
        }}
      >
        <FaCirclePlus />
        Tambah Pegawai
      </Button>

      <DialogBasic
        disableOutsideDialog={true}
        title={'Tambah Pegawai Kegiatan'}
        className={'min-w-4xl'}
        open={open}
        setOpen={setOpen}
      >
        <Tabs>
          <TabsList>
            {Methods?.map((row, index) => (
              <TabsTrigger value={row.value} key={index}>
                {row?.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {Methods?.map((row, index) => (
            <TabsContent key={index} value={row?.value}>
              {row?.elements}
            </TabsContent>
          ))}
        </Tabs>
      </DialogBasic>
    </>
  )
}

export default ButtonUserAssignment
