const basicUrl = 'https://www.googleapis.com/youtube/v3/search?';

const fetchData = (keyword, pageToken = '') => {
  const params = new URLSearchParams({
    maxResults: 24,
    key: process.env.REACT_APP_GOOGLE_API_TOKEN,
    part: 'snippet',
  });
  params.append('q', keyword);
  params.append('pageToken', pageToken);
  return fetch(`${basicUrl}${params.toString()}`).then((res) => res.json());
};

export default fetchData;
