import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICharacter } from '../../types/types.ts';
import { useHistory } from '../../hooks';
import Characters from '../characters/characters.tsx';
import Button from '../button';
import Pagination from '../pagination/pagination.tsx';
import { useDebounce } from '../../hooks/use-debounce.ts';
import cls from './search.module.css';

type formInputs = {
  name: string;
  status: string;
  gender: string;
};

export const Search: React.FC = () => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, setValue, reset, setFocus } =
    useForm<formInputs>();

  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [suggestions, setSuggestions] = useState<ICharacter[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { addToHistory } = useHistory();

  const fetchCharacters = async (
    { name, status, gender }: formInputs,
    page: number
  ) => {
    setIsLoading(true);
    setError(null);
    if (!name && !status && !gender) {
      setError('Enter at least one search parameter');
      setCharacters([]);
      return;
    }

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${name}&status=${status}&gender=${gender}&page=${page}`
      );

      const data = await response.json();
      setCount(data.info.count);
      setCharacters(data.results);
    } catch (error) {
      setError('An error has occurred. Please try again.');
      setCharacters([]);
      setCount(0);
      setPage(1);
    } finally {
      setIsLoading(false);
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

  const [valueName, setValueName] = useState<string>('');
  const debouncedValue = useDebounce(valueName, 500);

  const onChangeSuggestions = (event: ChangeEvent<HTMLInputElement>) => {
    setValueName(event.target.value);
  };

  useEffect(() => {
    fetchSuggestions(debouncedValue);
  }, [debouncedValue]);

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
    <div className="section__inner">
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className={cls.search__form}>
          <div className={cls.text__field}>
            <input
              autoComplete="off"
              placeholder="Characters name"
              type="text"
              defaultValue=""
              {...register('name', {
                onChange: (e) => onChangeSuggestions(e)
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
            <option value="">Status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          <select defaultValue="" {...register('gender')}>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
          <Button variant={'primary'}>Search</Button>
          <Button variant={'danger'} type="button" onClick={handleReset}>
            Reset
          </Button>
        </form>
      </div>

      <div className={cls.list}>
        {isLoading ? (
          <div>Loading...</div>
        ) : characters.length > 0 ? (
          <>
            {count > 20 && (
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
            )}
            <Characters characters={characters} />
          </>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div>No characters found.</div>
        )}
      </div>
    </div>
  );
};
