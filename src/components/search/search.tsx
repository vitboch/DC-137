import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ICharacter } from '../../types/types.ts';

import cls from '../characters/characters.module.css';

type Inputs = {
  name: string;
  status: string;
  gender: string;
};

export const Search = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  const fetchCharacters = async ({ name, status, gender }: Inputs) => {
    const data = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${name}&status=${status}&gender=${gender}`
    );
    const json = await data.json();
    setCharacters(json.results);
  };

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetchCharacters(data);
  };

  const onChangeHandle = (q) => {
    fetchCharacters({ name: q, status: '', gender: '' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Имя:
          <input
            type="text"
            defaultValue=""
            {...register('name', {
              onChange: (e) => onChangeHandle(e.target.value)
            })}
          />
        </label>
        <label>
          Статус:
          <select defaultValue="" {...register('status')}>
            <option value="">Выбрать</option>
            <option value="alive">Живой</option>
            <option value="dead">Мертвый</option>
            <option value="unknown">Неизвестный</option>
          </select>
        </label>
        <label>
          Пол:
          <select defaultValue="" {...register('gender')}>
            <option value="">Выбрать</option>
            <option value="male">Мужчина</option>
            <option value="female">Женщина</option>
            <option value="genderless">Без пола</option>
            <option value="unknown">Неизвестно</option>
          </select>
        </label>
        <button>Поиск</button>
      </form>
      <div className={cls.list}>
        {characters.length > 0 &&
          characters.map((character) => (
            <div className={cls.card} key={character.id}>
              <Link to={`/characters/${character.id}`}>
                <img
                  className={cls.card__pictures}
                  src={character.image}
                  alt=""
                />
                <div className={cls.card__name}>{character.name}</div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};
