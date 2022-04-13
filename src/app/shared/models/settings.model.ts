import {Address} from "./registration.model";

export interface RateAndPolitics {
  id?: number;
  userId: number;
  hourlyRate: number;
  cancellationId: number;
}

export interface PersonalInformation {
  userId: number;
  email: number;
  mobileCode: number;
  mobile: string;
  userAddress: Address;
}

export interface PaymentMethod {
  ardId: number;
  id: number;
  isDeleted: boolean;
  last4: number;
  userId: number;
}
