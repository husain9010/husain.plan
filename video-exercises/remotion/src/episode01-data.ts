export const episode01 = {
  number: '01',
  taskType: 'LISTEN & REPEAT',
  title: 'Nail the rhythm of long sentences',
  subtitle: 'practised in about 3 minutes',
  source: 'TOEFL iBT rhythm drill',
  whatsTested: [
    'Pronunciation clarity',
    'Stress and rhythm',
    'Connected speech',
  ],
  prompt: 'Despite the heavy rain, the match continued without any interruption.',
  yourTurnInstruction: 'Repeat it out loud',
  timerSec: 12,
  modelChunks: [
    {
      text: 'Despite the heavy rain,',
      stresses: ['de-SPITE', 'HEA-vy', 'RAIN'],
      arrow: '↘',
    },
    {
      text: 'the match continued',
      stresses: ['MATCH', 'con-TIN-ued'],
      arrow: '→',
    },
    {
      text: 'without any interruption.',
      stresses: ['with-OUT', 'in-ter-RUP-tion'],
      arrow: '↘',
    },
  ],
  ipa: '/dɪˈspaɪt ðə ˈhɛv.i ˈreɪn  ðə ˈmætʃ kənˈtɪn.juːd  wɪˈðaʊt ˈɛn.i ˌɪn.təˈrʌp.ʃən/',
  linkingArcs: [
    {from: 'heavy', to: 'rain', kind: 'consonant-to-vowel'},
    {from: 'match', to: 'continued', kind: 'assimilation'},
    {from: 'without', to: 'any', kind: 'consonant-to-vowel'},
  ],
  notes: [
    'Stress lands on content words — never on the, of, in.',
    'Link the final consonant to the next vowel: heavy‿rain.',
  ],
  takeaway: 'Stress the meaning words. Let the function words shrink.',
  nextTease: 'NEXT · Episode 02 — Read Aloud under pressure',
};

export const sceneTimings = {
  s1: {inSec: 0, outSec: 5},
  s2: {inSec: 5, outSec: 15},
  s3: {inSec: 15, outSec: 30},
  s4: {inSec: 30, outSec: 45},
  s5: {inSec: 45, outSec: 90},
  s6: {inSec: 90, outSec: 150},
  s7: {inSec: 150, outSec: 165},
  s8: {inSec: 165, outSec: 180},
};
