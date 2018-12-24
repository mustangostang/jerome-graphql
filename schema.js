import { gql } from 'apollo-server-lambda';

export default gql`
  type Query {
    getMultitranTranslation(word: String!, lang: String): [DictionaryWord],
    getWhitaker(word: String!): [LatinWord],
    getDvoretsky(word: String!): RussianTranslation,
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

  type RussianTranslation {
    word: String!
    form: String
    translations: [String]
  }

`