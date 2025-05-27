import ProductDetail from "./ProductIdContent";

export default async function Page({ params }: any) {
  return <ProductDetail id={params.id} />;
}

export const dynamicParams = false;
export const revalidate = 3600; // opcional si usas SSG/ISR
