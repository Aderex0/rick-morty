import { Character } from "../../features/ListCharacters";
import { useNavigate } from "react-router-dom";

interface Props {
  character: Character;
}

const ListCard = ({ character }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-5/12 sm:w-52 rounded-xl flex flex-col overflow-hidden m-2 border-spacing-px border-black border hover:cursor-pointer"
      data-testid="nav-click"
      onClick={() => navigate(`/character/${character?.id}`)}
    >
      <img src={character?.image} alt={character?.name} />
      <div className="w-full h-12 items-center flex ">
        <p className="text-center w-full">{character?.name}</p>
      </div>
    </div>
  );
};

export default ListCard;
