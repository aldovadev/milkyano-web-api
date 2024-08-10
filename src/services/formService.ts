import { sendFormEmailHandler } from "../utils/emailHandler"
import { FormRequest } from "../interfaces/formInterface"

export const forwardFormToEmail = async (formData: FormRequest, email: string): Promise<any> => {
  try {
    const response = await sendFormEmailHandler(formData, email)
    return {
      message: 'Success sending form email',
      status: 'SUCCESS'
    };
  } catch (error) {
    return {
      message: 'Failed sending form email',
      error: error
    };
  }
}