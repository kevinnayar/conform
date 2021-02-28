// @ts-ignore
import jim from '../assets/images/portraits/jim-jordan.jpg';
// @ts-ignore
import josh from '../assets/images/portraits/josh-hawley.jpg';
// @ts-ignore
import kevin from '../assets/images/portraits/kevin-mccarthy.jpg';
// @ts-ignore
import marjorie from '../assets/images/portraits/marjorie-taylor-greene.jpg';
// @ts-ignore
import ted from '../assets/images/portraits/ted-cruz.jpg';

export type TextItem = {
  text: string;
  size: number;
  weight: string;
  color: string;
  left: number;
  top: number;
  width: number;
  height: number;
  border: number;
};

export type Dimensions = {
  width: number;
  height: number;
};

export type Person = {
  name: string;
  srcUrl: string;
};

export const RATIO_WIDTH = 640;
export const RATIO_HEIGHT = 360;

export const PERSONS: Person[] = [
  { name: 'Jim Jordan', srcUrl: jim },
  { name: 'Josh Hawley', srcUrl: josh },
  { name: 'Kevin McCarthy', srcUrl: kevin },
  { name: 'Marjorie Taylor Greene', srcUrl: marjorie },
  { name: 'Ted Cruz', srcUrl: ted },
];

export function getDimensions(windowWidth: number): Dimensions {
  return windowWidth >= 860
    ? { width: RATIO_WIDTH, height: RATIO_HEIGHT }
    : { width: RATIO_WIDTH / 2, height: RATIO_HEIGHT / 2 };
}

export function getTextRenderData(textNode: ChildNode, offset: number): [number, string][] {
  if (!textNode || !textNode.nodeValue) return [[0, '']];

  textNode.nodeValue = textNode.nodeValue.trim();

  const text = textNode.textContent;
  const textLength = text.length;

  const range = document.createRange();

  let result: [number, string][] = [];
  let prevTop = 0;

  for (let i = 0; i < textLength; i += 1) {
    const char = text[i];

    range.setStart(textNode, i);
    range.setEnd(textNode, i + 1);

    const top = range.getBoundingClientRect().top;

    if (result.length === 0) {
      result = [[top, char]];
    } else if (top === prevTop) {
      const existingIndex = result.findIndex((tuple) => tuple[0] === top);
      if (existingIndex > -1) {
        const existing = result[existingIndex];
        result[existingIndex] = [top, existing[1] + char];
      }
    } else {
      result[result.length] = [top, char];
    }

    prevTop = top;
  }

  return result.map((tuple) => [tuple[0] - offset, tuple[1].trim()]);
}

export function getDefaultHeadlineText(person: Person): string {
  return `Statement from ${person.name}`;
}

export function getDefaultHeadlineSize(person: Person): number {
  return person.name === 'Marjorie Taylor Greene' ? 22 : 30;
}

export function getImageElement(src: string): HTMLImageElement {
  const image = new Image();
  image.src = src;
  image.crossOrigin = 'anonymous';
  return image;
}

export function mutateContextForFont(ctx: CanvasRenderingContext2D, item: TextItem) {
  ctx.font = `${item.weight} ${item.size}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = item.color;
}


