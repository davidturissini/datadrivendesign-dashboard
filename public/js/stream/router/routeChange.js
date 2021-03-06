'use strict';

import rx from 'rx';
import _ from 'lodash';

// filter
import authFilter from 'dashboard/filters/auth';

// Stream
import currentRouterStream from 'dashboard/stream/router/current';


import homeIndex from 'dashboard/controller/home/index';
import newAbtests from 'dashboard/controller/abtests/new';
import showAbtests from 'dashboard/controller/abtests/show';
import showApiKeys from 'dashboard/controller/user/apiKeys';
import showPricingTiers from 'dashboard/controller/user/billing';

const currentRouteStream = currentRouterStream.flatMapLatest((router) => {

        function generateFilterHandler (filter) {
            return function () {
                const next = _.last(arguments);
                return filter(next);
            }
        }

        return rx.Observable.create(function (o) {
            router.mount({
                '/': [generateFilterHandler(authFilter), function (a) {
                    o.onNext({
                        module: homeIndex,
                        context: 'abtests'
                    });
                }],

                '/abtests/new': [generateFilterHandler(authFilter), function () {
                    o.onNext({
                        module: newAbtests,
                        context: 'abtests'
                    })
                }],

                '/abtests/:abtest_id': [generateFilterHandler(authFilter), function (abtestId) {
                    o.onNext({
                        params: {
                            abtest_id: abtestId
                        },
                        module: showAbtests,
                        context: 'abtests'
                    });
                }],

                '/api': [generateFilterHandler(authFilter), function () {
                    o.onNext({
                        module: showApiKeys,
                        context: 'api'
                    })
                }],

                '/billing': [generateFilterHandler(authFilter), function () {
                    o.onNext({
                        module: showPricingTiers,
                        context: 'billing'
                    });
                }]
            });

        });

    })
    .map((request) => {
        if (!request.params) {
            request.params = {};
        }

        return request;
    })
    .replay(undefined, 1);

currentRouteStream.connect();


export default currentRouteStream;
