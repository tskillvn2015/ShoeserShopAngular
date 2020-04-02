import { Product } from "src/app/core/domain/product.entity";

export interface ProductDisplay {
    Category: string;
    Products: Product[];
}
