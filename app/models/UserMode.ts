export interface UserProps {
  firstName?: string;
  lastName?: string;
  image?: string;
  mobile?: string;
  address?: string;
  dob?: any;
  gender?: string;
  userType?: string;
  otp?: string;
  otpVerified?: boolean;
  otpExipredAt?: string;
  isDeleted?: boolean;
  isActive?: boolean;
  fcmToken?: string;
  isLogIn?: boolean;
  _id?: string;
  socialMediaLinks?: socialMediaLinks;
  profilePicture?: string;
  mobileNumber?: string;
  role?: string;
  isProfileUpdate: true;
  createdAt?: string;
  updatedAt?: string;
  email?: string;
}

export interface socialMediaLinks {
  google?: SocialProps;
}
export interface SocialProps {
  id?: any;
  profilePic?: any;
  displayName?: any;
  email?: any;
  isDeleted?: boolean;
  isProfileUpdate?: boolean;
}
