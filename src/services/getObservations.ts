import { axiosInstance } from "@services/axios";
import { date, number, object, string } from "yup";
import dayjs from "dayjs";

export interface RawDatus {
  id: number;
  hcw_title: string;
  moment1: string;
  moment2: string;
  moment3: string;
  moment4: string;
  moment5: string;
  note: string;
  location_id: number;
  hh_compliance: string;
  hh_compliance_type: string;
  glove_compliance: string;
  gown_compliance: string;
  mask_compliance: string;
  mask_type: string;
  created_timestamp: string; //  "2024-05-11 14:42:53"
}

interface ObservationSummaryResponse {
  total_opportunities: number;
  hcw_opportunities: {
    label: string;
    total: number;
    passed: number;
    percentage: number;
  }[];
}
export interface ObservationResponse {
  summary: ObservationSummaryResponse;
  raw_data: RawDatus[];
}

export interface IGetObservationsSchema {
  dateFrom: Date;
  dateTo: Date;
  hcwTitle?: number;
  auditor?: number;
  location?: {
    serverId: number;
    name: string;
  };
}

export interface ObservationRecords {
  summary: ObservationSummaryResponse;
  observationsByDate: Map<string, RawDatus[]>;
}

export const getObservationSchema = object({
  dateFrom: date().default(new Date()),
  dateTo: date().default(new Date()),
  hcwTitle: number().optional(),
  auditor: number().optional(),
  location: object({
    serverId: number().optional(),
    name: string().optional(),
  }).optional(),
});

const DATE_FORMAT = "YYYY-MM-DD";
export async function getObservations(
  observationParams: IGetObservationsSchema,
) {
  await getObservationSchema.validate(observationParams);

  const params: any = {};
  if (observationParams.dateFrom) {
    params.dateFrom = dayjs(observationParams.dateFrom).format(DATE_FORMAT);
  }

  if (observationParams.dateTo) {
    params.dateTo = dayjs(observationParams.dateTo).format(DATE_FORMAT);
  }

  if (observationParams.location?.serverId) {
    params.locationId = observationParams.location.serverId.toString();
  }

  if (observationParams.auditor) {
    params.auditor = observationParams.auditor.toString();
  }

  const result = await axiosInstance.get<ObservationResponse>(
    "/mobile/get-observations",
    { params },
  );
  const response = result.data;

  const observationRecords: ObservationRecords = {
    summary: response.summary,
    observationsByDate: new Map<string, RawDatus[]>(),
  };

  const map = observationRecords.observationsByDate;
  response.raw_data.forEach((datus) => {
    const date = datus.created_timestamp.split(" ")[0];
    map.set(date, [...(map.get(date) || []), datus]);
  });

  return observationRecords;
}
