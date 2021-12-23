
import React, { ChangeEvent, ComponentState, EventHandler, Fragment, useEffect, useState } from 'react'
import { DndProvider, DragObjectFactory, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ProductsService from '../api/classes/Products';
import PurchaseService from '../api/classes/Purchase';
import { IProducts, IPurchase } from '../api/helpers';
import ProductItem from './ProductItem';

export default function PurchaseForm() {
    const [products, setProducts] = useState<IProducts[]>([]);
    const [purchase, setPurchase] = useState<IPurchase>();
    const [board, setBoard] = useState<IProducts[]>([]);

    const x = async () => { return await ProductsService.getProducts() }
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "div",
        drop: (item: any) => {
            console.log(products)
            addProductToPurchase(item.id)
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        }),


    }))
    const addProductToPurchase = async (id: any) => {
        const product = await ProductsService.getProductsById(id);
        const temp = x();
        //const d = (await temp).filter((productA) => { return product.id !== productA.id })
        console.log(board);
        setBoard((board) => [...board, product]);

    };
    const getProducts = async () => {
        setProducts(await ProductsService.getProducts());
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(e.target)
        setPurchase({ ...purchase, [e.target.name]: e.target.value } as ComponentState);
        console.log(board)

    };

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(board)
        console.log(purchase);
        PurchaseService.createPurchase(purchase, board)
    };
    useEffect(() => {
        getProducts();
    }, []);
    return (
        <div className="purchase-component">
            <form className="purchase-form">
                <label htmlFor="buyer-name">Buyer Name</label>
                <input
                    className="form-buyer-name"
                    type="text"
                    name="buyer"
                    value={purchase?.buyer}
                    onChange={handleChange}
                >

                </input>
                <label htmlFor="seller-name">Seller Name</label>
                <input
                    className="form-seller-name"
                    type="text"
                    name="seller"
                    value={purchase?.seller}
                    onChange={handleChange}
                >
                </input>

                <div className="list-of-products">
                    {products.map((product) => {
                        return <ProductItem id={product.id} type={product.type}></ProductItem>
                    })}
                </div>
                <div className="list-of-submited" ref={drop}>
                    {board.map((product) => {
                        return <ProductItem id={product.id} type={product.type}></ProductItem>
                    })}
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </form>

        </div>
    )
}
