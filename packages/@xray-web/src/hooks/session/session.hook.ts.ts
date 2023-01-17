import gql from 'graphql-tag';
import {useQuery} from 'urql';
import {User} from '@xray/types';
import {useEffect} from 'react';

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
  const [{data}, sessionQuery] = useQuery({query: SESSION_QUERY});

  useEffect(() => {
    if (!refresh) {
      return;
    }
    sessionQuery();
  }, [refresh]);

  return data;
}
