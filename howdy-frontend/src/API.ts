import axios, { AxiosError } from "axios";
import { ProfilePicData, User, UserFormData, UserLoginData } from "./user";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 */

export class FriendlyApi {

  static token?: string;

  static async request(endpoint: string, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FriendlyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("API Error:", err.response);
        const message = err.response?.data.error.message;
        throw Array.isArray(message) ? message : [message];
      } else {
        console.error(err);
      }
    }
  }

  // Individual API routes

  static async registerUser(user: UserFormData): Promise<string> {
    const res = await this.request(`auth/register`, user, "post");
    return res.token;
  }

  static async loginUser(user: UserLoginData): Promise<string> {
    const res = await this.request(`auth/token`, user, "post");
    return res.token;
  }

  static async getUser(id: number): Promise<User> {
    const res = await this.request(`users/${id}`);
    return res.user;
  }

  static async getUserByUsername(username: string): Promise<User> {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  static async getNextPotentialMatch() {
    const res = await this.request(`friends/nextPotential`)
    return res.user
  }

  static async likeOrDislikeUser(toUserId: number, liked: boolean) : Promise<boolean> {
    const res = await this.request('likeDislike', {toUserId, liked}, "post")
    return res.becameFriends;
  }

  static async uploadProfilePic(profilePic: ProfilePicData): Promise<string> {
    //FIXME: update the local image
    //FIXME: handle null pic ?

    const formData = new FormData();
    formData.append(
      "image",
      profilePic.image!,
      profilePic.image?.name
    );

    const res = await this.request(`users/uploadProfilePic`, formData, "post");
    return res.imageURL;
  }

  static async getFriends(): Promise<User[]> {
    const res = await this.request(`friends`)
    return res.matches
  }

}