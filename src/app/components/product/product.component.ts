import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from 'src/app/models/productModels/product.model';
import { ToastrService } from 'ngx-toastr';
import { HelperFunctionsService } from 'src/app/helpers/helperFunction.servce';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  lstProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private helperFunc: HelperFunctionsService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe((value) => {
      this.lstProducts = value;
    });
  }
  editRequest(item: Product) {
    this.helperFunc.updateParams({data:item,isEdit:true})
    this.router.navigateByUrl('/product/'+item.productId);
  }
  deleteRequest(id: number) {
    this.productService.deleteProduct(id).subscribe((val) => {
      this.toastr.success('Data Deleted Successfully!', 'Success');
      this.getAllProducts();
    });
  }
}
