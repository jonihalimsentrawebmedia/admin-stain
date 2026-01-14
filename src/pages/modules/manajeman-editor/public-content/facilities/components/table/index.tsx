import type { StatusPublish } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { DraftColumnsFacilities } from './draftColumns'
import { SubmissionColumnsFacilities } from './submissionColumns'
import { ProcessColumnsFacilities } from './processColumns'
import { RejectColumnsFacilities } from './rejectColumns'
import { ApprovedColumnsFacilities } from './approvedColumns'
import { PublishColumnsFacilities } from './publishColumns'
import { UnpublishColumnsFacilities } from './UnpublishColumns'

export const ColumnsReturnByStatus = (status: StatusPublish) => {
  switch (status) {
    case 'DRAFT': {
      return DraftColumnsFacilities()
    }

    case 'DIAJUKAN_EDITOR': {
      return SubmissionColumnsFacilities()
    }

    case 'PROSES_EDITOR': {
      return ProcessColumnsFacilities()
    }

    case 'TOLAK_EDITOR': {
      return RejectColumnsFacilities()
    }

    case 'DISETUJUI_EDITOR': {
      return ApprovedColumnsFacilities()
    }

    case 'PUBLISHED': {
      return PublishColumnsFacilities()
    }

    case 'UNPUBLISH': {
      return UnpublishColumnsFacilities()
    }

    default: {
      return []
    }
  }
}
