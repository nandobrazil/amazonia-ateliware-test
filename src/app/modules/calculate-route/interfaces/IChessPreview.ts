export interface IChessPreview {
  name: string
  columns: IChessPreviewColumn[]
}

export interface IChessPreviewColumn {
  name: string
  active: boolean
}
