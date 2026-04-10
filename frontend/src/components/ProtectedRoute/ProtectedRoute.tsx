import type {PropsWithChildren} from 'react';
import {Navigate} from 'react-router-dom';

interface Props extends PropsWithChildren {
  isAllowed: boolean;
}

const ProtectedRoute = ({isAllowed, children}: Props) => {
  if (!isAllowed) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;