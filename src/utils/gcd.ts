//greatest common divisor
export const gcd = (...arr) => {
    if (!arr.length)
        return -1;
    const common = (x, y) => (!y ? x : gcd(y, x % y));
    return [...arr].reduce((a, b) => common(a, b));
}