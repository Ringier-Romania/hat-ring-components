import {RingGqlApiClient} from "@ringpublishing/graphql-api-client/lib/ring-gql-api-client";

declare module '*.scss';

declare global {
    // variable must be declared as var. let and const variables don't show up on globalThis.
    var websitesApiApolloClient: RingGqlApiClient;
}
