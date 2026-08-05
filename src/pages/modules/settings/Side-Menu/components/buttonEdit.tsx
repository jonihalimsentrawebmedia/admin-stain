import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { IconEdit } from '@/components/common/table/icon'
import { MenuResolver, type TMenuForm } from '../data/resolver'
import { collectMenuIds, flattenMenu } from '../data/utils'
import type { ResReferensiType } from '@/interface/select'
import type { IMenu } from '../data/types'
import { FormSideMenu } from './form'

interface Props {
  data: IMenu
  menu: IMenu[]
}

const ButtonEditSideMenu = ({ data, menu }: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TMenuForm>({
    resolver: zodResolver(MenuResolver),
    defaultValues: {
      parent_id: '',
      label: '',
      link: '',
      icon: '',
      urutan: 1,
      is_active: true,
    },
  })

  const excludedIds = useMemo(() => collectMenuIds([data]), [data])
  const parentOptions: ResReferensiType[] = useMemo(
    () =>
      flattenMenu(menu)
        .filter((item) => !excludedIds.has(item.id_menu))
        .map((item) => ({
          value: item.id_menu,
          label: `${'— '.repeat(item.depth)}${item.label}`,
        })),
    [menu, excludedIds]
  )

  const queryClient = useQueryClient()
  async function handleSave(values: TMenuForm) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(`/pengaturan/menu/${data.id_menu}`, {
        ...values,
        parent_id: values.parent_id || null,
        icon: values.icon || null,
        link: values.link || '',
      })

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['settings-side-menu'],
        })
        setOpen(false)
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        className="cursor-pointer"
        onClick={() => {
          setOpen(true)
          form.reset({
            parent_id: data.parent_id ?? '',
            label: data.label,
            link: data.link ?? '',
            icon: data.icon ?? '',
            urutan: data.urutan ?? 1,
            is_active: data.is_active ?? true,
          })
        }}
      >
        <IconEdit />
      </button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Edit Menu</p>}
      >
        <FormSideMenu
          loading={loading}
          open={open}
          setOpen={setOpen}
          form={form}
          HandleSave={handleSave}
          parentOptions={parentOptions}
        />
      </DialogCustom>
    </>
  )
}

export default ButtonEditSideMenu
