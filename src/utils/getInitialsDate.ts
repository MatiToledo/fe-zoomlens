import dayjs from "dayjs";

export default function getInitialsDate(type: "start" | "end") {
  const today = dayjs();
  if (type === "start") {
    const firstDayOfMonth = today.startOf("month");
    const formattedDate = firstDayOfMonth.format("YYYY-MM-DD");
    return formattedDate;
  } else {
    const lastDayOfMonth = today.endOf("month");

    const formattedDate = lastDayOfMonth.format("YYYY-MM-DD");
    return formattedDate;
  }
}
