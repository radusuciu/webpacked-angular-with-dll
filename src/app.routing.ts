import { Routes, RouterModule } from '@angular/router';
import { HelloComponent } from './hello/hello.component';

const routes: Routes = [
    { path: '**', component: HelloComponent }
];

export const routing = RouterModule.forRoot(routes);