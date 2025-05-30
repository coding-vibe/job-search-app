import NextHead from 'next/head';

interface Props {
  title: string;
}

export default function Head({ title }: Props) {
  return (
    <NextHead>
      <title>{title}</title>
    </NextHead>
  );
}
