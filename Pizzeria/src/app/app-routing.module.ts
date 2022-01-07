import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountInfoComponent } from './account-info/account-info.component';
import { TarjetaCreditoComponent } from './componentes/tarjetas/tarjeta-credito/tarjeta-credito.component';
import { TarjetasComponent } from './componentes/tarjetas/tarjetas.component';
import { ItemListComponent } from './item-list/item-list.component';
import { DefaultComponent } from './layouts/default/default.component';
import { LocalesComponent } from './locales/locales.component';
import { MisionComponent } from './mision/mision.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { NosotrosComponent } from './nosotros/nosotros.component';

const routes: Routes = [
  {
    path: 'tarjetaCredito',
    component: TarjetasComponent
  },
  {
    path: '',
    component: ItemListComponent
  },
  {
    path: 'menu',
    component: ItemListComponent
  },
  {
    path: 'admin',
    component: DefaultComponent,
    children: [{
      path: 'admin',
      component: DashboardComponent
    }, {
      path: 'posts',
      component: PostsComponent
    }]
  },
  {
    path: 'about',
    component: NosotrosComponent
  },
  {
    path: 'locales',
    component: LocalesComponent
  },
  {
    path: 'account',
    component: AccountInfoComponent
  },
  {
    path: 'mision',
    component: MisionComponent
  },
  {
    path:'tarjetas' ,
    component: TarjetasComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled'} )],
  exports: [RouterModule],
})
export class AppRoutingModule {}
