import axios from 'axios';
import _ from 'lodash';

const fetchData = async (word) => {
  const response = await axios({ method: 'GET', 
    url: `http://archives.nd.edu/cgi-bin/wordz.pl?keyword=${word}` });
  return response.data;
};

export async function getWhitaker(source) {
  let data = _.split(await fetchData(source), "\n") |> (w => _.slice(w, 2, -2))
  data = _.map(data, w => _.trim(w));
  
  let words = [];
  let word = { forms: [], translation: '' };
  for (i = 0; i < data.length; i++) {
    let line = data[i];
    if (/;/.test(line)) { word['translation'] = `${word['translation']}${line} `; continue; }
    if (/,/.test(line)) { word['entry'] = line; continue; }
    if (word['entry']) {
      word.translation = word.translation |> _.trim
      words.push(word);
      word = { forms: [], translation: '' };
    }
    word.forms = _.concat(word.forms, [line]);
  }
  word.translation = word.translation |> _.trim
  words.push(word);

  return words;
}

export function getLatinForm(obj, arg) {
  const string = obj.substr(21);
  const partOfSpeech = string.substr(0, 5) |> _.trim
  const form = string.substr(5) |> _.trim
  const entry = { partOfSpeech, form }
  return entry[arg];
}

export function getLatinRootForm(obj) {
  return _.split(obj.entry, ',') |> _.first;
}