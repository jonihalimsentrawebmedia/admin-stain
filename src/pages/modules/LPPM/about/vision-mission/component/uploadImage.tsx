'use client'

import clsx from 'clsx'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import React from 'react'
import { MdUpload } from 'react-icons/md'

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
}

export default function FormUploadImage<T extends FieldValues>({ form, name }: Props<T>) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form

  const file = watch(name) as string | undefined
  const error = errors[name]

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('berkas', selectedFile)

    await AxiosClient.post('/upload', formData)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message)
          setValue(name, res.data.url)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <div className="w-full space-y-2">
      <div className={clsx('relative overflow-hidden space-y-2')}>
        {file ? (
          <img src={file} alt="Preview" className="w-full h-60 object-cover rounded" />
        ) : (
          <div className="w-full h-60 bg-gray-100 flex items-center justify-center text-gray-400">
            Belum ada gambar
          </div>
        )}
        <label className="bottom-4 left-4 right-4 cursor-pointer">
          <div className="flex items-center justify-center gap-2 bg-white border rounded-md py-2 text-green-700 font-medium shadow-sm hover:bg-gray-50 transition">
            <MdUpload />
            Ganti Gambar
          </div>

          <input type="file" accept="image/*" className="hidden" onChange={handleChange} />
        </label>
      </div>

      {error && <p className="text-sm text-red-500">{(error as any)?.message}</p>}
    </div>
  )
}
