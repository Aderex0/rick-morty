import { ApolloError } from "@apollo/client";
import ListCard from "../component_lib/reusables/ListCard";
import Pagination from "../component_lib/reusables/Pagination";

export interface Character {
  id: React.Key;
  name: string;
  image: string;
}

interface ListProps {
  results: [Character];
}

interface Info {
  pages: number;
}

interface CharacterList {
  results: [Character];
  info: Info;
}

interface ListCharacterProps {
  error: ApolloError | undefined;
  loading: boolean;
  page: number;
  characters: CharacterList;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const List = ({ results }: ListProps) => (
  <div className="flex flex-wrap justify-center max-w-6xl mb-16">
    {results?.map((character: Character) => (
      <ListCard character={character} key={character?.id} />
    ))}
  </div>
);

const ListCharacters = ({ error, loading, characters, page, setPage }: ListCharacterProps) => {
  if (error) return null;
  if (loading) return null;
  return (
    <>
      {loading ? null : <List results={characters?.results} />}
      <Pagination page={page} lastPage={characters?.info?.pages} setPage={setPage} />
    </>
  );
};

export default ListCharacters;
