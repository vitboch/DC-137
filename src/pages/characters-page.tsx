import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Characters from '../components/characters';
import { ICharacter, ICharactersInfoState } from '../types/types';
import { fetchCharacters } from '../store/slices/characters';
import Loader from '../components/loader';
import { AppDispatch } from '../store';
import Pagination from '../components/pagination/pagination.tsx';

export const CharactersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);

  const characters: ICharacter[] = useSelector(
    (state: { characters: { characters: { results: ICharacter[] } } }) =>
      state.characters.characters.results
  );

  const info: ICharactersInfoState = useSelector(
    (state: { characters: { characters: { info: ICharactersInfoState } } }) =>
      state.characters.characters.info
  );

  const status: string = useSelector(
    (state: { characters: { status: string } }) => state.characters.status
  );

  const error: string | null = useSelector(
    (state: { characters: { error: string | null } }) => state.characters.error
  );

  useEffect(() => {
    dispatch(fetchCharacters(page));
  }, [dispatch, page]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="section">
      <div className="section__inner">
        <Pagination
          currentPage={page}
          total={info.count}
          limit={20}
          onPageChange={(page: number) => setPage(page)}
        />
        <Characters characters={characters} />
        <Pagination
          currentPage={page}
          total={info.count}
          limit={20}
          onPageChange={(page: number) => setPage(page)}
        />
      </div>
    </section>
  );
};
