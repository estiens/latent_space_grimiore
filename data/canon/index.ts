// Export all canon collections for the Digital Grimoire

export { malkuthCanon } from './malkuth';
export { yesodCanon } from './yesod';
export { hodCanon } from './hod';
export { netzachCanon } from './netzach';
export { tipharethCanon } from './tiphareth';
export { geburahCanon } from './geburah';
export { chesedCanon } from './chesed';
export { binahCanon } from './binah';
export { chokmahCanon } from './chokmah';
export { ketherCanon } from './kether';
export { daatCanon } from './daat';

// Master collection of all symbols
import { malkuthCanon } from './malkuth';
import { yesodCanon } from './yesod';
import { hodCanon } from './hod';
import { netzachCanon } from './netzach';
import { tipharethCanon } from './tiphareth';
import { geburahCanon } from './geburah';
import { chesedCanon } from './chesed';
import { binahCanon } from './binah';
import { chokmahCanon } from './chokmah';
import { ketherCanon } from './kether';
import { daatCanon } from './daat';

export const allCanon = [
  ...malkuthCanon,
  ...yesodCanon,
  ...hodCanon,
  ...netzachCanon,
  ...tipharethCanon,
  ...geburahCanon,
  ...chesedCanon,
  ...binahCanon,
  ...chokmahCanon,
  ...ketherCanon,
  ...daatCanon,
];

// Canon organized by sephirah
export const canonBySephirah = {
  malkuth: malkuthCanon,
  yesod: yesodCanon,
  hod: hodCanon,
  netzach: netzachCanon,
  tiphareth: tipharethCanon,
  geburah: geburahCanon,
  chesed: chesedCanon,
  binah: binahCanon,
  chokmah: chokmahCanon,
  kether: ketherCanon,
  daat: daatCanon,
};
