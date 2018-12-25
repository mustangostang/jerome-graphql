import { getMultitranTranslation } from './resolvers/multitran';
import { getWhitaker, getLatinForm, getLatinRootForm } from './resolvers/whitaker';
import { getDvoretsky } from './resolvers/dvoretsky';
import { getLogeion } from './resolvers/logeion';

export const resolvers = {
  Query: {
    getMultitranTranslation: (_, { word, lang }) => getMultitranTranslation(word, lang),
    getWhitaker: (_, { word }) => getWhitaker(word),
    getDvoretsky: (_, { word }) => getDvoretsky(word),
  },
  LatinWord: {
    rootForm: (obj) => getLatinRootForm(obj),
    russian: (obj) => obj |> getLatinRootForm |> getDvoretsky,
    logeion: (obj) => obj |> getLatinRootForm |> getLogeion,
  },
  LatinWordForm: {
    partOfSpeech: (obj) => getLatinForm(obj, 'partOfSpeech'),
    form: (obj) => getLatinForm(obj, 'form')
  }
};