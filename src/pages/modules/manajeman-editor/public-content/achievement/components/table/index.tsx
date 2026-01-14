import type { StatusPublish } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { DraftColumnsAchievement } from './draftColumns'
import { SubmissionColumnsAchievement } from './submissionColumns'
import { ProcessColumnsAchievement } from './processColumns'
import { RejectColumnsAchievement } from './rejectColumns'
import { ApprovedColumnsAchievement } from './aprroveColumns'
import { PublishColumnsAchievement } from './publishColumns'
import { UnpublishColumnsAchievement } from './unpublishColumns'


export const ColumnsReturnByStatus = (status: StatusPublish) => {
  switch (status) {
    case 'DRAFT': {
      return DraftColumnsAchievement()
    }

    case 'DIAJUKAN_EDITOR': {
      return SubmissionColumnsAchievement()
    }

    case 'PROSES_EDITOR': {
      return ProcessColumnsAchievement()
    }

    case 'TOLAK_EDITOR': {
      return RejectColumnsAchievement()
    }

    case 'DISETUJUI_EDITOR': {
      return ApprovedColumnsAchievement()
    }

    case 'PUBLISHED': {
      return PublishColumnsAchievement()
    }

    case 'UNPUBLISH': {
      return UnpublishColumnsAchievement()
    }

    default: {
      return []
    }
  }
}
