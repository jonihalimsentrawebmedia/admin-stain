import { Button } from '@/components/ui/button'
import Cookies from 'js-cookie'
import { IoInformationCircle } from 'react-icons/io5'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
  valueGuide: string
  titleGuide?:string
}
const ButtonGoToGuide = ({ valueGuide,titleGuide }: Props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname.split('/')
  const link = `/${path[1]}/${path[2]}/panduan`
  return (
    <Button
      onClick={(e) => {
        e.preventDefault()
        Cookies.set('guide', valueGuide)
        Cookies.set('title-guide',titleGuide??"")
        navigate(link)
      }}
      variant={'outline'}
      className="text-primary border-primary items-center"
    >
      <IoInformationCircle />
      Panduan
    </Button>
  )
}

export default ButtonGoToGuide
