import { sendFormEmailHandler } from "../utils/emailHandler"
import { AdsRequest, FormRequest } from "../interfaces/formInterface"
import axios from "axios";
import dotenv from "dotenv"

dotenv.config()

export const forwardFormToEmail = async (formData: FormRequest, email: string): Promise<any> => {
  try {
    const response = await sendFormEmailHandler(formData, email)
    return {
      message: 'Success sending form email',
      data: response,
      status: 'SUCCESS'
    };
  } catch (error) {
    return {
      message: 'Failed sending form email',
      error: error
    };
  }
}

export const sendAdsWebhook = async (formData: AdsRequest): Promise<any> => {
  try {
    const payload = new FormData();
    payload.append("fullName", formData.fullName);
    payload.append("email", formData.email);
    payload.append("businessName", formData.businessName);

    const response = await axios.post(
      process.env.PABBLY_WEBHOOK_URL,
      payload,
    );

    return {
      message: 'Success sending form ads webhook',
      data: response.data,
      status: 'SUCCESS',
    };
  } catch (error) {
    return {
      message: 'Failed sending form email',
      status: "FAILED",
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
