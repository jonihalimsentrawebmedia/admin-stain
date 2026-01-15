import type { StatusPublish } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { DraftStatusColumns } from './draft.tsx'
import { SubmissionStatusColumns } from './submission.tsx'
import { EditorProcessStatusColumns } from './editorProcess.tsx'
import { RejectionStatusColumns } from './rejection.tsx'
import { ApprovedStatusColumns } from './approved.tsx'
import { PublishedStatusColumns } from './published.tsx'
import { UnPublishedStatusColumns } from './unPublished.tsx'

export const ColumnsReturnByStatus = (status: StatusPublish) => {
  switch (status) {
    default: {
      return []
    }

    case 'DRAFT': {
      return DraftStatusColumns()
    }
    case 'DIAJUKAN_EDITOR': {
      return SubmissionStatusColumns()
    }
    case 'PROSES_EDITOR': {
      return EditorProcessStatusColumns()
    }
    case 'TOLAK_EDITOR': {
      return RejectionStatusColumns()
    }
    case 'DISETUJUI_EDITOR': {
      return ApprovedStatusColumns()
    }
    case 'PUBLISHED': {
      return PublishedStatusColumns()
    }
    case 'UNPUBLISH': {
      return UnPublishedStatusColumns()
    }
  }
}
