export class DateUtils {
  date: Date;

  constructor(date: Date) {
    this.date = date;
  }

  isDateTimeBeforeCurrentDateTimeInBrazil() {
    const currentTimeBrazil = new Date().toLocaleString("en-US", {
      timeZone: "America/Sao_Paulo",
    });

    const currentDateTimeBrazil = new Date(currentTimeBrazil);

    const validation = this.date > currentDateTimeBrazil;

    return validation;
  }
}
