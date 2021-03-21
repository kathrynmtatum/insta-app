// Appends public URL to provided path
export default function publicUrl(assetPath) {
    return assetPath.startsWith('/') ? process.env.PUBLIC_URL + assetPath : assetPath;
}