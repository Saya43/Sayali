import { Routes } from '@angular/router';
import { CompressComponent } from '../main/compress/compress.component';

import { MergeComponent } from '../main/merge/merge.component';
import { SplitComponent } from '../main/split/split.component';
import { MainComponent } from './main.component';

export const MainRoutes: Routes = [
    // {
    //     path: 'main',
    //     component: MainComponent
    // },
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
    