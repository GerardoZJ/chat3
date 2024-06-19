
import "./App.css";
import StockComparisonChart from "./graficas/comparacion";
import StockIndicatorsPieChart from "./graficas/indicadores";
import Exchange from "./graficas/Exchange";


function App() {
  return (
    <div className="App">
      <h1>
        Peso / Dolar
      </h1>
      <Exchange/>
      <h1>Indicadores mas importantes de la bolsa de valores</h1>
      <StockIndicatorsPieChart />
      <h1>Bolsas de Valores</h1>
      <StockComparisonChart />
  
    </div>
  );
}

export default App;
