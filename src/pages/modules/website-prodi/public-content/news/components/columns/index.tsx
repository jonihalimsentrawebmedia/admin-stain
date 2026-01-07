import type { StatusPublish } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { DraftStatusColumns } from '@/pages/modules/website-prodi/public-content/news/components/columns/draft.tsx'
import { SubmissionStatusColumns } from '@/pages/modules/website-prodi/public-content/news/components/columns/submission.tsx'
import { ProcessEditorProdi } from '@/pages/modules/website-prodi/public-content/news/components/columns/processEditor.tsx'
import { RejectionColumnsProdi } from '@/pages/modules/website-prodi/public-content/news/components/columns/rejection.tsx'
import { ApprovedColumnsProdi } from '@/pages/modules/website-prodi/public-content/news/components/columns/Approved.tsx'
import { PublishedColumnsProdi } from '@/pages/modules/website-prodi/public-content/news/components/columns/published.tsx'
import { UnPublishColumnsProdi } from '@/pages/modules/website-prodi/public-content/news/components/columns/unPublished.tsx'

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
