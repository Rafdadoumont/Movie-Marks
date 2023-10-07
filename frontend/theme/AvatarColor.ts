class AvatarColor {
    static convert(string: string): string {
        let hash = 0;

        for (let i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
            hash &= hash; // Convert to 32-bit integer
        }

        const color = `#${((hash >> 0) & 0xFF).toString(16).padStart(2, '0')}${((hash >> 8) & 0xFF).toString(16).padStart(2, '0')}${((hash >> 16) & 0xFF).toString(16).padStart(2, '0')}`;

        return color;
    }
}
export default AvatarColor;