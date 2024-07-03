'use client';

import { createTheme, DEFAULT_THEME } from '@mantine/core';
import { COLORS } from './src/constant/colors';
import { poppins } from './src/libs/next-font';

type ColorsShadeTuple = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

function getCustomColors(colors: { [key: string]: string }): {
  [key: string]: ColorsShadeTuple;
} {
  const finalColors: { [key: string]: ColorsShadeTuple } = {};
  const colorsName = Object.keys(colors);

  for (let i = 0; i < colorsName.length; i++) {
    finalColors[`${colorsName[i]}`] = new Array(10).fill(
      colors[colorsName[i]],
    ) as ColorsShadeTuple;
  }

  return finalColors;
}

export const theme = createTheme({
  /* Put your mantine theme override here */
  colors: {
    ...getCustomColors(COLORS),
  },
  fontFamily: poppins.className,
});
