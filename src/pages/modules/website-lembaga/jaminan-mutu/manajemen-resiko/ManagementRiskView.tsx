import FormRichEditor from '../../component/form/FormRichEditor'

const ManagementRiskView = () => {
  return (
    <FormRichEditor
      linkGetData="/lembaga/manajemen-resiko"
      linkPostData="/lembaga/manajemen-resiko"
      queryKeyGetData="lembaga-manajemen-resiko"
      queryKeyPostData="lembaga-manajemen-resiko"
      title='Manajemen Resiko'
      valueGuide='P2M_JAMINAN_MANAJEMEN_RESIKO'
    />
  )
}

export default ManagementRiskView
