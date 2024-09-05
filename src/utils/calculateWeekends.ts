import dayjs from "dayjs";

export function calculateWeekends(month: number, year: number) {
  let weekendCount = 0;
  let weekends = [];
  let currentDay = dayjs(`${year}-${month}-01`);

  while (currentDay.day() !== 5) {
    currentDay = currentDay.add(1, "day");
  }

  while (currentDay.month() + 1 === month) {
    let friday = currentDay.format("DD/MM/YYYY");
    let saturday = currentDay.add(1, "day").format("DD/MM/YYYY");

    weekends.push({ friday, saturday });
    weekendCount++;

    currentDay = currentDay.add(7, "day");
  }

  return { weekendCount, weekends };
}
