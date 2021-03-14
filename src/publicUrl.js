// Appends public URL to provided path
export default function publicUrl(assetPath) {
    return process.env.PUBLIC_URL + assetPath;
}