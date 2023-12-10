import { useLocale } from './contexts/Locale/LocaleProvider';
import { REGIONS } from './contexts/Locale/constants';
import { Routes } from '@/routes';
// import "./styles.css";

const App: React.FC = () => {
  const { dispatch } = useLocale();

  const handleRegionChange = (region: string) => {
    const action = {
      type: 'CHANGE_LOCALE',
      payload: {
        region,
      },
    };

    dispatch(action);
  };

  return (
    <div className="App">
      {Object.keys(REGIONS).map((region) => (
        <button key={region} onClick={() => handleRegionChange(region)}>
          {region}
        </button>
      ))}

      <Routes />
    </div>
  );
};

export default App;
