import { getFromEndpoint, postFilesToEndpoint, postToEndpoint, postToEndpointNoContent, putToEndpoint } from "../components/DataHelpers";
import { CreateOrUpdateStatus } from "../reducers/AppReducer";
import { ChangeNameDtoWithPassWord, ProfileDto, ChangeGenderDtoWithPassWord, ChangeEmailDtoWithPassWord, ChangeAddressDtoWithPassWord, ChangePhoneNumbersDtoWithPassWord, ChangeDobDtoWithPassWord, ChangeWebsiteDtoWithPassWord, ChangePasswordDto, ChangeTwoFactorDto } from "../types/LotTypes";


export const appStatProcessing = () => { return { type: 'app/createOrUpdateStatus', createOrUpdateStatus: CreateOrUpdateStatus.Processing }; };
export const appStatNone = () => ({ type: 'app/createOrUpdateStatus', createOrUpdateStatus: CreateOrUpdateStatus.None });


export const getProfile = () => getFromEndpoint<ProfileDto, string>("profile/get", "api/v1/profile")("");
export const uploadProfilePicture = (dto: FormData) => postFilesToEndpoint("profile/photo/upload", "api/v1/profile/photo", dto);
export const updateUserName = (dto: ChangeNameDtoWithPassWord) => postToEndpoint("profile/name", "api/v1/profile/name", dto);
export const updateUserGender = (dto: ChangeGenderDtoWithPassWord) => postToEndpoint("profile/gender", "api/v1/profile/gender", dto);
export const updateUserEmail = (dto: ChangeEmailDtoWithPassWord) => postToEndpoint("profile/email", "api/v1/profile/email", dto);
export const updateUserAddress = (dto: ChangeAddressDtoWithPassWord) => postToEndpoint("profile/address", "api/v1/profile/address", dto);
export const updateUserPhone = (dto: ChangePhoneNumbersDtoWithPassWord) => postToEndpoint("profile/phone", "api/v1/profile/phone", dto);
export const updateUserDob = (dto: ChangeDobDtoWithPassWord) => postToEndpoint("profile/dob", "api/v1/profile/dob", dto);
export const updateUserWebsite = (dto: ChangeWebsiteDtoWithPassWord) => postToEndpoint("profile/website", "api/v1/profile/website", dto);

export const updatePassword = (dto: ChangePasswordDto) => postToEndpointNoContent("profile/password", "api/v1/profile/password", dto);
export const update2fa = (dto: ChangeTwoFactorDto) => postToEndpoint("profile/twofactor", "api/v1/profile/twofactor", dto);
export const get2fa = () => getFromEndpoint("profile/gettwofactor", "api/v1/profile/twofactor")("");

export const addFile = (file: unknown) => { return { type: "app/addFile", file: file }; };
export const removeFile = (fileName: string) => { return { type: "app/removeFile", fileName: fileName }; };
export const clearFiles = () => { return { type: "app/clearFile" }; }
