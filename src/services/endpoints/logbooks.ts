import { Pagination } from "../../utils/types/commonType";
import { ILogBook, LogbookRequest } from "../../utils/types/logbooksTypes";
import { getHeaderOptions } from "../../utils/utils";
import routes from "../config";
import { api } from "../config/axiosConfig";

const addLogBook = async (token: string, data: LogbookRequest) => {
  const response = await api.post<ILogBook>(
    routes.LOGBOOK.ADD(),
    data,
    getHeaderOptions(token)
  );

  return response.status;
};

const searchLogbooks = async (
  token: string,
  title: string,
  date: string,
  latitude: number,
  longitude: number,
  species: string,
  order: string
): Promise<ILogBook[]> => {
  const response = await api.get<ILogBook[]>(
    routes.LOGBOOK.SEARCH(title, date, latitude, longitude, species, order),
    getHeaderOptions(token)
  );

  return response.data;
};

const filterLogbooks = async (
  token: string,
  startDate: string,
  endDate: string,
  location: string,
  habitatType: string,
  climate: string,
  order: string
): Promise<ILogBook[]> => {
  const response = await api.get<ILogBook[]>(
    routes.LOGBOOK.FILTER(
      startDate,
      endDate,
      location,
      habitatType,
      climate,
      order
    ),
    getHeaderOptions(token)
  );

  return response.data;
};

const getAllLogbooks = async (
  token: string,
  page: number,
  limit: number,
  order: string
): Promise<Pagination<ILogBook[]>> => {
  const response = await api.get<Pagination<ILogBook[]>>(
    routes.LOGBOOK.GET_LOGBOOKS(page, limit, order),
    getHeaderOptions(token)
  );

  return response.data;
};

const getLogbookById = async (
  token: string,
  logbookId: string
): Promise<ILogBook> => {
  const response = await api.get<ILogBook>(
    routes.LOGBOOK.GET_LOGBOOK_BY_ID(logbookId),
    getHeaderOptions(token)
  );

  return response.data;
};

export type ILocation = {
  latitude: number;
  longitude: number;
  city: string;
  logBookId: string;
};

const getLocations = async (
  token: string,
  userId: string
): Promise<ILocation[]> => {
  const response = await api.post<ILocation[]>(
    routes.LOGBOOK.GET_LOCATIONS(),
    { userId },
    getHeaderOptions(token)
  );

  return response.data;
};

export {
  addLogBook,
  filterLogbooks,
  getAllLogbooks,
  getLocations,
  getLogbookById,
  searchLogbooks
};

