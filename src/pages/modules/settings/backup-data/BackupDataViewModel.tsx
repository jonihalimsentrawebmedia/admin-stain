import AxiosClient from '@/provider/axios'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useGetStatusBackupData } from './hooks'
import { useForm } from 'react-hook-form'

const BackupDataViewModel = () => {
  const form = useForm()
  const { loading: loadingBackup, session } = useGetStatusBackupData()
  const [loading, setLoading] = useState(false)
  const [loadingDownload, setLoadingDownload] = useState(false)
  const [progress, setProgress] = useState(0)
  const field = [
    {
      name: 'status',
      label: 'Status',
    },
    {
      name: 'nama_backup_user',
      label: 'User yang melakukan backup',
    },
    {
      name: 'backup_at',
      label: 'Tanggal Backup',
      component: <div>{session ? format(session.backup_at, 'dd:mm:yyyy, hh:mm') : '-'}</div>,
    },
    {
      name: 'nama_download_user',
      label: 'User yang mendownload',
    },
    {
      name: 'download_at',
      label: 'Tanggal Download',
      component: <div>{session ? format(session.download_at, 'dd:mm:yyyy, hh:mm') : '-'}</div>,
    },
  ]
  const queryClient = useQueryClient()
  async function handleCreateBackup() {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/pengaturan/backup/create`)

      if (res.data.status) {
        await queryClient.invalidateQueries({
          queryKey: ['backup-data'],
        })
        toast.success(res.data.message)
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }
  async function handleDownloadBackup() {
    setLoadingDownload(true)

    try {
      const res = await AxiosClient.get(`/pengaturan/backup/download`, {
        responseType: 'blob', // 🔥 wajib
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setProgress(percent)
          } else {
            // fallback: naikkan progress perlahan
            setProgress((prev) => (prev < 90 ? prev + 5 : prev))
          }
        },
      })

      const contentType = res.headers['content-type']
      const disposition = res.headers['content-disposition']

      // 🔥 Kalau backend kirim JSON error
      if (contentType?.includes('application/json')) {
        const text = await res.data.text()
        const json = JSON.parse(text)
        toast.error(json.message)
        return
      }

      // 🔥 Ambil filename dari header kalau ada
      let filename = 'backup'

      if (disposition) {
        const match = disposition.match(/filename="?(.+)"?/)
        if (match?.[1]) {
          filename = match[1]
        }
      } else {
        // fallback dari content-type
        if (contentType?.includes('zip')) {
          filename = 'backup.zip'
        } else {
          filename = 'backup.sql'
        }
      }

      const blob = new Blob([res.data], { type: contentType })

      const url = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = filename

      document.body.appendChild(link)
      link.click()
      link.remove()

      window.URL.revokeObjectURL(url)

      toast.success('Backup berhasil didownload')
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoadingDownload(false)
      setTimeout(() => setProgress(0), 500)
    }
  }

  useEffect(() => {
    if (session) {
      form.reset({
        ...session,
      })
    }
  }, [session])
  return {
    handleCreateBackup,
    handleDownloadBackup,
    loading,
    loadingBackup,
    field,
    form,
    progress,loadingDownload
  }
}

export default BackupDataViewModel
