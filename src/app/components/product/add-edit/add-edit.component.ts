import { Component, OnInit, SimpleChange,OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';
import { HelperFunctionsService } from 'src/app/helpers/helperFunction.servce';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { Product } from 'src/app/models/productModels/product.model';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  form: FormGroup;
  toDayDate = '';
  data: any;
  isEdit: boolean = false;
  productId: number = 0;
  buttonName="Save";
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private helperFunc: HelperFunctionsService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.productId = params['id']; // Access the 'id' parameter from the URL
      console.log('Test ID:', this.productId);
    });

    this.toDayDate = this.helperFunc.convertDateToYearMonthDay(
      new Date().toDateString()
    );
    this.form = this.fb.group({
      productName: [null, [Validators.required, Validators.maxLength(50)]],
      productDescription: [null, [Validators.maxLength(100)]],
      createdDate: this.toDayDate,
    });
  }
  ngOnInit(): void {
    if (this.productId > 0) {
      this.isEdit = true;
      this.buttonName="Update"
      this.getProductById(this.productId);
    }

  }

  onSave() {
    console.log(this.form.value);
   if(this.isEdit){
    this.onUpdate()
   }else{
    this.onInsert();
   }
  }
  onInsert(){
    this.productService.insertProduct(this.form.value).subscribe((value) => {
      this.toastr.success(value, 'Success');
      this.router.navigateByUrl('/product');
    });
  }
  onUpdate(){
    this.productService.updateProduct(this.form.value).subscribe((value) => {
      this.toastr.success(value, 'Success');
      this.router.navigateByUrl('/product');
    });
  }
  getProductById(id: number) {
    this.productService.getProductById(id).subscribe((value) => {
      this.form = this.fb.group({
        productId:[value.productId, [Validators.required]],
        productName: [
          value.productName,
          [Validators.required, Validators.maxLength(50)],
        ],
        productDescription: [
          value.productDescription,
          [Validators.maxLength(100)],
        ],
        modifiedDate: this.toDayDate,
        createdDate: this.helperFunc.convertDateToYearMonthDay(value.createdDate)
      });
    });
  }
  get productName() {
    return this.form.get('productName');
  }

  get productDescription() {
    return this.form.get('productDescription');
  }
}
