
import './App.css';
import RouterPrincipal from './routes/routerPrincipal';
import {QueryClientProvider,QueryClient} from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient} >
        <RouterPrincipal/>
    </QueryClientProvider>
  )
}

export default App
