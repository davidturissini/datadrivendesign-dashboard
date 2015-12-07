'use strict';

import { Router } from 'director';
import rx from 'rx';

const routerStream = rx.Observable.create(function (o) {

        const router = Router();

        router.configure({
            async: true
        });

        o.onNext(router);

    })
    .map((router) => {

        router.makeLoginHref = function () {
            return '#/login';
        };

        router.redirectToLoginHref = function () {
            const href = this.makeLoginHref().replace('#', '');
            router.setRoute(href);
        };

        router.makeCreateAbTestHref = function () {
            return '#/abtests/new';
        };

        router.transitionToCreateAbTest = function () {
            const href = this.makeCreateAbTestHref().replace('#', '');

            router.setRoute(href);
        };

        return router;

    })

    .replay(undefined, 1);


export default routerStream;