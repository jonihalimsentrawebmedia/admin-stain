export const urlStringEncode = (str: string) => {
  return str.toLowerCase()
    .replace(/[^a-z-]+/g, "-")   // semua selain huruf & minus → "-"
    .replace(/-+/g, "-")         // hilangkan minus berulang
    .replace(/^-|-$/g, "");
}