import type { StatusPublish } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { DraftStatusColumns } from './draft'
import { SubmissionStatusColumns } from './submission.tsx'
import { ProcessEditorProdi } from './processEditor.tsx'
import { RejectionColumnsProdi } from './rejection.tsx'
import { ApprovedColumnsProdi } from './Approved.tsx'
import { PublishedColumnsProdi } from './published.tsx'
import { UnPublishColumnsProdi } from './unPublished.tsx'

export const ColumnsReturnByStatus = (status: StatusPublish) => {
  switch (status) {
    case 'DRAFT': {
      return DraftStatusColumns()
    }

    case 'DIAJUKAN_EDITOR': {
      return SubmissionStatusColumns()
    }

    case 'PROSES_EDITOR': {
      return ProcessEditorProdi()
    }

    case 'TOLAK_EDITOR': {
      return RejectionColumnsProdi()
    }

    case 'DISETUJUI_EDITOR': {
      return ApprovedColumnsProdi()
    }

    case 'PUBLISHED': {
      return PublishedColumnsProdi()
    }

    case 'UNPUBLISH': {
      return UnPublishColumnsProdi()
    }

    default: {
      return []
    }
  }
}
