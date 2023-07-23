export const genEventId = () => {
  return Math.floor(Math.random() * 1000000);
};

export const relativeTime = (timestamp: number) => {
  const units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };
  const elapsed = timestamp - Date.now();
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  // "Math.abs" accounts for both "past" & "future" scenarios
  // @ts-ignore
  // @ts-ignore
  for (let u in units) {
    // @ts-ignore
    if (Math.abs(elapsed) > units[u] || u == "second")
      // @ts-ignore
      return rtf.format(Math.round(elapsed / units[u]), u);
  }
};
