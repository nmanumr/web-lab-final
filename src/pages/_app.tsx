import React from "react";
import type {AppProps} from 'next/app';
import {Provider} from 'next-auth/client'
import {SWRConfig} from 'swr'

import '../styles/globals.css';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <SWRConfig value={{fetcher: (resource, init) => fetch(resource, init).then(res => res.json())}}>
        <div className="min-h-screen w-full flex bg-gray-100">

          <div className="flex-grow min-w-0">
            <Component {...pageProps} />
          </div>
        </div>
      </SWRConfig>
    </Provider>
  );
}

export default MyApp
