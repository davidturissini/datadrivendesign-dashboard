'use strict';

import rx from 'rx';

// Stream
import currentUserSessionStream from 'dashboard/stream/userSession/current';

// Model
import User from 'dashboard/model/user';

// Client
import abtestServiceClient from 'dashboard/client/abtestService';

// Request
import getUserRequest from 'dashboard/request/user/get';

function queryUserById (user) {
    return getUserRequest(user)
        .map((resp) => {
            const pricingTierData = resp.data.relationships.pricingTier;
            const pricingTier = new Map();

            Object.keys(pricingTierData.attributes).forEach(function (key) {
                pricingTier.set(key, pricingTierData.attributes[key]);
            });

            pricingTier.set('id', pricingTierData.id);

            return pricingTier;
        });
}


export default queryUserById;
