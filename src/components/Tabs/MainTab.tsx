import { Character } from "../../models/Character";

interface MainTabProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character | null>>;
  editingMode: boolean;
}

const MainTab: React.FC<MainTabProps> = ({
  character,
  setCharacter,
  editingMode,
}) => {
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === "") return;
    character.name = e.target.value;
    const changedCharacter = Object.assign(new Character(e.target.value), {
      ...character,
    });
    setCharacter(changedCharacter);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    if (e.target.value.trim() === "") return;
    const changedCharacter = Object.assign(new Character(character.name), {
      ...character,
      [key]: e.target.value,
    });
    setCharacter(changedCharacter);
  };

  const changeLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1 || value <= 30) {
      character.setLevel(value);
    }
    const changedCharacter = Object.assign(new Character(character.name), {
      ...character,
    });
    setCharacter(changedCharacter);
  };

  const changeCurrentHealth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    character.health.current = value;
    const changedCharacter = Object.assign(new Character(character.name), {
      ...character,
    });
    setCharacter(changedCharacter);
  };

  const changeProficienyBonus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    character.proficiencyBonus.bonus = value;
    const changedCharacter = Object.assign(new Character(character.name), {
      ...character,
    });
    setCharacter(changedCharacter);
  };

  const changeMaxHealth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    character.health.max = value;
    const changedCharacter = Object.assign(new Character(character.name), {
      ...character,
    });
    setCharacter(changedCharacter);
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-6 p-6">
      <h2 className="text-2xl font-bold text-textLight dark:text-textDark">
        Informações Gerais
      </h2>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <div
          className={`p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 min-h-[80px]`}
        >
          <p className="text-sm text-gray-500">Nome</p>
          {editingMode ? (
            <input
              type="text"
              className="w-full max-w-full p-1 rounded bg-white dark:bg-gray-700 text-textLight dark:text-textDark text-clip"
              value={character.name}
              onChange={(e) => changeName(e)}
              title={character.name}
            />
          ) : (
            <p className="text-lg font-semibold text-textLight dark:text-textDark truncate">
              {character.name}
            </p>
          )}
        </div>

        <div
          className={`p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 min-h-[80px]`}
        >
          <p className="text-sm text-gray-500">Jogador</p>
          {editingMode ? (
            <input
              type="text"
              className="w-full p-1 rounded bg-white dark:bg-gray-700 text-textLight dark:text-textDark text-clip"
              value={character.player}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "player")
              }
            />
          ) : (
            <p className="text-lg font-semibold text-textLight dark:text-textDark truncate">
              {character.player}
            </p>
          )}
        </div>

        <div
          className={`p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 min-h-[80px]`}
        >
          <p className="text-sm text-gray-500">Classe</p>
          {editingMode ? (
            <input
              type="text"
              className="w-full p-1 rounded bg-white dark:bg-gray-700 text-textLight dark:text-textDark text-clip"
              value={character.class}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "class")
              }
            />
          ) : (
            <p className="text-lg font-semibold text-textLight dark:text-textDark truncate">
              {character.class}
            </p>
          )}
        </div>

        <div
          className={`p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 min-h-[80px]`}
        >
          <p className="text-sm text-gray-500">Raça</p>
          {editingMode ? (
            <input
              type="text"
              className="w-full p-1 rounded bg-white dark:bg-gray-700 text-textLight dark:text-textDark text-clip"
              value={character.race}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "race")
              }
            />
          ) : (
            <p className="text-lg font-semibold text-textLight dark:text-textDark truncate">
              {character.race}
            </p>
          )}
        </div>

        <div
          className={`p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 min-h-[80px]`}
        >
          <p className="text-sm text-gray-500">Movimento</p>
          {editingMode ? (
            <input
              type="text"
              className="w-full p-1 rounded bg-white dark:bg-gray-700 text-textLight dark:text-textDark text-clip"
              value={character.movement}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "movement")
              }
            />
          ) : (
            <p className="text-lg font-semibold text-textLight dark:text-textDark truncate">
              {character.movement}
            </p>
          )}
        </div>

        <div
          className={`p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 min-h-[80px]`}
        >
          <p className="text-sm text-gray-500">Level</p>
          {editingMode ? (
            <input
              type="text"
              className="w-full p-1 rounded bg-white dark:bg-gray-700 text-textLight dark:text-textDark"
              value={character.level}
              onChange={(e) => changeLevel(e)}
              max={30}
              min={1}
            />
          ) : (
            <p className="text-lg font-semibold text-textLight dark:text-textDark">
              {character.level}
            </p>
          )}
        </div>

        <div
          className={`p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 min-h-[80px]`}
        >
          <p className="text-sm text-gray-500">Bônus de Proficiência</p>
          {editingMode ? (
            <input
              type="text"
              className="w-full p-1 rounded bg-white dark:bg-gray-700 text-textLight dark:text-textDark disabled:bg-gray-100 disabled:dark:bg-gray-900"
              value={character.proficiencyBonus.bonus}
              onChange={(e) => {
                changeProficienyBonus(e);
              }}
              disabled={character.proficiencyBonus.autoCalc}
            />
          ) : (
            <p className="text-lg font-semibold text-textLight dark:text-textDark">
              {character.proficiencyBonus.bonus}
            </p>
          )}
        </div>

        <div
          className={`p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 min-h-[80px]`}
        >
          <p className="text-sm text-gray-500">Iniciativa</p>
          {editingMode ? (
            <input
              type="text"
              className="w-full p-1 rounded bg-white dark:bg-gray-700 text-textLight dark:text-textDark"
              value={character.initiative}
              onChange={(e) => {
                handleChange(e, "initiative");
              }}
            />
          ) : (
            <p className="text-lg font-semibold text-textLight dark:text-textDark">
              {character.initiative}
            </p>
          )}
        </div>

        <div
          className={`p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 min-h-[80px]`}
        >
          <p className="text-sm text-gray-500">Classe de armadura</p>
          {editingMode ? (
            <input
              type="text"
              className="w-full p-1 rounded bg-white dark:bg-gray-700 text-textLight dark:text-textDark"
              value={character.armorClass}
              onChange={(e) => {
                handleChange(e, "armorClass");
              }}
            />
          ) : (
            <p className="text-lg font-semibold text-textLight dark:text-textDark">
              {character.armorClass}
            </p>
          )}
        </div>

        <div className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-800">
          <p className="text-sm text-gray-500">Vida</p>
          {editingMode ? (
            <div className="flex gap-2">
              <input
                type="text"
                className="w-full p-1 rounded bg-white dark:bg-gray-700 text-textLight dark:text-textDark"
                value={character.health.current}
                onChange={(e) => {
                  changeCurrentHealth(e);
                }}
              />
              /
              <input
                type="text"
                className="w-full p-1 rounded bg-white dark:bg-gray-700 text-textLight dark:text-textDark"
                value={character.health.max}
                onChange={(e) => {
                  changeMaxHealth(e);
                }}
              />
            </div>
          ) : (
            <p className="text-lg font-semibold text-textLight dark:text-textDark">
              {character.health.current} / {character.health.max}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainTab;
