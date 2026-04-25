import type { status } from '../types/data.tsx'
import { SubmissionColumns } from './submission.tsx'
import { ProcessEditorColumns } from './editorProcess.tsx'
import { ApprovedColumns } from './ApprovedColumns.tsx'
import { RejectionColumns } from './rejectionColums.tsx'

export const RendersColumnsData = (status: status) => {
  switch (status) {
    case 'DIAJUKAN_EDITOR': {
      return SubmissionColumns()
    }
    case 'PROSES_EDITOR': {
      return ProcessEditorColumns()
    }
    case 'DISETUJUI_EDITOR': {
      return ApprovedColumns()
    }
    case 'TOLAK_EDITOR': {
      return RejectionColumns()
    }
  }
}
