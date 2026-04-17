import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import type { IEmployee } from '@/pages/modules/website-utama/lecturer-staff/data/types.ts'
import { FaSave } from 'react-icons/fa'
import type { IStatusEmployee } from '@/pages/modules/website-utama/lecturer-staff/status-employee/data/types.ts'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

interface props {
  data: IEmployee
  disabled: boolean
  status: IStatusEmployee[]
}

export const SelectStatus = (props: props) => {
  const { data, status, disabled } = props
  const form = useForm()

  const [open, setOpen] = useState(false)
  const formValue = form.getValues()

  useEffect(() => {
    if (data) {
      form.reset({
        id_status: data?.id_status,
        nidn: data?.nidn,
      })
    }
  }, [data])

  const HandleOpen = () => setOpen(!open)

  const HandleSaveOnce = async () => {
    await AxiosClient.patch(`/website-utama/sdm/update-single-status/${data?.id_sdm}`, formValue)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success')
          setOpen(false)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Form {...form}>
        <form
          className={'w-full max-[400px] flex items-center gap-2'}
          onSubmit={form.handleSubmit(HandleOpen)}
        >
          <SelectBasicInput
            isDisabled={!disabled}
            placeholder={'Pilih Unit Kerja'}
            className={'w-full min-w-[250px]'}
            selectClassName={'w-full'}
            form={form}
            usePortal
            name={'id_status'}
            data={
              status?.map((row) => ({
                label: row?.nama_status,
                value: row?.id_status_sdm,
              })) ?? []
            }
          />
          <button
            disabled={!disabled}
            className={
              'bg-green-500 text-white p-1.5 rounded hover:bg-green-600 disabled:bg-green-300'
            }
          >
            <FaSave />
          </button>
        </form>
      </Form>

      <DialogBasic title={'Simpan Status'} open={open} setOpen={setOpen} className={'lg:min-w-3xl'}>
        <p>
          Anda akan mengubah status data{' '}
          <span className={'font-semibold text-primary'}>{data?.nama}</span> menjadi "
          {status?.find((row) => row?.id_status_sdm === formValue?.id_status)?.nama_status}" Karena
          status ini memerlukan identitas pendidik yang valid, mohon lengkapi
          {status?.find((row) => row?.id_status_sdm === formValue?.id_status)?.is_ada_nidn &&
            ' atau pastikan NIDN untuk masing-masing'}
          data di bawah ini sudah benar sebelum menyimpan.
        </p>

        <Table>
          <TableHeader className={'bg-primary'}>
            <TableRow className={'bg-primary hover:bg-primary'}>
              <TableHead className={'text-white'}>Nama</TableHead>
              <TableHead className={'text-white'}>NIP</TableHead>
              <TableHead className={'text-white'}>NIDN</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{data?.nama}</TableCell>
              <TableCell>{data?.nip}</TableCell>
              <TableCell>
                {status?.find((row) => row?.id_status_sdm === formValue?.id_status)?.is_ada_nidn ? (
                  <Input
                    value={form.watch('nidn') ?? ''}
                    onChange={(e) => form.setValue('nidn', e.target.value)}
                    name={'nidn'}
                    className={'w-full focus-visible:ring-0 rounded'}
                    placeholder={'NIDN'}
                    type={'number'}
                  />
                ) : (
                  <p>{data?.nidn ?? '-'}</p>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            { type: 'cancel', label: 'Batal', onClick: () => setOpen(false) },
            {
              type: 'custom',
              element: (
                <Button onClick={HandleSaveOnce}>
                  <FaSave /> Simpan
                </Button>
              ),
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}
