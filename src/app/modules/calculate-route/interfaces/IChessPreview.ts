export interface IChessPreview {
  name: string
  columns: IChessPreviewColumn[]
}

export interface IChessPreviewColumn {
  name: string
  active: boolean
}

export interface IChessRoute {
  name: string
  columns: IChessRouteColumn[]
}

export interface IChessRouteColumn {
  name: string
  origin: boolean
  destination: boolean
}
