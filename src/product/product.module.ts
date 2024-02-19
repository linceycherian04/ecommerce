import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Productschema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: Productschema }]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
