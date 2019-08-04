import { configureStore } from "redux-starter-kit";

// import monitorReducersEnhancer from './enhancers/monitorReducers'
// import loggerMiddleware from './middleware/logger'
import reducers from "reducers";

export default function configureAppStore(preloadedState?: any) {
  const store = configureStore({
    reducer: reducers,
    middleware: undefined, //[loggerMiddleware, ...getDefaultMiddleware()],
    preloadedState
    // enhancers: [monitorReducersEnhancer]
  });

  /*
  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
  }
  */

  return store;
}
