import { Routes } from '@angular/router';
import { CompressComponent } from './compress/compress.component';
import { HomeComponent } from './home.component';
import { MergeComponent } from './merge/merge.component';
import { SplitComponent } from './split/split.component';

export const HomeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: '',
        children: [
            {
                path: 'merge',
                component: MergeComponent
            },
            {
                path: 'split',
                component: SplitComponent
            },
            {
                path:'compress',
                component:CompressComponent
            }
        ]
    }
];
    