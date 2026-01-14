import type { StatusPublish } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { ApprovedColumnsImpactInnovation } from './approvedColumns'
import { DraftColumnsImpactInnovation } from './draftColumns'
import { SubmissionColumnsImpactInnovation } from './submissionColumns'
import { ProcessColumnsImpactInnovation } from './processColumns'
import { RejectColumnsImpactInnovation } from './rejectColumns'
import { PublishColumnsImpactInnovation } from './publishColumns'
import { UnpublishColumnsImpactInnovation } from './unpublishColumns'

export const ColumnsReturnByStatus = (status: StatusPublish) => {
  switch (status) {
    case 'DRAFT': {
      return DraftColumnsImpactInnovation()
    }

    case 'DIAJUKAN_EDITOR': {
      return SubmissionColumnsImpactInnovation()
    }

    case 'PROSES_EDITOR': {
      return ProcessColumnsImpactInnovation()
    }

    case 'TOLAK_EDITOR': {
      return RejectColumnsImpactInnovation()
    }

    case 'DISETUJUI_EDITOR': {
      return ApprovedColumnsImpactInnovation()
    }

    case 'PUBLISHED': {
      return PublishColumnsImpactInnovation()
    }

    case 'UNPUBLISH': {
      return UnpublishColumnsImpactInnovation()
    }

    default: {
      return []
    }
  }
}
