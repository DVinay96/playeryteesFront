import { notFound } from 'next/navigation'
import ProductDetail from './ProductIdContent'
import React from 'react'


const mockProducts = [
  {
    _id: '1',
    name: 'Playera Cuello Redondo',
    brand: 'PlayerYTees',
    code: '410C',
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Blanco', hex: '#FFFFFF' },
      { name: 'Azul', hex: '#0000FF' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    weight: '180g',
    fabric: 'Jersey',
    composition: '100% Algodón',
    description: 'Playera de algodón 100% con cuello redondo.',
    mainImage: '/PLAYERA ROJA.svg',
    prices: [
      { quantity: '1-9', price: '$150.00' },
      { quantity: '10-49', price: '$135.00' },
      { quantity: '50+', price: '$120.00' },
    ],
  },
  {
    _id: '2',
    name: 'Playera Polo',
    brand: 'PlayerYTees',
    code: '520P',
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Blanco', hex: '#FFFFFF' },
      { name: 'Azul Marino', hex: '#0A2463' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    weight: '220g',
    fabric: 'Piqué',
    composition: '95% Algodón, 5% Elastano',
    description: 'Playera tipo polo de alta calidad.',
    mainImage: '/PLAYERA ROJA.svg',
    prices: [
      { quantity: '1-9', price: '$180.00' },
      { quantity: '10-49', price: '$165.00' },
      { quantity: '50+', price: '$150.00' },
    ],
  },
]

export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product._id,
  }))
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params
    const product = mockProducts.find((p) => p._id === resolvedParams.id)
  
    if (!product) {
      notFound()
    }
  
    return <ProductDetail product={product} />
  }
  
  export const dynamic = 'force-static'
  export const dynamicParams = false
