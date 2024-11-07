import { AdsRequest, FormRequest } from '../interfaces/formInterface';
import { forwardFormToEmail, sendAdsWebhook } from '../services/formService';
import { Request, Response } from 'express';

export const forwardFormClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const email: string = req.query.email as string
    const formData: FormRequest = req.body;
    const result = await forwardFormToEmail(formData, email);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const forwardFormAds = async (req: Request, res: Response): Promise<void> => {
  try {
    const formData: AdsRequest = req.body;
    const result = await sendAdsWebhook(formData);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};