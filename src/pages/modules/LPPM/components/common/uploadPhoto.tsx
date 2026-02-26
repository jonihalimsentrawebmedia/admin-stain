'use client'

import { Loader2 } from 'lucide-react'
import type { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { useRef, useState } from 'react'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import clsx from 'clsx'
import { FaTrash } from 'react-icons/fa'
import { MdUpload } from 'react-icons/md'

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  label?: string
}

export default function FormUploadPhotoImage<T extends FieldValues>({
  form,
  name,
  label = 'Foto Profil',
}: Props<T>) {
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const value = form.watch(name)
  const error = form.formState.errors[name]

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Maksimal ukuran file 2MB')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('berkas', file)

      const res = await AxiosClient.post('/upload', formData)

      if (res.data.status) {
        const url: string = res.data.url

        form.setValue(name, url as PathValue<T, Path<T>>, {
          shouldValidate: true,
        })
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Gagal upload gambar')
    } finally {
      setLoading(false)

      // 🔥 reset supaya file yang sama bisa dipilih lagi
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  const handleDelete = () => {
    form.setValue(name, '' as PathValue<T, Path<T>>, {
      shouldValidate: true,
    })

    // 🔥 reset input juga
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center p-4 rounded-lg">
      {/* LEFT IMAGE */}
      <div className="w-[240px] h-[320px] bg-gray-100 rounded overflow-hidden">
        {value ? (
          <img src={value as string} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            Belum ada foto
          </div>
        )}
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">{label}</h3>

        <ul className="text-sm text-blue-600 list-disc pl-5 space-y-1">
          <li>Ukuran 3×4</li>
          <li>Maks: 2 MB</li>
          <li>Jenis file: .jpg/.jpeg/.png</li>
        </ul>

        <div className="flex items-center gap-3">
          {/* Upload */}
          <label className="cursor-pointer">
            <div
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-md border border-green-600 text-green-700 bg-green-50 hover:bg-green-100 transition'
              )}
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <MdUpload size={16} />}
              {loading ? 'Uploading...' : 'Upload'}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </label>

          {/* Delete */}
          {value && (
            <button
              type="button"
              onClick={handleDelete}
              className="p-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition"
            >
              <FaTrash size={16} />
            </button>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error?.message as string}</p>}
      </div>
    </div>
  )
}
