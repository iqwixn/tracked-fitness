import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import React from 'react';
import { useMediaQuery } from 'react-responsive';

// const Example = () => {
//   const isDesktopOrLaptop = useMediaQuery({
//     query: '(min-device-width: 375px)'
//   });

//   const isTabletOrMobile = useMediaQuery({
//     query: '(max-width: 667px)'
//   });

//   return (
//     <div>
//       {isDesktopOrLaptop && (
//         <h1>Desktop view</h1>,
//         {/* Your desktop content */}
//       )}
//       {isTabletOrMobile && (
//         <h1>Mobile/Tablet view</h1>,
//         {/* Your mobile/tablet content */}
//       )}
//     </div>
//   );
// }


import Nav from './components/Nav';
import { StoreProvider } from './utils/GlobalState';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      {/* < useMediaQuery /> */}
        <Nav />
        <Outlet />
    </ApolloProvider>
  );
}

export default App;
