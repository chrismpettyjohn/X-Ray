import gql from 'graphql-tag';
import {useLocation} from 'wouter';
import {toast} from 'react-toastify';
import {useContext, useEffect} from 'react';
import {useMutation} from '@apollo/client';
import {useSession} from './session.hook.ts';
import {sessionContext} from '../../context/session/SessionContext';

const SESSION_CREATE_MUTATION = gql`
  mutation ($username: String!, $password: String!, $recaptcha: String!) {
    sessionCreate(
      username: $username
      password: $password
      recaptcha: $recaptcha
    ) {
      active
      userID
    }
  }
`;

export function useSessionCreate(
  username: string,
  password: string,
  recaptcha: string
): {tryLogin(): void} {
  const {setUser} = useContext(sessionContext);
  const [location, setLocation] = useLocation();
  const [
    sessionCreate,
    {data: sessionCreateData, loading: sessionCreateLoading},
  ] = useMutation(SESSION_CREATE_MUTATION, {
    variables: {username, password, recaptcha},
  });
  const authenticatedUser = useSession(sessionCreateData?.data?.id ?? 0);

  useEffect(() => {
    if (sessionCreateData && !sessionCreateLoading) {
      localStorage.setItem(
        'USER_ID',
        sessionCreateData.data.sessionCreate.userID
      );
    }
  }, [sessionCreateData, sessionCreateLoading]);

  useEffect(() => {
    if (authenticatedUser) {
      setUser(authenticatedUser);
      toast.success(`Welcome back, ${authenticatedUser.username}!`);
      setLocation('/me');
    }
  }, [authenticatedUser?.id]);

  return {
    tryLogin: () => {
      sessionCreate();
    },
  };
}
