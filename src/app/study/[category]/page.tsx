import React from 'react';

interface CategoryPageProps {
  params: { category: string };
}
export default function CategoryPage({
  params: { category },
}: CategoryPageProps) {
  return <div>CategoryPage</div>;
}
