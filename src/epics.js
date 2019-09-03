import { from } from "rxjs";
import { filter, mergeMap, map } from "rxjs/operators";
import { informationTypes, informationCreators } from "./mutations";

export const informationEpics = Object.values({
  fetchIPAddress: (action$, state$) => {
    return action$.pipe(
      filter(action => action.type === informationTypes.fetchIPAddress),
      mergeMap(() => {
        const response = fetch("https://api.ipify.org/").then( res => res.text());
        return from(response);
      }),
      map(response => {
        return informationCreators.fetchIPAddressFulfilled(response);
      })
    );
  },
  fetchCountry: (action$, state$) => {
    return action$.pipe(
      filter(action => {
        return action.type === informationTypes.fetchIPAddressFulfilled;
      }),
      mergeMap(action => {
        const ipAddress = action.payload;
        const response = fetch(
          `https://www.maxmind.com/geoip/v2.1/city/${ipAddress}?demo=1`
        ).then(res => res.json());
        return from(response);
      }),
      map(response => {
        return informationCreators.fetchCountryFulFilled(
          response.country.names.ja
        )
      })
    )
  }
})
