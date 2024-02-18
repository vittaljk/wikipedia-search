import Axios from 'axios';

export async function getWikiSearchData(
  query: string,
  offset: number,
  limit = 100,
) {
  let response = null;
  try {
    response = await Axios.get(
      `/api/wiki?query=${query}&offset=${offset}&limit=${limit}`,
    );
  } catch (error) {
    console.log(error);
  }
  return response;
}
