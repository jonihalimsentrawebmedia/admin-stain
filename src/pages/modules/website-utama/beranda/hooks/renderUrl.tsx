export const RenderUrl = (url: string, id: string) => {
  switch (url) {
    case 'prestasi': {
      return `achievement/detail/${id}`
    }
    case 'berita': {
      return `news/detail/${id}`
    }
    case 'inovasi_berdampak': {
      return `impact-innovation/detail/${id}`
    }
    case 'pengumuman': {
      return `announcement/detail/${id}`
    }
    case 'agenda': {
      return `agenda/detail/${id}`
    }
    case 'slider_bawah': {
      return `slider/bottom-slider`
    }
    case 'promosi': {
      return `promotion/detail/${id}`
    }
    case 'slider_atas': {
      return `slider/top-slider`
    }
    case 'fasilitas': {
      return `facilities/detail/${id}`
    }
    case 'unit_fasilitas': {
      return `facilities/detail/${id}`
    }
  }
}
