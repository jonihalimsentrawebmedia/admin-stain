import {IoLogOutOutline} from "react-icons/io5";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {toast} from "react-toastify";

const ButtonLogOut = () => {

  const navigate = useNavigate();
  const handleLogOut = () => {
    toast.success('Anda Berhasil Keluar')
    Cookies.remove('token')
    navigate('/login')
  }
  return (
    <>
      <Button size={'sm'} className="text-neutral bg-white hover:bg-white/90 text-start justify-start" onClick={handleLogOut}>
        <IoLogOutOutline className="text-red-500"/>
        Keluar Akun
      </Button>
    </>
  )
}
export default ButtonLogOut