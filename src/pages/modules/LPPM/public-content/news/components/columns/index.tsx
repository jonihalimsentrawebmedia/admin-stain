import { DraftStatusColumns } from './draft'
import { SubmissionStatusColumns } from './submission.tsx'
import { ProcessEditorLppm } from './processEditor.tsx'
import { RejectionColumnsLppm } from './rejection.tsx'
import { PublishedColumnsLppm } from './published.tsx'
import { UnPublishColumnsLppm } from './unPublished.tsx'
import { ApprovedColumnsLppm } from './Approved.tsx'
import type { StatusPublish } from '../../data/types.ts'

export const ColumnsReturnByStatus = (status: StatusPublish) => {
  switch (status) {
    case 'DRAFT': {
      return DraftStatusColumns()
    }

    case 'DIAJUKAN_EDITOR': {
      return SubmissionStatusColumns()
    }

    case 'PROSES_EDITOR': {
      return ProcessEditorLppm()
    }

    case 'TOLAK_EDITOR': {
      return RejectionColumnsLppm()
    }

    case 'DISETUJUI_EDITOR': {
      return ApprovedColumnsLppm()
    }

    case 'PUBLISHED': {
      return PublishedColumnsLppm()
    }

    case 'UNPUBLISH': {
      return UnPublishColumnsLppm()
    }

    default: {
      return []
    }
  }
}
