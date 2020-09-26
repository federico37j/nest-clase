import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Producto } from './producto';
import { ProductoService } from './producto.service';

@Controller('productos')
export class ProductoController {
    constructor(private productoService: ProductoService) { }

    @Get(':index')
    ejecutar(@Param('index') index): Producto {
        return this.productoService.getProducto(Number(index));
    }

    @Get()
    public getProductos(): Producto[] {
        return this.productoService.getProductos();
    }

    @Post()
    create(@Body() prod: any): string {
        return this.productoService.create(prod);
    }
}
