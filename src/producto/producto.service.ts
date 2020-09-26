import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Producto } from './producto';


@Injectable()
export class ProductoService {
    public listaProductos: Producto[];
    public loadProductos(): void {
        let archivo = fs.readFileSync('client/productos.csv', 'utf8');
        // console.log("Archivo:", archivo);
        let lineas = archivo.split('\n');
        // console.log("Lineas:", lineas);
        const elementos = [];
        for (let i = 0; i < lineas.length; i++) {
            let linea = lineas[i].replace('\r', '');
            let p = linea.split(',');
            // console.log("P:", p);
            elementos.push(p);
        }
        this.listaProductos = [];
        // console.log(elementos);
        // console.table(elementos);
        for (let i = 0; i < elementos.length; i++) {
            // console.log("Elemento[i]", elementos[i], "posicion", elementos[i][0]);
            // console.log("Elemento[i]", elementos[i], "posicion", elementos[i][1]);
            let producto = new Producto(elementos[i][0],
                parseInt(elementos[i][1]));
            this.listaProductos.push(producto);
        }
    }

    public getProductos(): Producto[] {
        this.loadProductos();
        return this.listaProductos;
    }

    public getProducto(index: number): Producto {
        if (index < 0 || index >= this.listaProductos.length)
            return null;

        return this.listaProductos[index];
    }

    public create(prod: any) {
        const producto = new Producto(prod.nombreProducto, prod.precio);
        if(producto.getNombreProducto() && producto.getPrecio()){
            fs.appendFileSync('client/productos.csv', "\n" + producto.getNombreProducto() + "," + producto.getPrecio());
            return "ok";
        } else {
            return "Parametros incorrectos";
        }
    }

}
