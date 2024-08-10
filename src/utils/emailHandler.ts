import { FormRequest } from '@/interfaces/formInterface';
import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "aldova811@gmail.com",
    pass: "aubrvrnsmyssxceg"
  }
});

export const sendFormEmailHandler = async (formData: FormRequest, receiverEmail: string) => {

  var mailOptions = {
    from: 'aldova811@gmail.com',
    to: receiverEmail,
    subject: formData.form_name,
    html: FormEmailTemplate(formData)
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return {
        message: 'Failed sending form email',
        error: error
      };
    } else {
      return {
        message: 'Success sending form email',
        status: info.response
      };
    }
  });
};


const FormEmailTemplate = (formData: FormRequest) => {
  const questionsAndAnswers = formData.form_data.map(({ question, answer }) => `
    <tr>
      <td style="padding: 10px 0;"><strong>${question}:</strong></td>
      <td style="padding: 10px 0;">${answer}</td>
    </tr>
  `).join('');

  const html = `<!DOCTYPE html>
                  <html>
                  <head>
                      <meta charset="UTF-8">
                      <title>Form Submission Details</title>
                  </head>
                  <body style="font-family: Arial, sans-serif; background-color: #f3f3f3; margin: 0; padding: 0;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f3f3;">
                          <tr>
                              <td>
                                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; margin-top: 30px; border-radius: 8px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);">
                                      <tr>
                                          <td align="center" style="padding: 20px 0;">
                                              <img src="https://www.milkyano.com/_next/image?url=%2Fassets%2Fmilkyano-logo.png&w=640&q=75" alt="Company Logo" style="width: 120px; max-width: 200px;">
                                          </td>
                                      </tr>
                                      <tr>
                                          <td align="center" style="color: #333333; font-size: 28px; padding: 20px 0;">
                                              <strong>Form Submission Details</strong>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td align="center" style="color: #007BFF; font-size: 22px; padding: 0 30px;">
                                              <strong>${formData.form_name}</strong>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="padding: 20px;">
                                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                  ${questionsAndAnswers}
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </body>
                </html>`;
  return html;
};
