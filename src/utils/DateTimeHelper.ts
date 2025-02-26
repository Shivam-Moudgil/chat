import moment from "moment-timezone";

    export const convertUTCToLocalTime = (date: string, format: string): string => {
      return moment.utc(date).tz("Asia/Kolkata").format(format);
    };
