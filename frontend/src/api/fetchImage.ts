export const fetchImage = async (queryKey: string | null): Promise<string> => {
  try {
    console.log("AUTOMATIC FETCHING")
    if (!queryKey) {
      throw Error("Empty image src");
    }
    let reqUrl = "";
    if (queryKey.includes("http://") || queryKey.includes("https://")) {
      reqUrl = queryKey;
    } else {
      reqUrl = "http://" + queryKey;
    }
    const res = await fetch(reqUrl);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (e) {
    throw Error(e);
  }
}

