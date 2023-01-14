import axios from 'axios';
import cheerio from 'cheerio';

export interface MetaData {
  title: string;
  description: string;
  image: string;
  link: string;
}

export const getMetaDataByUrl = async (
  url: string,
): Promise<{
  title: string;
  image: string;
  link: string;
  description: string;
}> => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data as string);
  const title =
    $('title').text() ||
    $("meta[property='og:title']").attr('content') ||
    $("meta[name='twitter:title']").attr('content') ||
    '';
  const ogImage = $("meta[property='og:image']").attr('content') || '';
  const description =
    $('meta[name="description"]').attr('content') ||
    $("meta[property='og:description']").attr('content') ||
    $("meta[name='twitter:description']").attr('content') ||
    '';
  return {
    title,
    image: ogImage,
    link: url,
    description,
  };
};
