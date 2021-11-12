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
  ApiStartResponse,
  ApiStatusResponse,
  ApiStopResponse,
} from './api.interface';

export * from './api.interface';

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

  private executeQuery(query: ApiQuery.STATUS): ApiResponse<ApiStatusResponse>;
  private executeQuery(query: ApiQuery.START): ApiResponse<ApiStartResponse>;
  private executeQuery(query: ApiQuery.STOP): ApiResponse<ApiStopResponse>;
  private executeQuery(query: ApiQuery.RESTART): ApiResponse<ApiRestartResponse>;
  private executeQuery(query: ApiQuery.CHANGE_LEVEL, params: ApiChangeLevelParams): ApiResponse<ApiChangeLevelResponse>;
  private executeQuery(query: ApiQuery.GET_MAPS): ApiResponse<ApiGetMapsResponse>;
  private executeQuery(query: ApiQuery.CONSOLE_CMD, params: ApiConsoleCmdParams): ApiResponse<ApiConsoleCmdResponse>;
  private executeQuery(query: ApiQuery.GET_RESOURCES): ApiResponse<ApiGetResourcesResponse>;
  private executeQuery(
    query: ApiQuery,
    params: Record<string, any> = {},
  ):
    | ApiResponse<ApiStatusResponse>
    | ApiResponse<ApiStartResponse>
    | ApiResponse<ApiStopResponse>
    | ApiResponse<ApiRestartResponse>
    | ApiResponse<ApiChangeLevelResponse>
    | ApiResponse<ApiGetMapsResponse>
    | ApiResponse<ApiConsoleCmdResponse>
    | ApiResponse<ApiGetResourcesResponse> {
    return axios
      .get(this.apiUrl, {
        params: {
          query,
          token: this.token,
          ...params,
        },
      })
      .then((response) => response?.data);
  }

  public getStatus(): ApiResponse<ApiStatusResponse> {
    return this.executeQuery(ApiQuery.STATUS);
  }

  public start(): ApiResponse<ApiStartResponse> {
    return this.executeQuery(ApiQuery.START);
  }

  public stop(): ApiResponse<ApiStopResponse> {
    return this.executeQuery(ApiQuery.STOP);
  }

  public restart(): ApiResponse<ApiRestartResponse> {
    return this.executeQuery(ApiQuery.RESTART);
  }

  public changeLevel(params: ApiChangeLevelParams): ApiResponse<ApiChangeLevelResponse> {
    return this.executeQuery(ApiQuery.CHANGE_LEVEL, params);
  }

  public getMaps(): ApiResponse<ApiGetMapsResponse> {
    return this.executeQuery(ApiQuery.GET_MAPS);
  }

  public consoleCmd(params: ApiConsoleCmdParams): ApiResponse<ApiConsoleCmdResponse> {
    return this.executeQuery(ApiQuery.CONSOLE_CMD, params);
  }

  public getResources(): ApiResponse<ApiGetResourcesResponse> {
    return this.executeQuery(ApiQuery.GET_RESOURCES);
  }
}
