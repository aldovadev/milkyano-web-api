import { FormRequest } from "../interfaces/formInterface"

export const forwardFormToEmail = async (formData: FormRequest, email: string): Promise<any> => {
  try {
    console.log(formData)
    return formData
  } catch (error) {
    return error
  }
}