import type { StatusPublish } from "@/pages/modules/website-prodi/public-content/news/data/types"
import EditorApprovedColumns from "./editorApprovedColumns"
import EditorProcessColumns from "./editorProcessColumns"
import PublishedColumns from "./publishColumns"
import RejectEditorColumns from "./rejectColumns"
import SubmissionColumns from "./submitColumns"
import TOpSliderColumns from "./topSliderColumns"
import UnpublishedColumns from "./UnpublishColumns"

export const ColumnsReturnByStatus = (status: StatusPublish) => {
  switch (status) {
    case 'DRAFT': {
      return TOpSliderColumns()
    }

    case 'DIAJUKAN_EDITOR': {
      return SubmissionColumns()
    }

    case 'PROSES_EDITOR': {
      return EditorProcessColumns()
    }

    case 'TOLAK_EDITOR': {
      return RejectEditorColumns()
    }

    case 'DISETUJUI_EDITOR': {
      return EditorApprovedColumns()
    }

    case 'PUBLISHED': {
      return PublishedColumns()
    }

    case 'UNPUBLISH': {
      return UnpublishedColumns()
    }

    default: {
      return []
    }
  }
}