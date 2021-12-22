import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, LogBox} from 'react-native';
import {AuthContextProvider} from './src/context/AuthContext';
import RootNav from './src/routes/RootNav';
import {AppIntroScreen} from './src/screens';
import {Styles} from './src/common';
import {getToken, setToken} from './src/utils/introToken';
import usePagesStore from './src/hooks/usePagesStore';

LogBox.ignoreLogs(['Setting a timer', 'Require cycle:']);

const App = () => {
  const [showIntro, setShowIntro] = useState(false);
  const fetchPages = usePagesStore(state => state.fetchPages);
  useEffect(() => {
    getToken().then(data => {
      if (!data) {
        setShowIntro(true);
      } else {
        setShowIntro(false);
      }
    });
    fetchPages();
  }, []);
  const done = async () => {
    setShowIntro(false);
    await setToken('done');
  };

  return (
    <>
      <StatusBar
        barStyle={showIntro ? 'light-content' : 'dark-content'}
        backgroundColor={showIntro ? 'transparent' : '#eee'}
        translucent={showIntro}
      />
      <SafeAreaView style={Styles.container}>
        <AuthContextProvider>
          {showIntro ? <AppIntroScreen done={done} /> : <RootNav />}
        </AuthContextProvider>
      </SafeAreaView>
    </>
  );
};

export default App;
