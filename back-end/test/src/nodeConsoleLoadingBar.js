export const createBlankSpaces = (progress, divider) => {
  if (divider !== undefined && (isNaN(divider) || !Number.isInteger(divider))) {
    return "Is not a valid number";
  }
  if (divider > 100) {
    return "Please give a number under or equal to 100";
  }

  const breakPoint = divider ?? 1;
  const lenght = 100 / breakPoint;

  let bar = "";
  const formattedString = String(progress / breakPoint).split(".")[0];
  const barProgress = parseInt(formattedString);

  for (let i = 1; i <= lenght; i++) {
    if (barProgress >= i) {
      bar = bar + `\u2588`;
    } else {
      bar = bar + ` `;
    }
  }

  return bar;
};

export default function nodeConsoleLoadingBar(actualProgress, divider) {
  return `[${createBlankSpaces(actualProgress, divider)}] - ${actualProgress}%`;
}
