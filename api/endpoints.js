/* eslint-disable semi */
// main api  baseurl endpoints
export const BASE_URL = 'https://api.trioford.com/api/v1';

// auth post api endpoints
export const POST_LOGIN_USER = '/user/login';
export const POST_REGISTER_USER = '/user/register';
export const POST_GET_OTP = '/user/get_otp';
export const POST_VERIFY_OTP = '/user/verify_otp';
export const POST_USER_CHECK = '/explore/username/';
export const POST_FIND_USER = '/explore/find_user';
export const POST_USER_FOLLOW = '/follow/start';
export const POST_USER_UNFOLLOW = '/follow/stop';
export const POST_USER_COMMENT = '/watch/video/comment/';
export const POST_GETALL_USER_COMMENT = '/watch/video/comments/';
export const POST_USER_LIKE_VIDEOS = '/watch/video/like';

// auth get api endpoints
export const GET_USER_PROFILE_DETAILS = '/user/profile';
export const GET_USER_RESET_PASSWORD = '/user/reset_password';
export const GET_WATCH_VIDEOS = '/watch/videos';
export const GET_USER_FOLLOWING = '/follow/followings';
export const GET_USER_FOLLOWERS = '/follow/followers';
export const GET_USER_VIDEOS = '/user/videos';

// auth put api endpoints
export const PUT_USER_UPDATE_PROFILE_DETAILS = '/user/profile/update/details';

//auth patch api endpoints
export const PATCH_UPDATE_PROFILE_PICTURE = '/user/profile/update/picture';
