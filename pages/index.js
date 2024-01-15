import Head from 'next/head';
import Hero from '../components/Hero';
import Slider from '../components/Slider';
import { SliderData } from '../components/SliderData';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pictures</title>
        <meta name='description' content='Handmade pictures,manga' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Hero heading='Pictures' message='by Zetki art' />
      <Slider slides={SliderData} />
    </div>
  );
}
