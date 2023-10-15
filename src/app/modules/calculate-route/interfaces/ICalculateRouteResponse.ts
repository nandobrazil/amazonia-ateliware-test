import {IRoutePathResponse} from './IRoutePathResponse';

export interface ICalculateRouteResponse {
  id: number
  origin: string
  destination: string
  packageCollection: string
  dateCreated: string
  timeRoute: number
  routePaths: IRoutePathResponse
}
