/**
 * Classic 5x7 GLCD font, printable ASCII 0x20-0x7E (95 glyphs).
 *
 * Column-major, one byte per column, LSB = top pixel. This is the same layout
 * the C++ core uses, so a glyph rendered here and a glyph rendered on real
 * hardware come from identical bytes — which is what lets the parity gate
 * (docs/00-architecture.md §5.4) compare them at all.
 */

/** 5 bytes per glyph, ordered from 0x20. */
// prettier-ignore
const ROWS: readonly string[] = [
  '0000000000', '00005F0000', '0007000700', '147F147F14', '242A7F2A12', // ' ' ! " # $
  '2313086462', '3649552250', '0005030000', '001C224100', '0041221C00', // % & ' ( )
  '14083E0814', '08083E0808', '0050300000', '0808080808', '0060600000', // * + , - .
  '2010080402', '3E5149453E', '00427F4000', '4261514946', '2141454B31', // / 0 1 2 3
  '1814127F10', '2745454539', '3C4A494930', '0171090503', '3649494936', // 4 5 6 7 8
  '064949291E', '0036360000', '0056360000', '0814224100', '1414141414', // 9 : ; < =
  '0041221408', '0201510906', '324979413E', '7E1111117E', '7F49494936', // > ? @ A B
  '3E41414122', '7F4141221C', '7F49494941', '7F09090901', '3E4149497A', // C D E F G
  '7F0808087F', '00417F4100', '2040413F01', '7F08142241', '7F40404040', // H I J K L
  '7F020C027F', '7F0408107F', '3E4141413E', '7F09090906', '3E4151215E', // M N O P Q
  '7F09192946', '4649494931', '01017F0101', '3F4040403F', '1F2040201F', // R S T U V
  '3F4038403F', '6314081463', '0708700807', '6151494543', '007F414100', // W X Y Z [
  '0204081020', '0041417F00', '0402010204', '4040404040', '0001020400', // \ ] ^ _ `
  '2054545478', '7F48444438', '3844444420', '384444487F', '3854545418', // a b c d e
  '087E090102', '0C5252523E', '7F08040478', '00447D4000', '2040443D00', // f g h i j
  '7F10284400', '00417F4000', '7C04180478', '7C08040478', '3844444438', // k l m n o
  '7C14141408', '081414187C', '7C08040408', '4854545420', '043F444020', // p q r s t
  '3C4040207C', '1C2040201C', '3C4030403C', '4428102844', '0C5050503C', // u v w x y
  '4464544C44', '0008364100', '00007F0000', '0041360800', '08082A1C08', // z { | } ~
]

export const FONT_WIDTH = 5
export const FONT_HEIGHT = 7
/** Advance includes the 1px inter-character gap the C++ core also inserts. */
export const FONT_ADVANCE = 6

const FIRST_CHAR = 0x20
const LAST_CHAR = 0x7e
const GLYPH_COUNT = LAST_CHAR - FIRST_CHAR + 1 // 95

// A short glyph would silently shift every character after it, so the table is
// validated at module load rather than producing mangled text at render time.
if (ROWS.length !== GLYPH_COUNT) {
  throw new Error(`font5x7: expected ${GLYPH_COUNT} glyphs, got ${ROWS.length}`)
}
for (let i = 0; i < ROWS.length; i++) {
  if (ROWS[i].length !== FONT_WIDTH * 2) {
    throw new Error(
      `font5x7: glyph ${i} (0x${(FIRST_CHAR + i).toString(16)}) has ` +
        `${ROWS[i].length / 2} bytes, expected ${FONT_WIDTH}`,
    )
  }
}

const GLYPHS = new Uint8Array(GLYPH_COUNT * FONT_WIDTH)
for (let i = 0; i < ROWS.length; i++) {
  for (let b = 0; b < FONT_WIDTH; b++) {
    GLYPHS[i * FONT_WIDTH + b] = parseInt(ROWS[i].slice(b * 2, b * 2 + 2), 16)
  }
}

/** Five column bytes for `char`. Unknown codepoints fall back to '?'. */
export function glyph(char: string): Uint8Array {
  let code = char.charCodeAt(0)
  if (code < FIRST_CHAR || code > LAST_CHAR) code = 0x3f // '?'
  const offset = (code - FIRST_CHAR) * FONT_WIDTH
  return GLYPHS.subarray(offset, offset + FONT_WIDTH)
}

/** Rendered width of `text` in pixels, trailing gap excluded. */
export function textWidth(text: string): number {
  return text.length === 0 ? 0 : text.length * FONT_ADVANCE - 1
}
