// shared
export enum ApiStatus {
  OK = 'OK',
  NO = 'NO',
}

export interface ApiErrorResponse {
  status: ApiStatus.NO;
  message: string;
}

export type ApiResponse<T> = Promise<T | ApiErrorResponse>;

export interface ApiOptions {
  apiUrl?: string;
}

export enum ApiQuery {
  STATUS = 'status',
  START = 'start',
  STOP = 'stop',
  RESTART = 'status',
  CHANGE_LEVEL = 'changelevel',
  GET_MAPS = 'getmaps',
  CONSOLE_CMD = 'consolecmd',
  GET_RESOURCES = 'getresources',
}

// status
export enum ApiStatusResponseOnline {
  OFFLINE,
  ONLINE,
  STARTING_OR_DIE,
}

export interface ApiStatusResponseDataB {
  type: string;
  ip: string;
  c_port: number;
  q_port: number;
  s_port: number;
  status: number;
}

export interface ApiStatusResponseDataS {
  game: string;
  name: string;
  map: string;
  players: number;
  playersmax: number;
  password: number;
}

export interface ApiStatusResponseDataP {
  pid: number;
  name: string;
  score: number;
  time: string;
}

export type ApiStatusResponseDataT = any;

export interface ApiStatusResponseData {
  b: ApiStatusResponseDataB;
  s: ApiStatusResponseDataS;
  p: ApiStatusResponseDataP[];
  t: ApiStatusResponseDataT;
}

export interface ApiStatusResponse {
  status: ApiStatus.OK;
  online: ApiStatusResponseOnline;
  data: ApiStatusResponseData;
  server_id: number;
  server_name: string;
  server_address: string;
  server_maxslots: number;
  server_location: string;
  server_type: string;
  server_dateblock: number;
  server_daystoblock: number;
}

// start
export interface ApiStartResponse {
  status: ApiStatus.OK;
  message: string;
}

// stop
export interface ApiStopResponse {
  status: ApiStatus.OK;
  message: string;
}

// restart
export interface ApiRestartResponse {
  status: ApiStatus.OK;
  message: string;
}

// changelevel
export interface ApiChangeLevelResponse {
  status: ApiStatus.OK;
  message: string;
}

export interface ApiChangeLevelParams {
  map: string;
}

// getmaps
export interface ApiGetMapsResponse {
  status: ApiStatus.OK;
  maps: string[];
}

// consolecmd
export interface ApiConsoleCmdResponse {
  status: ApiStatus.OK;
  message: string;
}

export interface ApiConsoleCmdParams {
  cmd: string;
}

// getresources
export interface ApiGetResourcesResponse {
  status: ApiStatus.OK;
  cpu_proc: string;
  mem_used: number;
  mem_quota: number;
  mem_proc: number;
  players: number;
  players_max: number;
  players_proc: number;
  disk_used: number;
  disk_quota: number;
  disk_proc: string;
}
