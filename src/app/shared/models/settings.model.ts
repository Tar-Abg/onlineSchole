import {Address} from "./registration.model";

export interface RateAndPolitics {
  id?: number;
  userId: number;
  hourlyRate: number;
  cancellationId: number;
}

export interface PersonalInformation {
  userId: number;
  email: string;
  mobileCode: number;
  mobile: string;
  userAddress: Address;
}
