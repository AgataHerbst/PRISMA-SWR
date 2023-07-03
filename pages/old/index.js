import { Typography } from '@mui/material';
import { SWRConfig } from 'swr';

import Main from '../../components/Main';

export async function getStaticProps() {
 return {
    props: {
      fallback: {
        '/api/users': []
      }
    }
  };
}

export default function HomePage({ fallback }) {
  return <SWRConfig value={{ fallback }}>
    <Typography
    variant="h3">Таблица пользователей</Typography>
    <Main />
  </SWRConfig>;
}