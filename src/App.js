import React, { useEffect } from 'react';
import { Card, Row, Col, Spin } from 'antd';
import styled from 'styled-components';
import useGetPokemons from './useGetPokemons.js';
import { useInView } from 'react-intersection-observer';

const Container = styled.div`
  padding: 20px;
  width: 800px;
  height: auto;
`;

const App = () => {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetPokemons();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      setTimeout(() => {
        fetchNextPage();
      }, 1000);
    }

  }, [inView]);

  return (
    <Container>
      <h1>포켓몬 사전</h1>
      <Row gutter={[16, 16]}>
        {data?.pages.flatMap(page =>
          page.results.map((pokemon) => (
            <Col span={8} key={pokemon.name}>
              <Card
                hoverable
                cover={<img alt={pokemon.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} />}
              >
                <Card.Meta title={pokemon.name} />
              </Card>
            </Col>
          ))
        )}
      </Row>
      <div>
        <h1 ref={ref}>Load More</h1>
      </div>
    </Container>
  );
};

export default App;
