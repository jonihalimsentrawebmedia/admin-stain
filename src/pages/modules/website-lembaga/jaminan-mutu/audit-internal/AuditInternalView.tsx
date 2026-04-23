import FormRichEditor from '../../component/form/FormRichEditor'

const AuditInternalView = () => {
  return (
    <FormRichEditor
      linkGetData="/lembaga/audit-internal-mutu"
      linkPostData="/lembaga/audit-internal-mutu"
      queryKeyGetData="lembaga-audit-internal-mutu"
      queryKeyPostData="lembaga-audit-internal-mutu"
      title='Audit Internal Mutu'
      valueGuide='P2M_JAMINAN_AUDIT_INTERNAL_MUTU'
    />
  )
}

export default AuditInternalView
