import ProductCard from "@/components/products/ProductCard"
import { prisma } from "@/src/lib/prisma"
import React from "react"

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
  return products
}

export default async function OrderPage({ params }: { params: { category: string } }) {
  const { category } = React.use(params)
  const products = await getProducts(category)
  return (
    <>
      <h1 className="text-2xl">
        Elige y personaliza tu pedido a continuación
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product} />
        ))}
      </div>
    </>
  )
}
