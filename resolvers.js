import _ from 'lodash';
import { getMultitranTranslation } from './resolvers/multitran';
import { getWhitaker, getLatinForm, getLatinRootForm } from './resolvers/whitaker';
import { getDvoretsky, filterTranslations, filterPhrases } from './resolvers/dvoretsky';
import { getLogeion } from './resolvers/logeion';

export const resolvers = {
  Query: {
    getMultitranTranslation: (_, { word, lang }) => getMultitranTranslation(word, lang),
    getWhitaker: (_, { word }) => getWhitaker(word),
    getDvoretsky: (_, { word }) => getDvoretsky(word),
  },
  LatinWord: {
    fullForms: (obj) => obj.forms,
    forms: (obj) => _.map(obj.forms, form => getLatinForm(form, 'form')) |> _.compact,
    russian: (obj) => obj |> getLatinRootForm |> getDvoretsky,
    logeion: (obj) => obj |> getLatinRootForm |> getLogeion,
  },
  LatinWordForm: {
    partOfSpeech: (obj) => getLatinForm(obj, 'partOfSpeech'),
    form: (obj) => getLatinForm(obj, 'form')
  },
  RussianTranslation: {
    translations: (obj) => obj.entries |> filterTranslations,
    phrases: (obj) => obj.entries |> filterPhrases,
  }
};