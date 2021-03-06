'use strict';

// Client
import requestAbTest from 'dashboard/action/requestAbTest';

export default function (user) {
    const path = `/users/${user.get('id')}`;

    return requestAbTest(path).shareReplay(1);
}
