export interface ISumberParameter {
  key_parameter: string
  required: boolean
  type: string
}

export interface ISumberDetail {
  parameter: ISumberParameter[]
  data_map: string[]
}

export interface IParameterValue {
  key_parameter: string
  value: string
}

export interface IValueMap {
  field: string
  value: string
  is_sumber: boolean
}

export interface IGenerateSuratBody {
  sumber: string
  parameter: IParameterValue[]
  value_map: IValueMap[]
}
