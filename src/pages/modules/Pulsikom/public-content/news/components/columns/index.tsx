import type { StatusPublish } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { DraftStatusColumns } from './draft'
import { SubmissionStatusColumns } from './submission.tsx'
import { ProcessEditorUnit } from './processEditor.tsx'
import { RejectionColumnsUnit } from './rejection.tsx'
import { ApprovedColumnsUnit } from './Approved.tsx'
import { PublishedColumnsUnit } from './published.tsx'
import { UnPublishColumnsUnit } from './unPublished.tsx'

export const ColumnsReturnByStatus = (status: StatusPublish) => {
  switch (status) {
    case 'DRAFT': {
      return DraftStatusColumns()
    }

    case 'DIAJUKAN_EDITOR': {
      return SubmissionStatusColumns()
    }

    case 'PROSES_EDITOR': {
      return ProcessEditorUnit()
    }

    case 'TOLAK_EDITOR': {
      return RejectionColumnsUnit()
    }

    case 'DISETUJUI_EDITOR': {
      return ApprovedColumnsUnit()
    }

    case 'PUBLISHED': {
      return PublishedColumnsUnit()
    }

    case 'UNPUBLISH': {
      return UnPublishColumnsUnit()
    }

    default: {
      return []
    }
  }
}
