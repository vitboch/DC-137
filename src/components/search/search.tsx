import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICharacter } from '../../types/types.ts';
import { useHistory } from '../../hooks';

import cls from './search.module.css';
import Characters from '../characters/characters.tsx';
import Button from '../button';
import Pagination from '../pagination/pagination.tsx';

type formInputs = {
  name: string;
  status: string;
  gender: string;
};

export const Search = () => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, setValue, reset, setFocus } =
    useForm<formInputs>();

  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [suggestions, setSuggestions] = useState<ICharacter[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addToHistory } = useHistory();

  const fetchCharacters = async (
    { name, status, gender }: formInputs,
    page: number
  ) => {
    setError(null);
    if (!name && !status && !gender) {
      setError('Введите хотя бы один параметр поиска');
      setCharacters([]);
      setNotFound(false);
      return;
    }

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${name}&status=${status}&gender=${gender}&page=${page}`
      );

      const data = await response.json();
      setCount(data.info.count);
      setCharacters(data.results);
      setNotFound(data.results.length === 0);
    } catch (error) {
      setError('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
      setCharacters([]);
      setCount(0);
      setPage(1);
      setNotFound(false);
    }
  };

  const fetchSuggestions = async (name: string) => {
    if (!name) {
      setSuggestions([]);
      return;
    }
    setSuggestions([]);
    const data = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${name}`
    );
    const json = await data.json();
    if (!json.error) {
      const suggestions = json.results.slice(0, 5);
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
      setCharacters([]);
    }
  };

  const onSubmit: SubmitHandler<formInputs> = ({ name, status, gender }) => {
    fetchCharacters({ name, status, gender }, 1);
    navigate(`/search?name=${name}&status=${status}&gender=${gender}&page=1`);
    addToHistory({ name, status, gender });
  };

  const onChangeSuggestions = (value: string) => {
    fetchSuggestions(value);
  };

  useEffect(() => {
    setFocus('name');
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name') || '';
    const status = searchParams.get('status') || '';
    const gender = searchParams.get('gender') || '';

    if (name !== '' || status !== '' || gender !== '') {
      setValue('name', name);
      setValue('status', status);
      setValue('gender', gender);

      fetchCharacters({ name, status, gender }, page);
      navigate(
        `/search?name=${name}&status=${status}&gender=${gender}&page=${page}`
      );
    }
  }, [location.search, page]);

  const handleReset = () => {
    reset();
    setCharacters([]);
    setNotFound(false);
    setError(null);
    navigate('/search');
  };

  // TODO: Костыль или нет?
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nameInput = document.getElementById('nameInput');

      if (event.target !== nameInput) {
        setSuggestions([]);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className={cls.search__form}>
          <div className={cls.text__field}>
            <input
              autoComplete="off"
              placeholder="Имя персонажа"
              type="text"
              defaultValue=""
              {...register('name', {
                onChange: (e) => onChangeSuggestions(e.target.value)
              })}
              id="nameInput"
            />
            {suggestions.length > 0 && (
              <ul className={cls.suggestions__list}>
                {suggestions.map((suggestion) => (
                  <li key={suggestion.id} className={cls.suggestion__item}>
                    <Link to={`/characters/${suggestion.id}`}>
                      {suggestion.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <select defaultValue="" {...register('status')}>
            <option value="">Статус</option>
            <option value="alive">Живой</option>
            <option value="dead">Мертвый</option>
            <option value="unknown">Неизвестный</option>
          </select>
          <select defaultValue="" {...register('gender')}>
            <option value="">Пол</option>
            <option value="male">Мужчина</option>
            <option value="female">Женщина</option>
            <option value="genderless">Без пола</option>
            <option value="unknown">Неизвестно</option>
          </select>
          <Button variant={'primary'}>Поиск</Button>
          <Button variant={'danger'} type="button" onClick={handleReset}>
            Сбросить
          </Button>
        </form>
      </div>

      <div className={cls.list}>
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            <Pagination
              currentPage={page}
              total={count}
              limit={20}
              onPageChange={(page: number) => {
                const searchParams = new URLSearchParams(location.search);
                searchParams.set('page', String(page));
                setPage(page);
              }}
            />
            <Characters characters={characters} />
          </>
        )}
        {/*TODO: Не работает, даже если не найдено, появляется ошибка.*/}
        {notFound && <p>Ничего не найдено!</p>}
      </div>
    </>
  );
};
