import { gql } from 'apollo-server-lambda';

export default gql`
  type Query {
    getMultitranTranslation(source: String!, lang: String): [DictionaryWord]
  }

  type DictionaryWord {
    word: String!
    entries: [DictionaryEntry]
    translations: [String]
  }

  type DictionaryEntry {
    abbr: String
    translations: [String]
  }

`