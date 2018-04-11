## Proxy store

React integration for [simple-proxy-store](https://github.com/dawiidio/simple-proxy-store)

Simple usage:

From 1.0.1 you can use `Connect` component fo dump Components example below:
```jsx harmony
import { createProvider, Connect } from 'react-simple-proxy-store';
import ReactDOM from 'react-dom';

class Test {
  collection = [];

  addItem() {
    const id = Math.round(Math.random()*1000);
    
    this.collection = [...this.collection, { id, label: `Label ${id}` }];
  }
}

const store = createStore({
  test: new Test()
});

const StoreProvider = createProvider(store);

const TestListener = () => (
  <Connect select={['test']}>
    {({ test }) => (
      <div>           
        <ul>
          {test.collection.map(item => (
            <li key={item.id}>
                {item.label}
              </li>
            ))}
        </ul>
        <button onClick={() => test.addItem()}>Create new item</button>
      </div>
    )}      
  </Connect>
);

ReactDOM.render(document.querySelector('#app'), (
  <StoreProvider store={store}>
    <TestListener />
  </StoreProvider>
))
```

```jsx harmony
import { createProvider, connect }  from 'react-simple-proxy-store';
import { createStore } from 'simple-proxy-store';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';

class Test {
  collection = [];

  addItem() {
    const id = Math.round(Math.random()*1000);
    
    this.collection = [...this.collection, { id, label: `Label ${id}` }];
  }
}

const store = createStore({
  test: new Test(),
  counter: {
    value: 0
  }
}); 

const StoreProvider = createProvider(store);

@connect(['test'])
class TestCmp extends Component {
  render() {
    return (
      <div>
        
        <ul>
          {this.props.test.collection.map(item => (
            <li key={item.id}>
              {item.label}
            </li>
          ))}
        </ul>
        <button onClick={() => this.props.test.addItem()}>Create new item</button>
      </div>
    );
  }
}

@connect(['counter'])
class CounterCmp extends Component {
  render() {
    const { counter } = this.props;
    
    return (
      <h3 onClick={() => counter.value += 1}>
        {counter.value}
      </h3>
    );
  }
}

ReactDOM.render(document.querySelector('#app'), (
  <StoreProvider store={store}>
    <TestCmp/>
    <CounterCmp/>
  </StoreProvider>
))

```
