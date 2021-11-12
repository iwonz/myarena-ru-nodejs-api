// shared
export enum ApiStatus {
  OK = 'OK',
  NO = 'NO',
}

export interface ApiOptions {
  apiUrl?: string;
}

export enum ApiQuery {
  STATUS = 'status',
  START = 'start',
  STOP = 'stop',
  RESTART = 'restart',
  CHANGE_LEVEL = 'changelevel',
  GET_MAPS = 'getmaps',
  CONSOLE_CMD = 'consolecmd',
  GET_RESOURCES = 'getresources',
}

// status
export enum ApiStatusResponseOnline {
  OFFLINE, // 0 - Сервер offline
  ONLINE, // Сервер online
  STARTING_OR_DIE, // Запускается или завис
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
  data: ApiStatusResponseData; // LGSL (Live Game Server List) информация о сервере
  server_id: number; // ID сервера
  server_name: string; // Название игры
  server_address: string; // Адрес сервера
  server_maxslots: number; // Количество слотов
  server_location: string; // Название локации
  server_type: string; // Тип
  server_dateblock: number; // Время блокировки (timestamp)
  server_daystoblock: number; // Дней до окончания аренды
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
  map: string; // Название новой карты нужно указывать без расширения (без .bsp)
}

// getmaps
export interface ApiGetMapsResponse {
  status: ApiStatus.OK;
  maps: string[]; // Массив содержит названия карт
}

// consolecmd
export interface ApiConsoleCmdResponse {
  status: ApiStatus.OK;
  message: string;
}

export interface ApiConsoleCmdParams {
  cmd: string; // Консольная команда (только латинские буквы и символы)
}

// getresources
export interface ApiGetResourcesResponse {
  status: ApiStatus.OK;
  cpu_proc: string; // Использование процессора в процентах
  mem_used: number; // Использовано оперативной памяти (в мегабайтах)
  mem_quota: number; // Выделено оперативной памяти (в мегабайтах)
  mem_proc: number; // Использование памяти в процентах
  players: number; // Количество игроков
  players_max: number; // Максимальное количество слотов
  players_proc: number; // Занятость слотов в процентах
  disk_used: number; // Использовано дисковой квоты (в мегабайтах)
  disk_quota: number; // Выделено дисковой квоты (в мегабайтах)
  disk_proc: string; // Использование дисковой квоты в процентах
}
