import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {IHttpResult} from "../../../shared/interfaces/IHttpResult";
import {ICalculateRouteResponse} from "../interfaces/ICalculateRouteResponse";
import {lastValueFrom} from "rxjs";
import {ICalculateRouteRequest} from "../interfaces/ICalculateRouteRequest";

@Injectable({
  providedIn: 'root'
})
export class CalculateRouteService {

  private readonly urlBase = `${environment.apiUrl}/route`;

  constructor(
    public http: HttpClient,
  ) {
  }

  async PostRoute(sender: ICalculateRouteRequest): Promise<IHttpResult<ICalculateRouteResponse>> {
    return lastValueFrom(this.http.post<IHttpResult<ICalculateRouteResponse>>(`${this.urlBase}`, sender));
  }

  async GetAll(): Promise<IHttpResult<ICalculateRouteResponse[]>> {
    return lastValueFrom(this.http.get<IHttpResult<ICalculateRouteResponse[]>>(`${this.urlBase}`));
  }

}
