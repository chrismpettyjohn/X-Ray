import gql from 'graphql-tag';
import {User} from '@xray/types';
import {useEffect} from 'react';
import {useQuery} from '@apollo/client';

const SESSION_QUERY = gql`
  query {
    session {
      id
      username
      profilePicture {
        id
        url
        type
        extension
        createdAt
        updatedAt
      }
    }
  }
`;

export function useSession(refresh = 0): User | undefined {
  const sessionQuery = useQuery(SESSION_QUERY);

  useEffect(() => {
    if (!refresh) {
      return;
    }
    sessionQuery.refetch();
  }, [refresh]);

  return sessionQuery.data;
}
