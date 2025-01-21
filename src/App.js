import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import useGetPokemons from './useGetPokemons.js';
import { useInView } from 'react-intersection-observer';
import { useQueries } from '@tanstack/react-query';
import { fetchKoreaName } from './api.js';
import PokemonCard from './components/PokemonCard.js'; // PokemonCard 컴포넌트 임포트

const Title = styled.h1`
  color: #004076;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const App = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetPokemons();
  const { ref, inView } = useInView();

  const queries = data?.pages.flatMap(page =>
    page.results.map(pokemon => {
      const pokemonId = pokemon.url.split('/')[6];
      return {
        queryKey: ['pokemon', pokemonId],
        queryFn: () => fetchKoreaName(pokemonId),
      };
    })
  ) || [];

  const results = useQueries({
    queries,
  });

  const pokemonNames = results.reduce((acc, result, index) => {
    const pokemon = data?.pages.flatMap(page => page.results)[index];
    if (pokemon) {
      acc[pokemon.name] = result.data?.name || pokemon.name;
    }
    return acc;
  }, {});

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      setTimeout(() => {
        fetchNextPage();
      }, 1000);
    }
  }, [inView]);

  return (
    <>
      <Title>포켓몬 사전</Title>
      <Container>
        <Row gutter={[16, 16]}>
          {data?.pages.flatMap(page =>
            page.results.map((pokemon) => {
              const koreanName = pokemonNames[pokemon.name];
              return (
                <Col xs={8} sm={12} md={8} lg={6} key={pokemon.name}> {/* 반응형 속성 추가 */}
                  <PokemonCard pokemon={pokemon} koreanName={koreanName} />
                </Col>
              );
            })
          )}
        </Row>
      </Container>
      <div>
        <h1 ref={ref}>Load More</h1>
      </div>
    </>
  );
};

export default App;
