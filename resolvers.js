import { getMultitranTranslation } from './resolvers/multitran';
import { getWhitaker, getLatinForm, getLatinRootForm } from './resolvers/whitaker';
import { getDvoretsky } from './resolvers/dvoretsky';

export const resolvers = {
  Query: {
    getMultitranTranslation: (_, { word, lang }) => getMultitranTranslation(word, lang),
    getWhitaker: (_, { word }) => getWhitaker(word),
    getDvoretsky: (_, { word }) => getDvoretsky(word),
  },
  LatinWord: {
    rootForm: (obj) => getLatinRootForm(obj),
    russianTranslation: (obj) => obj |> getLatinRootForm |> getDvoretsky
  },
  LatinWordForm: {
    partOfSpeech: (obj) => getLatinForm(obj, 'partOfSpeech'),
    form: (obj) => getLatinForm(obj, 'form')
  }
};