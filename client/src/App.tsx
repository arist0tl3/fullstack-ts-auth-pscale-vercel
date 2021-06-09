import { gql, useQuery } from '@apollo/client';

const ROOT = gql`
  query {
    root
  }
`;

function Root() {
  const { loading, error, data } = useQuery(ROOT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <div>{data.root}</div>;
}

function App() {
  return (
    <div>
      <Root />
    </div>
  );
}

export default App;
