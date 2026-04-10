import type {PropsWithChildren} from 'react';
import AppToolbar from '../AppToolbar/AppToolbar';

const Layout = ({children}: PropsWithChildren) => {
  return (
    <>
      <AppToolbar />
      <main style={{padding: '20px'}}>
        {children}
      </main>
    </>
  );
};

export default Layout;