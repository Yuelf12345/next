// pages/_app.tsx
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // 在这里添加你的路由拦截逻辑
      console.log('App is changing to: ', url);
    };

    // 监听路由变化事件
    router.events.on('routeChangeStart', handleRouteChange);

    // 清理事件监听器
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;