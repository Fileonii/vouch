import { IPurchase } from "../helpers";
import { ApiClient } from "./Api"
import { purchaseByIdEndpoint, purchaseEndpoint } from "../endpoints"

class PurchaseService {
    static async getPurchase(): Promise<IPurchase[]> {
        const api = new ApiClient()
        return await api.get(purchaseEndpoint())
    }

    // static async getPurchaseById(id: number): Promise<IPurchase> {
    //     const api = new ApiClient()
    //     return await api.get(purchaseByIdEndpoint(id))
    // }
    //: Promise<IPurchase>
    static async createPurchase(purchase: any, product: any) {
        const api = new ApiClient()
        console.log(purchase)
        console.log(product)
        //return await api.post(purchaseEndpoint(), {})
    }
}

export default PurchaseService