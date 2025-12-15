import { useEffect, useState } from 'react'
import useGetStatistic from './controller/useGetStatistic'
import { useForm } from 'react-hook-form'
import { StatisticUniversitySchema, type StatistikUniversitasType } from './model'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const StatisticViewModel = () => {
  const navigate = useNavigate()
  const form = useForm<StatistikUniversitasType>({
    resolver: zodResolver(StatisticUniversitySchema),
  })
  const [loadingSave, setLoadingSave] = useState(false)
  const queryClient = useQueryClient()

  const handleSave = async (e: StatistikUniversitasType) => {
    setLoadingSave(true)
    await AxiosClient.post('/website-utama/statistik', {
      ...e,
      data: {
        gambars: imageStatistic,
      },
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['statistic'],
          })

          setLoadingSave(false)
          setImageStatisticTemp(imageStatisticTemp)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoadingSave(false)
      })
  }
  const [isEdit, setIsEdit] = useState(false)
  const { loading, statistic } = useGetStatistic()
  const [imageStatistic, setImageStatistic] = useState<string[]>([])
  const [imageStatisticTemp, setImageStatisticTemp] = useState<string[]>([])

  const field = [
    {
      name: 'mahasiswa',
      label: 'Mahasiswa',
    },
    {
      name: 'lektor',
      label: 'Lektor',
    },
    {
      name: 'program_studi',
      label: 'Program Studi',
    },
    {
      name: 'asisten_ahli',
      label: 'Asisten Ahli',
    },
    {
      name: 'guru_besar',
      label: 'Guru Besar',
    },
    {
      name: 'staf_pengajar',
      label: 'Staf Pengajar',
    },
    {
      name: 'lektor_kepala',
      label: 'Lektor Kepala',
    },
  ]
  function changeOnEdit() {
    setImageStatistic(imageStatisticTemp)
    setIsEdit(!isEdit)
  }

  function goToLog() {
    navigate('log')
  }
  useEffect(() => {
    if (statistic) {
      const temp = [...(statistic?.data?.gambars ?? [])]
      if (temp.length < 3) {
        for (let i = temp.length; i < 3; i++) {
          temp.push('')
        }
      }
      setImageStatistic(temp)
      setImageStatisticTemp(temp)

      form.reset({
        ...statistic,
      })
    }
  }, [statistic])
  console.log(imageStatisticTemp, 'tempI')
  console.log(imageStatistic, 'tempII')
  return {
    form,
    statistic,
    field,
    isEdit,
    changeOnEdit,
    loading,
    imageStatistic,
    setImageStatistic,
    handleSave,
    loadingSave,
    goToLog,
  }
}

export default StatisticViewModel
