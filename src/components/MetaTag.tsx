import Head from 'next/head';

type Props = {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
};

const MetaTag = ({
  title = 'PlayDapp Notice',
  description = 'The Premier Marketplace for NFTs',
  image = 'https://images.playdapp.com/marketplace/meta/og-image.png',
  keywords = 'NFT, Marketplace',
}: Props) => {
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
