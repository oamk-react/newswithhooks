import './App.css';
import {useState,useEffect} from 'react';
import Detail from './Detail';

const URL = 'https://newsapi.org/v2';
const APIKEY = 'YOUR API KEY HERE';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);


  useEffect(() => {
    const criteria = 'top-headlines?country=us&category=business';
    const address = URL + '/' + criteria + '&apikey=' + APIKEY;
    fetch(address)
    .then(res => res.json())
    .then(
      (result) => {
        setError(null);
        setIsLoaded(true);
        setItems(result.articles);
      },(error) => {
        setError(error);
        setIsLoaded(true);
        setItems([]);
      }
    )
  }, [])

  function close() {
    setSelectedItem(null);
  }

  if (selectedItem != null){
    return <Detail 
      title={selectedItem.title} 
      image={selectedItem.urlToImage}
      description={selectedItem.description}
      close={close}
    />;
  }
  else if (error) {
    return <p>{error.message}</p>;
  }
  else if (!isLoaded) {
    return <p>Loading...</p>;
  }
  else {
    return (
      <div>
        {items.map(item =>(
          <div key={item.title} onClick={e => setSelectedItem(item)}>
            <h3>{item.title}</h3>
            <img onClick={console.log('image')} src={item.urlToImage}></img>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;