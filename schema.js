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
    rootForm: String!
    entry: String!
    translation: String!
    russian: RussianTranslation
    logeion: LogeionTranslation
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

  type LogeionTranslation {
    headword: String!
    shortdef: String
    lewisshort: String
  }

`