// action creators to be used by epics
import { createAction } from "typesafe-actions";
import {
  REQUEST_PROPERTIES,
  REQUEST_PROPERTIES_SUCCESS,
  IGetPropertiesInput,
  IPropertiesState
} from "./types";

export const requestPropertiesAction = createAction(
  REQUEST_PROPERTIES,
  (pageInfo?: IGetPropertiesInput) => pageInfo
)<IGetPropertiesInput>();

export const requestPropertiesSuccessAction = createAction(
  REQUEST_PROPERTIES_SUCCESS,
  (response: IPropertiesState) => response
)<IPropertiesState>();
