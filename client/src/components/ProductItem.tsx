import React from 'react'
import { IProducts } from '../api/helpers'
import { useDrag } from 'react-dnd'
function ProductItem({ id, type }: IProducts) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "div",
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    return (
        <div key={id} ref={drag} className="product-item" style={{ color: isDragging ? "pink" : "black" }}>
            {type}
        </div>
    )
}

export default ProductItem
