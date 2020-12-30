import { centToDollars } from "../../utils/centToDollars";
import { relativeTime } from "../../utils/relativeTime";

export const useGridItem = ({ item }) => {
  // destructuring
  const { id, size, price, date, face } = item;
  // I make a new constant for better reading
  const dollars = centToDollars(price);

  const formattedDate = relativeTime(date);

  return { models: { id, size, dollars, formattedDate, face }, operators: {} };
};
