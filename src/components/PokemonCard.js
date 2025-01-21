import React from 'react';
import styled from 'styled-components';

// 반응형 디자인을 위한 CustomCard 스타일
const CustomCard = styled.div`
  background-color: #ffffff;
  border: 0.1rem solid #004076; /* rem 단위로 테두리 설정 */
  width: 100%;
  max-width: 18rem; /* 최대 너비를 rem으로 설정 */
  margin: 0 auto; /* 중앙 정렬 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */

  /* 반응형 디자인을 위해 카드 크기 설정 */
  @media (max-width: 768px) {
    max-width: 100%; /* 작은 화면에서 카드가 더 넓게 */
  }

  &:hover {
    border-color: #00365c; /* hover 시 테두리 색상 */
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: auto;
  background-size: contain;
`;

const Meta = styled.div`
  padding: 1rem;
  background-color: #004076;
  overflow: hidden;
`;

const Title = styled.h3`
  color: #ffffff;
  font-size: 1rem; /* rem 단위로 폰트 크기 설정 */
  font-weight: bold;
  margin: 0;
`;

const PokemonCard = ({ pokemon, koreanName }) => {
  return (
    <CustomCard>
      <CoverImage alt={pokemon.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} />
      <Meta>
        <Title>{koreanName}</Title>
      </Meta>
    </CustomCard>
  );
};

export default PokemonCard;
