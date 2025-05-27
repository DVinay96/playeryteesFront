import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { theme } from '@/styles/globalStyles'

interface ProductCardProps {
  image: string;
  name: string;
  brand: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, brand, price }) => {
  return (
    <CardWrapper>
        <Card>
            <ProductImage src={image} width={200} height={300} alt={name} />
            <Title>{name}</Title>
            <Code>{brand}</Code>
            <Colors>${price}</Colors>
        </Card>
    </CardWrapper>
  )
}

const CardWrapper = styled.div``


const Card = styled.div`

border-radius: 10px;
`
const ProductImage = styled(Image)`
border: 4px solid ${theme.colors.secondary};
border-radius: 15px;
object-fit: contain;
`

const Title = styled.p``

const Code = styled.p``

const Colors = styled.p``


export default ProductCard