import './App.css';
import { SwapWidget } from '@dodoex/widgets';

function App() {
  return (
    <div className="App">
      <SwapWidget
        apikey="55ea0a80b62316d9bc" // for default test
        defaultChainId={1}
        colorMode="dark"
        width={500}
        height={500}
        defaultFromToken={{
          chainId: 1,
            address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            name: 'USD Coin',
            decimals: 6,
            symbol: 'USDC',
          logoURI: '',
        }}
        defaultToToken={{
          chainId: 1,
            address: '0xf840099E75199255905284C38708d594546560a4',
            name: 'Neronumis',
            decimals: 18,
            symbol: 'NERO',
          logoURI: '',
        }}
        popularTokenList ={[
          {
            chainId: 1,
            address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            name: 'USD Coin',
            decimals: 6,
            symbol: 'USDC',
            logoURI:
              'https://cmp.dodoex.io/sQ5dF3FkjjQUsmfqFFE5cKq-cthh4u0wUooBE5Epf-k/rs:fit:96:96:0/g:no/aHR0cHM6Ly9pbWFnZS1wcm94eS5kb2RvZXguaW8vTDlEVElLa2dONG5mRkNTSF9GMUdXU3JiZkJDa2JZRTkwbmFDS0dIWnRsby9hSFIwY0hNNkx5OWpaRzR0YldWa2FXRXVaRzlrYjJWNExtbHZMM1Z6WkdOZlpXVTFNbUV4WldReVlpOTFjMlJqWDJWbE5USmhNV1ZrTW1JdWNHNW4ucG5n.webp',
          },
          {
            chainId: 1,
            address: '0xf840099E75199255905284C38708d594546560a4',
            name: 'Neronumis',
            decimals: 18,
            symbol: 'NERO',
            logoURI:
              'https://github.com/Neronumis/Neronumis_Token/raw/a22f9fbd943d6e73cf76e74fc8b8e172120a8100/Logos/SwapDappLogo.png',
          },
      ]}
        tokenList={[
          {
            chainId: 1,
            address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            name: 'USD Coin',
            decimals: 6,
            symbol: 'USDC',
            logoURI:
              'https://cmp.dodoex.io/sQ5dF3FkjjQUsmfqFFE5cKq-cthh4u0wUooBE5Epf-k/rs:fit:96:96:0/g:no/aHR0cHM6Ly9pbWFnZS1wcm94eS5kb2RvZXguaW8vTDlEVElLa2dONG5mRkNTSF9GMUdXU3JiZkJDa2JZRTkwbmFDS0dIWnRsby9hSFIwY0hNNkx5OWpaRzR0YldWa2FXRXVaRzlrYjJWNExtbHZMM1Z6WkdOZlpXVTFNbUV4WldReVlpOTFjMlJqWDJWbE5USmhNV1ZrTW1JdWNHNW4ucG5n.webp',
          },
          {
            chainId: 1,
            address: '0xf840099E75199255905284C38708d594546560a4',
            name: 'Neronumis',
            decimals: 18,
            symbol: 'NERO',
            logoURI:
              'https://github.com/Neronumis/Neronumis_Token/raw/a22f9fbd943d6e73cf76e74fc8b8e172120a8100/Logos/SwapDappLogo.png',
          },
      ]}
      />
    </div>
  );
}

export default App;
