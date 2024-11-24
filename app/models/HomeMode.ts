import {socialMediaLinks, UserProps} from './UserMode';

export interface PartnerList {
  socialMediaLinks?: socialMediaLinks;
  firstName?: string;
  lastName?: string;
  image?: string;
  speciality?: SpecialityProps[];
  dob?: string;
  gender?: string;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: string;
  otp?: string;
  otpVerified?: boolean;
  otpExipredAt?: string;
  isDeleted?: boolean;
  isActive?: boolean;
  fcmToken?: string;
  _id?: string;
  isProfileUpdate?: boolean;
  mobileNumber?: any;
  createdAt?: string;
  updatedAt?: string;
  email?: string;
  role?: string;
  profilePicture?: string;
}

export interface SpecialityProps {
  cat?: string;
  key?: string;
}

export interface RattingDataProps {
  fiveStarRatings?: number;
  fourStarRatings?: number;
  threeStarRatings?: number;
  twoStarRatings?: number;
  oneStarRatings?: number;
  averageRating?: number;
  rating?: RattingProps[];
}

export interface RattingProps {
  rating?: number;
  comment?: string;
  isDeleted?: boolean;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  partner?: PartnerList;
  user?: UserProps;
}

export interface BlogProps {
  description?: string;
  isDeleted?: boolean;
  isVerified?: boolean;
  _id?: string;
  title?: string;
  image?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AppointmentProps {
  _id: string;
  isDeleted?: boolean;
  scheduledDateTime?: string;
  appointmentStatus?: string;
  createdBy?: string;
  scheduledBy?: string;
  scheduledWith?: string;
  createdAt?: string;
  scheduledBy_firstName?: string;
  scheduledBy_lasttName?: string;
  scheduledBy_email?: string;
  scheduledBy_mobileNumber?: string;
  scheduledWithPartner_firstName?: string;
  scheduledWithPartner_lastName?: string;
  scheduledWithPartner_email?: string;
  scheduledWithPartner_mobileNumber?: string;
}

export interface AppProps {
  allAppointments?: AppointmentProps[];
  waitListAppointments?: AppointmentProps[];
}

export interface InsightsProps {
  totalCallSession?: number;
  totalChatSession?: number;
  totalEarn?: number;
}

export interface BannerProps {
  description?: string;
  isDeleted?: boolean;
  _id?: string;
  title?: string;
  image?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TestimonialsProps {
  rating?: number;
  comment?: string;
  isDeleted?: boolean;
  _id?: string;
  partnerId?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}
