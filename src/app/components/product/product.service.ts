import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/models/productModels/product.model';
import { GenericService } from 'src/app/services/generic/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = environment.serverUrl;
  private productUrl: string = this.url + 'Product/';
  //url for getting all classes
  private _getAllUrl: string = this.productUrl + 'GetAll';
  private _getByIdUrl: string = this.productUrl + 'GetProductById';
  private _updateUrl: string = this.productUrl + 'UpdateProduct';
  private _insertUrl: string = this.productUrl + 'InsertProduct';
  private _deleteUrl: string = this.productUrl + 'DeleteProduct';
  constructor(private genericService: GenericService) {}

  getAllProducts(): Observable<Product[]> {
    return this.genericService.getAll(this._getAllUrl);
  }
  getProductById(id :number): Observable<Product> {
    return this.genericService.getById(this._getByIdUrl,id);
  }
  insertProduct(entity: Product) {
    return this.genericService.insert(this._insertUrl, entity);
  }
  updateProduct(entity: Product) {
    debugger
    return this.genericService.update(this._updateUrl, entity);
  }
  deleteProduct(id:number) {
    return this.genericService.delete(this._deleteUrl, id);
  }

}
