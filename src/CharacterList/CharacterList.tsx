import { ArrowLeft, UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Character } from "../models/Character";

const CharacterList = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const storedCharacters: Character[] = JSON.parse(
      localStorage.getItem("characters") || "[]"
    );

    setCharacters(storedCharacters);
  }, []);

  return (
    <div className="bg-backgroundLight dark:bg-backgroundDark w-screen h-screen flex flex-col items-center justify-between">
      <ArrowLeft
        className="absolute left-0 top-0 text-textLight dark:text-textDark cursor-pointer"
        size={60}
        onClick={() => navigate(-1)}
      />
      <div className="w-full h-auto flex items-center flex-col">
        <h1 className="text-4xl text-textLight dark:text-textDark mt-20">
          Personagens
        </h1>
        <div className="flex flex-col w-full items-center mt-10 gap-5">
          {characters.map((value) => {
            return (
              <div
                className="bg-primaryDark w-[80%] p-2 text-2xl rounded-2xl cursor-pointer"
                onClick={() => navigate(`/characters/${value.name}`)}
              >
                {value.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mb-10 h-fit">
        <button
          className="bg-primaryLight dark:bg-primaryDark text-2xl p-5 rounded-4xl flex items-center cursor-pointer"
          onClick={() => navigate("/characters/new")}
        >
          <UserRoundPlus size={40} />
          Criar personagem
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
