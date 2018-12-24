import { getMultitranTranslation } from './resolvers/multitran';
import { getWhitaker, getLatinForm } from './resolvers/whitaker';
import { getDvoretsky } from './resolvers/dvoretsky';

export const resolvers = {
  Query: {
    getMultitranTranslation: (_, { word, lang }) => getMultitranTranslation(word, lang),
    getWhitaker: (_, { word }) => getWhitaker(word),
    getDvoretsky: (_, { word }) => getDvoretsky(word),
  },
  LatinWordForm: {
    partOfSpeech: (obj) => getLatinForm(obj, 'partOfSpeech'),
    form: (obj) => getLatinForm(obj, 'form')
  }
};