import axios from 'axios';
import _ from 'lodash';

const fetchData = async (word) => {
  const response = await axios.get(`https://api.logeion.org/detail?type=normal&w=${word}`, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36' }});
  return response.data;
};

export async function getLogeion(word) {
  data = await fetchData(word);
  const detail = data.detail;
  return { 
    headword: detail.headword, shortdef: detail.shortdef |> _.first, 
    lewisshort: (detail.lewisshort |> _.first).replace(/<(?:.|\n)*?>/gm, '')
  }
}

