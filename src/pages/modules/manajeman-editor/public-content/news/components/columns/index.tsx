import type { StatusPublish } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { DraftStatusColumns } from './draft'
import { SubmissionStatusColumns } from './submission.tsx'
import { ProcessEditorManagementEditor } from './processEditor.tsx'
import { RejectionColumnsManagementEditor } from './rejection.tsx'
import { ApprovedColumnsManagementEditor } from './Approved.tsx'
import { PublishedColumnsManagementEditor } from './published.tsx'
import { UnPublishColumnsManagementEditor } from './unPublished.tsx'

export const ColumnsReturnByStatus = (status: StatusPublish) => {
  switch (status) {
    case 'DRAFT': {
      return DraftStatusColumns()
    }

    case 'DIAJUKAN_EDITOR': {
      return SubmissionStatusColumns()
    }

    case 'PROSES_EDITOR': {
      return ProcessEditorManagementEditor()
    }

    case 'TOLAK_EDITOR': {
      return RejectionColumnsManagementEditor()
    }

    case 'DISETUJUI_EDITOR': {
      return ApprovedColumnsManagementEditor()
    }

    case 'PUBLISHED': {
      return PublishedColumnsManagementEditor()
    }

    case 'UNPUBLISH': {
      return UnPublishColumnsManagementEditor()
    }

    default: {
      return []
    }
  }
}
