import React, {Component, createContext} from 'react';

let Ctx = createContext();

const Consumer = ({ children, select }) => {
  class SubscribeCmp extends Component {
    componentDidMount() {
      const {subscribe} = this.props;

      this.subscription = subscribe(select)( lastChange => this.setState({lastChange}) );
    }

    render() {
      const { store, children } = this.props;
      const storeKeys = Object.keys(store);

      const preparedStore = storeKeys.reduce((acc, key) => {
        const newVal = select.indexOf(key) > -1
          ? store[key]
          : {};

        return {
          ...acc,
          [key] : newVal
        };
      }, {});

      return children({store: preparedStore}) ;
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }
  }

  return (
    <Ctx.Consumer>
      {(data) => {
        if(!data)
          return null;

        let {subscribe, store} = data;

        return (
          <SubscribeCmp subscribe={subscribe} store={store}>
            {children}
          </SubscribeCmp>
        )
      }
      }
    </Ctx.Consumer>
  )
};

export const connect = (select = []) => Cmp => (props = {}) => {
  return (
    <Consumer select={select}>
      {({ store }) => <Cmp {...props} {...store} />}
    </Consumer>
  )
};

export const Connect = ({select, children}) => {
  return (
    <Consumer select={select}>
      {({ store }) => children(store)}
    </Consumer>
  )
};

export const createProvider = store => {
  class StoreProvider extends Component {
    componentDidMount(){
      const { store } = this.props;

      this.setState({
        store: store.store,
        subscribe: store.subscribe
      });
    }

    render() {
      return (
        <Ctx.Provider value={this.state}>
          {this.props.children}
        </Ctx.Provider>
      );
    }
  }

  return StoreProvider;
};
