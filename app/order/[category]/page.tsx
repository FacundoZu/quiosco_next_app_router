import ProductCard from "@/components/products/ProductCard"
import Heading from "@/components/ui/Heading"
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

export default async function OrderPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const { category } = params
  const products = await getProducts(category)
  return (
    <>
      <Heading>
        Elije y personaliza tu pedido a continuación
      </Heading>
      <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-4 items-start">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product} />
        ))}
      </div>
    </>
  )
}
