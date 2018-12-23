import cheerio from 'cheerio';
import axios from 'axios';
import _ from 'lodash';
import windows1251 from 'windows-1251';

const fetchData = async (word, number) => {
  const response = await axios({ method: 'GET', responseType: 'arraybuffer', 
    url: `https://www.multitran.ru/c/m.exe?CL=1&s=${word}&l1=${number}` });
  return windows1251.decode(response.data.toString('binary'));
};

const dictionaryNumber = (lang) => {
  return ({ de: 3, en: 1, fr: 4, es: 5, nl: 24, it: 23 }[lang] || 1);
}

export async function getMultitranTranslation(source, lang = 'de') {
  data = await fetchData(source, dictionaryNumber(lang));
  const doc = data |> cheerio.load;
  table = 'body > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table:nth-child(1) > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > table:nth-child(5) tr' |> doc
  trs = _.map(table, tr => _.map(_.split(doc(tr).text() |> _.trim, '\n'), w => w |> _.trim));
  trs = _.map(trs, tr => tr.length == 1 ? 
    { type: 'section', section: tr[0] |> (w => _.split(w, '|')) |> _.first |> (w => w.replace('в начало', '')) |> _.trim } : 
    { type: 'translations', abbr: tr[0], translations: _.map(_.split(tr[1], '; '), word => word |> _.trim)  }
  )
  sections = _.map(trs, (section, i) => (
    section.type != 'section' ? null :
      { i: i, word: section.section, entries: _.slice(trs, i + 1) |> (trs => _.takeWhile(trs, { type: 'translations' })) }
  )) |> _.compact;

  return sections;
}