import { Form } from '@/components/ui/form.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaSave } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { type Dispatch, type SetStateAction, useEffect, useMemo, useState } from 'react'
import type { IStatusEmployee } from '@/pages/modules/website-utama/lecturer-staff/status-employee/data/types.ts'
import type { IEmployee } from '@/pages/modules/website-utama/lecturer-staff/data/types.ts'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Input } from '@/components/ui/input.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface props {
  selected: string[]
  setSelected: Dispatch<SetStateAction<string[]>>
  status: IStatusEmployee[]
  employee: IEmployee[]
}

export const MultipleStatus = (props: props) => {
  const { selected, status, employee } = props

  const form = useForm()
  const [open, setOpen] = useState(false)
  const HandleOpen = () => setOpen(!open)

  const formValue = form.getValues()

  const temp = useMemo(() => {
    return employee.filter((row) => selected.includes(row?.id_sdm))
  }, [employee, selected])

  useEffect(() => {
    form.reset({
      id_sdm: temp.map((row) => ({
        id: row?.id_sdm,
        nidn: row?.nidn,
      })),
    })
  }, [temp])

  const queryClient = useQueryClient()
  const HandleSave = async () => {
    console.log(formValue)
    await AxiosClient.patch('/website-utama/sdm/update-multiple-status', formValue)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['employee'],
          })
          setOpen(false)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <div className={'border border-primary p-4 rounded-md flex items-center justify-between'}>
        <p className="font-semibold text-primary">Pembaruan Masal</p>
        <div className={'flex items-center gap-x-1.5 whitespace-nowrap'}>
          <p className="text-blue-500 font-semibold">Jumlah Data Dipilih : ({selected.length})</p>
          <Form {...form}>
            <form
              className={'w-full max-[400px] flex items-center gap-2'}
              onSubmit={form.handleSubmit(HandleOpen)}
            >
              <SelectBasicInput
                placeholder={'Pilih Status Employee'}
                className={'w-full'}
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
              <Button>
                <FaSave />
                Simpan
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <DialogBasic title={'Simpan Status'} open={open} setOpen={setOpen} className={'lg:min-w-3xl'}>
        <div>
          {status?.find((row) => row.id_status_sdm === formValue.id_status)?.is_ada_nidn ? (
            <p>
              Anda akan mengubah status {temp.length} data terpilih menjadi "
              {status?.find((row) => row?.id_status_sdm === formValue.id_status)?.nama_status}".
              Karena status ini memerlukan identitas pendidik yang valid, mohon lengkapi atau
              pastikan NIDN untuk masing-masing data di bawah ini sudah benar sebelum menyimpan.
            </p>
          ) : (
            <>
              Anda akan mengubah status {temp?.length} data terpilih menjadi "
              {status?.find((row) => row?.id_status_sdm === formValue.id_status)?.nama_status}".
              Karena status ini tidak memerlukan NIDN, data NIDN yang ada pada profil tersebut akan
              diarsipkan secara otomatis. Anda dapat mengaktifkannya kembali jika status pegawai
              berubah menjadi dosen di kemudian hari.
            </>
          )}
        </div>
        <Table>
          <TableHeader className={'bg-primary'}>
            <TableRow className={'bg-primary hover:bg-primary'}>
              <TableHead className={'text-white'}>Nama</TableHead>
              <TableHead className={'text-white'}>NIP</TableHead>
              <TableHead className={'text-white'}>NIDN</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {temp?.map((row, k) => (
              <TableRow key={k}>
                <TableCell>{row?.nama}</TableCell>
                <TableCell>{row?.nip}</TableCell>
                <TableCell>
                  {status?.find((row) => row?.id_status_sdm === formValue?.id_status)
                    ?.is_ada_nidn ? (
                    <Input
                      value={form.watch(`id_sdm.${k}.nidn`) ?? ''}
                      onChange={(e) => {
                        form.setValue(`id_sdm.${k}.nidn`, e.target.value)
                        form.setValue(`id_sdm.${k}.id`, row?.id_sdm)
                      }}
                      min={0}
                      onWheel={(e) => e.currentTarget.blur()}
                      name={'nidn'}
                      className={'w-full focus-visible:ring-0 rounded'}
                      placeholder={'NIDN'}
                      type={'number'}
                    />
                  ) : (
                    <p>{row?.nidn ?? '-'}</p>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            { type: 'cancel', label: 'Batal', onClick: () => setOpen(false) },
            {
              type: 'custom',
              element: (
                <Button onClick={HandleSave} disabled={temp.length === 0}>
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
