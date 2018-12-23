import { gql } from 'apollo-server-lambda';

export default gql`
  type Query {
    getMultitranTranslation(source: String!, lang: String): [DictionaryWord],
    getWhitaker(source: String!): [LatinWord],
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

  type LatinWord {
    forms: [LatinWordForm]
    entry: String!
    translation: String!
  }

  type LatinWordForm {
    partOfSpeech: String!
    form: String!
  }

`