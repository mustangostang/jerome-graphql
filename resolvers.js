import { getMultitranTranslation } from './resolvers/multitran';
import { getWhitaker, getLatinForm } from './resolvers/whitaker';

export const resolvers = {
  Query: {
    getMultitranTranslation: (_, { source, lang }) => getMultitranTranslation(source, lang),
    getWhitaker: (_, { source }) => getWhitaker(source),
  },
  LatinWordForm: {
    partOfSpeech: (obj) => getLatinForm(obj, 'partOfSpeech'),
    form: (obj) => getLatinForm(obj, 'form')
  }
};