import { Injectable } from '@nestjs/common';
import { Model, Promise } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDTO } from './dtos/create.product.dto';
import { FilterProductDTO } from './dtos/filter.product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getFilteredProducts(
    filterProductDTO: FilterProductDTO,
  ): Promise<Product[]> {
    const { search, category } = filterProductDTO;
    let products = await this.getAllProducts();
    if (search) {
      products = products.filter((ele) => {
        ele.name.includes(search) || ele.description.includes(search);
      });
    }
    if (category) {
      products = products.filter((product) => product.category == category);
    }
    return products;
  }

  async getAllProducts(): Promise<Product[]> {
    let products = await this.productModel.find().exec();
    return products;
  }

  async getProduct(id: string): Promise<Product> {
    let product = await this.productModel.findById(id).exec();
    return product;
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    let product = await this.productModel.create(createProductDTO);
    return product.save();
  }
  
  async updateProduct(
    id: string,
    createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    let product = await this.productModel.findByIdAndUpdate(
      id,
      createProductDTO,
      { new: true },
    );
    return product;
  }

  async deleteProduct(id: string): Promise<any> {
    let product = await this.productModel.findByIdAndDelete(id);
    return product;
  }
}
