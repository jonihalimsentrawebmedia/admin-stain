import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { ResolverRole, type TResolverRole } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { UseGetRoleTree } from '../hooks/index.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import type { IRole, IRoleTreeItem } from '../data/types.ts'

type AccessLevel = 'none' | 'view' | 'manage'

const getLevel = (item: IRoleTreeItem): AccessLevel => {
  if (item.kelola) return 'manage'
  if (item.melihat) return 'view'
  return 'none'
}

const flattenPaths = (items: IRoleTreeItem[], prefix = ''): [string, AccessLevel][] => {
  const result: [string, AccessLevel][] = []
  for (const item of items) {
    const path = prefix ? `${prefix}.${item.menu}` : item.menu
    result.push([path, getLevel(item)])
    if (item.children) result.push(...flattenPaths(item.children, path))
  }
  return result
}

const buildTree = (
  items: IRoleTreeItem[],
  levels: Record<string, AccessLevel>,
  prefix = ''
): IRoleTreeItem[] =>
  items.map((item) => {
    const path = prefix ? `${prefix}.${item.menu}` : item.menu
    const level = levels[path] ?? 'none'
    const child = item.children ? buildTree(item.children, levels, path) : null
    return {
      menu: item.menu,
      children: child,
      akses: level === 'manage',
      melihat: level === 'view' || level === 'manage',
      kelola: level === 'manage',
    }
  })

interface Props {
  data: IRole
}

export const FormEditRole = ({ data }: Props) => {
  const [permissions, setPermissions] = useState<Record<string, AccessLevel>>({})
  const [loading, setLoading] = useState(false)

  const { tree } = UseGetRoleTree()

  useEffect(() => {
    if (tree && data?.role) {
      const entries = flattenPaths(tree)
      const existing = flattenPaths(data.role as IRoleTreeItem[])
      const merged = Object.fromEntries(
        entries.map(([path]) => {
          const found = existing.find(([p]) => p === path)
          return [path, found ? found[1] : 'none']
        })
      )
      setPermissions(merged)
    }
  }, [tree, data])

  const form = useForm<TResolverRole>({
    resolver: zodResolver(ResolverRole),
  })

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (data) {
      form.reset({ kode: data.kode_role, nama: data.nama_role })
    }
  }, [data, form])

  const handleLevelChange = (path: string, level: AccessLevel) => {
    setPermissions((prev) => {
      const next = { ...prev, [path]: level }
      for (const key of Object.keys(next)) {
        if (key.startsWith(`${path}.`)) next[key] = level
      }
      return next
    })
  }

  const handleSelectAll = (level: AccessLevel) => {
    if (!tree) return
    const entries = flattenPaths(tree)
    setPermissions(Object.fromEntries(entries.map(([path]) => [path, level])))
  }

  const HandleSave = async (value: TResolverRole) => {
    if (!tree) return
    setLoading(true)
    const role = buildTree(tree, permissions)
    await AxiosClient.put(`/simrs/manajemen-user/role/${data.id_role}`, { ...value, role })
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          toast.success(res?.data?.message || 'Success')
          queryClient.invalidateQueries({ queryKey: ['role'] })
          queryClient.invalidateQueries({ queryKey: ['detail-role', data.id_role] })
          navigate('/modules/sim-rs/user-management/role')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  const renderTree = (items: IRoleTreeItem[], prefix = '') =>
    items.map((item) => {
      const path = prefix ? `${prefix}.${item.menu}` : item.menu
      const level = permissions[path] ?? 'none'
      const hasChildren = item.children && item.children.length > 0

      return (
        <div key={path}>
          <div
            className={`flex items-center px-4 py-3 ${hasChildren ? 'bg-gray-50/80' : 'border-t border-gray-100'}`}
          >
            <p
              className={`w-[200px] lg:w-[420px] shrink-0 ${hasChildren ? 'text-primary font-semibold text-base' : 'text-neutral-800 text-sm'}`}
            >
              {item.menu.replace(/_/g, ' ')}
            </p>

            <div className="flex items-center flex-1 gap-1">
              <div className="w-full lg:w-[180px] flex items-center gap-2">
                <input
                  type="radio"
                  name={path}
                  checked={level === 'none'}
                  onChange={() => handleLevelChange(path, 'none')}
                  className="w-4 h-4 accent-primary shrink-0"
                />
                <span className={`text-sm ${level === 'none' ? '' : 'text-neutral-400'}`}>Tidak Ada Akses</span>
              </div>
              <div className="w-full lg:w-[160px] flex items-center gap-2">
                <input
                  type="radio"
                  name={path}
                  checked={level === 'view'}
                  onChange={() => handleLevelChange(path, 'view')}
                  className="w-4 h-4 accent-primary shrink-0"
                />
                <span className={`text-sm ${level === 'view' ? '' : 'text-neutral-400'}`}>Melihat</span>
              </div>
              <div className="w-full lg:w-[120px] flex items-center gap-2">
                <input
                  type="radio"
                  name={path}
                  checked={level === 'manage'}
                  onChange={() => handleLevelChange(path, 'manage')}
                  className="w-4 h-4 accent-primary shrink-0"
                />
                <span className={`text-sm ${level === 'manage' ? '' : 'text-neutral-400'}`}>Kelola</span>
              </div>
            </div>
          </div>

          {hasChildren && (
            <div className="ml-8 border-l-2 border-gray-100">{renderTree(item.children!, path)}</div>
          )}
        </div>
      )
    })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(HandleSave)} className="space-y-6">
        <section className="space-y-4">
          <TitleLine title="Informasi Role" />
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              name="kode"
              label="Kode Role"
              placeholder="Masukkan kode role"
              form={form}
              isRequired
              inputClassName="bg-white"
            />
            <TextInput
              name="nama"
              label="Nama Role"
              placeholder="Masukkan nama role"
              form={form}
              isRequired
              inputClassName="bg-white"
            />
          </div>
        </section>

        <section className="space-y-4">
          <TitleLine title="Hak Akses Role" />
          <p className="text-blue-600 text-sm">Penjelasan jenis akses:</p>
          <ul className={'text-blue-600 text-sm list-disc pl-4'}>
            <li>
              Tidak Ada Akses → Menu tidak ditampilkan dan tidak dapat diakses oleh pengguna.
            </li>
            <li>
              Melihat → Menu dan data dapat dilihat, tetapi pengguna tidak dapat menambah,
              mengubah, maupun menghapus data.
            </li>
            <li>
              Kelola → Menu dan data dapat diakses sepenuhnya, termasuk melihat, menambah,
              mengubah, dan menghapus data.
            </li>
          </ul>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center px-4 py-3 bg-gray-100 border-b border-gray-200">
              <p className="w-[200px] lg:w-[420px] shrink-0 text-xs font-semibold text-neutral-500 uppercase tracking-wider pl-1">
                Menu
              </p>
              <div className="flex items-center flex-1 gap-2">
                <div className="w-full lg:w-[180px]">
                  <button
                    type="button"
                    onClick={() => handleSelectAll('none')}
                    className="text-xs font-medium text-neutral-500 bg-white border border-gray-300 rounded-md px-3 py-1.5 hover:bg-neutral-50 hover:border-neutral-400 transition-colors"
                  >
                    Semua Tidak Ada Akses
                  </button>
                </div>
                <div className="w-full lg:w-[160px]">
                  <button
                    type="button"
                    onClick={() => handleSelectAll('view')}
                    className="text-xs font-medium text-blue-600 bg-white border border-blue-300 rounded-md px-3 py-1.5 hover:bg-blue-50 hover:border-blue-400 transition-colors"
                  >
                    Semua Melihat
                  </button>
                </div>
                <div className="w-full lg:w-[120px]">
                  <button
                    type="button"
                    onClick={() => handleSelectAll('manage')}
                    className="text-xs font-medium text-emerald-600 bg-white border border-emerald-300 rounded-md px-3 py-1.5 hover:bg-emerald-50 hover:border-emerald-400 transition-colors"
                  >
                    Semua Kelola
                  </button>
                </div>
              </div>
            </div>
            {tree && renderTree(tree)}
          </div>
        </section>

        <ButtonForm loading={loading} />
      </form>
    </Form>
  )
}
