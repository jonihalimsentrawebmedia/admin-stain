import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import BackupDataViewModel from './BackupDataViewModel'
import DetailField from '@/components/common/field/DetailField'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

const BackupDataView = () => {
  const {
    handleCreateBackup,
    handleDownloadBackup,
    loading,
    field,
    loadingBackup,
    form,
    progress,
    loadingDownload,
    isBackingUp,
    backupProgress,
  } = BackupDataViewModel()
  if (loadingBackup) {
    return <Skeleton className="h-[200px]" />
  }

  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup buttonGroup={[]} label="Backup Data" />
      <DetailField data={field} form={form} />
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <Button
          variant={'outline'}
          disabled={loading || loadingDownload || isBackingUp}
          onClick={handleCreateBackup}
          className="border-primary text-primary hover:text-primary w-full sm:w-fit"
        >
          Buat Backup
        </Button>
        <Button
          variant={'outline'}
          disabled={loading || loadingDownload || isBackingUp}
          onClick={handleDownloadBackup}
          className="border-primary text-primary hover:text-primary w-full sm:w-fit"
        >
          Download
        </Button>
      </div>
      {isBackingUp && (
        <div>
          Proses Backup Data
          <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-300"
              style={{ width: `${backupProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">{backupProgress}%</p>
        </div>
      )}
      {loadingDownload && (
        <div>
          File Sedang Proses Download
          <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default BackupDataView
