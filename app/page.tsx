import { connection } from "next/server";
import { fetchImage } from "./fetch-image";
import { CatImage } from "./cat-image";

export default async function Home() {

  await connection();

  const image = await fetchImage();
  console.log("Home: 画像情報を取得しました", image)

  return (
    <CatImage url={image.url} />
  );
}
