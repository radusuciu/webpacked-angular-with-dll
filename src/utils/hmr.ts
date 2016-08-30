import { ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';


export class HMR {
    constructor(public appRef: ApplicationRef) {}

    hmrOnInit(store) {
        if (!store) return;
    }

    hmrOnDestroy(store) {
        var cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
        // anything you need done the component is removed
    }
}
