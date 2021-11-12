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
  ApiRestartResponse,
  ApiStartResponse,
  ApiStatus,
  ApiStatusResponse,
  ApiStopResponse,
} from './types';

export const DEFAULT_API_URL = 'https://www.myarena.ru/api.php';

export class Api {
  private apiEntrypoint: string;
  private token: string;

  constructor(token: string, options?: ApiOptions) {
    if (!token) {
      throw new Error('Token not passed.');
    }

    this.apiEntrypoint = options?.apiEntrypoint || DEFAULT_API_URL;
    this.token = token;
  }

  private executeQuery(query: ApiQuery.STATUS): Promise<ApiStatusResponse>;
  private executeQuery(query: ApiQuery.START): Promise<ApiStartResponse>;
  private executeQuery(query: ApiQuery.STOP): Promise<ApiStopResponse>;
  private executeQuery(query: ApiQuery.RESTART): Promise<ApiRestartResponse>;
  private executeQuery(query: ApiQuery.CHANGE_LEVEL, params: ApiChangeLevelParams): Promise<ApiChangeLevelResponse>;
  private executeQuery(query: ApiQuery.GET_MAPS): Promise<ApiGetMapsResponse>;
  private executeQuery(query: ApiQuery.CONSOLE_CMD, params: ApiConsoleCmdParams): Promise<ApiConsoleCmdResponse>;
  private executeQuery(query: ApiQuery.GET_RESOURCES): Promise<ApiGetResourcesResponse>;
  private executeQuery(
    query: ApiQuery,
    params: Record<string, any> = {},
  ):
    | Promise<ApiStatusResponse>
    | Promise<ApiStartResponse>
    | Promise<ApiStopResponse>
    | Promise<ApiRestartResponse>
    | Promise<ApiChangeLevelResponse>
    | Promise<ApiGetMapsResponse>
    | Promise<ApiConsoleCmdResponse>
    | Promise<ApiGetResourcesResponse> {
    return axios
      .get(this.apiEntrypoint, {
        params: {
          query,
          token: this.token,
          ...params,
        },
      })
      .then((response) => {
        if (response?.data.status !== ApiStatus.OK) {
          throw {
            status: ApiStatus.NO,
            message: response?.data.message || 'Unknown MyArena.ru API error.',
          };
        }

        return response?.data;
      })
      .catch((error) => {
        return {
          status: ApiStatus.NO,
          message: error?.message || 'Unknown MyArena.ru API error.',
        };
      });
  }

  public getStatus(): Promise<ApiStatusResponse> {
    return this.executeQuery(ApiQuery.STATUS);
  }

  public start(): Promise<ApiStartResponse> {
    return this.executeQuery(ApiQuery.START);
  }

  public stop(): Promise<ApiStopResponse> {
    return this.executeQuery(ApiQuery.STOP);
  }

  public restart(): Promise<ApiRestartResponse> {
    return this.executeQuery(ApiQuery.RESTART);
  }

  public changeLevel(map: string): Promise<ApiChangeLevelResponse> {
    return this.executeQuery(ApiQuery.CHANGE_LEVEL, {
      map,
    });
  }

  public getMaps(): Promise<ApiGetMapsResponse> {
    return this.executeQuery(ApiQuery.GET_MAPS);
  }

  public consoleCmd(cmd: string): Promise<ApiConsoleCmdResponse> {
    return this.executeQuery(ApiQuery.CONSOLE_CMD, {
      cmd,
    });
  }

  public getResources(): Promise<ApiGetResourcesResponse> {
    return this.executeQuery(ApiQuery.GET_RESOURCES);
  }
}
