import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useEffect, useState } from 'react'
import { MdInfo } from 'react-icons/md'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { useForm } from 'react-hook-form'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { toast } from 'react-toastify'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { UseGetListJournal } from '@/pages/modules/LPPM/publication-hki/journal/list/hooks'
import { Link } from 'react-router-dom'

export const ListJournalPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const { linkJournal } = UseGetListJournal()

  useEffect(() => {
    if (linkJournal) {
      form.reset({
        url: linkJournal.url,
      })
    }
  }, [linkJournal])

  const queryClient = useQueryClient()

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post('/lppm/daftar-jurnal', e)
      .then((res) => {
        if (res.data.status) {
          setIsEdit(false)
          setLoading(false)
          toast.success(res.data.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['journal-link'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Internal Server Error')
      })
  }

  return (
    <>
      {isEdit ? (
        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(HandleSave)}>
            <ButtonTitleGroup
              label={'Edit URL'}
              buttonGroup={[
                { type: 'cancel', label: 'Batal', onClick: () => setIsEdit(!isEdit) },
                {
                  type: 'save',
                  label: 'Simpan',
                  onClick: () => {},
                },
              ]}
            />
            <TextInput
              name={'url'}
              form={form}
              label={'URL/Link'}
              placeholder={'URL/Link'}
              type={'url'}
              isRequired
              isRow
            />

            <ButtonForm loading={loading} onCancel={() => setIsEdit(!isEdit)} />
          </form>
        </Form>
      ) : (
        <div className="flex flex-col gap-4">
          <ButtonTitleGroup
            label={'Daftar Jurnal'}
            buttonGroup={[
              {
                type: 'edit',
                label: 'Edit URL',
                onClick: () => setIsEdit(!isEdit),
              },
            ]}
          />

          <div className="border rounded-full border-blue-500 w-fit text-sm flex items-center gap-1.5 px-4 p-1.5 text-blue-500 bg-blue-50">
            <MdInfo />
            Masukkan URL atau link publikasi atau jurnal perguruan tinggi anda.
          </div>

          <div className="grid grid-cols-[12rem_1fr] gap-4">
            <p className="text-gray-500">URL/Link</p>
            <Link
              to={linkJournal?.url ?? '#'}
              target={'_blank'}
              className={'underline underline-offset-4 decoration-blue-500 text-blue-500'}
            >
              {linkJournal?.url}
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
