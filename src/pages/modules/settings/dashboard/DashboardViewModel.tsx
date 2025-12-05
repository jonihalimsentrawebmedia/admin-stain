import { useForm } from 'react-hook-form'
import {
  IconDomain,
  IconFaculty,
  IconInstitution,
  IconProgram,
  IconUnit,
  IconUniversity,
} from './components/icon'
import useGetDashboard from './controller/useGetDashboard'
import { useEffect } from 'react'

const DashboardViewModel = () => {
  const { dashboard } = useGetDashboard()
  const form = useForm()
  const data = [
    {
      label: 'Domain ',
      bg: '#F7F7F7',
      bgLabel: '#464646',
      icon: <IconDomain />,
      count: '1000',
      name: 'domain',
    },
    {
      label: 'Universitas ',
      bg: '#F5FFFA',
      bgLabel: '#0E874A',
      icon: <IconUniversity />,
      count: '1',
      name: 'universitas',
    },
    {
      label: 'Fakultas',
      bg: '#F5F9FF',
      bgLabel: '#0E3E87',
      icon: <IconFaculty />,
      count: '6',
      name: 'fakultas',
    },
    {
      label: 'Program Studi',
      bg: '#FFF5F6',
      bgLabel: '#870E1A',
      icon: <IconProgram />,
      count: '12',
      name: 'program_studi',
    },
    {
      label: 'Unit',
      bg: '#FFFCF5',
      bgLabel: '#87690E',
      icon: <IconUnit />,
      count: '5',
      name: 'unit',
    },
    {
      label: 'Lembaga',
      bg: '#F4FEFF',
      bgLabel: '#0E8187',
      icon: <IconInstitution />,
      count: '5',
      name: 'lembaga',
    },
  ]

  useEffect(() => {
    if (dashboard) {
      form.reset({
        ...dashboard,
      })
    }
  }, [dashboard])
  return {
    data,
    form,
  }
}

export default DashboardViewModel
