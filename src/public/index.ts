import axios from 'axios';
import {
  ApiChangeLevelParams,
  ApiChangeLevelResponse,
  ApiConsoleCmdParams,
  ApiConsoleCmdResponse,
  ApiGetMapsResponse,
  ApiGetResourcesResponse,
  ApiOptions,
  ApiQuery,
  ApiResponse,
  ApiRestartResponse,
  ApiStatusResponse,
  ApiStopResponse,
} from './public.interface';

const DEFAULT_API_URL = 'https://www.myarena.ru/api.php';

export class Api {
  private apiUrl: string;
  private token: string;

  constructor(token: string, options?: ApiOptions) {
    if (!token) {
      throw new Error('Token not passed.');
    }

    this.apiUrl = options?.apiUrl || DEFAULT_API_URL;
    this.token = token;
  }

  private executeQuery<R = any>(query: ApiQuery, params: any = {}): ApiResponse<R> {
    return axios
      .get<R>(this.apiUrl, {
        params: {
          query,
          token: this.token,
          ...params,
        },
      })
      .then((response) => response?.data);
  }

  public getStatus() {
    return this.executeQuery<ApiStatusResponse>(ApiQuery.STATUS);
  }

  public start() {
    return this.executeQuery<ApiStatusResponse>(ApiQuery.START);
  }

  public stop() {
    return this.executeQuery<ApiStopResponse>(ApiQuery.STOP);
  }

  public restart() {
    return this.executeQuery<ApiRestartResponse>(ApiQuery.RESTART);
  }

  public changeLevel(params: ApiChangeLevelParams) {
    return this.executeQuery<ApiChangeLevelResponse>(ApiQuery.CHANGE_LEVEL, params);
  }

  public getMaps() {
    return this.executeQuery<ApiGetMapsResponse>(ApiQuery.GET_MAPS);
  }

  public consoleCmd(params: ApiConsoleCmdParams) {
    return this.executeQuery<ApiConsoleCmdResponse>(ApiQuery.CONSOLE_CMD, params);
  }

  public getResources() {
    return this.executeQuery<ApiGetResourcesResponse>(ApiQuery.GET_RESOURCES);
  }
}
