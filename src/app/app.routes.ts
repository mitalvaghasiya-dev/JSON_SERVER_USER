import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: UserComponent
    },
    {
        path: 'user',
        component: UserComponent
    }
];
