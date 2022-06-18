import Head from 'next/head';

const MetaTag = ({
  title = '',
  description = 'The Premier Marketplace for NFTs',
  image = 'https://images.playdapp.com/marketplace/meta/og-image.png',
  keywords = 'NFT, Marketplace',
}) => {
  return (
    <Head>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="PlayDapp" />
    </Head>
  );
};

export default MetaTag;
