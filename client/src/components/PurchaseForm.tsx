
import React, { ChangeEvent, ComponentState, EventHandler, Fragment, useEffect, useState } from 'react'
import { DndProvider, DragObjectFactory, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ProductsService from '../api/classes/Products';
import PurchaseService from '../api/classes/Purchase';
import { IContractors, IProducts } from '../api/helpers';
import ProductItem from './ProductItem';

interface IProductsState {
    productItem: IProducts;
    isChosen: boolean;
}

export default function PurchaseForm() {
    const [products, setProducts] = useState<IProductsState[]>([]);
    const [purchase, setPurchase] = useState<IContractors>({
        seller: "",
        buyer: ""
    });
    const [search, setSearch] = useState<string>("");
    const returnFinalProducts = () => {
        const chosenProducts: IProductsState[] = products.filter((item) => { return item.isChosen == true; })
        let newProductState: IProducts[] = [];
        for (let i = 0; i < chosenProducts.length; i++) {
            newProductState[i] = {
                type: chosenProducts[i].productItem.type,
                id: chosenProducts[i].productItem.id
            }
        }
        return newProductState;
    }
    const getProducts = async () => {
        const fetchProducts: IProducts[] = await ProductsService.getProducts();
        let newProductState: IProductsState[] = [];
        for (let i = 0; i < fetchProducts.length; i++) {
            newProductState[i] = {
                productItem: fetchProducts[i],
                isChosen: false
            };
        }
        setProducts(newProductState);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(e.target)
        setPurchase({ ...purchase, [e.target.name]: e.target.value } as ComponentState);

    };

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!(products.length == 0 || purchase?.buyer === "" || purchase?.seller === "")) {
            const chosenProducts: IProducts[] = returnFinalProducts();
            PurchaseService.createPurchase(purchase, chosenProducts);
        } else {
            alert("PROSZĘ UZUPEŁNIĆ WSZYSTKIE POLA FORMULARZA")
        }

    };
    const handleSearcher = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    const handleProducts = (product: IProducts) => {
        const productsTemp = products.slice();
        productsTemp.forEach((item) => {
            if (item.productItem.id == product.id) {
                if (item.isChosen) {
                    item.isChosen = false;
                } else {
                    item.isChosen = true;
                }

            }
        })
        setProducts(productsTemp);

    }

    useEffect(() => {
        getProducts();
    }, []);
    return (
        <div className="purchase-component">
            <form className="purchase-form">
                <section className="purchase-form-section">
                    <input
                        className="form-input"
                        type="text"
                        name="buyer"
                        placeholder="Buyer Name"
                        value={purchase?.buyer}
                        onChange={handleChange}
                    >

                    </input>
                </section>
                <section className="purchase-form-section">
                    <input
                        className="form-input"
                        type="text"
                        name="seller"
                        placeholder="Seller Name"
                        value={purchase?.seller}
                        onChange={handleChange}
                    >
                    </input>
                </section>
                <section className="purchase-form-section">
                    <div className="product-box">
                        <input className="product-searcher"
                            type="text"
                            name="searcher"
                            placeholder="Search for products"
                            onChange={handleSearcher}
                        ></input>
                        {products.filter((item) => {
                            if (search == "") {
                                return item;
                            }
                            else if (item.productItem.type.toLowerCase().includes(search?.toLowerCase())) {
                                return item;
                            }
                        }).map((product) => {
                            return <ProductItem product={product.productItem} onStatusChange={handleProducts} isChosen={product.isChosen} />
                        })}
                    </div>
                </section>
                <button onClick={handleSubmit}>Submit</button>
            </form>

        </div>
    )
}
