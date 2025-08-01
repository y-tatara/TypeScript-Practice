"use server"
// 環境変数やAPIキーをここで定義します

type Image = {
    url: string;
}

export async function fetchImage(): Promise<Image> {
    const apiKey = process.env.CAT_API_KEY;
    if (!apiKey) {
        throw new Error("CAT_API_KEY が設定されていません");
    }
    const res = await fetch("https://api.thecatapi.com/v1/images/search", {
        headers: {"x-api-key": apiKey}
    })
    const images = await res.json();
    console.log("fetchImages", images);
    if(!isImageArray(images)) {
        throw new Error("取得したデータが正しくありません");
    }
    if (!images[0]) {
        throw new Error("取得したデータが空です")
    }
    return images[0]
}

function isImageArray(value: unknown): value is Image[] {
    if (!Array.isArray(value)) {
        return false
    }
    if(!value.every(isImage)) {
        return false
    }
    return true
}

function isImage (value: unknown): value is Image {
    if(typeof value !== "object" || value === null){
        return false
    }
    if(!("url" in value)) {
        return false
    }
    if (typeof (value as Image).url !== "string") {
        return false
    }
    return true
}
