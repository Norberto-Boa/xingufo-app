import { Twilio } from "twilio";

interface SMSData {
  message: string;
  to: string;
}

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;

const client = new Twilio(accountSid, authToken);

client.messages;

export class SmsService {
  public static async send({ message, to }: SMSData) {
    return await client.messages.create({
      from: "+15109629353",
      to,
      body: message,
    });
  }
}
