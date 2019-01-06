import cheerio from 'cheerio';
import axios from 'axios';
import _ from 'lodash';
import latin from '../data/latin.json'

const fetchData = async (id, word) => {
  const response = await axios.get(`https://dic.academic.ru/dic.nsf/latin_rus/${id}/${word}`, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36' }});
  return response.data;
};

export async function getDvoretsky(word) {
  let id = latin[word];
  if (!id) { id = latin[_.lowerCase(word)] }
  if (!id) {
    return { word: word, id: null };
  }

  data = await fetchData(id, word);
  const doc = data |> cheerio.load;
  const entries = _.split(('.descript' |> doc).text(), "\n")
  const filteredEntries = _.filter(entries, e => e |> _.trim)
  const allEntries = _.slice(filteredEntries, 1);
  const joinedEntries = _.concat([`${allEntries[0]} ${allEntries[1]}`], _.slice(allEntries, 2));

  return {
    word: word,
    id: Number(id),
    form: filteredEntries[0],
    entries: joinedEntries
  }
}

export function filterTranslations(entries) {
  return _.filter(entries, e => e[1] === ')');
}

export function filterPhrases(entries) {
  return _.filter(entries, e => e[1] !== ')');
}

