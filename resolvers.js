import { getMultitranTranslation } from './resolvers/multitran';

export const resolvers = {
  Query: {
    getMultitranTranslation: (_, { source, lang }) => getMultitranTranslation(source, lang),
  }
};