import fs from "fs-extra";
import axios from "axios";
import { getImageSize } from "./getImageSize.js";

const { writeJSON } = fs;
const INITIAL_ID = 2550;
const MAX_ID = 2588;

for (let id = INITIAL_ID; id < MAX_ID; id++) {
  const url = `https://xkcd.com/${id}/info.0.json`;
  const { data } = await axios.get(url);
  const { num, news, transcript, img, ...restOfComic } = data;
  const { height, width } = await getImageSize({ url: img });
  const comicToStore = {
    id,
    img,
    height,
    width,
    ...restOfComic,
  };

  await writeJSON(`./comics/${id}.json`, comicToStore);
}
