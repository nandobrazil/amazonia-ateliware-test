import {Injectable} from '@angular/core';
import {StorageKeys} from "../constants/storage-key";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {ILoginRequest} from "../../modules/login/interfaces/ILoginRequest";
import {IHttpResult} from "../interfaces/IHttpResult";
import {ILoginResponse} from "../../modules/login/interfaces/ILoginResponse";

interface TokenPayload {
  sub: number;
  email: string;
  administrator: boolean;
  exp: number;
  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  environment = environment;

  constructor(
    public http: HttpClient,
  ) {
  }


  async signIn(request: ILoginRequest): Promise<boolean> {
    const {
      success,
      data
    } = await lastValueFrom(this.http.post<IHttpResult<ILoginResponse>>(`${this.environment.apiUrl}/auth/login`, request));
    if (success) {
      this.saveToken(data!);
    }
    return success;
  }

  signOut() {
    this.clearTokens();
  }

  isLogged() {
    return !!this.getAccessToken();
  }

  getAccessToken() {
    return localStorage.getItem(StorageKeys.ACCESS_TOKEN);
  }

  saveToken(data: ILoginResponse) {
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, data.token);
    localStorage.setItem(StorageKeys.USERNAME, data.username);
  }

  clearTokens() {
    localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(StorageKeys.USERNAME);
  }

}
