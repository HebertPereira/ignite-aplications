import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { stripe } from '../services/stripe';
import formatMonetary from '../utils/formatMonetary';

import { SubscribeButton } from '../components/SubscribeButton';

import {
  HomeContainer,
  HomeContent
} from '../styles/home';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <HomeContainer>
        <HomeContent>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world</h1>
          <p>
            Get Acess to all the publications <br />
            <span> for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </HomeContent>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </HomeContainer>
    </>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1K1sFcE2YweXPL0XIeGgMl4B')

  const product = {
    price: price.id,
    amount: formatMonetary(price.unit_amount / 100),
  }
  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, //24 hours
  }
}
