import qs from 'qs';
import { useLocation, useHistory } from 'react-router-dom';

// const tryParseInt = (value) => {
//   const intValue = parseInt(value, 10);
//   if (Number.isNaN(intValue)) {
//     return value;
//   }
//   return intValue;
// };

const useQueryString = () => {
  const location = useLocation();
  const history = useHistory();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  return {
    query,
    setQueryString: (params) => {
      history.push({
        pathname: location.pathname,
        search: qs.stringify({ ...query, ...params }),
      });
    },
  };
};

export default useQueryString;
