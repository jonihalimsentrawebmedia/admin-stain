import type { UseFormReturn } from 'react-hook-form'
import type { TResolverAttendance } from './resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { UseGetHumanResource } from '@/pages/modules/E-Office/reference/human-resource/hooks.tsx'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { ColumnsHumanResource } from '@/pages/modules/E-Office/event-activity/event-data/detail/component/list-attandaces/component/columns.tsx'
import { TableBasicState } from '@/components/common/table/tableUsestate.tsx'
import { useEffect, useState } from 'react'
import TablePagination from '@/components/common/table/TablePagination.tsx'

interface props {
  form: UseFormReturn<TResolverAttendance>
  loading: boolean
  open: boolean
  setOpen: (e: boolean) => void
  HandleSave: (e: TResolverAttendance) => void
}

const FormAttendance = (props: props) => {
  const { form, loading, open, setOpen, HandleSave } = props

  const [collected, setCollected] = useState<string[]>([])
  const [filter, setFilter] = useState({
    page: '1',
    limit: '10',
    search: '',
  })

  const { institution } = UseGetUnitInstitution()
  const { humanResource, meta } = UseGetHumanResource({
    page: filter.page,
    limit: filter.limit,
    search: filter.search,
  })
  const columns = ColumnsHumanResource()

  useEffect(() => {
    form.setValue('id_sdm', collected)
  }, [collected])

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <InputRadio
            form={form}
            name={'sumber_data'}
            data={['MANUAL', 'INTERNAL']?.map((row) => ({
              label: row?.toLowerCase(),
              value: row,
            }))}
          />

          {form.watch('sumber_data') === 'MANUAL' ? (
            <>
              <SelectBasicInput
                name={'id_unit'}
                form={form}
                placeholder={'Asal/ Instansi'}
                label={'Asal/ Instansi'}
                selectClassName={'z-50'}
                isDisabled
                isRequired
                data={
                  institution?.map((row) => ({
                    label: row?.nama,
                    value: row?.id_satuan_organisasi,
                  })) ?? []
                }
              />
              <SelectBasicInput
                name={'id_unit_kerja'}
                form={form}
                placeholder={'Asal/ Instansi'}
                label={'Asal/ Instansi'}
                selectClassName={'z-50'}
                isRequired
                data={
                  institution
                    ?.filter((row) => row.id_satuan_organisasi !== form.getValues('id_unit'))
                    .map((row) => ({
                      label: row?.nama,
                      value: row?.id_satuan_organisasi,
                    })) ?? []
                }
              />
              <TextInput
                name={'nama_lengkap'}
                form={form}
                label={'Nama Lengkap'}
                placeholder={'Nama Lengkap'}
                htmlFor={'nama'}
                isRequired
              />
              <TextInput
                name={'jabatan'}
                form={form}
                label={'Jabatan'}
                placeholder={'Jabatan'}
                htmlFor={'jabatan'}
                isRequired
              />
              <TextInput
                name={'no_hp'}
                form={form}
                label={'No. HP'}
                placeholder={'No. HP'}
                htmlFor={'no_hp'}
                type={'number'}
                isRequired
              />
            </>
          ) : (
            form.watch('sumber_data') === 'INTERNAL' && (
              <>
                <TableBasicState
                  columns={columns}
                  data={humanResource}
                  rowIdKey={'id_sdm'}
                  selected={collected}
                  onSelectedRowsChange={setCollected}
                />
                {meta && (
                  <TablePagination
                    length={meta?.total}
                    meta={meta}
                    setPage={(e) => {
                      setFilter({
                        ...filter,
                        page: e.toString(),
                      })
                    }}
                  />
                )}
              </>
            )
          )}

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

export default FormAttendance
