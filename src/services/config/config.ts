const API_ROUTES = {
  AUTH: `/auth`,
  USERS: `/users`,
  LOGBOOKS: `/logbooks`,
  PERMISSIONS: `/permissions`,
  WEATHER: `/weather`,
} as const;

const USER = {
  REGISTER_RESEARCHER: (): string => `${API_ROUTES.USERS}/register/researcher`,
  REGISTER_PARTNER: (): string => `${API_ROUTES.USERS}/register/partner`,
  GET_PROFILE: (userId: string): string =>
    `${API_ROUTES.USERS}/profile/${userId}`,
  GET_USERS: (): string => `${API_ROUTES.USERS}/`,
  DELETE_USER_BY_ID: (userId: string): string =>
    `${API_ROUTES.USERS}/${userId}`,
};

const LOGBOOK = {
  ADD: (): string => `${API_ROUTES.LOGBOOKS}/`,
  SEARCH: (
    title: string,
    date: string,
    latitude: number,
    longitude: number,
    species: string,
    order: string
  ): string =>
    `${API_ROUTES.LOGBOOKS}/search?title=${title}&date=${date}&latitude=${latitude}&longitude=${longitude}&species=${species}&order=${order}`,
  FILTER: (
    startDate: string,
    endDate: string,
    location: string,
    habitatType: string,
    climate: string,
    order: string
  ): string =>
    `${API_ROUTES.LOGBOOKS}/filter?startDate=${startDate}&endDate=${endDate}&location=${location}&habitatType=${habitatType}&climate=${climate}&order=${order}`,
  GET_LOGBOOKS: (page: number, limit: number, order: string): string =>
    `${API_ROUTES.LOGBOOKS}?page=${page}&limit=${limit}&order=${order}`,
  GET_LOGBOOK_BY_ID: (logbookId: string): string =>
    `${API_ROUTES.LOGBOOKS}/${logbookId}`,
  GET_LOCATIONS: () => `${API_ROUTES.LOGBOOKS}/locations`,
};

const PERMISSIONS = {
  ALL: (): string => `${API_ROUTES.PERMISSIONS}/`,
};

const AUTH = {
  LOGIN: (): string => `${API_ROUTES.AUTH}/login`,
  VALIDATE_TOKEN: () => `${API_ROUTES.AUTH}/validateToken`,
};

const exportedObject = {
  USER,
  AUTH,
  LOGBOOK,
  PERMISSIONS,
  API_ROUTES,
};

export default exportedObject;
