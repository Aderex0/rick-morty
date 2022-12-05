import { useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import GET_CHARACTER from "../api/queries/getCharacter";
import Button from "../component_lib/reusables/Button";
import CharacterCard from "../component_lib/reusables/CharacterCard";
import Error from "../component_lib/reusables/Error";
import Loading from "../component_lib/reusables/Loading";

interface CharacterNavProps {
  id: number;
  lastPage: number;
}

interface DisplayCharacterProps {
  lastPage: number;
}

export const CharacterNav = ({ id, lastPage }: CharacterNavProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between p-2 w-full h-16">
      <Button text="Prev" disabled={id === 1} onClick={() => navigate(`/character/${id - 1}`)} />
      <Button text="Close" onClick={() => navigate("/")} />
      <Button text="Next" disabled={id === lastPage} onClick={() => navigate(`/character/${id + 1}`)} />
    </div>
  );
};

const DisplayCharacter = ({ lastPage }: DisplayCharacterProps) => {
  const { id = "1" } = useParams();
  const { loading, error, data } = useQuery(GET_CHARACTER, { variables: { id } });

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <div className="w-80 flex flex-col justify-around md:justify-center items-center h-screen">
      <CharacterCard character={data?.character} />
      <CharacterNav id={parseInt(id, 10)} lastPage={lastPage} />
    </div>
  );
};

export default DisplayCharacter;
