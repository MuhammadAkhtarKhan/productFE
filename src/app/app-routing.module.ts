import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { AddEditComponent } from './components/product/add-edit/add-edit.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"product", component:ProductComponent},
    {path:"product/create", component:AddEditComponent},
    {path:"product/:id", component:AddEditComponent},
    {path:"**", component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
