import { Button } from '@/components/ui/button'
import { Save, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { clsx } from 'clsx'

interface Props {
  loading: boolean
  onCancel?: () => void
  className?: string
  label?: string
  position?: 'justify-end' | 'justify-center'
}
const ButtonForm = ({ loading, onCancel, position = 'justify-end', label, className }: Props) => {
  const navigate = useNavigate()
  function goToBack() {
    navigate(-1)
  }
  return (
    <div className={`flex gap-4  items-center ${position}`}>
      <Button
        className="border-primary text-primary bg-white hover:text-primary"
        variant={'outline'}
        onClick={(e) => {
          e.preventDefault()
          if (onCancel) {
            onCancel()
          } else {
            goToBack()
          }
        }}
      >
        <X />
        Batal
      </Button>
      <Button
        disabled={loading}
        className={clsx(
          className,
          'border-primary text-white bg-primary hover:text-white hover:bg-primary/80'
        )}
      >
        {label ?? (
          <>
            <Save />
            Save
          </>
        )}
      </Button>
    </div>
  )
}

export default ButtonForm
