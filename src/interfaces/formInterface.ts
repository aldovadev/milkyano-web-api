export interface FormRequest {
  form_name: string;
  form_data: formData[];
}

export interface formData {
  question: string;
  answer: string;
}

export interface AdsRequest {
  sourceUrl: string;
  fullName: string;
  email: string;
  businessName: string
}
