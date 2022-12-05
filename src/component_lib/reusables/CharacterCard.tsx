interface Origin {
  name: string;
}

interface Episode {
  episode: string;
}

interface Location {
  name: string;
}

interface Character {
  image: string;
  name: string;
  gender: string;
  status: string;
  species: string;
  location: Location;
  episode: [Episode];
  origin: Origin;
}

interface Props {
  character: Character;
}

const CharacterCard = ({ character }: Props) => {
  return (
    <div className="w-3/4 rounded-xl overflow-hidden border border-black">
      <img src={character?.image} alt={character?.name} />
      <h2 className="font-bold text-2xl text-center mt-2">{character?.name}</h2>
      <p className="text-center mb-2 text-gray-700">{character?.gender}</p>
      <div className="flex justify-around">
        <p className="w-fit">{character?.status}</p>
        <p className="w-fit">{character?.species}</p>
      </div>
      <div className="flex flex-col px-2 mb-2">
        <p className="font-bold text-xl text-center mt-2">Origin</p>
        <p className="text-center">{character?.origin?.name}</p>
        <p className="font-bold text-xl text-center mt-2">Last known location</p>
        <p className="text-center">{character?.location?.name}</p>
        <p className="font-bold text-xl text-center mt-2">Episode Appearances</p>
        <p className="text-center">{character?.episode?.length}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
